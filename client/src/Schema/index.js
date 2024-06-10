import * as Yup from "yup";

export const postJobSchema = Yup.object({
  title: Yup.string()
    .min(3)
    .max(255)
    .required("Please enter your title"),
  description: Yup.string()
    .min(3)
    .max(255)
    .required("Please enter your description"),
  requirements: Yup.string()
    .min(10)
    .max(255)
    .required("Please enter your Requirement"),
  budget: Yup.number().required("Please enter your Budget"),
  deadline: Yup.date().required("Please enter deadline"),
  category: Yup.string().required("Please enter category"),
  status: Yup.string().required("Please enter status"),
  images: Yup.mixed().test('fileSize', 'Please upload your images', value => {
    return value && value.length > 0;
  })
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
  apartment: Yup.string().max(30).required("Please enter your apartment"),
  zip: Yup.string().max(6).required("Please enter your zip"),
  city: Yup.string().max(10).required("Please enter your city name"),
  country: Yup.string().max(10).required("Please Enteer your country"),
  userType: Yup.string().required("Please Select user type")
});

export const editSchema = Yup.object({
  name: Yup.string().min(3).required("Please enter your email"),
  email: Yup.string().email().required("Please enter your email"),
  phone: Yup.string().min(10).max(10).required("Please enter your phone number"),
  street: Yup.string().max(30).required("Please enter your street name"),
  apartment: Yup.string().max(30).required("Please enter your apartment"),
  zip: Yup.string().max(6).required("Please enter your zip"),
  city: Yup.string().max(10).required("Please enter your city name"),
  country: Yup.string().max(10).required("Please Enteer your country"),
  userType: Yup.string().required("Please Select user type")
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
