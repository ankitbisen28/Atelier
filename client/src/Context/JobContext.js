import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";

export const JobContext = createContext(null);

export const JobContextProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  // console.log(jobs)
  const [categories, setCategories] = useState([]);

  const { headers, HeaderTypeTwo } = useContext(UserContext);
  const token = localStorage.getItem("token")

  const ListJob = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/projects`, {
          headers: HeaderTypeTwo,
        });
        setJobs(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const listCat = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/categories`, {headers: headers});
      setCategories(response.data)
    } catch (error) {
      console.log(error.message); 
    }
  }

  useEffect(() => {
    ListJob();
    listCat();
  }, [token]);

  const value = { jobs, categories };

  return <JobContext.Provider value={value}> {children} </JobContext.Provider>;
};

export default JobContext;
