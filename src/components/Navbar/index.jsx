import React from "react";
import { Link } from "react-router-dom"; // if you use react-router

function Navbar() {
  return (
    <div className="h-20 flex items-center justify-between w-full text-white 
bg-gradient-to-r from-[#1a0b3d] via-[#4b1b7a] to-[#1a0b3d] 
px-20 shadow-md">

      {/* Site title */}
      <div className="text-3xl font-bold">Job Orbit.</div>

      {/* Navigation links */}
      <div className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>
        <Link to="/my-applications" className="hover:text-gray-200">
          My Applications
        </Link>
        {/* Optional admin link */}
        
      </div>
    </div>
  );
}

export default Navbar;
