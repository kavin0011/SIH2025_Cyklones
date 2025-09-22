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

const Features: React.FC = () => {
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

  const categories = [
    { name: 'All', count: features.length },
    { name: 'Video', count: features.filter(f => f.category === 'video').length },
    { name: 'Audio', count: features.filter(f => f.category === 'audio').length },
    { name: 'Text', count: features.filter(f => f.category === 'text').length },
    { name: 'Image', count: features.filter(f => f.category === 'image').length },
    { name: 'Document', count: features.filter(f => f.category === 'document').length }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            All AI Features
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore our complete suite of AI-powered content creation tools
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`px-6 py-3 rounded-lg border transition-colors ${
                isDark
                  ? 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Features;