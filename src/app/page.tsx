"use client";

import React from "react";
import Navbar from "@/components/ui/NavBar";
import BlurIn from "@/components/magicui/blur-in";
import Link from "next/link";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Star , Globe2, Sparkles, Clock, Users, TrendingUp, ArrowRight , Compass, Shield, Wallet, MapPin, ChevronRight ,Github, Twitter, Linkedin, Search, MessageSquare, Building, Check, X, Minus, Plus, Youtube, Instagram, Plane, Hotel  } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import ConnectedTimelineSection from "@/components/ConnectedTimelineSection";
import PartnershipSection from "@/components/PartnershipSection";


const TestimonialCard: React.FC<{
  content: string;
  author: string;
  role: string;
  company: string;
  imageUrl: string;
}> = ({ content, author, role, company, imageUrl }) => (
  <motion.div 
    className="p-8 rounded-xl bg-white/60 backdrop-blur-sm border border-orange-500/20
               hover:border-orange-500/40 transition-all duration-300"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
  >
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>
      <div className="mt-auto flex items-center">
        <img 
          src={imageUrl} 
          alt={author} 
          className="w-12 h-12 rounded-full mr-4 border border-orange-500/20"
        />
        <div  className="border-t border-orange-500/20 pt-4" >
          <p className="font-semibold text-gray-700">{author}</p>
          <p className="text-sm text-gray-600">{role}</p>
          <p className="text-sm text-orange-500">{company}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export const EnhancedTestimonialsSection = () => (
  <div className="w-full max-w-6xl mx-auto px-4 py-10 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-orange-50/30 to-white/0 -z-10" />
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-700 mb-4">Industry Recognition</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        What industry experts say about Travelas innovative approach
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <TestimonialCard 
        content="Travela is a market-ready product that perfectly addresses a critical gap in the travel industry. The solution's unique blend of real-time adaptability and personalized planning will undoubtedly meet the growing demand for flexible travel solutions."
        author="Mr. Dhanush N"
        role="Founder and CEO"
        company="Interain Intelligence"
        imageUrl="https://media.licdn.com/dms/image/v2/D5603AQELH8WnHoclkA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718479089192?e=1740614400&v=beta&t=89JsLnV4TwRLRHV67xmfRzOEGG7ytbsuFFL5h2R0V6k"
      />
      <TestimonialCard 
        content="Travela's B2B and B2C business model is strategically aligned with revenue opportunities, ensuring it can capture both individual and corporate clients. The product's market positioning and readiness make it well-suited to deliver significant value."
        author="Mr. Sakthivel Shanmugam"
        role="Senior Engineer"
        company="Maker Labs"
        imageUrl="https://media.licdn.com/dms/image/v2/D5603AQE2yPmC9DvDAA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1694529615076?e=1740614400&v=beta&t=BFCwamtiwH0oxgMOLprn27Ac7A7ZD05W1_AMGraAeyk"
      />
    </div>
  </div>
);


interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, description }) => (
  <motion.div 
    className="relative p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-orange-500/20
               hover:border-orange-500/40 transition-all duration-300 group"
    whileHover={{ y: -5 }}
  >
    <div className="absolute -top-4 left-6">
      <div className="p-3 bg-orange-500/10 rounded-full group-hover:bg-orange-500/20 transition-colors">
        {icon}
      </div>
    </div>
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-1">{title}</h3>
      <span className="text-3xl font-bold text-orange-500">{value}</span>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </div>
  </motion.div>
);

export const EnhancedStatsSection = () => (
  <div className="w-full max-w-6xl mx-auto px-4 py-20">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-700 mb-4">Why Choose Travela?</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Setting new standards in travel technology with our innovative approach
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCard 
        icon={<Globe2 className="w-6 h-6 text-orange-500" />}
        title="Market Coverage"
        value="200+"
        description="Cities worldwide where we aim to provide personalized travel experiences"
      />
      <StatCard 
        icon={<Users className="w-6 h-6 text-orange-500" />}
        title="Target Users"
        value="100k+"
        description="Projected user base in first year across B2B and B2C segments"
      />
      <StatCard 
        icon={<Shield className="w-6 h-6 text-orange-500" />}
        title="Safety Score"
        value="99.9%"
        description="Targeted accuracy in real-time safety alerts and recommendations"
      />
      <StatCard 
        icon={<TrendingUp className="w-6 h-6 text-orange-500" />}
        title="AI Efficiency"
        value="85%"
        description="Reduction in travel planning time compared to traditional methods"
      />
    </div>
  </div>
);




