import React, { useContext } from "react";
import { Box, Typography, TextField, Button, styled } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "../Schema";
import { useFormik } from "formik";
import axios from "axios";
import { useAppStore } from "../utils/store";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';

export const Login = () => {
  const navigate = useNavigate();
  const { cart } = useAppStore((state) => ({ cart: state.cart }))

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
          const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/users/login`, values);
          localStorage.setItem("userId",response.data.user)
          const token = response.data.token; // Assuming the server returns a token upon successful login
          localStorage.setItem('token', token);
          navigate("/");
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};