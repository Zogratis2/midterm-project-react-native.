import React, { useState, useCallback } from 'react';
import { View, FlatList, RefreshControl, Pressable, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchJobsFromAPI } from '../../api/jobsApi';
import { useJobs } from '../../context/JobsContext';
import JobCard from '../../components/JobCard';
import SearchBar from '../../components/SearchBar';
import styles from './JobFinderStyles';
import { useThemeContext } from '../../context/ThemeContext';

const JobFinderScreen = () => {
  const { jobs, setJobs, savedJobs } = useJobs();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useThemeContext();
  const navigation = useNavigation<any>();

  const loadJobs = async () => {
    const data = await fetchJobsFromAPI();
    setJobs(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadJobs();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadJobs();
    setRefreshing(false);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, flex: 1 }]}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholderTextColor={colors.text}
        inputBackgroundColor={colors.card}
        inputTextColor={colors.text}
      />

      {/* ⭐ SAVED JOBS COUNTER BUTTON */}
      <Pressable
        style={{
          backgroundColor: '#007bff', // permanently blue
          padding: 12,
          marginHorizontal: 15,
          marginBottom: 10,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 2, 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
        }}
        onPress={() => navigation.navigate('SavedJobs')}
      >
        <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>
          View Saved Jobs ({savedJobs ? savedJobs.length : 0})
        </Text>
      </Pressable>

      <FlatList
        data={filteredJobs}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007bff']} // Also kept the loading spinner blue
          />
        }
        renderItem={({ item }) => {
          const isAlreadySaved = savedJobs?.some((savedJob) => savedJob.id === item.id);
          return <JobCard job={item} isSaved={isAlreadySaved} />;
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default JobFinderScreen;