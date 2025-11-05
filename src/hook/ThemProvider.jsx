import React, { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
 
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

    useEffect(() => {
    document.body.className =
      theme === "light" ? "bg-light text-dark" : "bg-dark text-light";
       
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;