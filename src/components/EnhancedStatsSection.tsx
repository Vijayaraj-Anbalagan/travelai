
import { motion } from "framer-motion";
import { Globe2, Users, Shield, TrendingUp, Layers, CheckCircle, Clock } from "lucide-react";

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
          title="Integrations"
          value="5+"
          description="Unique features for seamless travel planning and execution"
        />
        <StatCard 
          icon={<Layers  className="w-6 h-6 text-orange-500" />}
          title="Modules"
          value="10+"
          description="Customizable modules for personalized travel experiences"
        />
        <StatCard 
          icon={<CheckCircle  className="w-6 h-6 text-orange-500" />}
          title="Itinerary Accuracy"
          value="90%"
          description="Accuracy in travel plans and real-time updates"
        />
        <StatCard 
          icon={<Clock  className="w-6 h-6 text-orange-500" />}
          title="Efficiency"
          value="50%"
          description="Time saved in planning and executing travel plans"
        />
      </div>
    </div>
  );
  