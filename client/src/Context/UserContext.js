import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppStore } from "../utils/store";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userDetails, setuserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || []
  );
  const navigate = useNavigate();

  const { token, setToken, setUserId } = useAppStore((state) => ({ token: state.token, setToken: state.setToken, setUserId: state.setUserId }));

  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  };

  const HeaderTypeTwo = {
    "Content-Type": "multipart/form-data",
    Authorization: `bearer ${token}`,
  };


  const logout = () => {
    setToken(null)
    setUserId(null)
    navigate("/login");
    toast.success("Log out user")
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
    HeaderTypeTwo,
    setuserDetails,
    token
  };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};

export default UserContext;
