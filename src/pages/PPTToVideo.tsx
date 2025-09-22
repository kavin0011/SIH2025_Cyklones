import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Play, Download, Settings, Volume2 } from 'lucide-react';
import UploadPanel from '../components/UploadPanel';
import { useTheme } from '../contexts/ThemeContext';

const PPTToVideo: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [voiceStyle, setVoiceStyle] = useState('professional');
  const [videoQuality, setVideoQuality] = useState('1080p');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          PPT/PDF to Video Converter
        </h1>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Convert presentations into engaging narrated videos automatically
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <UploadPanel
              acceptedTypes=".ppt,.pptx,.pdf"
              onFileSelect={handleFileSelect}
              title="Upload Presentation"
              description="Support for PPT, PPTX, and PDF files"
            />

            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Video Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Voice Style
                  </label>
                  <select
                    value={voiceStyle}
                    onChange={(e) => setVoiceStyle(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="energetic">Energetic</option>
                    <option value="calm">Calm</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Video Quality
                  </label>
                  <select
                    value={videoQuality}
                    onChange={(e) => setVideoQuality(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="720p">720p HD</option>
                    <option value="1080p">1080p Full HD</option>
                    <option value="4k">4K Ultra HD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Preview
            </h3>
            
            {selectedFile ? (
              <div className="space-y-6">
                <div className={`aspect-video rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="text-center">
                    <Play className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Video preview will appear here
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h4 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Generated Script Preview
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} italic`}>
                    "Welcome to this presentation. Today we'll be exploring the key concepts..."
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleProcess}
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
                        <span>Converting...</span>
                      </>
                    ) : (
                      <>
                        <Settings className="w-4 h-4" />
                        <span>Convert to Video</span>
                      </>
                    )}
                  </button>

                  <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className={`flex items-center justify-center h-64 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-center">
                  <FileText className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    No presentation uploaded
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Upload a PPT or PDF to start conversion
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

export default PPTToVideo;