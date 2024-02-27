import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import JobContext from "../Context/JobContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Favorite from "@mui/icons-material/Favorite";
import Share from "@mui/icons-material/Share";

import Carousel from "react-material-ui-carousel";
import bannerOne from "../assets/Images/banner-1.jpg";
import bannerTwo from "../assets/Images/banner-2.jpg";
import bannerThree from "../assets/Images/banner-3.jpg";
import bannerFour from "../assets/Images/banner-4.jpg";

export const JobCard = () => {
  const { jobs } = useContext(JobContext);
  // console.log(jobs);
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      mt={10}
    >
      {jobs.map((job) => {
        return (
          <Card key={job.id} sx={{ maxWidth: 345, margin: "1.5rem" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={job.first_name + " " + job.last_name}
              subheader={job.email}
            />
            <Carousel
              sx={{ height: "30vh", width: "100%", backgroundSize: "cover" }}
            >
              {[bannerOne, bannerTwo, bannerThree, bannerFour].map(
                (item, i) => (
                  <img
                    style={{
                      height: "30vh",
                      width: "100%",
                      backgroundSize: "cover",
                    }}
                    key={i}
                    alt={item}
                    src={item}
                  />
                )
              )}
            </Carousel>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {job.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <Favorite />
              </IconButton>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
};
