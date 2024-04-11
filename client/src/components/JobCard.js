import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {Box, Typography} from '@mui/material';

import Carousel from "react-material-ui-carousel";
import bannerOne from "../assets/Images/banner-1.jpg";
import bannerTwo from "../assets/Images/banner-2.jpg";
import bannerThree from "../assets/Images/banner-3.jpg";
import bannerFour from "../assets/Images/banner-4.jpg";
import { useContext } from 'react';
import JobContext from '../Context/JobContext';

export const JobCard = () => {
  const { jobs } = useContext(JobContext);
  console.log(jobs);
  return (
    <>
    <Box display={"flex"} width={"100%"} margin={"auto"} flexDirection={"row"} >

  
    {jobs.map((job)=>{
      return (
        <Card key={job.id} sx={{ width: 400 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {job.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      
      )
    })}
    </Box>
    </>
    
  );
};
