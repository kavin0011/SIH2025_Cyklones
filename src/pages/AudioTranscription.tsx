import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Play, Pause, Download, Edit3, Volume2 } from 'lucide-react';
import UploadPanel from '../components/UploadPanel';
import { useTheme } from '../contexts/ThemeContext';

const AudioTranscription: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleTranscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setTranscript("Hello, this is a sample transcription of your audio file. The AI has processed the audio and converted it into editable text. You can now edit this text as needed and export it in various formats.");
      setIsProcessing(false);
    }, 3000);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Audio Transcription
        </h1>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Convert speech to text with high accuracy and editing capabilities
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <UploadPanel
              acceptedTypes="audio/*"
              onFileSelect={handleFileSelect}
              title="Upload Audio File"
              description="Support for MP3, WAV, M4A, and other audio formats"
            />

            {selectedFile && (
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Audio Player
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlay}
                      className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    
                    <div className="flex-1">
                      <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} relative`}>
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                        <span>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
                      </div>
                    </div>
                    
                    <Volume2 className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>

                  <button
                    onClick={handleTranscribe}
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
                        <span>Transcribing...</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4" />
                        <span>Start Transcription</span>
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
                Transcript Editor
              </h3>
              <div className="flex space-x-2">
                <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="h-96">
              {transcript ? (
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  className={`w-full h-full p-4 rounded-lg resize-none ${
                    isDark 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-900 border-gray-300'
                  } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Transcript will appear here..."
                />
              ) : (
                <div className={`h-full rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="text-center">
                    <Mic className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      No transcript available
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Upload audio and start transcription
                    </p>
                  </div>
                </div>
              )}
            </div>

            {transcript && (
              <div className="mt-4 flex space-x-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Export as TXT
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Export as DOCX
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AudioTranscription;