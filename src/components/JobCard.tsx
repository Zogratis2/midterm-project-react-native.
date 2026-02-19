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
  const { colors, isDark } = useThemeContext(); // ✅ get isDark

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: isDark ? '#fff' : '#000', // ✅ white in dark mode, black in light
          borderWidth: 1,
        },
      ]}
    >
      <Image source={{ uri: job.image }} style={styles.image} />

      <Text style={[styles.title, { color: colors.text }]}>{job.title}</Text>
      <Text style={{ color: colors.text }}>{job.company}</Text>
      <Text style={{ color: colors.text }}>{job.salary}</Text>

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
        style={[styles.button, { backgroundColor: '#28a745' }]}
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
