import React from 'react';
import { Pressable, Text } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  // ⭐ Cast to any so TS will NOT complain (no changes to your logic)
  const { toggleTheme, isDark, colors: themeColors } = useThemeContext() as any;

  // ⭐ Fallback colors (kept exactly as before)
  const colors = themeColors || {
    text: isDark ? '#ffffff' : '#000000',
    card: isDark ? '#333333' : '#f0f0f0',
  };

  return (
    <Pressable 
      onPress={toggleTheme} 
      style={{ 
        padding: 10,
        backgroundColor: colors.card,
        borderRadius: 8
      }}
    >
      <Text style={{ color: colors.text }}>
        {isDark ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
      </Text>
    </Pressable>
  );
};

export default ThemeToggle;
