import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

export type AuthMethod = "phone";

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

type AuthContextValue = {
  isHydrated: boolean;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  draft: AuthDraft;
  updateDraft: (patch: Partial<AuthDraft>) => void;
  resetDraft: () => void;
  completeAuth: () => Promise<void>;
  signOut: () => Promise<void>;
};

const sessionStorageKey = "teleproperty.auth.session";

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

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [draft, setDraft] = useState<AuthDraft>(defaultDraft);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrateSession() {
      try {
        const storedSession = await AsyncStorage.getItem(sessionStorageKey);

        if (!cancelled && storedSession) {
          setSession(JSON.parse(storedSession) as AuthSession);
        }
      } catch {
        if (!cancelled) {
          setSession(null);
        }
      } finally {
        if (!cancelled) {
          setIsHydrated(true);
        }
      }
    }

    void hydrateSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateDraft = useCallback((patch: Partial<AuthDraft>) => {
    setDraft((current) => ({ ...current, ...patch }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(defaultDraft);
  }, []);

  const completeAuth = useCallback(async () => {
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

    setSession(nextSession);
    await AsyncStorage.setItem(sessionStorageKey, JSON.stringify(nextSession));
    setDraft(defaultDraft);
  }, [draft]);

  const signOut = useCallback(async () => {
    setSession(null);
    setDraft(defaultDraft);
    await AsyncStorage.removeItem(sessionStorageKey);
  }, []);

  const isAdmin = useMemo(() => {
    if (!session) return false;
    return session.role === "developer" || session.role === "owner";
  }, [session]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isHydrated,
      session,
      isAuthenticated: Boolean(session),
      isAdmin,
      draft,
      updateDraft,
      resetDraft,
      completeAuth,
      signOut,
    }),
    [
      completeAuth,
      draft,
      isHydrated,
      session,
      signOut,
      updateDraft,
      resetDraft,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
