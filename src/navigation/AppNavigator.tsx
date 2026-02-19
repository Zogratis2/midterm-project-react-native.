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
    <Stack.Navigator>
      <Stack.Screen name="JobFinder" component={JobFinderScreen} />
      <Stack.Screen name="SavedJobs" component={SavedJobsScreen} />
      <Stack.Screen name="ApplicationForm" component={ApplicationFormScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
