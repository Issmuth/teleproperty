import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthMethod = "phone" | "email";

export type AuthRole =
  | "buyer"
  | "owner"
  | "agent"
  | "broker"
  | "developer"
  | "hotel-partner";

export type AuthSession = {
  id: string;
  displayName: string;
  loginMethod: AuthMethod;
  phoneNumber?: string;
  email?: string;
  role?: AuthRole;
  faydaId?: string;
  verifiedAt: string;
};

export type AuthDraft = {
  fullName: string;
  phoneNumber: string;
  referralCode: string;
  otp: [string, string, string, string];
  role: AuthRole;
  faydaId: string;
  dateOfBirth: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
};

type AuthState = {
  // Session state
  session: AuthSession | null;
  isHydrated: boolean;
  
  // Draft state (for registration flow)
  draft: AuthDraft;
  
  // Actions
  setSession: (session: AuthSession) => void;
  updateDraft: (patch: Partial<AuthDraft>) => void;
  resetDraft: () => void;
  completeAuth: () => Promise<void>;
  signOut: () => Promise<void>;
  _setHydrated: (hydrated: boolean) => void;
};

// Selector helpers for computed values
export const selectIsAuthenticated = (state: AuthState) => Boolean(state.session);
export const selectIsAdmin = (state: AuthState) => {
  if (!state.session) return false;
  return state.session.role === "developer" || state.session.role === "owner";
};

const defaultDraft: AuthDraft = {
  fullName: "",
  phoneNumber: "",
  referralCode: "",
  otp: ["", "", "", ""],
  role: "buyer",
  faydaId: "",
  dateOfBirth: "",
  email: "",
  password: "",
  acceptedTerms: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      isHydrated: false,
      draft: defaultDraft,

      setSession: (session) => {
        set({ session });
      },

      updateDraft: (patch) => {
        set((state) => ({
          draft: { ...state.draft, ...patch },
        }));
      },

      resetDraft: () => {
        set({ draft: defaultDraft });
      },

      completeAuth: async () => {
        const { draft } = get();
        
        const nextSession: AuthSession = {
          id: `session-${Date.now()}`,
          displayName: draft.fullName.trim() || "TeleProperty User",
          loginMethod: "phone",
          phoneNumber: draft.phoneNumber.trim() || undefined,
          email: draft.email.trim() || undefined,
          role: draft.role,
          faydaId: draft.faydaId.trim() || undefined,
          verifiedAt: new Date().toISOString(),
        };

        set({
          session: nextSession,
          draft: defaultDraft,
        });
      },

      signOut: async () => {
        set({
          session: null,
          draft: defaultDraft,
        });
      },

      _setHydrated: (hydrated) => {
        set({ isHydrated: hydrated });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist session, not draft or hydration state
        session: state.session,
      }),
      onRehydrateStorage: () => (state) => {
        // Set hydrated to true after rehydration
        state?._setHydrated(true);
      },
    }
  )
);
