import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Job } from '../types/Job';
import { useJobs } from '../context/JobsContext';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../context/ThemeContext';
import styles from './JobCardStyles';

interface Props {
  job: Job;
  isSaved?: boolean;
}

const JobCard: React.FC<Props> = ({ job, isSaved }) => {
  const { saveJob, removeJob } = useJobs();
  const navigation = useNavigation<any>();
  const themeContext = useThemeContext(); 

  // Safely grab colors, guaranteeing strings instead of undefined
  const isDark = themeContext?.isDark || false;
  const colors = themeContext?.colors || {};
  
  const bgColor = colors.card || (isDark ? '#1e1e1e' : '#ffffff');
  const textColor = colors.text || (isDark ? '#ffffff' : '#000000');
  const borderColor = colors.border || (isDark ? '#333333' : '#e0e0e0');

  // Ensure there is always a valid URI for the image
  const validImageUrl = job.image && job.image.startsWith('http') 
    ? job.image 
    : 'https://via.placeholder.com/150';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: bgColor,
          borderColor: borderColor, 
          borderWidth: 1,
        },
      ]}
    >
      <Image source={{ uri: validImageUrl }} style={styles.image} />

      <Text style={[styles.title, { color: textColor }]}>{job.title}</Text>
      <Text style={{ color: textColor }}>{job.company}</Text>
      <Text style={{ color: textColor }}>{job.salary}</Text>

      {/* Save / Remove Button */}
      <Pressable
        style={[
          styles.button,
          { backgroundColor: isSaved ? '#dc3545' : '#007bff' },
        ]}
        onPress={() => {
          if (isSaved) removeJob(job.id);
          else {
            saveJob(job);
            navigation.navigate('SavedJobs');
          }
        }}
      >
        <Text style={[styles.buttonText, { color: '#ffffff' }]}>
          {isSaved ? 'Remove Job' : 'Save Job'}
        </Text>
      </Pressable>

      {/* Apply Button */}
      <Pressable
        style={[styles.button, { backgroundColor: '#28a745', marginTop: 8 }]}
        onPress={() =>
          navigation.navigate('ApplicationForm', { fromSaved: isSaved })
        }
      >
        <Text style={[styles.buttonText, { color: '#ffffff' }]}>Apply</Text>
      </Pressable>
    </View>
  );
};

export default JobCard;