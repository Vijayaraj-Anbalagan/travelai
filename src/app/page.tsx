"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Navbar from "@/components/ui/NavBar";
import Link from "next/link";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Compass, Shield, Wallet, MapPin, ChevronRight, Camera, Plane, Hotel, 
         Github, Twitter, Linkedin, Search, MessageSquare, Building, Check, 
         X, Menu, Minus, Plus, Youtube, Instagram, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from 'next/dynamic';

// Dynamically import components for better code splitting
const LazyGlobe = dynamic(() => import('@/components/ui/DynamicGlobe'), { 
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center">
      <div className="h-[400px] w-[400px] bg-gray-100 animate-pulse rounded-full opacity-50" />
    </div>
  )
});

// Lazy load sections that appear below the fold
const ConnectedTimelineSection = dynamic(() => import('@/components/ConnectedTimelineSection'), {
  loading: () => <div className="h-96 w-full bg-gray-50 animate-pulse" />
});
const PartnershipSection = dynamic(() => import('@/components/PartnershipSection'));
const EnhancedTestimonialsSection = dynamic(() => import('@/components/EnhancedTestimonialsSection'));
const EnhancedStatsSection = dynamic(() => import('@/components/EnhancedStatsSection').then(mod => ({ default: mod.EnhancedStatsSection })));
const PricingSection = dynamic(() => import('@/components/PricingSection').then(mod => ({ default: mod.PricingSection })));
const FAQSection = dynamic(() => import('@/components/FAQItem').then(mod => ({ default: mod.FAQSection })));
const FeatureComparisonSection = dynamic(() => import('@/components/FeatureComparisonSection').then(mod => ({ default: mod.FeatureComparisonSection })));
const MinimalCTASection = dynamic(() => import('@/components/MinimalCTASection').then(mod => ({ default: mod.MinimalCTASection })));
const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })));
const FeatureCard = dynamic(() => import('@/components/FeatureCard').then(mod => ({ default: mod.FeatureCard })));

