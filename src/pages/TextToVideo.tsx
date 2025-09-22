import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Play, Download, Settings, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TextToVideo: React.FC = () => {
  const { isDark } = useTheme();
  const [script, setScript] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoStyle, setVideoStyle] = useState('professional');
  const [avatarType, setAvatarType] = useState('realistic');
  const [backgroundType, setBackgroundType] = useState('office');

  const handleGenerate = () => {
    if (!script.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedVideo('video-generated');
      setIsGenerating(false);
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
          Text to Video Creator
        </h1>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Create engaging videos from scripts with AI scenes and avatars
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Script and Settings */}
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Video Script
              </h3>
              
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Enter your video script here... The AI will create scenes, add avatars, and generate a complete video based on your content."
                className={`w-full h-48 p-4 rounded-lg resize-none ${
                  isDark 
                    ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' 
                    : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500'
                } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              
              <div className="mt-4 text-right">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {script.length}/2000 characters
                </span>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Video Settings
              </h3>
              
              <div className="space-y-4">
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
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="educational">Educational</option>
                    <option value="marketing">Marketing</option>
                    <option value="news">News Style</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Avatar Type
                  </label>
                  <select
                    value={avatarType}
                    onChange={(e) => setAvatarType(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="realistic">Realistic Human</option>
                    <option value="animated">Animated Character</option>
                    <option value="cartoon">Cartoon Style</option>
                    <option value="minimal">Minimalist</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Background
                  </label>
                  <select
                    value={backgroundType}
                    onChange={(e) => setBackgroundType(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="office">Modern Office</option>
                    <option value="studio">Studio</option>
                    <option value="home">Home Setting</option>
                    <option value="outdoor">Outdoor Scene</option>
                    <option value="abstract">Abstract</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!script.trim() || isGenerating}
              className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                !script.trim() || isGenerating
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Video...</span>
                </>
              ) : (
                <>
                  <Video className="w-4 h-4" />
                  <span>Generate Video</span>
                </>
              )}
            </button>
          </div>

          {/* Video Preview */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Generated Video
              </h3>
              {generatedVideo && (
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              )}
            </div>

            {generatedVideo ? (
              <div className="space-y-6">
                <div className={`aspect-video rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="text-center">
                    <Play className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Click to play generated video
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h4 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Video Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Duration:</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>1:45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Resolution:</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>1080p</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Style:</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{videoStyle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Avatar:</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{avatarType}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Download MP4
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Export GIF
                  </button>
                </div>
              </div>
            ) : (
              <div className={`flex items-center justify-center h-64 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-center">
                  <User className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    No video generated
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Enter a script to create your video
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Script Examples */}
        <div className="mt-8">
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Script Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Product Introduction',
                script: 'Welcome to our revolutionary new product that will transform the way you work. With cutting-edge technology and user-friendly design, we\'re excited to show you what\'s possible.'
              },
              {
                title: 'Educational Content',
                script: 'Today we\'ll explore the fundamentals of artificial intelligence and how it\'s changing our world. Let\'s start with the basic concepts and work our way up to practical applications.'
              }
            ].map((template, index) => (
              <button
                key={index}
                onClick={() => setScript(template.script)}
                className={`p-4 text-left rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300' 
                    : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {template.title}
                </h4>
                <p className="text-sm opacity-75">{template.script}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TextToVideo;