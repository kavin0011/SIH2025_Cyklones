import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Zap, Copy } from 'lucide-react';
import UploadPanel from '../components/UploadPanel';
import { useTheme } from '../contexts/ThemeContext';

const TextSummarize: React.FC = () => {
  const { isDark } = useTheme();
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaryLength, setSummaryLength] = useState('medium');
  const [summaryType, setSummaryType] = useState('extractive');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // In real app, would read file content
    setInputText("Sample document content would be loaded here from the uploaded file...");
  };

  const handleSummarize = () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setSummary("This is an AI-generated summary of your text. The key points have been extracted and condensed while maintaining the core meaning and important details. The summary preserves the essential information in a more concise format, making it easier to understand the main concepts and takeaways from the original content.");
      setIsProcessing(false);
    }, 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Text Summarization
        </h1>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Automatically generate concise summaries from long documents
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <UploadPanel
              acceptedTypes=".txt,.doc,.docx,.pdf"
              onFileSelect={handleFileSelect}
              title="Upload Document"
              description="Support for TXT, DOC, DOCX, and PDF files"
            />

            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Or Enter Text Directly
              </h3>
              
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here for summarization..."
                className={`w-full h-48 p-4 rounded-lg resize-none ${
                  isDark 
                    ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' 
                    : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500'
                } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              
              <div className="mt-4 text-right">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {inputText.split(' ').length} words
                </span>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Summary Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Summary Length
                  </label>
                  <select
                    value={summaryLength}
                    onChange={(e) => setSummaryLength(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="short">Short (25% of original)</option>
                    <option value="medium">Medium (50% of original)</option>
                    <option value="long">Long (75% of original)</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Summary Type
                  </label>
                  <select
                    value={summaryType}
                    onChange={(e) => setSummaryType(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="extractive">Extractive (Key sentences)</option>
                    <option value="abstractive">Abstractive (Paraphrased)</option>
                    <option value="bullet">Bullet Points</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSummarize}
                disabled={!inputText.trim() || isProcessing}
                className={`w-full mt-4 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                  !inputText.trim() || isProcessing
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Summarizing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Generate Summary</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Summary Output */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Generated Summary
              </h3>
              {summary && (
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
              {summary ? (
                <div className="h-full">
                  <div className={`h-4/5 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} overflow-y-auto`}>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'} leading-relaxed`}>
                      {summary}
                    </p>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="text-lg font-bold text-blue-600">85%</div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Reduction</div>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="text-lg font-bold text-green-600">94%</div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Accuracy</div>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="text-lg font-bold text-purple-600">{summary.split(' ').length}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Words</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`h-full rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="text-center">
                    <FileText className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      No summary generated
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Upload document or enter text to summarize
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sample Texts for Demo */}
        <div className="mt-8">
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Try Sample Texts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'News Article',
                preview: 'Scientists have discovered a new method for treating...'
              },
              {
                title: 'Research Paper',
                preview: 'The study examines the impact of artificial intelligence on...'
              }
            ].map((sample, index) => (
              <button
                key={index}
                onClick={() => setInputText("This is a sample text that would demonstrate the summarization capabilities of the AI system. In a real implementation, this would contain the full sample text content for users to test the summarization feature with realistic content.")}
                className={`p-4 text-left rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300' 
                    : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {sample.title}
                </h4>
                <p className="text-sm opacity-75">{sample.preview}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TextSummarize;