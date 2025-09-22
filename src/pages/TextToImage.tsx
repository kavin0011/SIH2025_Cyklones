import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Download, Sparkles, RefreshCw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TextToImage: React.FC = () => {
  const { isDark } = useTheme();
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageStyle, setImageStyle] = useState('photorealistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [quality, setQuality] = useState('high');

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      // Using a placeholder image URL (in real app, this would be from AI service)
      setGeneratedImage('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800');
      setIsGenerating(false);
    }, 3000);
  };

  const regenerateImage = () => {
    handleGenerate();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Text to Image Generator
        </h1>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Generate stunning images from text prompts using AI
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prompt and Settings */}
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Image Prompt
              </h3>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create... (e.g., 'A serene mountain landscape at sunset with a crystal clear lake reflecting the golden sky')"
                className={`w-full h-32 p-4 rounded-lg resize-none ${
                  isDark 
                    ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' 
                    : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500'
                } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              
              <div className="mt-4 text-right">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {prompt.length}/500 characters
                </span>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Generation Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Style
                  </label>
                  <select
                    value={imageStyle}
                    onChange={(e) => setImageStyle(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="photorealistic">Photorealistic</option>
                    <option value="artistic">Artistic</option>
                    <option value="cartoon">Cartoon</option>
                    <option value="abstract">Abstract</option>
                    <option value="vintage">Vintage</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Aspect Ratio
                  </label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="1:1">Square (1:1)</option>
                    <option value="16:9">Landscape (16:9)</option>
                    <option value="9:16">Portrait (9:16)</option>
                    <option value="4:3">Classic (4:3)</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Quality
                  </label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="standard">Standard</option>
                    <option value="high">High Quality</option>
                    <option value="ultra">Ultra Quality</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors flex-1 justify-center ${
                  !prompt.trim() || isGenerating
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Image</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Image */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Generated Image
              </h3>
              {generatedImage && (
                <div className="flex space-x-2">
                  <button
                    onClick={regenerateImage}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>

            <div className="aspect-square rounded-lg overflow-hidden">
              {generatedImage ? (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={generatedImage}
                  alt="Generated image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`h-full rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="text-center">
                    <ImageIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      No image generated
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Enter a prompt and generate your image
                    </p>
                  </div>
                </div>
              )}
            </div>

            {generatedImage && (
              <div className="mt-4 space-y-2">
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex justify-between text-sm">
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Resolution:</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>1024x1024</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Style:</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{imageStyle}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prompt Examples */}
        <div className="mt-8">
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Popular Prompts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'A futuristic cityscape at night with neon lights',
              'A peaceful forest clearing with sunbeams filtering through trees',
              'An abstract painting with vibrant colors and geometric shapes',
              'A cozy coffee shop on a rainy evening',
              'A majestic mountain peak covered in snow',
              'A vintage car driving through a desert landscape'
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example)}
                className={`p-4 text-left rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300' 
                    : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-sm">{example}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TextToImage;