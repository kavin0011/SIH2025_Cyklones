import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Globe, Palette, Crown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Settings: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { currentLanguage, setLanguage, languages } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Settings
        </h1>

        <div className="space-y-8">
          {/* Account Settings */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center space-x-3 mb-6">
              <User className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Account
              </h2>
            </div>
            
            <div className="grid gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name
                </label>
                <input
                  type="text"
                  value="John Doe"
                  className={`w-full p-3 rounded-lg border ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  value="john.doe@example.com"
                  className={`w-full p-3 rounded-lg border ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center space-x-3 mb-6">
              <Palette className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Appearance
              </h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Dark Mode
                </span>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Switch between light and dark themes
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full transition-colors ${
                  isDark ? 'bg-blue-600' : 'bg-gray-300'
                } relative`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-0.5'
                } absolute top-0.5`} />
              </button>
            </div>
          </div>

          {/* Language */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center space-x-3 mb-6">
              <Globe className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Language & Region
              </h2>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Interface Language
              </label>
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value)}
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

          {/* Notifications */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center space-x-3 mb-6">
              <Bell className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Notifications
              </h2>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Email notifications', description: 'Receive updates via email' },
                { label: 'Processing alerts', description: 'Get notified when tasks complete' },
                { label: 'Feature updates', description: 'Learn about new features' }
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {notification.label}
                    </span>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {notification.description}
                    </p>
                  </div>
                  <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full translate-x-6 absolute top-0.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center space-x-3 mb-6">
              <Crown className={`w-6 h-6 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Subscription
              </h2>
            </div>
            
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
              <div className="flex justify-between items-center">
                <div>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Free Plan
                  </span>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Limited features and usage
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>
                  Current
                </span>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors font-medium">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;