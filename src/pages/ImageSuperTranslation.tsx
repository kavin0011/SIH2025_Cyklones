import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Download, Languages, ScanLine, FileText } from 'lucide-react';
import UploadPanel from '../components/UploadPanel';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const ImageSuperTranslation: React.FC = () => {
  const { isDark } = useTheme();
  const { languages } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [processStep, setProcessStep] = useState(0);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleProcess = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setProcessStep(1);
    
    // Step 1: OCR
    setTimeout(() => {
      setExtractedText("Welcome to our AI-powered translation service. This text was extracted from your image using advanced OCR technology.");
      setProcessStep(2);
      
      // Step 2: Translation
      setTimeout(() => {
        setTranslatedText("हमारी AI-संचालित अनुवाद सेवा में आपका स्वागत है। यह पाठ उन्नत OCR तकनीक का उपयोग करके आपकी छवि से निकाला गया था।");
        setProcessStep(3);
        setIsProcessing(false);
      }, 2000);
    }, 2000);
  };

  const steps = [
    { id: 1, name: 'OCR Extraction', icon: ScanLine, description: 'Extracting text from image' },
    { id: 2, name: 'Translation', icon: Languages, description: 'Translating extracted text' },
    { id: 3, name: 'Complete', icon: FileText, description: 'Process completed' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Image Super-Translation
        </h1>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Extract, translate, and overlay text from images with OCR technology
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload and Settings */}
          <div className="space-y-6">
            <UploadPanel
              acceptedTypes="image/*"
              onFileSelect={handleFileSelect}
              title="Upload Image with Text"
              description="Images containing text, documents, signs, screenshots"
            />

            {imageUrl && (
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Image Preview
                </h3>
                
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Uploaded image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Language Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Detected Language
                  </label>
                  <select
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Target Language
                  </label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleProcess}
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
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <ScanLine className="w-4 h-4" />
                    <span>Extract & Translate</span>
                  </>
                )}
              </button>
            </div>

            {/* Process Steps */}
            {isProcessing && (
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Processing Steps
                </h3>
                
                <div className="space-y-4">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        processStep >= step.id
                          ? 'bg-blue-50 dark:bg-blue-900/20'
                          : `${isDark ? 'bg-gray-700' : 'bg-gray-100'}`
                      }`}
                    >
                      <step.icon
                        className={`w-5 h-5 ${
                          processStep >= step.id
                            ? 'text-blue-600 dark:text-blue-400'
                            : `${isDark ? 'text-gray-500' : 'text-gray-400'}`
                        }`}
                      />
                      <div>
                        <p className={`font-medium ${
                          processStep >= step.id
                            ? 'text-blue-600 dark:text-blue-400'
                            : `${isDark ? 'text-gray-300' : 'text-gray-700'}`
                        }`}>
                          {step.name}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {step.description}
                        </p>
                      </div>
                      {processStep > step.id && (
                        <div className="ml-auto text-green-600">✓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Extracted Text */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Extracted Text (OCR)
                </h3>
                {extractedText && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                )}
              </div>

              <div className="h-32">
                {extractedText ? (
                  <div className={`h-full p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} overflow-y-auto`}>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'} text-sm leading-relaxed`}>
                      {extractedText}
                    </p>
                  </div>
                ) : (
                  <div className={`h-full rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="text-center">
                      <ScanLine className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Extracted text will appear here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Translated Text */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Translated Text
                </h3>
                {translatedText && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                )}
              </div>

              <div className="h-32">
                {translatedText ? (
                  <div className={`h-full p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} overflow-y-auto`}>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'} text-sm leading-relaxed`}>
                      {translatedText}
                    </p>
                  </div>
                ) : (
                  <div className={`h-full rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="text-center">
                      <Languages className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Translated text will appear here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Output Options */}
            {translatedText && (
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Export Options
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>Text File</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <ImageIcon className="w-4 h-4" />
                    <span>Annotated Image</span>
                  </button>
                </div>
                
                <div className="mt-4 text-center">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Translation confidence: 94%
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sample Images */}
        <div className="mt-8">
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Try Sample Images
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                url: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=300',
                title: 'Street Signs' 
              },
              { 
                url: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=300',
                title: 'Menu Card' 
              },
              { 
                url: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=300',
                title: 'Document Page' 
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

export default ImageSuperTranslation;