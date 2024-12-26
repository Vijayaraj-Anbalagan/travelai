import { motion } from 'framer-motion';
import { Check } from 'lucide-react';


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
  