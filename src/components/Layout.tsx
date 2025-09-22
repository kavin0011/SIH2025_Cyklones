import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useTheme } from '../contexts/ThemeContext';

const Layout: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;