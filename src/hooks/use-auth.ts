import { useAuthStore } from "@/store";

/**
 * Auth hook that provides authentication state and actions.
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isAuthenticated, session, signOut } = useAuth();
 *   
 *   if (!isAuthenticated) {
 *     return <Text>Please log in</Text>;
 *   }
 *   
 *   return <Text>Welcome {session.displayName}</Text>;
 * }
 * ```
 */
export function useAuth() {
  const session = useAuthStore((state) => state.session);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const draft = useAuthStore((state) => state.draft);
  const updateDraft = useAuthStore((state) => state.updateDraft);
  const resetDraft = useAuthStore((state) => state.resetDraft);
  const completeAuth = useAuthStore((state) => state.completeAuth);
  const signOut = useAuthStore((state) => state.signOut);

  // Computed values
  const isAuthenticated = Boolean(session);
  const isAdmin = session?.role === "developer" || session?.role === "owner";

  return {
    // State
    session,
    isHydrated,
    isAuthenticated,
    isAdmin,
    
    // Draft state for registration flow
    draft,
    
    // Actions
    updateDraft,
    resetDraft,
    completeAuth,
    signOut,
  };
}
