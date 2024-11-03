import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <div className="text-center">
        <div className="flex flex-col gap-5 my-10 ">
          <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-bold">
            No. 1 Job Hunt Website
          </span>
          <h1 className="text-5xl font-bold">
            Search , Apply & <br /> Get Your{" "}
            <span className="text-[#6A38C2]"> Dream Job </span>{" "}
          </h1>
          <p className="text-lg mt-4 font-extrabold text-gray-600">
            Take the next step in your career journey with opportunities
            tailored just for you. <br />
            Connect with top companies and unlock doors to roles that match your
            ambitions. <br />
            Don’t just dream it—achieve it with the job you’ve always wanted!
          </p>
          <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              placeholder="Find your Dream job"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full"
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-r-full bg-[#6A38F2]"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
