import React, { createContext, useState, useContext } from 'react';
import { Job } from '../types/Job';

interface JobsContextType {
  jobs: Job[];
  savedJobs: Job[];
  setJobs: (jobs: Job[]) => void;
  saveJob: (job: Job) => void;
  removeJob: (id: string) => void;
  appliedJobs: string[]; // ⭐ Added this
  markJobAsApplied: (id: string) => void; // ⭐ Added this
}

const JobsContext = createContext<JobsContextType>({} as JobsContextType);

export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]); // ⭐ Added this

  const saveJob = (job: Job) => {
    if (!savedJobs.find(j => j.id === job.id)) {
      setSavedJobs(prev => [...prev, job]);
    }
  };

  const removeJob = (id: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  // ⭐ Added this function
  const markJobAsApplied = (id: string) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs(prev => [...prev, id]);
    }
  };

  return (
    // ⭐ Added appliedJobs and markJobAsApplied to the provider value
    <JobsContext.Provider value={{ jobs, savedJobs, setJobs, saveJob, removeJob, appliedJobs, markJobAsApplied }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);