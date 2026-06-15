import { create } from "zustand";

export type RouteEntry = {
  pathname: string;
  params?: Record<string, any>;
  timestamp: number;
};

type NavigationState = {
  history: RouteEntry[];
  currentRoute: RouteEntry | null;
  pushRoute: (pathname: string, params?: Record<string, any>) => void;
  popRoute: () => RouteEntry | null;
  clearHistory: () => void;
  canGoBack: () => boolean;
  getPreviousRoute: () => RouteEntry | null;
  getCurrentRoute: () => RouteEntry | null;
};

export const useNavigationStore = create<NavigationState>((set, get) => ({
  history: [],
  currentRoute: null,

  pushRoute: (pathname, params) => {
    const entry: RouteEntry = {
      pathname,
      params,
      timestamp: Date.now(),
    };

    set((state) => {
      // Don't add duplicate consecutive routes
      if (state.currentRoute?.pathname === pathname) {
        return state;
      }

      return {
        history: [...state.history, state.currentRoute].filter(Boolean) as RouteEntry[],
        currentRoute: entry,
      };
    });
  },

  popRoute: () => {
    const state = get();
    if (state.history.length === 0) return null;

    const previous = state.history[state.history.length - 1];
    set({
      history: state.history.slice(0, -1),
      currentRoute: previous,
    });

    return previous;
  },

  clearHistory: () => {
    set({ history: [], currentRoute: null });
  },

  canGoBack: () => {
    return get().history.length > 0;
  },

  getPreviousRoute: () => {
    const { history } = get();
    return history.length > 0 ? history[history.length - 1] : null;
  },

  getCurrentRoute: () => {
    return get().currentRoute;
  },
}));
