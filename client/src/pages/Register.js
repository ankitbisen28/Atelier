import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { countries } from '../utils/countries';
import { registerSchema } from '../Schema';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
    city: '',
    country: '',
    userType: ''
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/users/register`, values);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.user);
          action.resetForm();
          navigate('/');
        } catch (error) {
          alert('Please enter correct details');
          console.error(error);
        }
      },
    });

  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-secondary-main rounded-full p-2 mb-2">
          <LockOutlinedIcon className="text-white" />
        </div>
        <h1 className="text-2xl font-semibold">Register</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {touched.name && errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {touched.phone && errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={values.street}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {touched.street && errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="apartment"
              placeholder="Apartment"
              value={values.apartment}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {touched.apartment && errors.apartment && (
              <p className="text-red-500 text-sm mt-1">{errors.apartment}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="zip"
              placeholder="ZIP"
              value={values.zip}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {touched.zip && errors.zip && (
              <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {touched.city && errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <select
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="" label="Country" />
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {touched.country && errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>
          <div>
            <div className='flex flex-row items-center'>
              <p className='m-3'>Consumer</p>
              <input type="radio" name="userType" value='Consumer' onChange={handleChange} className="radio radio-primary" />
              <p className='m-3'>Maker</p>
              <input type="radio" name="userType" value='Maker' onChange={handleChange} className="radio radio-primary" />
            </div>
            {touched.userType && errors.userType && (
              <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded mt-4 hover:bg-blue-700"
        >
          Register
        </button>
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};
