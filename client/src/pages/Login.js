import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { loginSchema } from "../Schema";
import { useAppStore } from "../utils/store";
import { toast } from 'react-toastify'

export const Login = () => {
  const navigate = useNavigate();
  const { token, setToken, setUserId } = useAppStore((state) => ({ cart: state.cart, token: state.token, setToken: state.setToken, setUserId: state.setUserId }));

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URI}/api/v1/users/login`,
            values
          );
          setToken(response.data.token);
          setUserId(response.data.user)
          toast.success(`Logged in`);
        } catch (error) {
          toast.error(`Login failed: ${error.response.data}`);
        }
      },
    });

  useEffect(() => {
    if (token !== null) {
      navigate('/');
    }
  }, [token])

  return (<>
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <div className="flex flex-col items-center">
          <div className="m-4 p-2 bg-gray-200 rounded-full">
            <svg
              className="h-12 w-12 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="mt-4">
            <Link
              to="/register"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};
