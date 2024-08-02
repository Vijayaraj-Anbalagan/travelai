"use client";

import React from "react";
import Navbar from "@/components/ui/NavBar";
import Globe from "@/components/ui/Globe";
import BlurIn from "@/components/magicui/blur-in";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <BlurIn word="Explore the World with Travela" className="text-orange-500" />
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Dive into unique experiences with our tailored travel plans, designed just for you.
          </p>
        </div>
        <Globe className="absolute lg:top-1/2 w-full max-w-4xl h-auto opacity-50" />
        </div>
        <div className="flex justify-center p-4">
        <Link className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 mb-7 rounded-full transition-colors duration-300 z-50 border-white border" href={'/login'}>
        Get Started <span className="ml-1">&#8594;</span>
    </Link>
      </div>
    
    </div>
  );
};

export default HomePage;
