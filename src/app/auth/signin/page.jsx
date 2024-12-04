"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { credentialsSignIn, OAuthSignIn } from "@/lib/authHelper";
import { FcGoogle } from "react-icons/fc";


const SigninPage = () => {

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSignInButtonLoading, setIsSignInButtonLoading] = useState(false);
  const [isGoogleSignInButtonLoading, setIsGoogleSignInButtonLoading] = useState(false);
  const { data: session, status, update } = useSession();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCredentialSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      setIsSignInButtonLoading(true);
      const formData = new FormData(e.target); // Access form data
      const phone = formData.get("phone");
      const password = formData.get("password");

      // Client-side validation
      if (!phone || !password) {
        throw new Error("Phone and Password are required.");
      }

      if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        throw new Error("Phone number must be 10 digits.");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      const signedIn = await credentialsSignIn({
        phone,
        password,
        redirect: false,
      });
      toast.success('Signed in successfully')
      console.log('signedIn: ');
      await update();
    } catch (error) {
      console.dir(error?.message?.split('#*')[0])
      toast.error(error?.message?.split('#*')[0])
    } finally {
      setIsSignInButtonLoading(false);
    }
  }

  const handleOAuthSignIn = async (provider) => {
    setIsGoogleSignInButtonLoading(true);
    await OAuthSignIn(provider);
    setIsGoogleSignInButtonLoading(false);
    await update();
  }

  if (status === 'loading') return null;
  if (status === 'authenticated') redirect("/");

  return (
    <div className={styles.signin_container}>
      <div className={styles.formbg_outer}>
        <div className={styles.formbg}>
          <h1 className={styles.signin_title}>Sign In</h1>
          <p className={styles.formbg_title}>Sign in to your account</p>

          <form id={styles.form_login} onSubmit={handleCredentialSignIn}>
            <div className={styles.field}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id={styles.phone}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <div className={styles.forgot_password_parent}>
                <label htmlFor="password">Password</label>
                <div className={styles.reset_pass}>
                  <a href="#">Forgot password?</a>
                </div>
              </div>
              <input
                type="password"
                name="password"
                id={styles.password}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <button
                id={styles.submit_button}
                type="submit"
                disabled={isSignInButtonLoading}
              >
                {isSignInButtonLoading ? "Signing In..." : "Sign In"}
              </button>
            </div>
            {statusMessage && (
              <p id={styles.status_text}>{statusMessage}</p>
            )}
          </form>

          <span>or</span>
          
          <div className={styles.oAuthButtonContainer}>
            <button className={styles.oAuthButton} 
            onClick={async () => {
              await handleOAuthSignIn('google');
            }}
            disabled={isGoogleSignInButtonLoading}>
              {isGoogleSignInButtonLoading ? 'Loading...' :'Sign In with Google'}  <FcGoogle size={18}/>
            </button>
          </div>

        </div>

        <div className={styles.footer_link}>
          <span>
            Don't have an account? <a href="/auth/signup">Sign up</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
