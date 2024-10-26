"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  themeStyles: { background: string; color: string };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  const themeStyles = isDarkMode
    ? { background: "#000000", color: "#FFFFFF" } // Dark mode colors
    : { background: "#FFFFFF", color: "#333333" }; // Light mode with off-white background

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, themeStyles }}>
      <div
        style={{
          background: themeStyles.background,
          color: themeStyles.color,
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
