"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { credentialsSignIn, googleSignIn } from "@/lib/authHelper";
import { CredentialsSignin } from "next-auth";


const SigninPage = () => {

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = session?.user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoggedIn) redirect('/');

  return (
    <div className={styles.signin_container}>
      <div className={styles.formbg_outer}>
        <div className={styles.formbg}>
          <h1 className={styles.signin_title}>Sign In</h1>
          <p className={styles.formbg_title}>Sign in to your account</p>

          <form id={styles.form_login} onSubmit={async (e) => {
            e.preventDefault(); // Prevent default form submission behavior

            try {


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
              router.push('/')
            } catch (error) {
              console.dir(error?.message?.split('#*')[0])
              toast.error(error?.message?.split('#*')[0])
            }
          }}>
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
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </div>
            {statusMessage && (
              <p id={styles.status_text}>{statusMessage}</p>
            )}
          </form>

          <div className={styles.field}>
            <button className={styles.ssolink} onClick={async () => {
              const signedIn = await googleSignIn('google')
              // if (signedIn) redirect('/')
              console.log('signedIn: ', signedIn)
            }}>
              Sign-In with Google
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
