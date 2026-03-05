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

      // ⭐ 1. Grab the raw description first
      const rawDescription = job.description || job.summary || job.content || '';
      
      // ⭐ 2. Clean it up! This removes all HTML tags and fixes weird symbols like &nbsp;
      const cleanDescription = rawDescription
        .replace(/<[^>]*>?/gm, '\n') // Replaces HTML tags with a line break to keep some spacing
        .replace(/\n\s*\n/g, '\n\n') // Cleans up giant empty gaps
        .replace(/&nbsp;/g, ' ')     // Fixes weird HTML spaces
        .replace(/&amp;/g, '&')      // Fixes ampersands (&)
        .replace(/&quot;/g, '"')     // Fixes quotes
        .replace(/&#39;/g, "'")      // Fixes apostrophes
        .trim();                     // Removes extra spaces at the very beginning or end

      return {
        id: job.guid || uuid.v4().toString(),
        title: job.title || 'No Title',
        company: job.companyName || 'Unknown Company',
        salary: formattedSalary,
        location: formattedLocation,
        image: job.companyLogo || 'https://via.placeholder.com/150',
        description: cleanDescription, // ⭐ 3. Pass the squeaky-clean description to your app!
        type: job.jobType || job.type || 'Full-time',
      };
    });
  } catch (error) {
    console.log('API Error:', error);
    return [];
  }
};