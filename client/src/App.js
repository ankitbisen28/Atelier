import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Profile } from "./pages/Profile";

import { UserDetail } from "./pages/UserDetail";
import { UserContextProvider } from "./Context/UserContext";
import { JobContextProvider } from "./Context/JobContext";
import { PostJob } from "./pages/PostJob";
import JobList from "./pages/ListJob";
import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <UserContextProvider>
          <JobContextProvider>
            <Navbar />
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
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/userDetail" element={<UserDetail />}></Route>
              <Route path="/postJob" element={<PostJob />}></Route>
              <Route path="/listjobs" element={<JobList />}></Route>
            </Routes>
          </JobContextProvider>
        </UserContextProvider>
      </Router>
    </>
  );
}

export default App;
