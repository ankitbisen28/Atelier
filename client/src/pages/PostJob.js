import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { postJobSchema } from "../Schema"; // Make sure this is properly imported
import UserContext from "../Context/UserContext";
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
      validationSchema: postJobSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URI}/api/v1/projects`,
            values,
            { headers: HeaderTypeTwo }
          );
          console.log(response);
          action.resetForm();
          setOpen(true);
        } catch (error) {
          console.log(error);
        }
      },
    });

  return (
    <div className="container mx-auto mt-16">
      <div className="w-3/4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Post Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Rich Text</label>
              <textarea
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                name="rich"
                value={values.rich}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Brand</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                type="text"
                name="brand"
                value={values.brand}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Image</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                type="file"
                onChange={(event) => { setFieldValue("image", event.currentTarget.files[0]) }}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Price</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Category</label>
              <select
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                name="category"
                value={values.category}
                onChange={handleChange}
                required
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Count In Stock</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                type="number"
                name="countInStock"
                value={values.countInStock}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Rating</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                type="number"
                name="rating"
                value={values.rating}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Number of Reviews</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                type="number"
                name="numReview"
                value={values.numReview}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
