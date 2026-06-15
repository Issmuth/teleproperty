import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  visible: boolean;
};

type ToastState = {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
};

let toastCounter = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (message, type = "info", duration = 3000) => {
    const id = `toast-${Date.now()}-${toastCounter++}`;
    const toast: Toast = {
      id,
      message,
      type,
      duration,
      visible: true,
    };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearAllToasts: () => {
    set({ toasts: [] });
  },
}));

/**
 * Global toast function - call from anywhere in your app
 * @example
 * ```tsx
 * import { toast } from "@/store/toast-store";
 * 
 * toast.success("Property saved!");
 * toast.error("Failed to load data");
 * toast.info("New message received");
 * toast.warning("Your session is about to expire");
 * ```
 */
export const toast = {
  success: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, "success", duration),
  
  error: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, "error", duration),
  
  info: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, "info", duration),
  
  warning: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, "warning", duration),
  
  dismiss: (id: string) =>
    useToastStore.getState().removeToast(id),
  
  clear: () =>
    useToastStore.getState().clearAllToasts(),
};
