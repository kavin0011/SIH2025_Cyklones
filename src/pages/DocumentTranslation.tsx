import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Languages, Check } from 'lucide-react';
import UploadPanel from '../components/UploadPanel';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const DocumentTranslation: React.FC = () => {
  const { isDark } = useTheme();
  const { languages } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguages, setTargetLanguages] = useState<string[]>(['hi']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preserveFormat, setPreserveFormat] = useState(true);
  const [translationResults, setTranslationResults] = useState<any[]>([]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleTranslate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setTranslationResults([
        { language: 'hi', status: 'completed', progress: 100 },
        { language: 'ta', status: 'completed', progress: 100 }
      ]);
      setIsProcessing(false);
    }, 3000);
  };

  const toggleTargetLanguage = (langCode: string) => {
    setTargetLanguages(prev => 
      prev.includes(langCode) 
        ? prev.filter(code => code !== langCode)
        : [...prev, langCode]
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Document Translation
        </h1>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Translate PDFs, Word docs, and presentations while preserving format
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload and Settings */}
          <div className="space-y-6">
            <UploadPanel
              acceptedTypes=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
              onFileSelect={handleFileSelect}
              title="Upload Document"
              description="PDF, Word, PowerPoint, Excel files supported"
            />

            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Language Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Source Language
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
                  <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Target Languages (Select multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {languages.filter(lang => lang.code !== sourceLanguage).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => toggleTargetLanguage(lang.code)}
                        className={`p-3 text-left rounded-lg border transition-colors ${
                          targetLanguages.includes(lang.code)
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400'
                            : `${isDark ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300' : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'}`
                        }`}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                        {targetLanguages.includes(lang.code) && (
                          <Check className="w-4 h-4 float-right mt-0.5" />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {targetLanguages.length} languages selected
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Translation Options
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Preserve Original Formatting
                    </span>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Maintain fonts, layouts, and styles
                    </p>
                  </div>
                  <button
                    onClick={() => setPreserveFormat(!preserveFormat)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preserveFormat ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    } relative`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      preserveFormat ? 'translate-x-6' : 'translate-x-0.5'
                    } absolute top-0.5`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Translation Results */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Translation Status
            </h3>
            
            {selectedFile ? (
              <div className="space-y-6">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Source Document
                  </h4>
                  <div className="flex items-center space-x-3">
                    <FileText className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {selectedFile.name}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>

                {translationResults.length > 0 ? (
                  <div className="space-y-4">
                    {translationResults.map((result, index) => {
                      const lang = languages.find(l => l.code === result.language);
                      return (
                        <div key={index} className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span>{lang?.flag}</span>
                              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {lang?.name}
                              </span>
                              {result.status === 'completed' && (
                                <Check className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                            {result.status === 'completed' && (
                              <button className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                                <Download className="w-3 h-3" />
                                <span>Download</span>
                              </button>
                            )}
                          </div>
                          <div className={`h-2 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            <div 
                              className="h-full bg-blue-600 rounded-full transition-all duration-500"
                              style={{ width: `${result.progress}%` }}
                            />
                          </div>
                          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {result.progress}% complete
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={`p-8 text-center rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Languages className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                      Ready to translate into {targetLanguages.length} languages
                    </p>
                    <button
                      onClick={handleTranslate}
                      disabled={targetLanguages.length === 0 || isProcessing}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors mx-auto ${
                        targetLanguages.length === 0 || isProcessing
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Translating...</span>
                        </>
                      ) : (
                        <>
                          <Languages className="w-4 h-4" />
                          <span>Start Translation</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={`flex items-center justify-center h-64 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-center">
                  <FileText className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    No document uploaded
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Upload a document to start translation
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

export default DocumentTranslation;