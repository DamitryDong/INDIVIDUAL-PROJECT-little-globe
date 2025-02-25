"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../client"; // Import the initialized Firebase app

const AuthContext = createContext();
AuthContext.displayName = "AuthContext"; // Helps with debugging in React DevTools

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const auth = getAuth(app); // Get the auth instance

  useEffect(() => {
    // Creates a single global listener for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser || false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth]);

  const value = useMemo(
    () => ({
      user,
      userLoading: user === null,
    }),
    [user]
  );

  return <AuthContext.Provider value={value} {...props} />;
}

const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
