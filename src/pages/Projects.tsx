import React from 'react';
import { motion } from 'framer-motion';
import { FolderPlus, Folder, Clock, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Projects: React.FC = () => {
  const { isDark } = useTheme();

  const projects = [
    {
      id: 1,
      name: 'Marketing Video Dubbing',
      type: 'Video Dubbing',
      status: 'In Progress',
      lastModified: '2 hours ago',
      starred: true
    },
    {
      id: 2,
      name: 'Product Presentation',
      type: 'PPT to Video',
      status: 'Completed',
      lastModified: '1 day ago',
      starred: false
    },
    {
      id: 3,
      name: 'Meeting Transcription',
      type: 'Audio to Text',
      status: 'Completed',
      lastModified: '3 days ago',
      starred: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              My Projects
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage and track your AI content creation projects
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <FolderPlus className="w-5 h-5" />
            <span>New Project</span>
          </button>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: project.id * 0.1 }}
              className={`p-6 rounded-xl border transition-colors ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <Folder className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {project.name}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.type} • {project.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{project.lastModified}</span>
                  </div>
                  <button className={`p-1 rounded ${
                    project.starred 
                      ? 'text-yellow-500' 
                      : `${isDark ? 'text-gray-500 hover:text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`
                  } transition-colors`}>
                    <Star className={`w-5 h-5 ${project.starred ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;