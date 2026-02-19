import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ThemeProvider, useThemeContext } from './src/context/ThemeContext';
import { JobsProvider } from './src/context/JobsContext';
import AppNavigator from './src/navigation/AppNavigator';

const AppContent = () => {
  const { isDark, colors } = useThemeContext();

  const navTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.background,
          card: colors.card,
          text: colors.text,
          border: colors.card,
          primary: colors.text,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
          card: colors.card,
          text: colors.text,
          border: colors.card,
          primary: colors.text,
        },
      };

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
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
