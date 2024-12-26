"use client";

import React from "react";
import Navbar from "@/components/ui/NavBar";
import Link from "next/link";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Star , Globe2, Sparkles, Clock, Users, TrendingUp, ArrowRight , Compass, Shield, Wallet, MapPin, ChevronRight ,Github, Twitter, Linkedin, Search, MessageSquare, Building, Check, X, Minus, Plus, Youtube, Instagram, Plane, Hotel  } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import ConnectedTimelineSection from "@/components/ConnectedTimelineSection";
import PartnershipSection from "@/components/PartnershipSection";
import EnhancedTestimonialsSection from "@/components/EnhancedTestimonialsSection";
import {EnhancedStatsSection} from "@/components/EnhancedStatsSection";
import {PricingSection} from "@/components/PricingSection";
import {FAQSection} from "@/components/FAQItem";
import {FeatureComparisonSection} from "@/components/FeatureComparisonSection";
import {MinimalCTASection} from "@/components/MinimalCTASection";
import {Footer} from "@/components/Footer";
import {FeatureCard } from "@/components/FeatureCard";

const HomePage = () => {
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

  


  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col items-center justify-start pt-20 px-4">
        <div className="text-center space-y-6 mb-12 mt-8">
          <AnimatedGradientText>
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
          <h1 className="font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem] text-orange-500" >Explore the World with Travela</h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Dive into unique experiences with our tailored travel plans, designed just for you.
          </p>
        </div>

        <Link 
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 
                     rounded-full transition-all duration-300 z-10 border-white border-2 
                     hover:scale-105 mb-16" 
          href={'/login'}
        >
          Get Started <span className="ml-1">&#8594;</span>
        </Link>
        <div className="relative h-[600px] w-full mt-10">
         <img 
          src="/globe.png" 
          alt="Globe" 
          className="absolute w-full max-w-4xl h-auto opacity-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" 
        />
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            <FeatureCard {...feature} />
          </React.Fragment>
        ))}
        </div>
        <EnhancedStatsSection />
        <ConnectedTimelineSection />
        <PartnershipSection />
        <EnhancedTestimonialsSection />
        <FeatureComparisonSection />
        <PricingSection />
        <FAQSection />
        <MinimalCTASection />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;