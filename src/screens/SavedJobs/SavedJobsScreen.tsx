import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useJobs } from '../../context/JobsContext';
import JobCard from '../../components/JobCard';
import styles from './SavedJobsStyles';

const SavedJobsScreen = () => {
  const { savedJobs } = useJobs();

  return (
    <View style={styles.container}>
      {savedJobs.length === 0 ? (
        <Text>No Saved Jobs</Text>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <JobCard job={item} isSaved />
          )}
        />
      )}
    </View>
  );
};

export default SavedJobsScreen;
