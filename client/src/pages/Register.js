import React from "react";
import { Box, Typography, TextField, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import UserContext from "../Context/UserContext";
import { registerSchema } from "../Schema";
import { useFormik } from "formik";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

export const Register = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const initialValues = {
    email: "",
    password: "",
    confirm_password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post("/api/register", values);
          signIn({
            token: response.data.token,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: { email: response.data.email },
          });
          action.resetForm();
          // Redirect user to HomePage
          navigate("/userDetail");
        } catch (error) {
          alert("please enter right details");
          console.error(error);
        }
      },
    });

  const ErrorTypography = styled(Typography)({
    color: "red",
  });

  // const { register, setEmail, setPassword, password, email, confirmPassword, setConfirmPassword } = useContext(UserContext);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   register();
  // };

  return (
    <Box width="100%" height="100vh" display="flex" justifyContent="center">
      <Box
        width="350px"
        height="500px"
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
          sx={{ marginTop: "2rem" }}
        >
          Register
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
              sx={{ marginTop: "2rem" }}
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
            <TextField
              sx={{ marginTop: "1rem" }}
              label="confirm password"
              variant="outlined"
              type="password"
              name="confirm_password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.confirm_password && errors.confirm_password ? (
              <ErrorTypography fontSize={13}>
                {errors.confirm_password}
              </ErrorTypography>
            ) : null}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ marginTop: "1rem" }}
            >
              Make a Account
            </Button>
            <Button color="secondary" fullWidth variant="text" onClick={() => navigate("/login")}>
              Alredy have a Account
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
