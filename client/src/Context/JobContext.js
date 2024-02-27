import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useAuthHeader } from "react-auth-kit";

export const JobContext = createContext(null);

export const JobContextProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  const { HeaderTypeTwo } = useContext(UserContext);
  const authHeader = useAuthHeader();
  // console.log(authHeader());

  const ListJob = async () => {
    try {
      if (authHeader()) {
        const response = await axios.get("/api/jobs", {
          headers: HeaderTypeTwo,
        });
        setJobs(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Fetch job data from your API or database here and update the 'jobs' state
    // Example: Fetch jobs from an API
    ListJob();
  }, [authHeader()]);

  const value = { jobs };

  return <JobContext.Provider value={value}> {children} </JobContext.Provider>;
};

export default JobContext;
