import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userDetails, setuserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || []
  );
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();

  // console.log(userDetails);
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  };

  const HeaderTypeTwo = {
    "Content-Type": "multipart/form-data",
    Authorization: `bearer ${token}`,
  };

  const UserImage = async () => {
    try {
      if (userDetails) {
        const imagePath = userDetails[0].userProfile[0].image;
        const profileImage = await axios.get(`/api/user/image/${imagePath}`, {
          headers: headers,
          responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([profileImage.data]));
        setProfile(url);
      }
    } catch (error) {
      console.error("Error fetching user Image:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      if (token) {
        const response = await axios.get("/api/user/profiles", {
          headers: headers,
        });
        localStorage.setItem("userDetails", JSON.stringify(response.data));
        setuserDetails(JSON.parse(localStorage.getItem("userDetails")));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    // UserImage();
    // eslint-disable-next-line
  }, [token, userDetails]);

  useEffect(() => {
    UserImage();
    // eslint-disable-next-line
  }, [profile]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    localStorage.removeItem("userDetails");
  };

  const value = {
    logout,
    setEmail,
    setPassword,
    email,
    password,
    confirmPassword,
    setConfirmPassword,
    headers,
    userDetails,
    profile,
    HeaderTypeTwo,
  };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};

export default UserContext;
