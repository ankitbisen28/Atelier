import React from "react";
import { JobCard } from "../components/JobCard";

const JobList = () => {
  return (
    <>
      <h4 className="my-10 text-center text-2xl font-bold">
        Latest Jobs
      </h4>
      <div className="flex w-full gap-4 flex-wrap flex-row items-center justify-center">
        <JobCard />
      </div>
    </>
  );
};

export default JobList;
