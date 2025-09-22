import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  Zap, 
  Settings, 
  User, 
  Crown,
  FileText,
  Mic,
  Languages,
  Image,
  FileImage,
  Video
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar: React.FC = () => {
  const { isDark } = useTheme();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: FolderOpen, label: 'Projects', path: '/projects' },
    { icon: Zap, label: 'Features', path: '/features' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={`w-64 min-h-screen ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col `}>
      {/* Logo */}
      <div className="pt-6 pb-4 px-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            AI Studio
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                John Doe
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Free Plan
              </p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors">
            <Crown className="w-4 h-4" />
            <span className="font-medium">Upgrade</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;