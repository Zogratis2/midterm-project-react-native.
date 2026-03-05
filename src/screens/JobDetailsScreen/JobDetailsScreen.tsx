import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../../context/ThemeContext'; // Ensure this path is correct for your folders
import { useJobs } from '../../context/JobsContext'; // Ensure this path is correct for your folders
import styles from './JobDetailsStyles'; 

const JobDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { colors } = useThemeContext();
  
  // Get appliedJobs from context
  const { appliedJobs } = useJobs();

  const { job, isSaved } = route.params; 

  const validImageUrl = job.image && job.image.startsWith('http') 
    ? job.image 
    : 'https://via.placeholder.com/150';

  // Check if applied
  const hasApplied = appliedJobs?.includes(job.id);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: validImageUrl }} style={styles.headerImage} />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{job.title}</Text>
        <Text style={[styles.company, { color: colors.primary || '#007bff' }]}>{job.company}</Text>
        
        <View style={[styles.divider, { backgroundColor: colors.border || '#e0e0e0' }]} />

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Job Details</Text>
        <Text style={[styles.detailText, { color: colors.text }]}>📍 Location: {job.location || 'Remote'}</Text>
        <Text style={[styles.detailText, { color: colors.text }]}>💰 Salary: {job.salary || 'Not specified'}</Text>
        <Text style={[styles.detailText, { color: colors.text }]}>📅 Type: {job.type || 'Full-time'}</Text>

        <View style={[styles.divider, { backgroundColor: colors.border || '#e0e0e0' }]} />

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Job Description</Text>
        <Text style={[styles.description, { color: colors.text }]}>
          {job.description || 'No detailed description available for this job.'}
        </Text>

        {/* Big Apply Button (Fades out and becomes unclickable if applied) */}
        <Pressable
          style={[
            styles.applyButton, 
            { 
              backgroundColor: hasApplied ? '#6c757d' : '#28a745',
              opacity: hasApplied ? 0.6 : 1 // Fades it out
            }
          ]}
          onPress={() => navigation.navigate('ApplicationForm', { job, fromSaved: isSaved })}
          disabled={hasApplied} // Makes it unclickable
        >
          <Text style={styles.applyButtonText}>
            {hasApplied ? 'Successfully Applied' : 'Apply Now'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default JobDetailsScreen;