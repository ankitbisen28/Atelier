import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { postJobSchema } from "../Schema"; // Make sure this is properly imported
import UserContext from "../Context/UserContext";
import JobContext from "../Context/JobContext";
import { useAppStore } from "../utils/store";
import { toast } from "react-toastify";

export const PostJob = () => {
  const { HeaderTypeTwo } = useContext(UserContext);
  const { categories } = useContext(JobContext);
  const statuses = ['Open', 'Close', 'In progress', 'Completed']
  const { userId } = useAppStore((state) => ({ userId: state.userId }));


  const initialValues = {
    title: '',
    description: '',
    requirements: '',
    budget: '',
    deadline: '',
    consumerId: userId,
    category: '',
    images: [],
    status: 'Open',
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: postJobSchema,
      onSubmit: async (values, action) => {
        const formData = new FormData();
        for (let i = 0; i < values.images.length; i++) {
          formData.append('images', values.images[i]);
        }
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('requirements', values.requirements);
        formData.append('budget', values.budget);
        formData.append('deadline', values.deadline);
        formData.append('consumerId', values.consumerId);
        formData.append('category', values.category);
        formData.append('status', values.status);
        console.log(formData.getAll('images'))
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URI}/api/v1/projects/`,
            formData,
            { headers: HeaderTypeTwo }
          );
          console.log(response);
          action.resetForm();
          toast.success("Project form submit Successfully")
        } catch (error) {
          console.log(error);
          toast.error(error.response.data);
        }
      },
    });

  return (
    <div className="container mx-auto mt-16">
      <div className="w-3/4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Post Your Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Title</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
              {touched.title && errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.description && errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Requirements</label>
              <textarea
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                name="requirements"
                value={values.requirements}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.requirements && errors.requirements && (
                <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Budget</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                type="number"
                name="budget"
                value={values.budget}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.budget && errors.budget && (
                <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Images</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                name="images"
                type="file"
                onChange={(event) => { setFieldValue("images", event.currentTarget.files); }}
                onBlur={handleBlur}
              />
              {touched.images && errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Deadline</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                type="date"
                name="deadline"
                value={values.deadline}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.deadline && errors.deadline && (
                <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Category</label>
              <select
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {touched.category && errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Status</label>
              <select
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {statuses.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {touched.status && errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
              )}
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
