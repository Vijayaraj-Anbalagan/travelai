import { Check, X } from "lucide-react";
import { Card, CardContent } from "./ui/card";

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
  