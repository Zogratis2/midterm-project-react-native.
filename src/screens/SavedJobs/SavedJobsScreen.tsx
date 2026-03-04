import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { useJobs } from '../../context/JobsContext';
import JobCard from '../../components/JobCard';
import styles from './SavedJobsStyles';
import { useThemeContext } from '../../context/ThemeContext'; 

const ITEMS_PER_PAGE = 5; 

const SavedJobsScreen = () => {
  const { savedJobs } = useJobs();
  const { colors } = useThemeContext(); 

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
        <>
          <FlatList
            data={paginatedSavedJobs} 
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <JobCard job={item} isSaved={true} fromSavedScreen={true} />}
            contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
            style={{ flex: 1 }} // ⭐ Ensure FlatList pushes the footer down
          />
          
          {/* ⭐ Added outside the FlatList */}
          {renderPagination()}
        </>
      )}
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
    borderTopWidth: 1,
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

export default SavedJobsScreen;