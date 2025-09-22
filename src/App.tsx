import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import { AppProvider } from './contexts/AppContext';

// Pages
import Home from './pages/Home';
import VideoDubbing from './pages/VideoDubbing';
import PPTToVideo from './pages/PPTToVideo';
import AudioTranscription from './pages/AudioTranscription';
import AudioToText from './pages/AudioToText';
import AudioToVideo from './pages/AudioToVideo';
import TextTranslate from './pages/TextTranslate';
import TextToImage from './pages/TextToImage';
import TextToSpeech from './pages/TextToSpeech';
import TextToVideo from './pages/TextToVideo';
import TextSummarize from './pages/TextSummarize';
import DocumentTranslation from './pages/DocumentTranslation';
import ImageToDescription from './pages/ImageToDescription';
import ImageSuperTranslation from './pages/ImageSuperTranslation';
import Projects from './pages/Projects';
import Features from './pages/Features';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppProvider>

        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="video-dubbing" element={<VideoDubbing />} />
              <Route path="ppt-to-video" element={<PPTToVideo />} />
              <Route path="audio-transcription" element={<AudioTranscription />} />
              <Route path="audio-to-text" element={<AudioToText />} />
              <Route path="audio-to-video" element={<AudioToVideo />} />
              <Route path="text-translate" element={<TextTranslate />} />
              <Route path="text-to-image" element={<TextToImage />} />
              <Route path="text-to-speech" element={<TextToSpeech />} />
              <Route path="text-to-video" element={<TextToVideo />} />
              <Route path="text-summarize" element={<TextSummarize />} />
              <Route path="document-translation" element={<DocumentTranslation />} />
              <Route path="image-to-description" element={<ImageToDescription />} />
              <Route path="image-super-translation" element={<ImageSuperTranslation />} />
              <Route path="projects" element={<Projects />} />
              <Route path="features" element={<Features />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
        </AppProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;