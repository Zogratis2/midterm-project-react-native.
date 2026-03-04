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
  const { colors, isDark } = useThemeContext(); 

  // Ensure there is always a valid URI for the image
  const validImageUrl = job.image && job.image.startsWith('http') 
    ? job.image 
    : 'https://via.placeholder.com/150';

  return (
    <View
      style={[
        styles.card,
        {
          // Safely fallback to white/black if colors object is undefined
          backgroundColor: colors?.card || (isDark ? '#1e1e1e' : '#ffffff'),
          borderColor: isDark ? '#fff' : '#000', 
          borderWidth: 1,
        },
      ]}
    >
      <Image source={{ uri: validImageUrl }} style={styles.image} />

      <Text style={[styles.title, { color: colors?.text || (isDark ? '#fff' : '#000') }]}>
        {job.title}
      </Text>
      
      <Text style={{ color: colors?.text || (isDark ? '#fff' : '#000') }}>
        {job.company}
      </Text>
      
      <Text style={{ color: colors?.text || (isDark ? '#aaa' : '#555') }}>
        {job.salary}
      </Text>

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
        <Text style={[styles.buttonText, { color: '#fff' }]}>
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
        <Text style={[styles.buttonText, { color: '#fff' }]}>Apply</Text>
      </Pressable>
    </View>
  );
};

export default JobCard;