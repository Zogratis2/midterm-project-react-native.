import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ThemeProvider, useThemeContext } from './src/context/ThemeContext';
import { JobsProvider } from './src/context/JobsContext';
import AppNavigator from './src/navigation/AppNavigator';

const AppContent = () => {
  const { isDark, colors } = useThemeContext();

  // ⭐ FIX: Create a safe version of colors. If colors is undefined during the initial 
  // millisecond of rendering, it falls back to an empty object instead of crashing.
  const safeColors = colors || {};

  const navTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          // ⭐ FIX: Added foolproof fallbacks for every React Navigation color requirement
          background: safeColors.background || '#121212',
          card: safeColors.card || '#1e1e1e',
          text: safeColors.text || '#ffffff',
          border: safeColors.card || '#333333',
          primary: safeColors.text || '#ffffff',
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: safeColors.background || '#ffffff',
          card: safeColors.card || '#f5f5f5',
          text: safeColors.text || '#000000',
          border: safeColors.card || '#e0e0e0',
          primary: safeColors.text || '#000000',
        },
      };

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        // ⭐ FIX: Protect the StatusBar background color as well
        backgroundColor={safeColors.background || (isDark ? '#121212' : '#ffffff')}
      />
      <NavigationContainer theme={navTheme}>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <JobsProvider>
        <AppContent />
      </JobsProvider>
    </ThemeProvider>
  );
};

export default App;