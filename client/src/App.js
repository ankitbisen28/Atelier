import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Profile } from "./pages/Profile";
import { UserContextProvider } from "./Context/UserContext";
import { JobContextProvider } from "./Context/JobContext";
import { PostProject } from "./pages/PostProject";
import JobList from "./pages/ListJob";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import ProjectPage from "./pages/ProjectPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

function App() {
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
                    <Profile />
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
