import React from "react";
import { Box, Typography, Grid, TextField, styled, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema } from "../Schema";
import { useFormik } from "formik";
import axios from "axios";
import { countries } from '../utils/countries';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

export const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    name: '',
    password: '',
    phone: '',
    street: '',
    apartment: '',
    zip: '',
    city:'',
    country: '',
  };
  
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/users/register`, values);
        localStorage.setItem("token", response.data.token);
        console.log(response.data)
        action.resetForm();
        navigate("/");
      } catch (error) {
        alert("please enter right details");
        console.error(error);
      }
    },
  });
  
  const ErrorTypography = styled(Typography)({
    color: "red",
  });

  return (
    <Box width={"60%"} padding={7} margin={"auto"}>
      <Box xs={6} margin={"10px 10px"} display={"flex"} flexDirection={"column"} alignItems={"center"}>

      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
      </Box>
        <Typography textAlign={"center"} margin={"10px 10px"} component="h1" variant="h5">
          Register
        </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {touched.name && errors.name ? (
              <ErrorTypography fontSize={13}>{errors.name}</ErrorTypography>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {touched.email && errors.email ? (
              <ErrorTypography fontSize={13}>{errors.email}</ErrorTypography>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {touched.password && errors.password ? (
              <ErrorTypography fontSize={13}>{errors.password}</ErrorTypography>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="phone"
              label="Phone"
              value={values.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {touched.phone && errors.phone ? (
              <ErrorTypography fontSize={13}>{errors.phon}</ErrorTypography>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="street"
              label="Street"
              value={values.street}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {touched.street && errors.street ? (
              <ErrorTypography fontSize={13}>{errors.street}</ErrorTypography>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="apartment"
              label="Apartment"
              value={values.apartment}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {touched.apartment && errors.apartment ? (
              <ErrorTypography fontSize={13}>{errors.apartment}</ErrorTypography>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="zip"
              label="ZIP"
              value={values.zip}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {touched.zip && errors.zip ? (
              <ErrorTypography fontSize={13}>{errors.zip}</ErrorTypography>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="city"
              label="City"
              value={values.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {touched.city && errors.city ? (
              <ErrorTypography fontSize={13}>{errors.city}</ErrorTypography>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="country">Country</InputLabel>
              <Select defaultValue="" name="country" onChange={handleChange} label="Country" value={values.country}>
                {countries.map((item) => {
                  return (
                    <MenuItem key={item.code} value={item.name}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {touched.country && errors.country ? (
              <ErrorTypography fontSize={13}>{errors.country}</ErrorTypography>
            ) : null}
          </Grid>
        </Grid>
        <Button sx={{mt:3}} fullWidth type="submit" variant="contained" color="primary">
          Register
        </Button>
        <Grid container>
              <Grid item mt={2}>
                <Link to="/login" variant="body2">
                  {"Already have an account? Login Up"}
                </Link>
              </Grid>
            </Grid>
      </form>
    </Box>

  );
};
