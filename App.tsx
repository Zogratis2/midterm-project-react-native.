import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/ThemeContext';
import { JobsProvider } from './src/context/JobsContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <ThemeProvider>
      <JobsProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </JobsProvider>
    </ThemeProvider>
  );
};

export default App;
