import { Link } from 'react-router-dom';
import { useContext } from 'react';
import JobContext from '../Context/JobContext';
import { Carousel } from "react-responsive-carousel";

export const JobCard = () => {
  const { jobs } = useContext(JobContext);
  return (
    <>
      {jobs.map((job, index) => {
        return (
          <div key={job._id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
              className="w-full h-[40vh]"
            >
              {job.images.map((image, i) => (
                <div key={i}>
                  <img
                    className="object-cover w-full h-full"
                    alt={image.description}
                    src={image.url}
                  />
                </div>
              ))}
            </Carousel>
            <div className="px-6 py-4">
              <div className="font-bold text-black text-xl mb-2">{job.title}</div>
              <p className="text-gray-700 text-base">${job.budget}</p>
            </div>
            <div className="px-6 pt-4 pb-2 flex items-center">
              <Link className='text-black' style={{ textDecoration: "none", fontFamily: "Poppins,sans-serif" }} to={`/product/${job.id}`}>Learn More</Link>
            </div>
          </div>
        )
      })}
    </>

  );
};
