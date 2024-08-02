import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { RiCloseLine, RiMenu4Line } from "react-icons/ri";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" 
              className="pointer-events-none whitespace-pre-wrap text-2xl bg-gradient-to-b from-orange-600 to-gray-300/80 bg-clip-text text-center font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                Travela
              
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button onClick={toggleMenu} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
            <RiMenu4Line className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden md:flex space-x-10">
            <Link href="/destinations" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Destinations 
            </Link>
            <Link href="/packages" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Packages 
            </Link>
            <Link href="/services" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Services 
            </Link>
            <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                About Us 
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
              <Link href="/" 
              className="pointer-events-none whitespace-pre-wrap text-2xl bg-gradient-to-b from-orange-600 to-gray-300/80 bg-clip-text text-center font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                Travela
              
            </Link>
                <div className="-mr-2">
                  <button onClick={toggleMenu} type="button" className="bg-orange-500 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                    <RiCloseLine className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link href="/destinations" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                      Destinations
 
                  </Link>
                  <Link href="/packages" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                      Packages
 
                  </Link>
                  <Link href="/services" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                      Services
 
                  </Link>
                  <Link href="/about" className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                      About Us
 
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
