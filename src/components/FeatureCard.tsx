import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    position: React.CSSProperties;
  }
  
  
  
  
  export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, position }) => (
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