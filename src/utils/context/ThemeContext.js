'use client'

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(); 

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const storedTheme = typeof window !== "undefined" ? localStorage.getItem('theme') : null;
  const initialTheme = storedTheme ? storedTheme === 'dark' : false;
  
  const [darkTheme, setDarkTheme] = useState(initialTheme);

  useEffect(() => {
    // Set the class for dark mode when the theme changes
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Store the theme in localStorage whenever it changes
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]); // This effect runs whenever darkTheme changes

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
