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
  fromSavedScreen?: boolean; // ⭐ Tells the card which screen it is on
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

  // ⭐ Smart logic for the Save/Remove button
  let buttonText = 'Save Job';
  let buttonColor = '#007bff'; // Blue
  let handlePress = () => saveJob(job);

  if (fromSavedScreen) {
    // On the Saved Jobs screen -> Show "Remove Job"
    buttonText = 'Remove Job';
    buttonColor = '#dc3545'; // Red
    handlePress = () => removeJob(job.id);
  } else if (isSaved) {
    // On the Finder screen and it's already saved -> Show "Saved"
    buttonText = 'Saved';
    buttonColor = '#6c757d'; // Gray
    handlePress = () => {}; // Do nothing if clicked again
  }

  return (
    <View style={[styles.card, { backgroundColor: bgColor, borderColor: borderColor, borderWidth: 1 }]}>
      <Image source={{ uri: validImageUrl }} style={styles.image} />
      <Text style={[styles.title, { color: textColor }]}>{job.title}</Text>
      <Text style={{ color: textColor }}>{job.company}</Text>
      <Text style={{ color: textColor }}>{job.salary}</Text>

      {/* Save / Remove / Saved Button */}
      <Pressable
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={handlePress}
        disabled={!fromSavedScreen && isSaved} // Disable the button if it just says "Saved"
      >
        <Text style={[styles.buttonText, { color: '#ffffff' }]}>{buttonText}</Text>
      </Pressable>

      {/* Apply Button */}
      <Pressable
        style={[styles.button, { backgroundColor: '#28a745', marginTop: 8 }]}
        onPress={() => navigation.navigate('ApplicationForm', { fromSaved: isSaved })}
      >
        <Text style={[styles.buttonText, { color: '#ffffff' }]}>Apply</Text>
      </Pressable>
    </View>
  );
};

export default JobCard;