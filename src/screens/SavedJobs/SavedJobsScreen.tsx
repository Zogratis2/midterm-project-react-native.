import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useJobs } from '../../context/JobsContext';
import JobCard from '../../components/JobCard';
import styles from './SavedJobsStyles';
import { useThemeContext } from '../../context/ThemeContext'; // ✅ import theme

const SavedJobsScreen = () => {
  const { savedJobs } = useJobs();
  const { colors } = useThemeContext(); // ✅ get theme colors

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {savedJobs.length === 0 ? (
        <Text style={{ color: colors.text }}>No Saved Jobs</Text> // ✅ text adapts
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <JobCard job={item} isSaved />}
        />
      )}
    </View>
  );
};

export default SavedJobsScreen;
