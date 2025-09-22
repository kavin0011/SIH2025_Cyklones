import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { User, AppSettings, Project, Theme } from '../types';

interface AppState {
  user: User | null;
  settings: AppSettings;
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  sidebarCollapsed: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; updates: Partial<Project> } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_LANGUAGE'; payload: string };

const defaultSettings: AppSettings = {
  language: 'en',
  theme: {
    mode: 'light',
    primaryColor: '#3B82F6',
    accentColor: '#10B981'
  },
  accessibility: {
    screenReader: false,
    voiceAssistant: false,
    highContrast: false,
    reducedMotion: false
  },
  notifications: {
    email: true,
    push: true,
    processing: true
  }
};

const initialState: AppState = {
  user: null,
  settings: defaultSettings,
  projects: [],
  isLoading: false,
  error: null,
  sidebarCollapsed: false
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'ADD_PROJECT':
      return { ...state, projects: [action.payload, ...state.projects] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id
            ? { ...project, ...action.payload.updates }
            : project
        )
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case 'SET_THEME':
      return { ...state, settings: { ...state.settings, theme: action.payload } };
    case 'SET_LANGUAGE':
      return { ...state, settings: { ...state.settings, language: action.payload } };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        dispatch({ type: 'SET_SETTINGS', payload: settings });
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }

    // Load user from localStorage (mock authentication)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    } else {
      // Set default user for demo
      const defaultUser: User = {
        id: '1',
        username: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        plan: 'free',
        credits: 100
      };
      dispatch({ type: 'SET_USER', payload: defaultUser });
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(state.settings));
  }, [state.settings]);

  // Apply theme changes
  useEffect(() => {
    const { theme } = state.settings;
    document.documentElement.classList.toggle('dark', theme.mode === 'dark');
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--accent-color', theme.accentColor);
  }, [state.settings.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}