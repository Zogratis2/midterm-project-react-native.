import React, { createContext, useState, useContext } from 'react';
import { Job } from '../types/Job';

interface JobsContextType {
  jobs: Job[];
  savedJobs: Job[];
  setJobs: (jobs: Job[]) => void;
  saveJob: (job: Job) => void;
  removeJob: (id: string) => void;
}

const JobsContext = createContext<JobsContextType>({} as JobsContextType);

export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const saveJob = (job: Job) => {
    if (!savedJobs.find(j => j.id === job.id)) {
      setSavedJobs(prev => [...prev, job]);
    }
  };

  const removeJob = (id: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <JobsContext.Provider value={{ jobs, savedJobs, setJobs, saveJob, removeJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);
