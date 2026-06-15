/**
 * @deprecated This file is kept for backward compatibility.
 * Auth has been migrated to Zustand.
 * 
 * Import from:
 * - `@/hooks/use-auth` for the useAuth hook
 * - `@/store` for useAuthStore and types
 */

import { ReactNode } from "react";
export { useAuth } from "@/hooks/use-auth";
export type { AuthDraft, AuthMethod, AuthRole, AuthSession } from "@/store";

/**
 * @deprecated AuthProvider is no longer needed with Zustand.
 * You can safely remove this wrapper from your component tree.
 * The auth store is automatically initialized.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
