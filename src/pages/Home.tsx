import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '../components/FeatureCard';
import { 
  Video, 
  FileText, 
  Mic, 
  Headphones, 
  Languages, 
  Image, 
  MessageSquare,
  FileImage,
  FilePenLine,
  ScanLine,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Home: React.FC = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: Video,
      title: 'Video Dubbing',
      description: 'AI-powered video dubbing with lip-sync technology and multi-language support',
      path: '/video-dubbing',
      category: 'video' as const
    },
    {
      icon: Video,
      title: 'PPT/PDF to Video',
      description: 'Convert presentations into engaging narrated videos automatically',
      path: '/ppt-to-video',
      category: 'document' as const
    },
    {
      icon: Mic,
      title: 'Audio Transcription',
      description: 'Convert speech to text with high accuracy and editing capabilities',
      path: '/audio-transcription',
      category: 'audio' as const
    },
    {
      icon: FileText,
      title: 'Audio to Text',
      description: 'Transform audio recordings into editable text documents',
      path: '/audio-to-text',
      category: 'audio' as const
    },
    {
      icon: Video,
      title: 'Audio to Video',
      description: 'Generate animated videos from audio with AI avatars and lip-sync',
      path: '/audio-to-video',
      category: 'video' as const
    },
    {
      icon: Languages,
      title: 'Text Translation',
      description: 'Translate text between multiple languages with context awareness',
      path: '/text-translate',
      category: 'text' as const
    },
    {
      icon: Image,
      title: 'Text to Image',
      description: 'Generate stunning images from text prompts using AI',
      path: '/text-to-image',
      category: 'image' as const
    },
    {
      icon: Headphones,
      title: 'Text to Speech',
      description: 'Convert text into natural-sounding speech with voice customization',
      path: '/text-to-speech',
      category: 'audio' as const
    },
    {
      icon: Video,
      title: 'Text to Video',
      description: 'Create engaging videos from scripts with AI scenes and avatars',
      path: '/text-to-video',
      category: 'video' as const
    },
    {
      icon: FilePenLine,
      title: 'Text Summarization',
      description: 'Automatically generate concise summaries from long documents',
      path: '/text-summarize',
      category: 'text' as const
    },
    {
      icon: FileText,
      title: 'Document Translation',
      description: 'Translate PDFs, Word docs, and presentations while preserving format',
      path: '/document-translation',
      category: 'document' as const
    },
    {
      icon: ScanLine,
      title: 'Image to Description',
      description: 'Generate detailed captions and descriptions from images using AI',
      path: '/image-to-description',
      category: 'image' as const
    },
    {
      icon: FileImage,
      title: 'Image Super-Translation',
      description: 'Extract, translate, and overlay text from images with OCR technology',
      path: '/image-super-translation',
      category: 'image' as const
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            Powered by Advanced AI
          </span>
        </div>
        
        <h1 className={`text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Bring any idea to life with
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Video & Audio Tools
          </span>
        </h1>
        
        <p className={`text-xl mb-8 max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
          AI-powered dubbing, translations, and multimedia creation. Transform your content 
          across languages and formats with cutting-edge artificial intelligence.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Start Creating Now
        </motion.button>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className={`text-3xl font-bold text-center mb-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Explore Our AI-Powered Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          { label: 'Languages Supported', value: '150+' },
          { label: 'Files Processed', value: '1M+' },
          { label: 'Happy Users', value: '50K+' }
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {stat.value}
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;