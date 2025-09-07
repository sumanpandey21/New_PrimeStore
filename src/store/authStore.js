import { create } from 'zustand';

const useAuthStore = create((set) => ({
  authToken: null,

  // Load from localStorage on init
  initialize: () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      set({ authToken: token });
    }
  },

  login: (token) => {
    localStorage.setItem('authToken', token);
    set({ authToken: token });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({ authToken: null });
  },
}));

export default useAuthStore;
