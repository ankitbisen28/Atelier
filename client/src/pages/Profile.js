import {useContext} from 'react';
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
  const { userDetails } = useContext(UserContext)
  console.log(userDetails)
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
