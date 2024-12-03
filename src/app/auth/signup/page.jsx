"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { googleSignIn } from "@/lib/authHelper";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      // Client-side validation
      const { phone, password } = formData;
      if (!phone || !password) {
        setStatusMessage("Phone and Password are required.");
        toast.warning("Phone and Password are required.");
        setIsLoading(false);
        return;
      }
      if (phone.length < 10) {
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
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage("User signed up successfully!");
        toast.success("User signed up successfully!");
        setFormData({ phone: "", password: "" }); // Reset form
      } else {
        setStatusMessage(result.error || "Something went wrong.");
        toast.error(result.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setStatusMessage("An unexpected error occurred.");
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) redirect('/');

  return (
    <div className={styles.signin_container}>
      <div className={styles.formbg_outer}>
        <div className={styles.formbg}>
          <h1 className={styles.signin_title}>Sign Up</h1>
          <p className={styles.formbg_title}>Sign up to your account</p>

          <form id={styles.form_login} onSubmit={handleSubmit}>
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
              <label htmlFor="password">Password</label>
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
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            {statusMessage && (
              <p id={styles.status_text}>{statusMessage}</p>
            )}
          </form>

          <div className={styles.field}>
            <button className={styles.ssolink} onClick={googleSignIn}>
              Sign-Up with Google
            </button>
          </div>

        </div>

        <div className={styles.footer_link}>
          <span>
            Already have an account? <a href="/auth/signin">Sign In</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
