import React from "react";
import { Box, Typography, TextField, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../Schema";
import { useFormik } from "formik";
import axios from "axios";
import { useAppStore } from "../utils/store";

export const Login = () => {
  const navigate = useNavigate();
  const { cart } = useAppStore((state) => ({ cart: state.cart }))

  console.log(cart)

  const initialValues = {
    email: "",
    password: "",
  };

  const ErrorTypography = styled(Typography)({
    color: "red",
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post('/api/login', values);
          const token = response.data.token; // Assuming the server returns a token upon successful login
          localStorage.setItem('token', token);
          navigate("/");
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    });

  return (
    <Box width="100%" height="100vh" display="flex" justifyContent="center">
      <Box
        width="300px"
        height="400px"
        sx={{
          border: "2px solid gray",
          marginTop: "5rem",
          borderRadius: "10px",
        }}
      >
        <Typography
          color="secondary"
          textAlign="center"
          fontWeight="bold"
          variant="h5"
          sx={{ marginTop: "4rem" }}
        >
          Login
        </Typography>
        <Box
          width="250px"
          height="300px"
          display="flex"
          flexDirection="column"
          alignContent="center"
          margin="auto"
        >
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ marginTop: "3rem" }}
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? (
              <ErrorTypography fontSize={13}>{errors.email}</ErrorTypography>
            ) : null}
            <TextField
              sx={{ marginTop: "1rem" }}
              label="password"
              variant="outlined"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password ? (
              <ErrorTypography fontSize={13}>{errors.password}</ErrorTypography>
            ) : null}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ marginTop: "1rem" }}
            >
              Login
            </Button>
          </form>
          <Button color="secondary" variant="text" onClick={() => navigate("/register")}>
            Don't have Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
};