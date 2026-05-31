import {
  createContext,
  useEffect,
  useState,
  useContext
} from "react";

import {
  AuthContext
} from "./AuthContext";

export const JobContext =
  createContext();

function JobProvider({
  children
}) {

  const { user } =
    useContext(AuthContext);

  const [jobs, setJobs] =
    useState([]);

  const userEmail =
    user?.email;

  const userKey =
    userEmail
      ? `jobs_${userEmail}`
      : null;

  /* LOAD JOBS WHEN USER CHANGES */

  useEffect(() => {

    if (!userKey) {

      setJobs([]);

      return;
    }

    const savedJobs =
      JSON.parse(
        localStorage.getItem(
          userKey
        )
      ) || [];

    setJobs(savedJobs);

  }, [userKey]);

  /* SAVE JOBS */

  useEffect(() => {

    if (!userKey) return;

    localStorage.setItem(
      userKey,
      JSON.stringify(jobs)
    );

  }, [jobs, userKey]);

  /* ADD */

  const addJob = (job) => {

    const newJob = {
      ...job,
      id:
        job.id || Date.now()
    };

    setJobs((prev) => [
      ...prev,
      newJob
    ]);
  };

  /* UPDATE */

  const updateJob = (
    index,
    updatedJob
  ) => {

    setJobs((prev) => {

      const updated =
        [...prev];

      updated[index] =
        {
          ...updatedJob,
          id:
            updated[index]?.id ||
            Date.now()
        };

      return updated;
    });
  };

  /* DELETE */

  const deleteJob = (index) => {

    setJobs((prev) =>
      prev.filter(
        (_, i) =>
          i !== index
      )
    );
  };

  return (

    <JobContext.Provider
      value={{
        jobs,
        setJobs,
        addJob,
        updateJob,
        deleteJob,
        userKey
      }}
    >

      {children}

    </JobContext.Provider>
  );
}

export default JobProvider;