import React, { createContext, useContext } from 'react';
import { useTheme } from '../hook/useTheme';

const ThemeContext = createContext();

export const useSharedTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useSharedTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const theme = useTheme();
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
