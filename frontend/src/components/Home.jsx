import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className="h-screen flex flex-col"> 
      {/* Full screen height */}
      <Navbar />
      <div className="flex-1 overflow-y-auto custom-scrollbar"> 
        {/* Allow scrolling for the content */}
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />
      </div>
      {/* Footer stays at the bottom */}
    </div>
  );
};

export default Home;
