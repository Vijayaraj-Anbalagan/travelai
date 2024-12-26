import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, MessageSquare, Shield, MapPin } from 'lucide-react';

interface TimelineStepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ step, title, description, icon }) => (
  <div className="flex items-start gap-4 mb-12 last:mb-0">
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      className="relative"
    >
      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold z-10">
        {step}
      </div>
      {step !== 4 && <div className="absolute left-1/2 top-10 w-0.5 h-16 bg-orange-500/20 -translate-x-1/2" />}
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="flex-1 bg-white/60 backdrop-blur-sm border border-orange-500/20 
                 rounded-xl p-4 hover:border-orange-500/40 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-orange-500/10 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  </div>
);

export const ConnectedTimelineSection = () => (
  <div className="w-full py-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-700 mb-4">Your Journey with Travela</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Experience seamless travel planning from start to finish
      </p>
    </div>
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2">
          <TimelineStep
            step={1}
            icon={<Globe2 className="w-5 h-5 text-orange-500" />}
            title="Share Your Travel Dreams"
            description="Tell us your preferences and travel style. Our AI builds your perfect profile."
          />
          <TimelineStep
            step={2}
            icon={<MessageSquare className="w-5 h-5 text-orange-500" />}
            title="Get Smart Recommendations"
            description="Receive AI-curated itineraries tailored just for you."
          />
          <TimelineStep
            step={3}
            icon={<Shield className="w-5 h-5 text-orange-500" />}
            title="Travel with Confidence"
            description="Enjoy 24/7 AI support and real-time safety alerts throughout your journey."
          />
          <TimelineStep
            step={4}
            icon={<MapPin className="w-5 h-5 text-orange-500" />}
            title="Discover & Share"
            description="Explore hidden gems and share your experiences with fellow travelers."
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 border border-orange-500 rounded-2xl" />
            <img
              src="/journey.webp"
              alt="Travel Journey"
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);

export default ConnectedTimelineSection;