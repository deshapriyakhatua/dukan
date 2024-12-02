"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { credentialsSignIn, googleSignIn } from "@/lib/authHelper";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setIsLoading(true);

    try {
      const { phone, password } = formData;

      // Client-side validation
      if (!phone || !password) {
        setStatusMessage("Phone and Password are required.");
        toast.warning("Phone and Password are required.");
        setIsLoading(false);
        return;
      }

      if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        setStatusMessage("Phone number must be 10 digits.");
        toast.warning("Phone number must be 10 digits.");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setStatusMessage("Password must be at least 6 characters.");
        toast.warning("Password must be at least 6 characters.");
        setIsLoading(false);
        return;
      }

      // Send data to the backend
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage("Login successful!");
        // setIsLoggedIn(true);
        toast.success('Login successful!');
      } else {
        setStatusMessage(result.error || "Invalid credentials.");
        toast.error('Invalid credentials.!');
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setStatusMessage("An unexpected error occurred.");
      toast.error('An unexpected error occurred.!');
    } finally {
      setIsLoading(false);
    }
  };

  const credentialsAction = (formData) => {
    signIn("credentials", formData)
  }
  if (isLoggedIn) redirect('/');

  return (
    <div className={styles.signin_container}>
      <div className={styles.formbg_outer}>
        <div className={styles.formbg}>
          <h1 className={styles.signin_title}>Sign In</h1>
          <p className={styles.formbg_title}>Sign in to your account</p>

          <form id={styles.form_login} onSubmit={credentialsAction}>
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
            <button className={styles.ssolink} onClick={googleSignIn}>
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
