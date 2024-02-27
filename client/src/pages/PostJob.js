import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  styled,
  Alert,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Cloths from "../utils/Cloths.json";
import { ClothList } from "../components/ClothList";
import { Input } from "@mui/material";
import axios from "axios";
import UserContext from "../Context/UserContext";
import state from "../utils/State.json";
import { StateList } from "../components/StateList";
import { useFormik } from "formik";
import { postJobSchema } from "../Schema";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export const PostJob = () => {
  const { headers } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
    phone_num: "",
    address: "",
    type_clothing: "",
    post_code: "",
    budget: "",
    post_description: "",
    state: "",
    email: "",
    image: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: postJobSchema,
      onSubmit: async (values, action) => {
        await axios.post("/api/post/job", values, {
          headers: headers,
        });
        // console.log(response);
        action.resetForm();
        setOpen(true);
      },
    });

  // console.log(errors);

  const ErrorTypography = styled(Typography)({
    color: "red",
  });

  const cloth = Cloths.clothes;

  return (
    <Container>
      <Typography marginTop="6rem" textAlign="center" variant="h4">
        Post job
      </Typography>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Your Job Posted
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Box>
            <TextField
              name="first_name"
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
          <Box>
            <TextField
              name="email"
              style={{ margin: "2rem 1rem 0 0" }}
              label="email"
              type="email"
              variant="outlined"
              color="primary"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? (
              <ErrorTypography fontSize={13}>{errors.email}</ErrorTypography>
            ) : null}
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Box>
            <TextField
              name="phone_num"
              style={{ margin: "2rem 1rem 0 0" }}
              label="Phone"
              variant="outlined"
              color="primary"
              onChange={handleChange}
              value={values.phone_num}
              onBlur={handleBlur}
            />
            {touched.phone_num && errors.phone_num ? (
              <ErrorTypography fontSize={13}>
                {errors.phone_num}
              </ErrorTypography>
            ) : null}
          </Box>
          <Box>
            <TextField
              name="budget"
              style={{ margin: "2rem 1rem 0 0" }}
              label="Budget"
              variant="outlined"
              color="primary"
              onChange={handleChange}
              value={values.budget}
              onBlur={handleBlur}
            />
            {touched.budget && errors.budget ? (
              <ErrorTypography fontSize={13}>{errors.budget}</ErrorTypography>
            ) : null}
          </Box>
          <ClothList
            errors={errors}
            cloth={cloth}
            values={values}
            handleChange={handleChange}
          />
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Box>
            <Input
              sx={{ width: "17rem", margin: "2rem 1rem 0 0" }}
              type="file"
              name="image"
              onChange={handleChange}
              value={values.image}
              onBlur={handleBlur}
            />
            {touched.image && errors.image ? (
              <ErrorTypography fontSize={13}>{errors.image}</ErrorTypography>
            ) : null}
          </Box>
          <Box>
            <TextField
              name="address"
              style={{ margin: "2rem 1rem 0 0" }}
              label="Address"
              variant="outlined"
              color="primary"
              onChange={handleChange}
              value={values.address}
              onBlur={handleBlur}
            />
            {touched.address && errors.address ? (
              <ErrorTypography fontSize={13}>{errors.address}</ErrorTypography>
            ) : null}
          </Box>
          <Box>
            <TextField
              name="post_code"
              style={{ margin: "2rem 1rem 0 0" }}
              label="Zip Code"
              variant="outlined"
              color="primary"
              onChange={handleChange}
              value={values.post_code}
              onBlur={handleBlur}
            />
            {touched.post_code && errors.post_code ? (
              <ErrorTypography fontSize={13}>
                {errors.post_code}
              </ErrorTypography>
            ) : null}
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <StateList
            values={values}
            state={state}
            errors={errors}
            handleChange={handleChange}
          />
          <Box>
            <TextField
              name="post_description"
              sx={{ margin: "2rem 1rem 0 0", width: "30rem" }}
              multiline
              rows={4}
              label="Description"
              variant="outlined"
              color="primary"
              onChange={handleChange}
              value={values.post_description}
              onBlur={handleBlur}
            />
            {touched.post_description && errors.post_description ? (
              <ErrorTypography fontSize={13}>
                {errors.post_description}
              </ErrorTypography>
            ) : null}
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center">
          {" "}
          <Button
            size="large"
            sx={{ margin: "2rem 1rem 0 0" }}
            variant="contained"
            type="submit"
          >
            Post Job
          </Button>
        </Box>
      </form>
    </Container>
  );
};
