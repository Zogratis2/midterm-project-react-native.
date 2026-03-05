import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobFinderScreen from '../screens/JobFinder/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobs/SavedJobsScreen';
import ApplicationFormScreen from '../screens/ApplicationForm/ApplicationFormScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen/JobDetailsScreen'; 
import ThemeToggle from '../components/ThemeToggle';
import { useThemeContext } from '../context/ThemeContext';

export type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  ApplicationForm: { fromSaved?: boolean };
  // ⭐ Added JobDetails to the stack types so TypeScript is happy
  JobDetails: { job: any; isSaved?: boolean; fromSavedScreen?: boolean }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { colors } = useThemeContext(); // ✅ get theme colors

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,                 // ✅ makes sure header appears
        animation: 'slide_from_right',     // ✅ smooth transition
        gestureEnabled: true,              // ✅ allow swipe back
        headerStyle: {
          backgroundColor: colors.card,   // ✅ dynamic header background
        },
        headerTitleStyle: {
          color: colors.text,             // ✅ dynamic header title color
          fontWeight: 'bold',
        },
        headerRight: () => <ThemeToggle />, // ✅ button appears top-right on all screens
      }}
    >
      <Stack.Screen
        name="JobFinder"
        component={JobFinderScreen}
        options={{
          title: 'Job Finder',
        }}
      />

      <Stack.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{
          title: 'Saved Jobs',
        }}
      />

      <Stack.Screen
        name="ApplicationForm"
        component={ApplicationFormScreen}
        options={{
          title: 'Application Form',
        }}
      />

      {/* ⭐ ADDED THE JOB DETAILS SCREEN HERE */}
      <Stack.Screen
        name="JobDetails"
        component={JobDetailsScreen}
        options={{
          title: 'Job Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;