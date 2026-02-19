import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Job } from '../types/Job';
import { useJobs } from '../context/JobsContext';
import { useNavigation } from '@react-navigation/native';
import styles from './JobCardStyles';

interface Props {
  job: Job;
  isSaved?: boolean;
}

const JobCard: React.FC<Props> = ({ job, isSaved }) => {
  const { saveJob, removeJob } = useJobs();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.card}>
      <Image source={{ uri: job.image }} style={styles.image} />
      <Text style={styles.title}>{job.title}</Text>
      <Text>{job.company}</Text>
      <Text>{job.salary}</Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          isSaved ? removeJob(job.id) : saveJob(job)
        }
      >
        <Text style={styles.buttonText}>
          {isSaved ? 'Remove Job' : 'Save Job'}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: '#28a745' }]}
        onPress={() =>
          navigation.navigate('ApplicationForm', {
            fromSaved: isSaved,
          })
        }
      >
        <Text style={styles.buttonText}>Apply</Text>
      </Pressable>
    </View>
  );
};

export default JobCard;