const HomePage = () => {
  // State to track hovered feature for interactive connections
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Load state
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const features = [
    {
      icon: Compass,
      title: "TravelBuddy AI",
      description: "Real-time AI assistance for dynamic travel planning",
      position: { top: '10%', left: '25%' }
    },
    {
      icon: Shield,
      title: "RoamSafe",
      description: "Live safety alerts and neighborhood insights",
      position: { top: '20%', right: '25%' }
    },
    {
      icon: Wallet,
      title: "TravelStash",
      description: "Smart savings and budget planning tools",
      position: { bottom: '30%', left: '15%' }
    },
    {
      icon: MapPin,
      title: "Hidden Gems",
      description: "Discover unique local experiences",
      position: { bottom: '25%', right: '15%' }
    }
  ];

  // Floating travel elements animation
  const floatingElements = [
    { icon: Plane, position: { top: '15%', left: '10%' }, size: 24, delay: 0 },
    { icon: MapPin, position: { top: '25%', right: '15%' }, size: 20, delay: 1 },
    { icon: Hotel, position: { bottom: '35%', left: '20%' }, size: 22, delay: 2 },
    { icon: Camera, position: { bottom: '25%', right: '10%' }, size: 18, delay: 1.5 },
  ];

  // Helper functions to get position coordinates for SVG connections
  const getPositionX = (position: any): string => {
    if (position.left) return position.left;
    if (position.right) return `calc(100% - ${position.right})`;
    return '50%';
  };

  const getPositionY = (position: any): string => {
    if (position.top) return position.top;
    if (position.bottom) return `calc(100% - ${position.bottom})`;
    return '50%';
  };

  // Destinations with optimized images and blur placeholders
  const popularDestinations = [
    { 
      name: "Santorini, Greece", 
      image: "/udaipur.jpg",
      blurDataUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIAAgAEAMBIgACEQEDEQH/xAAnAAEAAwEBAAAAAAAAAAAAAAAAAQIDBAUBAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAALpU//EABkQAAIDAQAAAAAAAAAAAAAAAAECABESIf/aAAgBAQABPwCrZDqOjC//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AH//2Q==", 
      description: "Stunning views with iconic white architecture", 
      rating: 4.8 
    },
    { 
      name: "Kyoto, Japan", 
      image: "/andaman.jpg",
      blurDataUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIAAgAEAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABgEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAArAf/xAAYEAACAwAAAAAAAAAAAAAAAAAAEQECIf/aAAgBAQABPwCyk//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Af//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Af//Z", 
      description: "Ancient temples and beautiful cherry blossoms", 
      rating: 4.7 
    },
    { 
      name: "Marrakech, Morocco", 
      image: "/journey.webp",
      blurDataUrl: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADwAQCdASoIAAUAAUAmJaQAA3AA/vn9f2quW/xvf4ztxbq5/k/Bf1VrGfyAB/+kqf//NP/zT//8lf5QAA==", 
      description: "Vibrant markets and rich cultural heritage", 
      rating: 4.6 
    },
    { 
      name: "Bali, Indonesia", 
      image: "/concert.jpg",
      blurDataUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIAAgAEAMBIgACEQEDEQH/xAAoAAEBAAAAAAAAAAAAAAAAAAAABgEBAQAAAAAAAAAAAAAAAAAAAwT/2gAMAwEAAhADEAAAAMIaf//EABwQAAIBBQEAAAAAAAAAAAAAAAECAwAREiExQf/aAAgBAQABPwClI7zxQWLO3Gv/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADBBEx/9oACAECAQE/AH2Fsap0z//EABkRAAIDAQAAAAAAAAAAAAAAAAIDAAEEEv/aAAgBAwEBPwB2hZtf/9k=", 
      description: "Tropical paradise with stunning beaches", 
      rating: 4.9 
    },
  ];

  // Travel planning steps
  const planningSteps = [
    { 
      icon: Search, 
      title: "Discover", 
      description: "Select your dream destination and travel dates" 
    },
    { 
      icon: MessageSquare, 
      title: "Customize", 
      description: "Tell our AI about your preferences and interests" 
    },
    { 
      icon: Calendar, 
      title: "Plan", 
      description: "Get your personalized day-by-day travel itinerary" 
    },
    { 
      icon: Plane, 
      title: "Travel", 
      description: "Enjoy your trip with all the details taken care of" 
    },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      {/* Mobile menu for Phase 3 mobile experience enhancement */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <Link href="/" className="text-2xl font-bold text-orange-500">
                  Travela
                </Link>
                <button
                  className="p-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <nav className="flex flex-col space-y-4">
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link href="#destinations" className="text-lg font-medium text-gray-800 hover:text-orange-500 transition-colors duration-200"
                          onClick={() => {setMobileMenuOpen(false); scrollToSection('destinations');}}>
                      Destinations
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link href="#how-it-works" className="text-lg font-medium text-gray-800 hover:text-orange-500 transition-colors duration-200"
                          onClick={() => {setMobileMenuOpen(false); scrollToSection('how-it-works');}}>
                      How It Works
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link href="#ai-assistant" className="text-lg font-medium text-gray-800 hover:text-orange-500 transition-colors duration-200"
                          onClick={() => {setMobileMenuOpen(false); scrollToSection('ai-assistant');}}>
                      AI Assistant
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link href="#pricing" className="text-lg font-medium text-gray-800 hover:text-orange-500 transition-colors duration-200"
                          onClick={() => {setMobileMenuOpen(false); scrollToSection('pricing');}}>
                      Pricing
                    </Link>
                  </motion.div>
                </nav>
              </div>
              <div className="p-4 border-t">
                <Link 
                  href="/login" 
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md text-center transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In / Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed mobile menu button */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <motion.button
          className="bg-orange-500 text-white p-4 rounded-full shadow-lg"
          onClick={() => setMobileMenuOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={24} />
        </motion.button>
      </div>
      
      <div className="flex flex-col items-center justify-start pt-20 px-4">
        {/* Hero section */}
        <motion.div
          className="text-center space-y-6 mb-12 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AnimatedGradientText className="backdrop-blur-md">
            🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Travela - Your Travel Companion
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
          
          <motion.h1 
            className="font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem] text-orange-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explore the World with Travela
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Dive into unique experiences with our tailored travel plans, designed just for you.
          </motion.p>
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
         <Link className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 z-10 border-white border-2 hover:scale-105 mb-16" href={'/login'} > Get Started <span className="ml-1">&#8594;</span> </Link>
        </motion.div>
        
        {/* Globe section with lazy loading */}
        <div className="relative h-[600px] w-full mt-10">
          <div className="absolute w-full max-w-4xl h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <img 
          src="/globe.png" 
          alt="Globe" 
          className="absolute w-full max-w-4xl h-auto opacity-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" 
        />

          </div>
          
          {/* Floating elements around the globe */}
          {floatingElements.map((item, index) => (
            <motion.div
              key={`float-${index}`}
              className="absolute text-orange-400/30"
              style={{...item.position}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 0.7,
                y: [0, -15, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                delay: item.delay,
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <item.icon size={item.size} />
            </motion.div>
          ))}
          
          {/* Feature cards */}
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <FeatureCard 
                {...feature} 
                onHover={() => setHoveredFeature(index)} 
                onLeave={() => setHoveredFeature(null)}
                isActive={hoveredFeature === index}
              />
              
              {/* Draw connection line to globe when hovered */}
              {hoveredFeature === index && (
                <motion.svg 
                  className="absolute w-full h-full top-0 left-0 z-5 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.line 
                    x1={getPositionX(feature.position)} 
                    y1={getPositionY(feature.position)}
                    x2="50%" 
                    y2="50%"
                    stroke="url(#orangeGradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(249, 115, 22, 0.7)" />
                      <stop offset="100%" stopColor="rgba(249, 115, 22, 0.1)" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* AI Travel Assistant section with ID for smooth scroll */}
        <section id="ai-assistant" className="w-full py-20 px-4 bg-gradient-to-b from-white to-orange-50">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Your AI Travel Assistant</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get personalized recommendations and answers to all your travel questions in seconds.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-orange-500 text-white p-4 flex items-center">
                <MessageSquare className="mr-2" />
                <h3 className="font-medium">TravelBuddy AI</h3>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Mock conversation */}
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-gray-800">I&apos;m planning a trip to Bali for 7 days. What should I do there?</p>
                  </div>
                </div>
                
                <motion.div 
                  className="flex items-start space-x-3 justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <div className="bg-orange-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-gray-800">For your 7 days in Bali, I&apos;d recommend:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <motion.li 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                      >Visit the sacred Monkey Forest Sanctuary in Ubud</motion.li>
                      <motion.li 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3, duration: 0.5 }}
                      >Explore the iconic Tanah Lot Temple at sunset</motion.li>
                      <motion.li 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                      >Relax on the beautiful beaches of Kuta and Seminyak</motion.li>
                      <motion.li 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.9, duration: 0.5 }}
                      >Experience traditional Balinese cuisine at Warungs</motion.li>
                    </ul>
                    <p className="mt-2 text-gray-800">Would you like me to create a day-by-day itinerary for you?</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="border-t border-gray-100 p-4">
                <motion.button 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-full w-full transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try AI Assistant Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Popular Destinations section with optimized images */}
        <section id="destinations" className="w-full py-20 px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Destinations</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover trending travel spots loved by our community</p>
            </motion.div>
            
            <div className="relative">
              <motion.div 
                className="flex space-x-6 py-8"
                drag="x"
                dragConstraints={{ left: -1000, right: 0 }}
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {popularDestinations.map((destination, index) => (
                  <motion.div
                    key={index}
                    className="relative shrink-0 w-72 sm:w-80 h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg group"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                    {/* Optimized Image with blur placeholder */}
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 768px) 40vw, 25vw"
                      placeholder="blur"
                      blurDataURL={destination.blurDataUrl}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      priority={index === 0} // Only prioritize the first image
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`mr-1 text-sm ${
                              i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="ml-1 text-white text-sm">{destination.rating}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">{destination.name}</h3>
                      <p className="text-white/80 mt-1 text-sm sm:text-base">{destination.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white via-white/80 to-transparent w-20 h-full z-10" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white via-white/80 to-transparent w-20 h-full z-10" />
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-500 flex items-center justify-center">
                <motion.span
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >← </motion.span>
                <span className="mx-2">Drag to explore more destinations</span>
                <motion.span
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                > →</motion.span>
              </p>
            </div>
          </div>
        </section>
        
        {/* Travel Planning Process section */}
        <section id="how-it-works" className="w-full py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Planning your perfect trip has never been easier</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {planningSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Connector line between steps */}
                  {index < planningSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[calc(100%-24px)] w-full h-[2px] bg-orange-200 z-0">
                      <motion.div 
                        className="h-full bg-orange-500 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-4 relative z-10"
                      whileHover={{ scale: 1.05, backgroundColor: "#FFEDD5" }}
                    >
                      <step.icon size={36} className="text-orange-500" />
                      <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-center">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Lazy load remaining sections */}
        <Suspense fallback={<div className="h-96 w-full bg-gray-50 animate-pulse" />}>
          <EnhancedStatsSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 w-full bg-white animate-pulse" />}>
          <ConnectedTimelineSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 w-full bg-gray-50 animate-pulse" />}>
          <PartnershipSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 w-full bg-white animate-pulse" />}>
          <EnhancedTestimonialsSection />
        </Suspense>
        
        <div id="pricing">
          <Suspense fallback={<div className="h-96 w-full bg-gray-50 animate-pulse" />}>
            <FeatureComparisonSection />
          </Suspense>
          
          <Suspense fallback={<div className="h-96 w-full bg-white animate-pulse" />}>
            <PricingSection />
          </Suspense>
        </div>
        
        <Suspense fallback={<div className="h-96 w-full bg-gray-50 animate-pulse" />}>
          <FAQSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-64 w-full bg-white animate-pulse" />}>
          <MinimalCTASection />
        </Suspense>
      </div>
      
      <Suspense fallback={<div className="h-64 w-full bg-gray-900 animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomePage;