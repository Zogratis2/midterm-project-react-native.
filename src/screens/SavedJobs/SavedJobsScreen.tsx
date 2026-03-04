import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useJobs } from '../../context/JobsContext';
import JobCard from '../../components/JobCard';
import styles from './SavedJobsStyles';
import { useThemeContext } from '../../context/ThemeContext'; 

const SavedJobsScreen = () => {
  const { savedJobs } = useJobs();
  const { colors } = useThemeContext(); 

  return (
    <View style={[styles.container, { backgroundColor: colors.background, flex: 1 }]}>
      {savedJobs.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '500' }}>
            No Saved Jobs
          </Text>
          <Text style={{ color: colors.text, opacity: 0.6, marginTop: 8 }}>
            Jobs you save will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={item => item.id.toString()}
          // ⭐ Tells the JobCard it is currently rendering on the Saved screen
          renderItem={({ item }) => <JobCard job={item} isSaved={true} fromSavedScreen={true} />}
          contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default SavedJobsScreen;