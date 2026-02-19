import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';

interface ThemeContextType {
  theme: any;
  isDark: boolean;
  toggleTheme: () => void;
  colors: any; // ⭐ added earlier
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);

  // ⭐ FIX: fallback to prevent TypeScript error
  const selectedTheme = isDark ? darkTheme : lightTheme;
  const colors = (selectedTheme as any).colors || {
    text: isDark ? '#ffffff' : '#000000',
    background: isDark ? '#000000' : '#ffffff',
    card: isDark ? '#333333' : '#f0f0f0',
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: selectedTheme,
        isDark,
        toggleTheme,
        colors, // ⭐ ← no more error
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
