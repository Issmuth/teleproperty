import { create } from "zustand";

type AppState = {
  // App-wide loading states
  isAppReady: boolean;
  isLoading: boolean;
  
  // Network status
  isOnline: boolean;
  
  // Modal/Sheet visibility
  activeModal: string | null;
  
  // Notifications
  unreadNotifications: number;
  
  // Actions
  setAppReady: (ready: boolean) => void;
  setLoading: (loading: boolean) => void;
  setOnline: (online: boolean) => void;
  setActiveModal: (modal: string | null) => void;
  setUnreadNotifications: (count: number) => void;
  incrementUnreadNotifications: () => void;
  decrementUnreadNotifications: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  isAppReady: false,
  isLoading: false,
  isOnline: true,
  activeModal: null,
  unreadNotifications: 0,

  setAppReady: (ready) => set({ isAppReady: ready }),
  setLoading: (loading) => set({ isLoading: loading }),
  setOnline: (online) => set({ isOnline: online }),
  setActiveModal: (modal) => set({ activeModal: modal }),
  setUnreadNotifications: (count) => set({ unreadNotifications: count }),
  
  incrementUnreadNotifications: () =>
    set((state) => ({ unreadNotifications: state.unreadNotifications + 1 })),
  
  decrementUnreadNotifications: () =>
    set((state) => ({ 
      unreadNotifications: Math.max(0, state.unreadNotifications - 1) 
    })),
}));
