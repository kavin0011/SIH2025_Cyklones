import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Download, Copy, Eye } from 'lucide-react';
import UploadPanel from '../components/UploadPanel';
import { useTheme } from '../contexts/ThemeContext';

const ImageToDescription: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [detailLevel, setDetailLevel] = useState('medium');
  const [descriptionStyle, setDescriptionStyle] = useState('descriptive');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setDescription("A beautiful mountain landscape at sunset with golden light reflecting off snow-capped peaks. In the foreground, there's a serene lake surrounded by evergreen trees. The sky displays vibrant colors ranging from deep orange to soft pink, creating a peaceful and majestic natural scene that evokes feelings of tranquility and wonder.");
      setIsProcessing(false);
    }, 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Image to Description
        </h1>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Generate detailed captions and descriptions from images using AI
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload and Preview */}
          <div className="space-y-6">
            <UploadPanel
              acceptedTypes="image/*"
              onFileSelect={handleFileSelect}
              title="Upload Image"
              description="JPG, PNG, GIF, WebP images supported"
            />

            {imageUrl && (
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Image Preview
                </h3>
                
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Uploaded image"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-4 text-center">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Image loaded successfully
                  </p>
                </div>
              </div>
            )}

            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Analysis Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Detail Level
                  </label>
                  <select
                    value={detailLevel}
                    onChange={(e) => setDetailLevel(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="basic">Basic (Simple description)</option>
                    <option value="medium">Medium (Detailed description)</option>
                    <option value="detailed">Detailed (Comprehensive analysis)</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description Style
                  </label>
                  <select
                    value={descriptionStyle}
                    onChange={(e) => setDescriptionStyle(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="descriptive">Descriptive</option>
                    <option value="creative">Creative</option>
                    <option value="technical">Technical</option>
                    <option value="artistic">Artistic</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || isProcessing}
                className={`w-full mt-4 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                  !selectedFile || isProcessing
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Analyze Image</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Description Output */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Generated Description
              </h3>
              {description && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              )}
            </div>

            <div className="h-96">
              {description ? (
                <div className="h-full">
                  <div className={`h-4/5 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} overflow-y-auto`}>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'} leading-relaxed`}>
                      {description}
                    </p>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                      <div className="text-lg font-bold text-blue-600">{description.split(' ').length}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Words</div>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                      <div className="text-lg font-bold text-green-600">96%</div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Confidence</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`h-full rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="text-center">
                    <ImageIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      No description generated
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Upload an image and click analyze
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sample Images for Demo */}
        <div className="mt-8">
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Try Sample Images
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                url: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=300',
                title: 'Mountain Landscape' 
              },
              { 
                url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300',
                title: 'City Architecture' 
              },
              { 
                url: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=300',
                title: 'Abstract Art' 
              }
            ].map((sample, index) => (
              <button
                key={index}
                onClick={() => {
                  setImageUrl(sample.url);
                  setSelectedFile(new File([''], 'sample.jpg', { type: 'image/jpeg' }));
                }}
                className={`p-4 rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-3">
                  <img
                    src={sample.url}
                    alt={sample.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {sample.title}
                </h4>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageToDescription;