import { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import UserContext from '../Context/UserContext';
import { useAppStore } from '../utils/store';
import { FaRegEdit } from "react-icons/fa";
import { editSchema } from "../Schema";
import { useFormik } from "formik";
import { countries } from "../utils/countries";
import { toast } from "react-toastify";


export const Profile = () => {
  const { userDetails, setuserDetails, headers } = useContext(UserContext);
  const [consumerProjects, setConsumerProjects] = useState([]);
  const [appliedProject, setAppliedProject] = useState([]);
  const { userId, token } = useAppStore((state) => ({ userId: state.userId, token: state.token }));
  const [userUpdate, setUserUpdate] = useState(false);
  const modalRef = useRef(null);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/users/${userId}`, { headers: headers });
      setuserDetails(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getConsumerProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/projects/consumer/${userId}`, { headers: headers });
      setConsumerProjects(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }

  const appliedJob = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/projects/applied-projects`, { userId: userId }, { headers: headers });
      setAppliedProject(response.data)
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    getUserDetails();
    getConsumerProjects();
    appliedJob();
  }, [token, userUpdate]);

  const initialValues = {
    email: userDetails.email,
    name: userDetails.name,
    phone: userDetails.phone,
    street: userDetails.street,
    apartment: userDetails.apartment,
    zip: userDetails.zip,
    city: userDetails.city,
    country: userDetails.country,
    userType: userDetails.userType
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      enableReinitialize: true,
      validationSchema: editSchema,
      onSubmit: async (values, action) => {
        try {
          await axios.put(`${import.meta.env.VITE_API_URI}/api/v1/users/${userId}`, values, { headers });
          action.resetForm();
          toast.success("User Details Update Sucessfully")
          setUserUpdate(!userUpdate)
          if (modalRef.current) { // Close the modal
            modalRef.current.close();
          }
        } catch (error) {
          toast.error(`Update Failed: ${error.response.data}`);
        }
      },
    });


  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="w-3/4 mx-auto">
          <div className='flex flex-row justify-between'>
            <h2 className="text-3xl font-bold text-center mb-6">User Profile</h2>
            <FaRegEdit className='cursor-pointer' onClick={() => document.getElementById('my_modal_4').showModal()} />
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <p className="text-lg"><strong>Name:</strong> {userDetails.name}</p>
            <p className="text-lg"><strong>Email:</strong> {userDetails.email}</p>
            <p className="text-lg"><strong>Phone:</strong> {userDetails.phone}</p>
            <p className="text-lg"><strong>User Type: </strong> {userDetails.userType}</p>
            <p className="text-lg"><strong>Address:</strong> {`${userDetails.apartment}, ${userDetails.street}, ${userDetails.city}, ${userDetails.zip}, ${userDetails.country}`}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">{userDetails.userType === "Consumer" ? "Projects" : "Applied Jobs"}</h3>

            <div className="container mx-auto mt-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadlines
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userDetails.userType === "Consumer" ? consumerProjects.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.status}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${item.budget}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.deadline}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 cursor-pointer">Open</div>
                      </td>
                    </tr>
                  )) : appliedProject.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.status}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${item.budget}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.deadline}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 cursor-pointer">Open</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_4" ref={modalRef} className="modal">
        <h2>Edit Your Profile</h2>
        <div className="modal-box w-6/12 max-w-5xl">
          <h3 className="font-bold text-2xl text-center">Edit Your Profile</h3>
          <div className="modal-action">
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
                Update
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
