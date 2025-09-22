import React, { useState ,useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Play, Pause, Download, Mic } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';

const TextToSpeech: React.FC = () => {
  const { isDark } = useTheme();
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceType, setVoiceType] = useState('female');
  const [language, setLanguage] = useState('ta');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const API_BASE_URL = 'http://127.0.0.1:5000'

const handleGenerate = async () => {
  if (!text.trim()) return;

  setIsGenerating(true);
  setError(null);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/text_to_speech`,
      {
        text,
        language,
        voice_type: voiceType,
        speed,
        pitch,
      },
      { responseType: 'blob' }
    );

    const url = URL.createObjectURL(new Blob([response.data], { type: 'audio/wav' }));
    setAudioUrl(url);
  } catch (err) {
    setError('Failed to generate speech. Please try again.');
    console.error('TTS error:', err);
  } finally {
    setIsGenerating(false);
  }
};

  const voiceOptions = [
    { id: 'female', name: 'Sarah (Female)', accent: 'US English' },
    { id: 'male', name: 'David (Male)', accent: 'US English' },
    { id: 'british', name: 'Emma (Female)', accent: 'British English' },
    { id: 'indian', name: 'Priya (Female)', accent: 'Indian English' }
  ];
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(1, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Text to Speech Converter
        </h1>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Convert text into natural-sounding speech with voice customization
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text Input */}
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Enter Text
              </h3>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to convert to speech..."
                className={`w-full h-48 p-4 rounded-lg resize-none ${
                  isDark 
                    ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' 
                    : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500'
                } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              
              <div className="mt-4 flex justify-between items-center">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {text.length}/5000 characters
                </span>
                <div className="text-sm text-blue-600">
                  Est. duration: {Math.ceil(text.split(' ').length / 180)} min
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Voice Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Voice Type
                  </label>
                  <select
                    value={voiceType}
                    onChange={(e) => setVoiceType(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    {voiceOptions.map((voice) => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name} - {voice.accent}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Speed
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                    <div className="text-center text-sm text-gray-500 mt-1">
                      {speed}x
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Pitch
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={pitch}
                      onChange={(e) => setPitch(parseFloat(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                    <div className="text-center text-sm text-gray-500 mt-1">
                      {pitch}x
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Audio Player */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Generated Audio
            </h3>
            
            {audioUrl ? (
              <div className="space-y-6">
                  <div className="space-y-6">
                    {/* Hidden audio element */}
                    <audio
                      ref={audioRef}
                      src={audioUrl}
                      onLoadedMetadata={() => {
                        if (audioRef.current) setDuration(audioRef.current.duration);
                      }}
                      onTimeUpdate={() => {
                        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
                      }}
                      onEnded={() => setIsPlaying(false)}
                    />


                    <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                      <Volume2 className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        Audio ready to play
                      </p>
                      <button
                        onClick={togglePlay}
                        className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                      </button>
                    </div>
                  </div>

                {/* Audio Controls */}
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-sm text-gray-500">{formatTime(currentTime)}</span>
                    <div
                      className="flex-1 h-2 bg-gray-300 dark:bg-gray-600 rounded-full relative cursor-pointer"
                      onClick={(e) => {
                        if (!audioRef.current) return;
                        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                        const clickPos = e.clientX - rect.left;
                        const newTime = (clickPos / rect.width) * duration;
                        audioRef.current.currentTime = newTime;
                      }}
                    >
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex-1 justify-center">
                    <Download className="w-4 h-4" />
                    <span>Download MP3</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex-1 justify-center">
                    <Download className="w-4 h-4" />
                    <span>Download WAV</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className={`flex items-center justify-center h-64 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-center">
                  <Mic className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    No audio generated
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Enter text and generate speech
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={handleGenerate}
                disabled={!text.trim() || isGenerating}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                  !text.trim() || isGenerating
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating Speech...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>Generate Speech</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TextToSpeech;