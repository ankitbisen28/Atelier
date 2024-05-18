import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useContext } from 'react';
import JobContext from '../Context/JobContext';
import { Link } from 'react-router-dom';

export const JobCard = () => {
  const { jobs } = useContext(JobContext);
  return (
    <>
      {jobs.map((job, index) => {
        return (
          <div className="card w-96 bg-base-100 shadow-xl" key={index}>
            <figure><img src={job.image} alt="Shoes" /></figure>
            <div className="card-body">
              <h2 className="card-title text-white">{job.name}</h2>
              <p> {job.description}</p>
              <div className="card-actions justify-end">
                <Link style={{ textDecoration: "none", fontFamily: "Poppins,sans-serif" }} to={`/product/${job.id}`}>Learn More</Link>
              </div>
            </div>
          </div>
        )
      })}
    </>

  );
};
