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

      {/* ⭐ The old blue View Saved Jobs button was removed from here */}

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
        style={{ flex: 1 }} 
        // ⭐ Pagination is back inside the FlatList so it scrolls naturally
        ListFooterComponent={renderPagination} 
      />

      {/* ⭐ Bottom Navigation Footer (Stays fixed at the very bottom) */}
      <View style={[localStyles.navFooter, { backgroundColor: colors.card, borderTopColor: colors.border || '#e0e0e0' }]}>
        <Pressable style={localStyles.navButton} onPress={() => navigation.navigate('JobFinder')}>
          <Text style={{ fontSize: 22 }}>🔍</Text>
          <Text style={[localStyles.navText, { color: '#007bff' }]}>Jobs</Text>
        </Pressable>
        
        <Pressable style={localStyles.navButton} onPress={() => navigation.navigate('SavedJobs')}>
          <Text style={{ fontSize: 22 }}>⭐</Text>
          <Text style={[localStyles.navText, { color: colors.text }]}>Saved</Text>
        </Pressable>
      </View>

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
    marginTop: 10, // Added a little margin so it doesn't touch the last card
  },
  pageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  pageButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  navFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: 20, 
    borderTopWidth: 1,
  },
  navButton: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  }
});

export default JobFinderScreen;