import React from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import { Job } from '../types/Job';
import { useJobs } from '../context/JobsContext';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../context/ThemeContext';
import styles from './JobCardStyles';

interface Props {
  job: Job;
  isSaved?: boolean;
  fromSavedScreen?: boolean;
}

const JobCard: React.FC<Props> = ({ job, isSaved, fromSavedScreen }) => {
  const { saveJob, removeJob } = useJobs();
  const navigation = useNavigation<any>();
  const themeContext = useThemeContext(); 

  const isDark = themeContext?.isDark || false;
  const colors = themeContext?.colors || {};
  
  const bgColor = colors.card || (isDark ? '#1e1e1e' : '#ffffff');
  const textColor = colors.text || (isDark ? '#ffffff' : '#000000');
  const borderColor = colors.border || (isDark ? '#333333' : '#e0e0e0');

  const validImageUrl = job.image && job.image.startsWith('http') 
    ? job.image 
    : 'https://via.placeholder.com/150';

  let buttonText = 'Save Job';
  let buttonColor = '#007bff'; 
  let handlePress = () => saveJob(job);

  if (fromSavedScreen) {
    buttonText = 'Remove Job';
    buttonColor = '#dc3545'; 
    handlePress = () => {
      Alert.alert(
        'Remove Job',
        'Are you sure you want to remove this job from your saved list?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: () => removeJob(job.id) },
        ]
      );
    };
  } else if (isSaved) {
    buttonText = 'Saved';
    buttonColor = '#6c757d'; 
    handlePress = () => {}; 
  }

  return (
    // ⭐ CHANGED from <View> to <Pressable> so the whole card is tappable
    <Pressable 
      style={[styles.card, { backgroundColor: bgColor, borderColor: borderColor, borderWidth: 1 }]}
      onPress={() => navigation.navigate('JobDetails', { job, isSaved, fromSavedScreen })}
    >
      <Image source={{ uri: validImageUrl }} style={styles.image} />
      <Text style={[styles.title, { color: textColor }]}>{job.title}</Text>
      <Text style={{ color: textColor }}>{job.company}</Text>
      <Text style={{ color: textColor }}>{job.salary}</Text>

      {/* Buttons inside the card */}
      <View style={{ marginTop: 10 }}>
        <Pressable
          style={[styles.button, { backgroundColor: buttonColor }]}
          onPress={handlePress}
          disabled={!fromSavedScreen && isSaved}
        >
          <Text style={[styles.buttonText, { color: '#ffffff' }]}>{buttonText}</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: '#28a745', marginTop: 8 }]}
          onPress={() => navigation.navigate('ApplicationForm', { fromSaved: isSaved })}
        >
          <Text style={[styles.buttonText, { color: '#ffffff' }]}>Apply</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default JobCard;