interface PricingFeature {
  feature: string;
  included: boolean;
  limit?: string;
}

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
}

const PricingTier: React.FC<PricingTierProps> = ({ name, price, description, features, isPopular }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`relative rounded-xl bg-white/60 backdrop-blur-sm border 
                ${isPopular ? 'border-orange-500' : 'border-orange-500/20'}`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white 
                      px-4 py-1 rounded-full text-sm font-medium">
        Most Popular
      </div>
    )}
    <div className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">{name}</h3>
        <div className="text-3xl font-bold text-orange-500 mb-2">{price}</div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className={`w-5 h-5 mt-1 ${feature.included ? 'text-orange-500' : 'text-gray-300'}`} />
            <div>
              <span className="text-gray-700">{feature.feature}</span>
              {feature.limit && (
                <span className="text-sm text-gray-500 block">{feature.limit}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className={`w-full mt-6 py-2 rounded-full font-medium transition-colors
                         ${isPopular ? 'bg-orange-500 text-white hover:bg-orange-600' : 
                                     'border border-orange-500/20 text-gray-700 hover:bg-orange-50'}`}>
        Get Started
      </button>
    </div>
  </motion.div>
);

export const PricingSection = () => (
  <div className="w-full max-w-6xl mx-auto px-4 py-20">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-gray-700 mb-4">Choose Your Journey</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Flexible plans for every type of traveler
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <PricingTier
        name="Wanderlust"
        price="Free"
        description="Perfect for occasional travelers"
        features={[
          { feature: "Basic AI Recommendations", included: true },
          { feature: "RoamSafe Alerts", included: true, limit: "5 alerts/month" },
          { feature: "Shared Locker", included: true, limit: "2 trips" },
          { feature: "Itinerary Revisions", included: true, limit: "2 per trip" },
          { feature: "Group Planning", included: false },
          { feature: "Hidden Gems Access", included: false }
        ]}
      />
      <PricingTier
        name="Globetrotter"
        price="$9.99/mo"
        description="For frequent travelers"
        isPopular={true}
        features={[
          { feature: "Advanced AI Planning", included: true },
          { feature: "Unlimited RoamSafe Alerts", included: true },
          { feature: "Extended Shared Locker", included: true, limit: "10 trips" },
          { feature: "Itinerary Revisions", included: true, limit: "10 per trip" },
          { feature: "Group Planning", included: true, limit: "Up to 5 people" },
          { feature: "Premium Hidden Gems", included: true }
        ]}
      />
      <PricingTier
        name="Adventurer Pro"
        price="$19.99/mo"
        description="Ultimate travel companion"
        features={[
          { feature: "Premium AI Planning", included: true },
          { feature: "Priority RoamSafe Alerts", included: true },
          { feature: "Unlimited Shared Locker", included: true },
          { feature: "Unlimited Revisions", included: true },
          { feature: "Advanced Group Planning", included: true, limit: "Unlimited" },
          { feature: "VIP Hidden Gems Access", included: true }
        ]}
      />
    </div>
  </div>
);

const ComparisonItem: React.FC<{
  feature: string;
  travela: boolean;
  traditional: boolean;
}> = ({ feature, travela, traditional }) => (
  <div className="grid grid-cols-3 py-4 border-b border-gray-200">
    <span className="text-gray-700">{feature}</span>
    <span className="text-center">
      {travela ? (
        <Check className="w-5 h-5 text-orange-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-400 mx-auto" />
      )}
    </span>
    <span className="text-center">
      {traditional ? (
        <Check className="w-5 h-5 text-gray-400 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-400 mx-auto" />
      )}
    </span>
  </div>
);

// FAQ Section
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-700">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-orange-500" />
        ) : (
          <Plus className="w-5 h-5 text-orange-500" />
        )}
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="pb-4"
        >
          <p className="text-gray-600">{answer}</p>
        </motion.div>
      )}
    </div>
  );
};

