import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";

export const JobContext = createContext(null);

export const JobContextProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);

  const { headers, HeaderTypeTwo } = useContext(UserContext);
  const token = localStorage.getItem("token")

  // const ListJob = async () => {
  //   try {
  //     if (token) {
  //       const response = await axios.get("/api/jobs", {
  //         headers: HeaderTypeTwo,
  //       });
  //       setJobs(response.data);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const listCat = async () => {
    try {
      const response = await axios.get("/api/v1/categories", {headers: headers});
      setCategories(response.data)
    } catch (error) {
      console.log(error.message); 
    }
  }

  useEffect(() => {
    // Fetch job data from your API or database here and update the 'jobs' state
    // Example: Fetch jobs from an API
    // ListJob();
    listCat();
  }, [token]);

  const value = { jobs, categories };

  return <JobContext.Provider value={value}> {children} </JobContext.Provider>;
};

export default JobContext;
