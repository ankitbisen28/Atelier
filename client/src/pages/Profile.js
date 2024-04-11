import { useContext, useEffect } from 'react';
import axios from 'axios'
import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Grid } from '@mui/material';
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
  const { token, userDetails, setuserDetails, headers } = useContext(UserContext)
  const userId = localStorage.getItem("userId")

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/users/${userId}`, { headers: headers });
      setuserDetails(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getUserDetails();
  }, [token])
  return (
    <Grid width={"70%"} margin={"auto"} container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom align="center">User Profile</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Personal Information</Typography>
        <Typography variant="body1">Name: {userDetails.name}</Typography>
        <Typography variant="body1">Email: {userDetails.email}</Typography>
        <Typography variant="body1">Phone: {userDetails.phone}</Typography>
        <Typography variant="body1">Address: {`${userDetails.apartment}, ${userDetails.street}, ${userDetails.city}, ${userDetails.zip}, ${userDetails.country}`}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Applied Jobs</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Company</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.appliedJobs.map(job => (
                <TableRow key={job.id}>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
