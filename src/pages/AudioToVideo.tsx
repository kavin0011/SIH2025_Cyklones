import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Play, Download, Settings, User, Mic } from 'lucide-react';
import UploadPanel from '../components/UploadPanel';
import { useTheme } from '../contexts/ThemeContext';

const AudioToVideo: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarStyle, setAvatarStyle] = useState('professional');
  const [videoStyle, setVideoStyle] = useState('presentation');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleGenerate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Audio to Video Generator
        </h1>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Generate animated videos from audio with AI avatars and lip-sync
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <UploadPanel
              acceptedTypes="audio/*"
              onFileSelect={handleFileSelect}
              title="Upload Audio File"
              description="Voice recordings, narration, or any audio content"
            />

            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Avatar Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Avatar Style
                  </label>
                  <select
                    value={avatarStyle}
                    onChange={(e) => setAvatarStyle(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="animated">Animated</option>
                    <option value="realistic">Realistic</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Video Style
                  </label>
                  <select
                    value={videoStyle}
                    onChange={(e) => setVideoStyle(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="presentation">Presentation</option>
                    <option value="news">News Anchor</option>
                    <option value="educational">Educational</option>
                    <option value="social">Social Media</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Preview Settings
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {['Avatar 1', 'Avatar 2', 'Avatar 3'].map((avatar, index) => (
                  <div
                    key={avatar}
                    className={`aspect-square rounded-lg border-2 transition-colors cursor-pointer ${
                      index === 0 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : `border-gray-300 dark:border-gray-600 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`
                    } flex items-center justify-center`}
                  >
                    <User className={`w-8 h-8 ${index === 0 ? 'text-blue-600' : `${isDark ? 'text-gray-500' : 'text-gray-400'}`}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Video Preview
            </h3>
            
            {selectedFile ? (
              <div className="space-y-6">
                <div className={`aspect-video rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="text-center">
                    <Play className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Generated video preview
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h4 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Audio Analysis
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Duration:</span>
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>2:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Voice Quality:</span>
                      <span className="text-sm font-medium text-green-600">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Language:</span>
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>English</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleGenerate}
                    disabled={isProcessing}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      isProcessing
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4" />
                        <span>Generate Video</span>
                      </>
                    )}
                  </button>

                  <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className={`flex items-center justify-center h-64 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-center">
                  <Mic className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    No audio uploaded
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Upload audio to generate video
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AudioToVideo;