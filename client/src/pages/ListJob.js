import React from "react";
import { Box, Typography } from "@mui/material";
import { JobCard } from "../components/JobCard";

const JobList = () => {
  return (
    <>
      <Typography margin={10} textAlign={"center"} variant="h4">
        Letest Jobs
      </Typography>
      <Box display={"flex"} width={"100%"} gap={4} flexWrap={"wrap"} flexDirection={"row"} alignItems={"center"} justifyContent={'center'} >
        <JobCard />
      </Box>
    </>
  );
};

export default JobList;
