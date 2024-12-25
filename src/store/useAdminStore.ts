import { create } from 'zustand';
import { User, MenuItem, AdminLog } from '../types';

interface AdminState {
  pendingUsers: User[];
  userAccounts: User[];
  adminLogs: AdminLog[];
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
  deactivateUser: (userId: string) => void;
  resetUserPassword: (userId: string) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  logAdminAction: (adminId: string, action: string, details: string) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  pendingUsers: [],
  userAccounts: [],
  adminLogs: [],

  approveUser: (userId) => {
    set((state) => ({
      pendingUsers: state.pendingUsers.filter((user) => user.id !== userId),
      userAccounts: [
        ...state.userAccounts,
        {
          ...state.pendingUsers.find((user) => user.id === userId)!,
          status: 'active',
        },
      ],
    }));
  },

  rejectUser: (userId) => {
    set((state) => ({
      pendingUsers: state.pendingUsers.filter((user) => user.id !== userId),
    }));
  },

  deactivateUser: (userId) => {
    set((state) => ({
      userAccounts: state.userAccounts.map((user) =>
        user.id === userId ? { ...user, status: 'inactive' } : user
      ),
    }));
  },

  resetUserPassword: (userId) => {
    // Implement password reset logic
    console.log('Password reset for user:', userId);
  },

  addMenuItem: (item) => {
    // Implementation will be added in the next update
  },

  updateMenuItem: (id, item) => {
    // Implementation will be added in the next update
  },

  deleteMenuItem: (id) => {
    // Implementation will be added in the next update
  },

  logAdminAction: (adminId, action, details) => {
    set((state) => ({
      adminLogs: [
        {
          id: Math.random().toString(36).substring(2),
          adminId,
          action,
          details,
          timestamp: new Date(),
        },
        ...state.adminLogs,
      ],
    }));
  },
}));