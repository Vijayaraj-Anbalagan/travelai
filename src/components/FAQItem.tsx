import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./ui/card";

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
  