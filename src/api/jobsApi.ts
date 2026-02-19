import uuid from 'react-native-uuid';
import { Job } from '../types/Job';

export const fetchJobsFromAPI = async (): Promise<Job[]> => {
  try {
    const response = await fetch('https://empllo.com/api/v1');
    const data = await response.json();

    if (!data?.jobs) return [];

    return data.jobs.map((job: any) => ({
      id: uuid.v4().toString(),
      title: job.title || 'No Title',
      company: job.company || 'Unknown Company',
      salary: job.salary || 'Not specified',
      location: job.location || 'Unknown',
      image: job.company_logo || 'https://via.placeholder.com/150',
    }));
  } catch (error) {
    console.log('API Error:', error);
    return [];
  }
};
