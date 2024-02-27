import { Box, Typography, TextField, Button, styled } from "@mui/material";
import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";

import state from "../utils/State.json";
import UserContext from "../Context/UserContext";
import { StateList } from "../components/StateList";
import { userDetailsSchema } from "../Schema";

export const UserDetail = () => {
  const navigate = useNavigate();

  const { HeaderTypeTwo } = useContext(UserContext);

  const initialValues = {
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    post_code: "",
    state: "",
    image: "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: userDetailsSchema,
    onSubmit: async (values, action) => {
      const response = await axios.post("/api/user/profile/create", values, {
        headers: HeaderTypeTwo,
      });
      action.resetForm();
      navigate("/");
      // console.log(response);
    },
  });

  const ErrorTypography = styled(Typography)({
    color: "red",
  });

  return (
    <Box
      mt={15}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography fontSize={30}>Please Fill Your Details</Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="row">
          <Box>
            <TextField
              name="first_name"
              id="firstName"
              style={{ margin: "2rem 1rem 0 0" }}
              label="First Name"
              variant="outlined"
              color="primary"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.first_name && errors.first_name ? (
              <ErrorTypography fontSize={13}>
                {errors.first_name}
              </ErrorTypography>
            ) : null}
          </Box>
          <Box>
            <TextField
              name="last_name"
              style={{ margin: "2rem 1rem 0 0" }}
              label="Last Name"
              variant="outlined"
              color="primary"
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.last_name && errors.last_name ? (
              <ErrorTypography fontSize={13}>
                {errors.last_name}
              </ErrorTypography>
            ) : null}
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box>
            <TextField
              name="phone"
              style={{ margin: "2rem 1rem 0 0" }}
              label="Phone"
              variant="outlined"
              color="primary"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.phone ? (
              <ErrorTypography fontSize={13}>{errors.phone}</ErrorTypography>
            ) : null}
          </Box>
          <Box>
            <TextField
              name="address"
              style={{ margin: "2rem 1rem 0 0" }}
              label="Address"
              variant="outlined"
              color="primary"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.address && errors.address ? (
              <ErrorTypography fontSize={13}>{errors.address}</ErrorTypography>
            ) : null}
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <StateList
            values={values}
            errors={errors}
            state={state}
            handleChange={handleChange}
          />
          <Box>
            <TextField
              name="post_code"
              style={{ margin: "2rem 1rem 0 0" }}
              label="Zip Code"
              variant="outlined"
              color="primary"
              value={values.post_code}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.post_code && errors.post_code ? (
              <ErrorTypography fontSize={13}>
                {errors.post_code}
              </ErrorTypography>
            ) : null}
          </Box>
          <Box>
            <input
              name="image"
              id="image"
              type="file"
              style={{ margin: "2rem 1rem 0 0" }}
              label="Image"
              variant="outlined"
              color="primary"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
              onBlur={handleBlur}
            />
            {touched.image && errors.image ? (
              <ErrorTypography fontSize={13}>{errors.image}</ErrorTypography>
            ) : null}
          </Box>
        </Box>
        <Button
          fullWidth
          type="submit"
          size="large"
          style={{ margin: "2rem 1rem 0 0" }}
          variant="contained"
        >
          Save
        </Button>
      </form>
    </Box>
  );
};