export const FAQSection = () => (
  <div className="w-full max-w-4xl mx-auto px-4 py-20">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-700 mb-4">Frequently Asked Questions</h2>
      <p className="text-gray-600">Everything you need to know about Travela</p>
    </div>
    <Card className="bg-white/60 backdrop-blur-sm border border-orange-500/20">
      <CardContent className="p-8">
        <FAQItem 
          question="How does Travela's AI personalization work?"
          answer="Our AI analyzes your preferences, past trips, and travel style to create highly personalized itineraries. It continuously learns from your feedback to improve recommendations."
        />
        <FAQItem 
          question="Is Travela available worldwide?"
          answer="We're initially launching in major tourist destinations across Asia and Europe, with plans to expand globally within the first year."
        />
        <FAQItem 
          question="How does the safety alert system work?"
          answer="Our RoamSafe feature combines real-time data from multiple sources to provide instant safety alerts about your surroundings, weather conditions, and travel advisories."
        />
        <FAQItem 
          question="Can I use Travela for business travel?"
          answer="Yes! We offer specialized B2B solutions for companies to manage their corporate travel needs with enhanced features for team coordination and expense management."
        />
      </CardContent>
    </Card>
  </div>
);

export const FeatureComparisonSection = () => (
  <div className="w-full max-w-4xl mx-auto px-4 py-20">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-700 mb-4">Why Choose Travela?</h2>
      <p className="text-gray-600">See how we compare to traditional travel solutions</p>
    </div>
    <Card className="bg-white/60 backdrop-blur-sm border border-orange-500/20">
      <CardContent className="p-8">
        <div className="grid grid-cols-3 pb-4 border-b border-gray-200">
          <span className="text-gray-700 font-semibold">Features</span>
          <span className="text-center font-semibold text-orange-500">Travela</span>
          <span className="text-center font-semibold text-gray-700">Traditional</span>
        </div>
        <ComparisonItem 
          feature="Real-time Itinerary Updates"
          travela={true}
          traditional={false}
        />
        <ComparisonItem 
          feature="AI-powered Personalization"
          travela={true}
          traditional={false}
        />
        <ComparisonItem 
          feature="24/7 Smart Assistant"
          travela={true}
          traditional={false}
        />
        <ComparisonItem 
          feature="Safety Alerts"
          travela={true}
          traditional={false}
        />
        <ComparisonItem 
          feature="Hidden Gem Recommendations"
          travela={true}
          traditional={false}
        />
        <ComparisonItem 
          feature="Basic Booking"
          travela={true}
          traditional={true}
        />
      </CardContent>
    </Card>
  </div>
);

export const MinimalCTASection = () => (
  <div className="w-full max-w-4xl mx-auto px-4 py-20">
    <Card className="bg-white/60 backdrop-blur-sm border border-orange-500/20">
      <CardContent className="p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">
          Join Us in Reimagining Travel
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Be part of the journey as we transform the future of travel planning. 
          Sign up to get early access and shape the future of Travela.
        </p>
        <button className="px-8 py-3 bg-orange-500 text-white rounded-full font-semibold 
                          hover:bg-orange-600 transition-colors">
          Join the Waitlist
        </button>
      </CardContent>
    </Card>
  </div>
);

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  position: React.CSSProperties;
}

const Footer = () => (
  <footer className="w-full bg-white border-t border-gray-200 py-8 mt-20">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">About Travela</h3>
          <p className="text-gray-600">Your AI-powered travel companion for seamless, personalized adventures.</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Connect</h3>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-600 hover:text-orange-500"><Twitter className="w-5 h-5" /></Link>
            <Link href="#" className="text-gray-600 hover:text-orange-500"><Github className="w-5 h-5" /></Link>
            <Link href="#" className="text-gray-600 hover:text-orange-500"><Linkedin className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-600 mt-8">
        © 2024 Travela. All rights reserved.
      </div>
    </div>
  </footer>
);


const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, position }) => (
  <motion.div
    className="absolute glass-card p-6 rounded-xl backdrop-blur-md 
               bg-white/10 border border-orange-500/30
               hover:bg-white/20 transition-all duration-300
               shadow-lg hover:shadow-orange-500/20
               w-64"
    style={position}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5, scale: 1.01 }}
    transition={{ duration: 0.1 }}
  >
    <div className="flex items-center space-x-4 mb-3">
      <Icon className="w-6 h-6 text-orange-400" />
      <h3 className="text-lg font-medium text-black">{title}</h3>
    </div>
    <p className="text-gray-800 text-sm">{description}</p>
  </motion.div>
);

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