import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchJobsFromAPI } from '../../api/jobsApi';
import { useJobs } from '../../context/JobsContext';
import JobCard from '../../components/JobCard';
import SearchBar from '../../components/SearchBar';
import ThemeToggle from '../../components/ThemeToggle';
import styles from './JobFinderStyles';

const JobFinderScreen = () => {
  const { jobs, setJobs } = useJobs();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

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
    <View style={styles.container}>
      <ThemeToggle />
      <SearchBar search={search} setSearch={setSearch} />

      <FlatList
        data={filteredJobs}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => <JobCard job={item} />}
      />
    </View>
  );
};

export default JobFinderScreen;
