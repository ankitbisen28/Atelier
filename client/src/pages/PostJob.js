import {
  Container,
  Typography,
  TextField,
  Box,
  Grid,
  Button,
  styled,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
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
import JobContext from "../Context/JobContext";

export const PostJob = () => {
  const { HeaderTypeTwo } = useContext(UserContext);
  const { categories } = useContext(JobContext);

  const [open, setOpen] = useState(false);

  const initialValues = {
    name: '',
    description: '',
    rich: '',
    brand: '',
    
    price: '',
    category: '',
    countInStock: '',
    rating: '',
    numReview: ''
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      // validationSchema: postJobSchema,
      onSubmit: async (values, action) => {
        // console.log({ 
        //   fileName: values.file.name, 
        //   type: values.file.type,
        //   size: `${values.file.size} bytes`
        // })
        console.log(values)
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/products`, values, {
            headers: HeaderTypeTwo,
          });
          console.log(response);
          action.resetForm();
          setOpen(true);
        } catch (error) {
            console.log(error)
        }
      
      },
    });

  // console.log(values);

  const ErrorTypography = styled(Typography)({
    color: "red",
  });

  const cloth = Cloths.clothes;

  return (
    <Grid container width={"70%"} margin={"auto"} mt={7} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" textAlign={"center"} gutterBottom>
          Post Job
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="rich"
                label="Rich Text"
                value={values.rich}
                onChange={handleChange}
                multiline
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="brand"
                label="Brand"
                value={values.brand}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                
                type="file"
                
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0])}}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="price"
                label="Price"
                value={values.price}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                >
                  {categories.map((category) =>{return (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  )})}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="countInStock"
                label="Count In Stock"
                value={values.countInStock}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="rating"
                label="Rating"
                value={values.rating}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="numReview"
                label="Number of Reviews"
                value={values.numReview}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid>
          </Grid>
          <Box display={"flex"} mt={3} flexDirection={"column"} alignItems={"center"}>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};
