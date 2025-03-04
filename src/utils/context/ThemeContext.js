'use client'

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(); 

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check if a theme is saved in localStorage and set the initial state
  const storedTheme = localStorage.getItem('theme');
  const initialTheme = storedTheme ? storedTheme === 'dark' : false;

  const [darkTheme, setDarkTheme] = useState(initialTheme);

  useEffect(() => {
    // Toggle the dark mode class on the root element
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Store the theme in localStorage whenever it changes
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]); // Run the effect whenever darkTheme changes

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
