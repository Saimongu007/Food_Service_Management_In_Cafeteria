import { create } from 'zustand';
import { User, LoginCredentials } from '../types';
import { isAccountLocked } from '../lib/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loginAttempts: number;
  lastActivity: number;
  csrfToken: string;
  login: (user: User) => void;
  logout: () => void;
  updateLastActivity: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loginAttempts: 0,
  lastActivity: Date.now(),
  csrfToken: Math.random().toString(36).substring(2),

  login: (user) => {
    set({
      user,
      isAuthenticated: true,
      loginAttempts: 0,
      lastActivity: Date.now(),
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      loginAttempts: 0,
      lastActivity: Date.now(),
      csrfToken: Math.random().toString(36).substring(2),
    });
  },

  updateLastActivity: () => {
    set({ lastActivity: Date.now() });
  },
}));