import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Play, Pause, Download, Settings, Mic, Volume2, Languages, Upload, SkipBack, SkipForward, RotateCcw, FileText } from 'lucide-react';
import UploadPanel from '../components/UploadPanel';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const VideoDubbing: React.FC = () => {
    const [voiceType, setVoiceType] = useState('');
    const [lipSync, setLipSync] = useState(true);
    const [noiseReduction, setNoiseReduction] = useState(true);
    const [subtitles, setSubtitles] = useState(true);
    const { isDark } = useTheme();
    const { languages } = useLanguage();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('hi');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showLipSync, setShowLipSync] = useState(true);
    const [audioOffset, setAudioOffset] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [videoURL, setVideoURL] = useState<string | null>(null);
    const [transcript, setTranscript] = useState([]);
    const [voiceTypes, setVoiceTypes] = useState([]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const animationFrameRef = useRef<number | null>(null);

    const API_BASE_URL = 'https://wgmmpvw9-5000.inc1.devtunnels.ms'; // Adjust based on your backend URL

    // useEffect(() => {
    //     const fetchVoiceTypes = async () => {
    //         try {
    //             const response = await axios.get(`${API_BASE_URL}/video_dubbing`);
    //             console.log('Voice Types Response:', response.data);
    //             setVoiceTypes(response.data);
    //         } catch (error) {
    //             console.error('Error fetching voice types:', error);
    //         }
    //     };

    //     fetchVoiceTypes();
    // }, []);

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setVideoURL(url);
    };

    const handleProcess = async () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        setIsProcessing(true);
        try {
            console.log('State before process:', {
                voiceType,
                sourceLanguage,
                targetLanguage,
                lipSync,
                noiseReduction,
                subtitles,
                audioOffset,
            });

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('sourceLanguage', sourceLanguage);
            formData.append('targetLanguage', targetLanguage);
            formData.append('voiceType', voiceType || 'Male'); // Default to 'Male' if not selected
            formData.append('lipSync', String(lipSync));
            formData.append('noiseReduction', String(noiseReduction));
            formData.append('subtitles', String(subtitles));
            formData.append('audioOffset', String(audioOffset));

            console.log('FormData entries:', Array.from(formData.entries()));
            console.log(formData);

            const response = await axios.post(`${API_BASE_URL}/video_dubbing`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob', // Expecting a file response
            });

            if (response.data instanceof Blob) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                setVideoURL(url); // Update with processed video
                // Optional transcript fetch (adjust based on backend)
                // const transcriptResponse = await axios.get(`${API_BASE_URL}/video_dubbing/transcript`, {
                //     params: { fileId: selectedFile.name },
                // });
                // setTranscript(transcriptResponse.data);
            }
        } catch (error) {
            console.error('Error processing video:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const togglePlayPause = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const updateSlider = () => {
        if (videoRef.current && isPlaying) {
            setCurrentTime(videoRef.current.currentTime);
            animationFrameRef.current = requestAnimationFrame(updateSlider);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            animationFrameRef.current = requestAnimationFrame(updateSlider);
        } else if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isPlaying]);

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(e.target.value);
        setCurrentTime(newTime);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleTranscriptEdit = (id: number, newText: string) => {
        setTranscript(prev => prev.map(item => 
            item.id === id ? { ...item, text: newText } : item
        ));
    };

    const handleResetTranscript = (id: number) => {
        setTranscript(prev => prev.map(item => 
            item.id === id ? { ...item, text: item.original } : item
        ));
    };

    const handleExport = async () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        try {
            console.log('State before export:', {
                voiceType,
                sourceLanguage,
                targetLanguage,
                lipSync,
                noiseReduction,
                subtitles,
                audioOffset,
            });

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('sourceLanguage', sourceLanguage);
            formData.append('targetLanguage', targetLanguage);
            formData.append('voiceType', voiceType || 'Male');
            formData.append('lipSync', String(lipSync));
            formData.append('noiseReduction', String(noiseReduction));
            formData.append('subtitles', String(subtitles));
            formData.append('audioOffset', String(audioOffset));

            console.log('FormData entries:', Array.from(formData.entries()));

            const response = await axios.post(`${API_BASE_URL}/video_dubbing`, formData, {
                responseType: 'blob', // Expecting a file response
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `dubbed_video_${new Date().toISOString()}.mp4`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting video:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Video Dubbing Studio
                </h1>
                <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    AI-powered video dubbing with lip-sync technology and multi-language support
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload and Settings */}
                    <div className="lg:col-span-1 space-y-6">
                        <UploadPanel
                            acceptedTypes="video/*"
                            onFileSelect={handleFileSelect}
                            title="Upload Video"
                            description="Drag & drop your video file or click to browse"
                        />

                        {/* Language Settings */}
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
                                        onChange={(e) => {
                                            console.log('Source Language changed to:', e.target.value);
                                            setSourceLanguage(e.target.value);
                                        }}
                                        className={`w-full p-3 rounded-lg border ${
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

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Target Language
                                    </label>
                                    <select
                                        value={targetLanguage}
                                        onChange={(e) => {
                                            console.log('Target Language changed to:', e.target.value);
                                            setTargetLanguage(e.target.value);
                                        }}
                                        className={`w-full p-3 rounded-lg border ${
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
                            </div>
                        </div>

                        {/* Advanced Settings */}
                        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} flex items-center`}>
                                <Settings className="w-5 h-5 mr-2" />
                                Advanced Settings
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Voice Type
                                    </label>
                                    <select 
                                        value={voiceType}
                                        onChange={(e) => {
                                            console.log('Voice Type changed to:', e.target.value);
                                            setVoiceType(e.target.value);
                                        }}
                                        className={`w-full px-3 py-2 border rounded-lg ${
                                            isDark 
                                                ? 'bg-gray-700 border-gray-600 text-white' 
                                                : 'bg-white border-gray-300 text-gray-900'
                                        } focus:ring-2 focus:ring-blue-500`}
                                    >
                                        {voiceTypes.map((voice: { value: string; label: string }) => (
                                            <option key={voice.value} value={voice.value}>
                                                {voice.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Lip Sync
                                        </span>
                                        <button
                                            onClick={() => {
                                                const newLipSync = !lipSync;
                                                console.log('Lip Sync changed to:', newLipSync);
                                                setLipSync(newLipSync);
                                            }}
                                            className={`w-12 h-6 rounded-full transition-colors ${
                                                lipSync ? 'bg-blue-600' : isDark ? 'bg-gray-600' : 'bg-gray-300'
                                            } relative`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                                lipSync ? 'translate-x-6' : 'translate-x-0.5'
                                            } absolute top-0.5`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Noise Reduction
                                        </span>
                                        <button
                                            onClick={() => {
                                                const newNoiseReduction = !noiseReduction;
                                                console.log('Noise Reduction changed to:', newNoiseReduction);
                                                setNoiseReduction(newNoiseReduction);
                                            }}
                                            className={`w-12 h-6 rounded-full transition-colors ${
                                                noiseReduction ? 'bg-blue-600' : isDark ? 'bg-gray-600' : 'bg-gray-300'
                                            } relative`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                                noiseReduction ? 'translate-x-6' : 'translate-x-0.5'
                                            } absolute top-0.5`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Generate Subtitles
                                        </span>
                                        <button
                                            onClick={() => {
                                                const newSubtitles = !subtitles;
                                                console.log('Subtitles changed to:', newSubtitles);
                                                setSubtitles(newSubtitles);
                                            }}
                                            className={`w-12 h-6 rounded-full transition-colors ${
                                                subtitles ? 'bg-blue-600' : isDark ? 'bg-gray-600' : 'bg-gray-300'
                                            } relative`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                                subtitles ? 'translate-x-6' : 'translate-x-0.5'
                                            } absolute top-0.5`} />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Audio Offset (ms)
                                    </label>
                                    <input
                                        type="range"
                                        min="-1000"
                                        max="1000"
                                        value={audioOffset}
                                        onChange={(e) => {
                                            const newOffset = parseInt(e.target.value);
                                            console.log('Audio Offset changed to:', newOffset);
                                            setAudioOffset(newOffset);
                                        }}
                                        className="w-full accent-blue-600"
                                    />
                                    <div className={`text-center text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {audioOffset}ms
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="lg:col-span-2">
                        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg h-full flex flex-col`}>
                            {/* Process Video Button at Top (Right-Aligned, Normal Size) */}
                            {selectedFile && (
                                <div className="mb-6 flex justify-end">
                                    <button
                                        onClick={handleProcess}
                                        disabled={isProcessing}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                            isProcessing
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Settings className="w-4 h-4" />
                                                <span>Process Video</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                            
                            {selectedFile ? (
                                <div className="space-y-6 flex-grow">
                                    {/* Video Preview */}
                                    <div className={`aspect-video rounded-lg overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                        <video
                                            ref={videoRef}
                                            src={videoURL || undefined}
                                            className="w-full h-full object-cover rounded-lg"
                                            onLoadedMetadata={handleLoadedMetadata}
                                        />
                                    </div>

                                    {/* Timeline */}
                                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                        <div className="flex items-center space-x-4 mb-4">
                                            <button
                                                onClick={togglePlayPause}
                                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                {isPlaying ? (
                                                    <Pause className="w-4 h-4" />
                                                ) : (
                                                    <Play className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                                <SkipBack className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                                <SkipForward className="w-4 h-4" />
                                            </button>
                                            <input
                                                type="range"
                                                min="0"
                                                max={duration}
                                                value={currentTime}
                                                onChange={handleSeek}
                                                className="flex-1 h-2 accent-blue-600 rounded-full"
                                                style={{
                                                    background: `linear-gradient(to right, #2563eb ${(currentTime / (duration || 1)) * 100}%, ${isDark ? '#4b5563' : '#d1d5db'} ${(currentTime / (duration || 1)) * 100}%)`
                                                }}
                                            />
                                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {formatTime(currentTime)} / {formatTime(duration)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Transcript Editor */}
                                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                        <h4 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'} flex items-center`}>
                                            <FileText className="w-5 h-5 mr-2" />
                                            Transcript Editor
                                        </h4>
                                        <div className="space-y-4 max-h-80 overflow-y-auto">
                                            {transcript.map((item: { id: number; start: number; end: number; text: string; original: string }) => (
                                                <div key={item.id} className={`border rounded-lg p-4 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                            {formatTime(item.start)} - {formatTime(item.end)}
                                                        </div>
                                                        <button
                                                            onClick={() => handleResetTranscript(item.id)}
                                                            className={`text-blue-600 hover:text-blue-800 ${isDark ? 'dark:text-blue-400 dark:hover:text-blue-300' : ''}`}
                                                        >
                                                            <RotateCcw className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                Original
                                                            </label>
                                                            <p className={`text-sm p-2 rounded ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
                                                                {item.original}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                Translation
                                                            </label>
                                                            <textarea
                                                                value={item.text}
                                                                onChange={(e) => handleTranscriptEdit(item.id, e.target.value)}
                                                                className={`w-full text-sm p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500`}
                                                                rows={2}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={`flex items-center justify-center h-64 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                    <div className="text-center">
                                        <Upload className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                        <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            No video uploaded
                                        </p>
                                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Upload a video to start dubbing
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Export Video Section at Bottom */}
                            {selectedFile && (
                                <div className="mt-6">
                                    <button
                                        onClick={handleExport}
                                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors w-full bg-green-600 text-white hover:bg-green-700`}
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Export video in MP4 or other format</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default VideoDubbing;