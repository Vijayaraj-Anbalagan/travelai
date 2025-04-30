import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  position: React.CSSProperties;
  onHover?: () => void;
  onLeave?: () => void;
  isActive?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  position, 
  onHover, 
  onLeave,
  isActive = false 
}) => (
  <motion.div
    className={`absolute glass-card p-6 rounded-xl 
               bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-lg
               border ${isActive ? 'border-orange-500/50' : 'border-orange-500/20'} 
               shadow-lg hover:shadow-orange-500/30 hover:border-orange-500/40
               transition-all duration-300 w-64 z-10`}
    style={position}
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ 
      y: -8, 
      scale: 1.03,
      transition: { duration: 0.2 }
    }}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <div className="flex items-center space-x-4 mb-3">
      <motion.div 
        className="p-2 bg-orange-100 rounded-full"
        whileHover={{ rotate: 15 }}
      >
        <Icon className="w-5 h-5 text-orange-500" />
      </motion.div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    
    <motion.div 
      className="absolute -bottom-2 -right-2 w-12 h-12 bg-orange-500/10 rounded-full z-[-1]"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity,
        repeatType: "reverse" 
      }}
    />
  </motion.div>
);