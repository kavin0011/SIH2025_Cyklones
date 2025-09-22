import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, Copy, Download, RotateCw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const TextTranslate: React.FC = () => {
  const { isDark } = useTheme();
  const { languages } = useLanguage();
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = () => {
    if (!sourceText.trim()) return;

    setIsTranslating(true);
    setTimeout(() => {
      setTranslatedText(
        'यह आपके टेक्स्ट का अनुवाद है। AI अनुवाद प्रणाली ने आपके मूल पाठ को लक्षित भाषा में सटीक रूप से परिवर्तित किया है।'
      );
      setIsTranslating(false);
    }, 1500);
  };

  const swapLanguages = () => {
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);

    const tempText = sourceText;
    setSourceText(translatedText);
    setTranslatedText(tempText);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className={`text-3xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          Text Translation
        </h1>
        <p
          className={`text-lg mb-8 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Translate text between multiple languages with context awareness
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Source Text */}
          <div
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Source Text
              </h3>
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter text to translate..."
              className={`w-full h-64 p-4 rounded-lg resize-none ${
                isDark
                  ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
                  : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500'
              } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />

            <div className="flex items-center justify-between mt-4">
              <span
                className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {sourceText.length} characters
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={swapLanguages}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleTranslate}
                  disabled={!sourceText.trim() || isTranslating}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    !sourceText.trim() || isTranslating
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isTranslating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Translating...</span>
                    </div>
                  ) : (
                    'Translate'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Translated Text */}
          <div
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Translated Text
              </h3>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div
              className={`h-64 p-4 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              } border ${isDark ? 'border-gray-600' : 'border-gray-300'}`}
            >
              {translatedText ? (
                <p
                  className={`${
                    isDark ? 'text-white' : 'text-gray-900'
                  } leading-relaxed`}
                >
                  {translatedText}
                </p>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Languages
                      className={`w-12 h-12 mx-auto mb-3 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    />
                    <p
                      className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Translation will appear here
                    </p>
                  </div>
                </div>
              )}
            </div>

            {translatedText && (
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Translation confidence: 96%
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(translatedText)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'hover:bg-gray-700 text-gray-400'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Translation Suggestions */}
        <div className="mt-8">
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Quick Suggestions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Hello, how are you?',
              'Thank you for your help.',
              'Where is the nearest restaurant?',
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setSourceText(suggestion)}
                className={`p-4 text-left rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300'
                    : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-sm italic">"{suggestion}"</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TextTranslate;
