import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import Register from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Profile } from "./pages/Profile";
import { UserContextProvider, UserContext } from "./Context/UserContext";
import { JobContextProvider } from "./Context/JobContext";
import { PostProject } from "./pages/PostProject";
import JobList from "./pages/ListJob";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import ProjectPage from "./pages/ProjectPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { useAppStore } from '../src/utils/store';
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [consumerProjects, setConsumerProjects] = useState([]);
  const [appliedProject, setAppliedProject] = useState([]);
  const { userId, token, setProfile, profile } = useAppStore((state) => ({ userId: state.userId, token: state.token, setProfile: state.setProfile, profile: state.profile }));

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/users/${userId}`, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
      setProfile(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };


  const getConsumerProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/projects/consumer/${userId}`, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
      setConsumerProjects(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }

  const appliedJob = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/projects/applied-projects`, { userId: userId }, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
      setAppliedProject(response.data)
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    getUserDetails();
    getConsumerProjects();
    appliedJob();
  }, [token]);

  return (
    <>
      <Router>
        <UserContextProvider>
          <JobContextProvider>
            <Navbar />
            <ToastContainer />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/about" element={<About />}></Route>
              <Route
                path="/user/:id"
                element={
                  <ProtectedRoute>
                    <Profile consumerProjects={consumerProjects} appliedProject={appliedProject} />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <ProjectPage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/post-project" element={<PostProject />}></Route>
              <Route path="/list-projects" element={<JobList />}></Route>
            </Routes>
          </JobContextProvider>
        </UserContextProvider>
      </Router>
    </>
  );
}

export default App;
