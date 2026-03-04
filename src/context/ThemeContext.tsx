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

  const selectedTheme = isDark ? darkTheme : lightTheme;
  
  // ⭐ FIX: Safely extract colors whether they are nested inside 'colors' or directly on the theme object.
  const themeColors = selectedTheme?.colors || selectedTheme || {};

  // ⭐ FIX: Apply bulletproof fallbacks for every specific property so they can never be undefined.
  const colors = {
    ...themeColors, // Keeps any other custom colors you have
    text: themeColors.text || (isDark ? '#ffffff' : '#000000'),
    background: themeColors.background || (isDark ? '#000000' : '#ffffff'),
    card: themeColors.card || (isDark ? '#333333' : '#f0f0f0'),
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: selectedTheme,
        isDark,
        toggleTheme,
        colors, // ⭐ ← safely guaranteed to never be undefined
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);