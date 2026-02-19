import React from 'react';
import { Pressable, Text } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useThemeContext();

  return (
    <Pressable onPress={toggleTheme} style={{ padding: 10 }}>
      <Text>{isDark ? 'Light Mode ☀️' : 'Dark Mode 🌙'}</Text>
    </Pressable>
  );
};

export default ThemeToggle;
