import React, { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface UploadPanelProps {
  acceptedTypes: string;
  onFileSelect: (file: File) => void;
  title: string;
  description: string;
}

const UploadPanel: React.FC<UploadPanelProps> = ({ acceptedTypes, onFileSelect, title, description }) => {
  const { isDark } = useTheme();
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`p-6 rounded-xl border-2 border-dashed transition-colors ${
      isDragOver 
        ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
        : `${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`
    }`}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    >
      {selectedFile ? (
        <div className="text-center">
          <div className={`inline-flex items-center space-x-3 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
            <File className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className="text-left">
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFile.name}</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={removeFile}
              className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <Upload className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors font-medium"
          >
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default UploadPanel;