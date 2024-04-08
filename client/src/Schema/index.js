import * as Yup from "yup";

export const postJobSchema = Yup.object({
  first_name: Yup.string()
    .min(3)
    .max(25)
    .required("Please enter your first name"),
  last_name: Yup.string()
    .min(3)
    .max(25)
    .required("Please enter your last name"),
  phone_num: Yup.string()
    .min(10)
    .max(11)
    .required("Please enter your Phone number"),
  email: Yup.string().email().required("Please enter your Email"),
  address: Yup.string().min(3).max(25).required("Please enter your address"),
  state: Yup.string().min(3).max(25).required("Please enter your state"),
  post_code: Yup.string().min(6).max(6).required("Please enter your post code"),
  type_clothing: Yup.string()
    .min(3)
    .max(15)
    .required("Please enter your Cloth type"),
  post_description: Yup.string()
    .min(3)
    .max(255)
    .required("Please enter your Description"),
  budget: Yup.string().required("Please enter your budget"),
  image: Yup.string().required("Please uploade your image"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const registerSchema = Yup.object({
  name: Yup.string().min(3).required("Please enter your email"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  phone: Yup.string().min(10).max(10).required("Please enter your phone number"),
  street: Yup.string().max(30).required("Please enter your street name"),
  apartment:  Yup.string().max(30).required("Please enter your apartment"),
  zip: Yup.string().max(6).required("Please enter your zip"),
  city: Yup.string().max(10).required("Please enter your city name"),
  country: Yup.string().max(10).required("Please Enteer your country")
});

export const userDetailsSchema = Yup.object({
  first_name: Yup.string()
    .min(3)
    .max(25)
    .required("Please enter your first name"),
  last_name: Yup.string()
    .min(3)
    .max(25)
    .required("Please enter your last name"),
  phone: Yup.string()
    .min(10)
    .max(13)
    .required("Please enter your Phone number"),
  address: Yup.string().min(3).max(25).required("Please enter your address"),
  state: Yup.string().min(3).max(25).required("Please enter your state"),
  post_code: Yup.string().min(6).max(6).required("Please enter your post code"),
  image: Yup.mixed().required("Please select an Image"),
});
