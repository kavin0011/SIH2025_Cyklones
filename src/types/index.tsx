export interface VideoFile {
  file: File;
  url: string;
  duration: number;
  name: string;
}

export interface AudioFile {
  file: File;
  url: string;
  duration: number;
  name: string;
  waveformData?: number[];
}

export interface Language {
  code: string;
  name: string;
  flag: string;
  rtl?: boolean;
}

export interface TranscriptSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
  confidence?: number;
}

export interface SyncSettings {
  audioOffset: number;
  videoOffset: number;
  playbackRate: number;
  volume: number;
}

export interface ExportSettings {
  format: 'mp4' | 'mov' | 'avi';
  quality: 'high' | 'medium' | 'low';
  resolution: '1080p' | '720p' | '480p';
}

export interface ProcessingStatus {
  stage: 'idle' | 'uploading' | 'transcribing' | 'translating' | 'generating' | 'syncing' | 'exporting';
  progress: number;
  message: string;
  error?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  credits: number;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
  settings?: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface DubbingSettings {
  lipSync: boolean;
  noiseReduction: boolean;
  subtitleGeneration: boolean;
  voiceCustomization: string;
  contextImages: File[];
  vocabularyFile?: File;
}

export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  accentColor: string;
}

export interface AppSettings {
  language: string;
  theme: Theme;
  accessibility: {
    screenReader: boolean;
    voiceAssistant: boolean;
    highContrast: boolean;
    reducedMotion: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    processing: boolean;
  };
}