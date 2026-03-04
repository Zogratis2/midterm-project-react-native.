import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, RefreshControl, Pressable, Text, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchJobsFromAPI } from '../../api/jobsApi';
import { useJobs } from '../../context/JobsContext';
import JobCard from '../../components/JobCard';
import SearchBar from '../../components/SearchBar';
import styles from './JobFinderStyles';
import { useThemeContext } from '../../context/ThemeContext';

const ITEMS_PER_PAGE = 5;

const JobFinderScreen = () => {
  const { jobs, setJobs, savedJobs } = useJobs();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { colors, isDark } = useThemeContext();
  const navigation = useNavigation<any>();

  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1);
    setRefreshing(false);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const renderPagination = () => {
    if (filteredJobs.length === 0) return null;

    return (
      // ⭐ Fixed Footer Styling
      <View style={[localStyles.paginationContainer, { backgroundColor: colors.background, borderTopColor: colors.border || '#e0e0e0' }]}>
        <Pressable 
          style={[localStyles.pageButton, { backgroundColor: currentPage === 1 ? '#cccccc' : '#007bff' }]}
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(prev => prev - 1)}
        >
          <Text style={localStyles.pageButtonText}>Previous</Text>
        </Pressable>

        <Text style={{ color: colors.text, fontWeight: 'bold' }}>
          Page {currentPage} of {totalPages}
        </Text>

        <Pressable 
          style={[localStyles.pageButton, { backgroundColor: currentPage === totalPages ? '#cccccc' : '#007bff' }]}
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(prev => prev + 1)}
        >
          <Text style={localStyles.pageButtonText}>Next</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, flex: 1 }]}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholderTextColor={colors.text}
        inputBackgroundColor={colors.card}
        inputTextColor={colors.text}
      />

      <Pressable
        style={{
          backgroundColor: '#007bff',
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
        data={paginatedJobs}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#007bff']} />
        }
        renderItem={({ item }) => {
          const isAlreadySaved = savedJobs?.some((savedJob) => savedJob.id === item.id);
          return <JobCard job={item} isSaved={isAlreadySaved} />;
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ flex: 1 }} // ⭐ Ensure FlatList takes available space, pushing pagination down
        // ListFooterComponent={renderPagination} <-- ⭐ REMOVED from here
      />

      {/* ⭐ ADDED here so it sticks to the bottom! */}
      {renderPagination()} 
    </View>
  );
};

const localStyles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 15, 
    paddingHorizontal: 20,
    borderTopWidth: 1, // Adds a visual break from the scrolling list
  },
  pageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  pageButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  }
});

export default JobFinderScreen;