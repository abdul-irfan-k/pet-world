import { create } from 'zustand';

import type { User } from '@/types/User';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingSession: boolean;
  login: (userData: User) => void;
  logout: () => void;
  setUser: (userData: User) => void;
  setIsLoadingSession: (loading: boolean) => void;
  updateUser: (userData: Partial<User>) => void;
}
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoadingSession: true,
  login: userData =>
    set({ user: userData, isAuthenticated: true, isLoadingSession: false }),
  logout() {
    set({ user: null, isAuthenticated: false, isLoadingSession: false });
  },
  setIsLoadingSession(loading) {
    set({ isLoadingSession: loading });
  },
  setUser(userData) {
    set({ user: userData, isLoadingSession: false, isAuthenticated: true });
  },
  updateUser(userData) {
    const currentUser = get().user;
    if (currentUser) set({ user: { ...currentUser, ...userData } });
  },
}));
