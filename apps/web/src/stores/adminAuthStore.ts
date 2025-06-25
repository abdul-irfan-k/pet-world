import { create } from 'zustand';

import { Admin } from '@/types/Admin';

interface AdminAuthStore {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoadingSession: boolean;
  login: (adminData: Admin) => void;
  logout: () => void;
  setAdmin: (adminData: Admin) => void;
  setIsLoadingSession: (loading: boolean) => void;
}

export const useAdminAuthStore = create<AdminAuthStore>(set => ({
  admin: null,
  isAuthenticated: false,
  isLoadingSession: true,
  login(adminData) {
    set({ admin: adminData, isAuthenticated: true, isLoadingSession: false });
  },
  logout() {
    set({ admin: null, isAuthenticated: false, isLoadingSession: false });
  },
  setAdmin(adminData) {
    set({ admin: adminData, isLoadingSession: false, isAuthenticated: true });
  },
  setIsLoadingSession(loading) {
    set({ isLoadingSession: loading });
  },
}));
