import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { RiCloseLine, RiMenu4Line } from "react-icons/ri";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? "backdrop-blur-md bg-white/95 shadow-md" : "bg-white/80"}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        height: isScrolled ? "4rem" : "5rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" 
                className="whitespace-pre-wrap text-2xl bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-center font-semibold leading-none text-transparent">
                  Travela
              </Link>
            </motion.div>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button 
              onClick={toggleMenu} 
              type="button" 
              className="bg-white/80 rounded-full p-2 inline-flex items-center justify-center text-gray-400 hover:text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors duration-200"
            >
              <RiMenu4Line className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden md:flex space-x-10">
            <Link href="/destinations" className="group relative text-base font-medium text-gray-600 hover:text-orange-500 transition-colors duration-300">
              <span>Destinations</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/packages" className="group relative text-base font-medium text-gray-600 hover:text-orange-500 transition-colors duration-300">
              <span>Packages</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/services" className="group relative text-base font-medium text-gray-600 hover:text-orange-500 transition-colors duration-300">
              <span>Services</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="group relative text-base font-medium text-gray-600 hover:text-orange-500 transition-colors duration-300">
              <span>About Us</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/login" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-300">
                Sign In
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          className="absolute top-0 inset-x-0 p-2 transition-all md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <Link href="/" 
                  className="whitespace-pre-wrap text-2xl bg-gradient-to-b from-orange-600 to-gray-300/80 bg-clip-text text-center font-semibold leading-none text-transparent">
                    Travela
                </Link>
                <div className="-mr-2">
                  <button onClick={toggleMenu} type="button" className="bg-orange-500 rounded-full p-2 inline-flex items-center justify-center text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors duration-200">
                    <RiCloseLine className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link href="/destinations" className="-m-3 p-3 flex items-center rounded-md hover:bg-orange-50 transition-colors duration-200">
                      <span className="text-base font-medium text-gray-700 hover:text-orange-500">Destinations</span>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link href="/packages" className="-m-3 p-3 flex items-center rounded-md hover:bg-orange-50 transition-colors duration-200">
                      <span className="text-base font-medium text-gray-700 hover:text-orange-500">Packages</span>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link href="/services" className="-m-3 p-3 flex items-center rounded-md hover:bg-orange-50 transition-colors duration-200">
                      <span className="text-base font-medium text-gray-700 hover:text-orange-500">Services</span>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link href="/about" className="-m-3 p-3 flex items-center rounded-md hover:bg-orange-50 transition-colors duration-200">
                      <span className="text-base font-medium text-gray-700 hover:text-orange-500">About Us</span>
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
