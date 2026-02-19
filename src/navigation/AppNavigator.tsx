import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobFinderScreen from '../screens/JobFinder/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobs/SavedJobsScreen';
import ApplicationFormScreen from '../screens/ApplicationForm/ApplicationFormScreen';

export type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  ApplicationForm: { fromSaved?: boolean };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,                 // ✅ ADDED: makes sure header appears
        animation: 'slide_from_right',      // ✅ ADDED: smooth transition
        gestureEnabled: true,               // ✅ ADDED: allow swipe back
      }}
    >
      <Stack.Screen
        name="JobFinder"
        component={JobFinderScreen}
        options={{
          title: 'Job Finder',              // ✅ ADDED
        }}
      />

      <Stack.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{
          title: 'Saved Jobs',              // ✅ ADDED
        }}
      />

      <Stack.Screen
        name="ApplicationForm"
        component={ApplicationFormScreen}
        options={{
          title: 'Application Form',        // ✅ ADDED
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
