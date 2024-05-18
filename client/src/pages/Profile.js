import { useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../Context/UserContext';

const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  address: {
    apartment: 'Apt 123',
    street: '123 Main St',
    city: 'Anytown',
    zip: '12345',
    country: 'USA',
  },
  appliedJobs: [
    { id: 1, title: 'Software Engineer', company: 'Tech Co.' },
    { id: 2, title: 'Data Analyst', company: 'Data Solutions Inc.' },
    { id: 3, title: 'Web Developer', company: 'WebWorks Ltd.' },
  ],
};

export const Profile = () => {
  const { token, userDetails, setuserDetails, headers } = useContext(UserContext);
  const userId = localStorage.getItem("userId");

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/users/${userId}`, { headers: headers });
      setuserDetails(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [token]);


  return (
    <div className="container mx-auto mt-8">
      <div className="w-3/4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">User Profile</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
          <p className="text-lg"><strong>Name:</strong> {userDetails.name}</p>
          <p className="text-lg"><strong>Email:</strong> {userDetails.email}</p>
          <p className="text-lg"><strong>Phone:</strong> {userDetails.phone}</p>
          <p className="text-lg"><strong>Address:</strong> {`${userDetails.apartment}, ${userDetails.street}, ${userDetails.city}, ${userDetails.zip}, ${userDetails.country}`}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Applied Jobs</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Title</th>
                  <th className="px-4 py-2 border-b">Company</th>
                </tr>
              </thead>
              <tbody>
                {userData.appliedJobs.map(job => (
                  <tr key={job.id}>
                    <td className="px-4 py-2 border-b">{job.id}</td>
                    <td className="px-4 py-2 border-b">{job.title}</td>
                    <td className="px-4 py-2 border-b">{job.company}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
