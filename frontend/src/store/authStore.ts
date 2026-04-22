// frontend/src/store/authStore.ts
import { create } from 'zustand';

// 1. Define exactly what our user object looks like
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

// 2. Apply that interface to our state
interface AuthState {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const storedUser = localStorage.getItem('user');

export const useAuthStore = create<AuthState>((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  
  login: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));