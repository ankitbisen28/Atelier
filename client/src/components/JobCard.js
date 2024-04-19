import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Typography} from '@mui/material';
import { useContext } from 'react';
import JobContext from '../Context/JobContext';
import { Link } from 'react-router-dom';

export const JobCard = () => {
  const { jobs } = useContext(JobContext);
  return (
    <>
    

  
    {jobs.map((job)=>{
      return (
        <Card key={job.id} sx={{ width: 400 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={job.image}
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
        <Link style={{textDecoration:"none", fontFamily:"Poppins,sans-serif", color:"#58A399"}} to={`/product/${job.id}`}>Learn More</Link>
      </CardActions>
    </Card>
      
      )
    })}
    </>
    
  );
};
