import React from 'react';
import { motion } from 'framer-motion';
import { Building, Hotel, Plane, Wallet, Utensils, Youtube, MapPin, Instagram, Users, Award, Star, Zap } from 'lucide-react';

interface PartnerCardProps {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  role: string;
  description: string;
  stats?: { label: string; value: string }[];
  className?: string;
  showIcons?: boolean;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ 
  icon: Icon, 
  name, 
  role, 
  description, 
  stats,
  className,
  showIcons = false
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`${className} bg-white/60 backdrop-blur-md border border-orange-500/20 
                rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group
                flex flex-col relative overflow-hidden`}
  >
    {/* Background Pattern SVG */}
    <div className="absolute inset-0 opacity-5">
      <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </pattern>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>

    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300" />

    <div className="relative z-10 h-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-orange-100 p-2 rounded-xl">
          <Icon className="w-6 h-6 text-orange-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-700 leading-tight">{name}</h3>
          <p className="text-sm font-medium text-orange-600">{role}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      {/* Stats Section - Only shown if stats are provided */}
      {stats && (
        <div className="mt-auto pt-4 border-t border-orange-100 grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-lg font-semibold text-gray-700">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Hover Effect Icons - Only shown if showIcons is true */}
      {showIcons && (
        <motion.div 
          className="absolute top-2 right-2 flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Star className="w-4 h-4 text-orange-300" />
          <Zap className="w-4 h-4 text-orange-400" />
        </motion.div>
      )}
    </div>
  </motion.div>
);

export const PartnershipSection = () => (
  <div className="w-full max-w-6xl mx-auto px-4 py-5">
    <div className="text-center mb-12">
      <div className="flex justify-center mb-4">
        <Award className="w-12 h-12 text-orange-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-700 mb-4">Partnership Ecosystem</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Join our network of trusted partners to reshape the future of travel
      </p>
    </div>

    <div className="grid w-full gap-4 p-2 grid-cols-4 grid-rows-3 rounded-xl">
      {/* Hotels & Accommodation */}
      <PartnerCard 
        icon={Hotel}
        name="Hotels & Resorts"
        role="Accommodation Partners"
        description="List your property on our platform and reach travelers through AI-powered recommendations. Access real-time analytics and booking insights."
        stats={[
          { label: "Active Properties", value: "2,500+" },
          { label: "Avg. Rating", value: "4.8★" }
        ]}
        className="col-span-2 row-span-1 min-h-[250px]"
        showIcons={true}
      />
      
      {/* Restaurants */}
      <PartnerCard 
        icon={Utensils}
        name="Restaurants & Cafes"
        role="Dining Partners"
        description="Showcase your culinary experiences to travelers seeking authentic local dining. Get featured in AI-curated food trails."
        stats={[
          { label: "Restaurant Partners", value: "5,000+" },
          { label: "Cities Covered", value: "150+" }
        ]}
        className="col-span-2 row-span-1 min-h-[250px]"
        showIcons={true}
      />
      
      {/* Featured Travel Agencies */}
      <PartnerCard 
        icon={Building}
        name="Travel Agencies"
        role="Tour Operators"
        description="Connect with travelers and offer your curated experiences through our AI-powered platform. Access advanced booking management tools."
        stats={[
          { label: "Monthly Bookings", value: "10K+" },
          { label: "Partner Rating", value: "4.9★" }
        ]}
        className="col-span-1 row-span-2"
      />
      
      {/* Transportation */}
      <PartnerCard 
        icon={Plane}
        name="Transportation"
        role="Travel Partners"
        description="Airlines, car rentals, and local transport services integrated into our smart itineraries. Real-time availability and dynamic pricing."
        stats={[
          { label: "Transport Partners", value: "300+" },
          { label: "Routes Covered", value: "1,000+" }
        ]}
        className="col-span-2 row-span-1"
        showIcons={true}
      />
      
      {/* Financial Services */}
      <PartnerCard 
        icon={Wallet}
        name="Financial Services"
        role="Banking Partners"
        description="Power our TravelStash feature with your financial products and travel cards. Integrated payment solutions and travel insurance."
        stats={[
          { label: "Transaction Volume", value: "$50M+" },
          { label: "Active Users", value: "100K+" }
        ]}
        className="col-span-1 row-span-1"
      />
      
      {/* Bottom section for content creators */}
      <motion.div className="col-span-3 row-span-1 grid grid-cols-3 gap-4">
        <PartnerCard 
          icon={Youtube}
          name="Video Creators"
          role="Content Partners"
          description="Share your travel content and earn through our creator program. Access analytics and audience insights."
          stats={[
            { label: "Content Views", value: "1M+" },
            { label: "Avg. Earnings", value: "$2.5K" }
          ]}
          className="col-span-1 h-full"
        />
        <PartnerCard 
          icon={Instagram}
          name="Travel Influencers"
          role="Social Partners"
          description="Monetize your hidden gems and local insights through our platform. Join exclusive creator events."
          stats={[
            { label: "Active Creators", value: "5K+" },
            { label: "Engagement Rate", value: "8.2%" }
          ]}
          className="col-span-1 h-full"
        />
        <PartnerCard 
          icon={MapPin}
          name="Local Experts"
          role="Knowledge Partners"
          description="Share your local expertise and earn through verified recommendations. Build your reputation score."
          stats={[
            { label: "Local Guides", value: "3K+" },
            { label: "Cities Covered", value: "200+" }
          ]}
          className="col-span-1 h-full"
        />
      </motion.div>
    </div>
  </div>
);

export default PartnershipSection;