import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../../context/ThemeContext';
import styles from './JobDetailsStyles'; // ⭐ Imported your new styles here!

const JobDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { colors } = useThemeContext();

  // Get the job data that we passed from the JobCard
  const { job, isSaved } = route.params; 

  const validImageUrl = job.image && job.image.startsWith('http') 
    ? job.image 
    : 'https://via.placeholder.com/150';

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: validImageUrl }} style={styles.headerImage} />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{job.title}</Text>
        <Text style={[styles.company, { color: colors.primary || '#007bff' }]}>{job.company}</Text>
        
        <View style={[styles.divider, { backgroundColor: colors.border || '#e0e0e0' }]} />

        {/* Adjust these fields based on what your API actually returns */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Job Details</Text>
        <Text style={[styles.detailText, { color: colors.text }]}>📍 Location: {job.location || 'Remote'}</Text>
        <Text style={[styles.detailText, { color: colors.text }]}>💰 Salary: {job.salary || 'Not specified'}</Text>
        <Text style={[styles.detailText, { color: colors.text }]}>📅 Type: {job.type || 'Full-time'}</Text>

        <View style={[styles.divider, { backgroundColor: colors.border || '#e0e0e0' }]} />

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Job Description</Text>
        <Text style={[styles.description, { color: colors.text }]}>
          {job.description || 'No detailed description available for this job.'}
        </Text>

        {/* Big Apply Button at the bottom */}
        <Pressable
          style={[styles.applyButton, { backgroundColor: '#28a745' }]}
          onPress={() => navigation.navigate('ApplicationForm', { fromSaved: isSaved })}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default JobDetailsScreen;