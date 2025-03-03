
'use client'

import React, {createContext, useContext, useState} from "react";

// this will be used so we can attatch the change here to the dark mode button made by flowbite and and change other stuff 

const ThemeContext = createContext(); 

export const useTheme = () => useContext(ThemeContext); //this is what we can import to get the toggleTheme and darkTheme values and function

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false); // Default to light theme (false on darkTheme)

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark"); // Toggle Tailwind dark mode class at the sametime we trigger the setdarkThemestate
    setDarkTheme((prev) => !prev); // Toggles for the state so we can use it on the map.
  };


  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
