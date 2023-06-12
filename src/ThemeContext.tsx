import React, { createContext, useState, useEffect } from 'react';

type ThemeContextType = {
  darkTheme: boolean;
  toggleDarkTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkTheme: false,
  toggleDarkTheme: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    // Retrieve the dark theme preference from localStorage
    const storedTheme = localStorage.getItem('darkTheme');
    if (storedTheme) {
      setDarkTheme(JSON.parse(storedTheme));
    }
  }, []);

  useEffect(() => {
    // Store the dark theme preference in localStorage
    localStorage.setItem('darkTheme', JSON.stringify(darkTheme));
  }, [darkTheme]);

  const toggleDarkTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
