import React from "react";
import { Category } from "../components/Category";
import { Banner } from "../components/Banner";
import { JobCard } from "../components/JobCard";

export const Home = () => {
    return (
        <div className="container mx-auto max-w-[1350px]">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-8" style={{ height: "70vh" }}>
                <div className="flex-none sm:w-1/3 max-h-[72vh] overflow-scroll p-0">
                    <Category />
                </div>
                <div className="flex-grow sm:w-2/3 p-0">
                    <Banner />
                </div>
            </div>
            <h4 className="text-center p-4 text-4xl">
                Latest Jobs
            </h4>
            <div className="mt-7 flex flex-wrap gap-4 justify-center">
                <JobCard />
            </div>
        </div>
    );
};
