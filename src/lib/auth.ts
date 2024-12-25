import { jwtDecode } from 'jwt-decode';
import { User, LoginCredentials } from '../types';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const isSessionValid = (lastActivity: number): boolean => {
  return Date.now() - lastActivity < SESSION_TIMEOUT;
};

export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2);
};

export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken;
};

export const decodeToken = (token: string): User | null => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const isAccountLocked = (user: User): boolean => {
  if (!user.loginAttempts || !user.lastLoginAttempt) return false;
  
  const LOCK_THRESHOLD = 5;
  const LOCK_DURATION = 15 * 60 * 1000; // 15 minutes
  
  return (
    user.loginAttempts >= LOCK_THRESHOLD &&
    Date.now() - user.lastLoginAttempt.getTime() < LOCK_DURATION
  );
};

// Mock authentication function - in a real app, this would make an API call
export const authenticateUser = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (credentials.email === 'admin@eastdelta.edu.bd' && credentials.password === 'Admin@123') {
    return {
      id: 'admin-1',
      name: 'Admin User',
      email: credentials.email,
      role: 'admin',
      status: 'active',
    };
  }

  // For demo purposes, allow any valid student email
  if (credentials.email.endsWith('@eastdelta.edu.bd') && credentials.password.length >= 6) {
    return {
      id: `student-${Math.random().toString(36).substring(2)}`,
      name: credentials.email.split('@')[0].replace('.', ' '),
      email: credentials.email,
      role: 'student',
      studentId: `EDU${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'active',
    };
  }

  throw new Error('Invalid credentials');
};