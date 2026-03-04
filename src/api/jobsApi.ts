import uuid from 'react-native-uuid';
import { Job } from '../types/Job';

export const fetchJobsFromAPI = async (): Promise<Job[]> => {
  try {
    const response = await fetch('https://empllo.com/api/v1');
    const data = await response.json();

    if (!data?.jobs) return [];

    return data.jobs.map((job: any) => {
      // Create a nice salary string based on min/max and currency
      let formattedSalary = 'Not specified';
      if (job.minSalary && job.maxSalary) {
        formattedSalary = `${job.currency || ''} ${job.minSalary} - ${job.maxSalary}`;
      } else if (job.minSalary) {
        formattedSalary = `${job.currency || ''} ${job.minSalary}+`;
      }

      // Ensure location is extracted properly from the array
      const formattedLocation = Array.isArray(job.locations) && job.locations.length > 0 
        ? job.locations.join(', ') 
        : 'Unknown Location';

      return {
        id: job.guid || uuid.v4().toString(),
        title: job.title || 'No Title',
        company: job.companyName || 'Unknown Company',
        salary: formattedSalary,
        location: formattedLocation,
        image: job.companyLogo || 'https://via.placeholder.com/150',
      };
    });
  } catch (error) {
    console.log('API Error:', error);
    return [];
  }
};