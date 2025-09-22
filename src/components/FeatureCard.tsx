import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  category: 'video' | 'audio' | 'text' | 'image' | 'document';
}

const categoryColors = {
  video: 'from-purple-500 to-pink-600',
  audio: 'from-green-500 to-teal-600', 
  text: 'from-blue-500 to-indigo-600',
  image: 'from-orange-500 to-red-600',
  document: 'from-yellow-500 to-orange-600'
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, path, category }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        to={path}
        className={`block p-6 rounded-xl transition-all duration-300 group ${
          isDark 
            ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600' 
            : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
        } shadow-lg hover:shadow-xl`}
      >
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${categoryColors[category]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
          {description}
        </p>
        
        <div className={`mt-4 text-sm font-medium bg-gradient-to-r ${categoryColors[category]} bg-clip-text text-transparent`}>
          Try now →
        </div>
      </Link>
    </motion.div>
  );
};

export default FeatureCard;