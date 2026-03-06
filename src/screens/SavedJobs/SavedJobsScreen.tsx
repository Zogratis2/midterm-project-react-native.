import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useJobs } from '../../context/JobsContext';
import JobCard from '../../components/JobCard';
import styles from './SavedJobsStyles';
import { useThemeContext } from '../../context/ThemeContext'; 

const ITEMS_PER_PAGE = 5; 

const SavedJobsScreen = () => {
  const { savedJobs } = useJobs();
  const { colors } = useThemeContext(); 
  const navigation = useNavigation<any>();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(savedJobs.length / ITEMS_PER_PAGE);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [savedJobs.length, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const paginatedSavedJobs = savedJobs.slice(startIndex, endIndex);

  const renderPagination = () => {
    if (savedJobs.length <= ITEMS_PER_PAGE) return null; 

    return (
      <View style={[localStyles.paginationContainer, { backgroundColor: colors.background }]}>
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
      
      {/* Main Content Area */}
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
          data={paginatedSavedJobs} 
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <JobCard job={item} isSaved={true} fromSavedScreen={true} />}
          contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
          style={{ flex: 1 }} 
          // ⭐ Pagination is back inside the FlatList so it scrolls naturally
          ListFooterComponent={renderPagination}
        />
      )}

      {/* ⭐ Bottom Navigation Footer (Stays fixed at the very bottom) */}
      <View style={[localStyles.navFooter, { backgroundColor: colors.card, borderTopColor: colors.border || '#e0e0e0' }]}>
        <Pressable style={localStyles.navButton} onPress={() => navigation.navigate('JobFinder')}>
          <Text style={{ fontSize: 22 }}>🔍</Text>
          <Text style={[localStyles.navText, { color: colors.text }]}>Jobs</Text>
        </Pressable>
        
        <Pressable style={localStyles.navButton} onPress={() => navigation.navigate('SavedJobs')}>
          <Text style={{ fontSize: 22 }}>⭐</Text>
          <Text style={[localStyles.navText, { color: '#007bff' }]}>Saved</Text>
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
    marginTop: 10,
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

export default SavedJobsScreen;