import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Mic, Play, Pause } from 'lucide-react';
import UploadPanel from '../components/UploadPanel';
import { useTheme } from '../contexts/ThemeContext';

const AudioToText: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [accuracy, setAccuracy] = useState(95);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleExtract = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setExtractedText("This is the extracted text from your audio file. The AI speech recognition system has analyzed the audio content and converted it into readable text format. You can now edit, format, or export this text as needed for your documentation or content creation purposes.");
      setIsProcessing(false);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Audio to Text Converter
        </h1>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Transform audio recordings into editable text documents
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <UploadPanel
              acceptedTypes="audio/*"
              onFileSelect={handleFileSelect}
              title="Upload Audio File"
              description="MP3, WAV, M4A, FLAC, and other audio formats supported"
            />

            {selectedFile && (
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Audio Analysis
                </h3>
                
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        File Quality
                      </span>
                      <span className="text-green-600 text-sm font-semibold">Excellent</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Estimated Accuracy
                      </span>
                      <span className="text-blue-600 text-sm font-semibold">{accuracy}%</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Duration
                      </span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>3:45</span>
                    </div>
                  </div>

                  <button
                    onClick={handleExtract}
                    disabled={isProcessing}
                    className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                      isProcessing
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Extracting Text...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        <span>Extract Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Extracted Text
              </h3>
              {extractedText && (
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>TXT</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>DOCX</span>
                  </button>
                </div>
              )}
            </div>

            <div className="h-96">
              {extractedText ? (
                <textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className={`w-full h-full p-4 rounded-lg resize-none ${
                    isDark 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-900 border-gray-300'
                  } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Extracted text will appear here..."
                />
              ) : (
                <div className={`h-full rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="text-center">
                    <Mic className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      No text extracted yet
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Upload audio file and start extraction
                    </p>
                  </div>
                </div>
              )}
            </div>

            {extractedText && (
              <div className="mt-4 text-right">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Word count: {extractedText.split(' ').length} words
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AudioToText;