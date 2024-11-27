"use client";

import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    // Check for the presence of the 'session' cookie
    const hasSessionCookie = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("session="));
    setIsLoggedIn(hasSessionCookie);
  }, []);

  const deleteCookie = (name) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; SameSite=Lax;`;
  };

  const logout = () => {
    deleteCookie("session"); // Remove session cookie
    setIsLoggedIn(false); // Update auth state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
