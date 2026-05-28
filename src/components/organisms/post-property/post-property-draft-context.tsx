import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type PostPropertyChoiceKey =
  | "owner"
  | "broker-agent"
  | "developer"
  | "property-manager"
  | "residential"
  | "commercial"
  | "land"
  | "hotel"
  | "rent"
  | "sale"
  | "new-project"
  | "short-term";

export type PostPropertyDraft = {
  role: PostPropertyChoiceKey;
  propertyType: PostPropertyChoiceKey;
  purpose: PostPropertyChoiceKey;
  city: string;
  areaLocation: string;
  price: string;
  size: string;
  whatsapp: string;
  telegram: string;
  email: string;
  description: string;
  verificationType: "owner-id" | "broker-license" | "developer-document";
};

type PostPropertyDraftContextValue = {
  draft: PostPropertyDraft;
  updateDraft: (patch: Partial<PostPropertyDraft>) => void;
  resetDraft: () => void;
};

const defaultDraft: PostPropertyDraft = {
  role: "broker-agent",
  propertyType: "residential",
  purpose: "rent",
  city: "Addis Ababa",
  areaLocation: "",
  price: "",
  size: "",
  whatsapp: "",
  telegram: "",
  email: "",
  description: "",
  verificationType: "owner-id",
};

const PostPropertyDraftContext = createContext<PostPropertyDraftContextValue | null>(null);

export function PostPropertyDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<PostPropertyDraft>(defaultDraft);

  const value = useMemo<PostPropertyDraftContextValue>(
    () => ({
      draft,
      updateDraft: (patch) => setDraft((current) => ({ ...current, ...patch })),
      resetDraft: () => setDraft(defaultDraft),
    }),
    [draft],
  );

  return (
    <PostPropertyDraftContext.Provider value={value}>
      {children}
    </PostPropertyDraftContext.Provider>
  );
}

export function usePostPropertyDraft() {
  const context = useContext(PostPropertyDraftContext);

  if (!context) {
    throw new Error("usePostPropertyDraft must be used within PostPropertyDraftProvider");
  }

  return context;
}
