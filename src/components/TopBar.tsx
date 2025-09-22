import React, { useState } from 'react';
import { 
  Globe, 
  Sun, 
  Moon, 
  Volume2, 
  Eye,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const TopBar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false);
  const [isVoiceAssistantActive, setIsVoiceAssistantActive] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  const toggleScreenReader = () => {
    setIsScreenReaderActive(!isScreenReaderActive);
    // In a real app, this would integrate with screen reader APIs
    console.log('Screen reader toggled:', !isScreenReaderActive);
  };

  const toggleVoiceAssistant = () => {
    setIsVoiceAssistantActive(!isVoiceAssistantActive);
    // In a real app, this would integrate with voice recognition APIs
    console.log('Voice assistant toggled:', !isVoiceAssistantActive);
  };

  return (
    <div className={`h-16 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b flex items-center justify-end px-6 space-x-4`}>
      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm">{currentLang?.flag} {currentLang?.name}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showLanguageDropdown && (
          <div className={`absolute right-0 mt-2 w-48 ${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg border ${isDark ? 'border-gray-600' : 'border-gray-200'} z-50`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setShowLanguageDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors ${
                  currentLanguage === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : `${isDark ? 'text-gray-300' : 'text-gray-700'}`
                }`}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition-colors ${
          isDark ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Screen Reader */}
      <button
        onClick={toggleScreenReader}
        className={`p-2 rounded-lg transition-colors ${
          isScreenReaderActive 
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
            : `${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
        }`}
        title="Screen Reader"
      >
        <Eye className="w-5 h-5" />
      </button>

      {/* Voice Assistant */}
      <button
        onClick={toggleVoiceAssistant}
        className={`p-2 rounded-lg transition-colors ${
          isVoiceAssistantActive 
            ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
            : `${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
        }`}
        title="Voice Assistant"
      >
        <Volume2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TopBar;