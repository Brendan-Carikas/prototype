import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
// Removed unused baseTheme import
import modernTheme from '../assets/global/Theme-modern';
import darkTheme from '../assets/global/Theme-dark';
import artoTheme from '../assets/global/ArtoTheme';

const THEME_KEY = 'app_theme';
const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme || 'arto';
  });
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const getTheme = (themeName) => {
    switch (themeName) {
      case 'arto':
        return artoTheme;
      case 'modern':
        return modernTheme;
      case 'dark':
        return darkTheme;
      default:
        return artoTheme;
    }
  };

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
    setUnsavedChanges(true);
  };

  const saveTheme = () => {
    localStorage.setItem(THEME_KEY, currentTheme);
    setUnsavedChanges(false);
  };

  const value = {
    currentTheme,
    setTheme: handleThemeChange,
    unsavedChanges,
    saveTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={getTheme(currentTheme)}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
