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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/api/user/profile/create`,
        values,
        { headers: HeaderTypeTwo }
      );
      action.resetForm();
      navigate("/");
    },
  });

  return (
    <div className="mt-24 flex flex-col items-center">
      <h1 className="text-3xl mb-8">Please Fill Your Details</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded"
            />
            {touched.first_name && errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded"
            />
            {touched.last_name && errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded"
            />
            {touched.phone && errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded"
            />
            {touched.address && errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <StateList
            values={values}
            errors={errors}
            state={state}
            handleChange={handleChange}
          />
          <div className="w-full md:w-1/3">
            <input
              type="text"
              name="post_code"
              placeholder="Zip Code"
              value={values.post_code}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded"
            />
            {touched.post_code && errors.post_code && (
              <p className="text-red-500 text-sm mt-1">{errors.post_code}</p>
            )}
          </div>
          <div className="w-full md:w-1/3">
            <input
              type="file"
              name="image"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded"
            />
            {touched.image && errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};
