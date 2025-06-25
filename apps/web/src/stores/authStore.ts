import { create } from 'zustand';

import type { User } from '@/types/User';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingSession: boolean;
  isPetAdopter: boolean;
  setIsPetAdopter: (status: boolean) => void;
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
  isPetAdopter: false,
  login(userData) {
    //eslint-disable-next-line
    //@ts-ignore
    set({ user: userData, isAuthenticated: true, isLoadingSession: false, isPetAdopter: !!userData.petAdopterProfile });
  },
  logout() {
    set({ user: null, isAuthenticated: false, isLoadingSession: false, isPetAdopter: false });
  },
  setIsLoadingSession(loading) {
    set({ isLoadingSession: loading });
  },
  setUser(userData) {
    //eslint-disable-next-line
    //@ts-ignore
    set({ user: userData, isLoadingSession: false, isAuthenticated: true, isPetAdopter: !!userData.petAdopterProfile });
  },

  setIsPetAdopter(status) {
    set({ isPetAdopter: status });
  },

  updateUser(userData) {
    const currentUser = get().user;
    if (currentUser) set({ ...userData, user: { ...currentUser, ...userData } });
  },
}));
