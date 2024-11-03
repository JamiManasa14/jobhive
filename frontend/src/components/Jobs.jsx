import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        const matchesIndustry = searchedQuery.Industry?.length
          ? searchedQuery.Industry.includes(job.title)
          : true;

        const matchesLocation = searchedQuery.Location?.length
          ? searchedQuery.Location.includes(job.location)
          : true;

        const matchesSalary = searchedQuery["Salary Range"]?.length
          ? searchedQuery["Salary Range"].some((salaryRange) => checkSalaryRange(job.salary, salaryRange))
          : true;

        return matchesIndustry && matchesLocation && matchesSalary;
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  const checkSalaryRange = (jobSalary, salaryRange) => {
    // Convert jobSalary to string in case it's a number
    const jobSalaryStr = jobSalary.toString();
  
    const [minSalary, maxSalary] = salaryRange.split("-").map((s) => parseInt(s.replace(/[^\d]/g, ""), 10));
    const jobSalaryValue = parseInt(jobSalaryStr.replace(/[^\d]/g, ""), 10);
  
    if (!maxSalary) return jobSalaryValue >= minSalary; // Handle ranges like "10L+"
    return jobSalaryValue >= minSalary && jobSalaryValue <= maxSalary;
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto flex-grow mt-5 flex">
        <div className="flex gap-5 w-full">
          {/* Set a fixed width for FilterCard */}
          <div className="w-[20%] min-w-[200px]">
            <FilterCard />
          </div>

          {/* Job list container */}
          <div className="flex-1 h-[88vh] overflow-y-auto custom-scrollbar pb-5">
            {filterJobs.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div 
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job?._id}>
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <span>Job Not Found</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
