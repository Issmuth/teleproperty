import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SubscriptionState = {
  hasSubscription: boolean;
  planId: string | null;
  planName: string | null;
  startDate: Date | null;
  nextBilling: Date | null;
  autoRenew: boolean;
  transactionRef: string | null;
  
  // Actions
  setSubscription: (subscription: {
    planId: string;
    planName: string;
    startDate: Date;
    nextBilling: Date;
    autoRenew?: boolean;
    transactionRef?: string;
  }) => void;
  cancelSubscription: () => void;
  updateAutoRenew: (enabled: boolean) => void;
  clearSubscription: () => void;
};

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      hasSubscription: false,
      planId: null,
      planName: null,
      startDate: null,
      nextBilling: null,
      autoRenew: true,
      transactionRef: null,

      setSubscription: (subscription) => {
        set({
          hasSubscription: true,
          planId: subscription.planId,
          planName: subscription.planName,
          startDate: subscription.startDate,
          nextBilling: subscription.nextBilling,
          autoRenew: subscription.autoRenew ?? true,
          transactionRef: subscription.transactionRef ?? null,
        });
      },

      cancelSubscription: () => {
        set({
          hasSubscription: false,
          autoRenew: false,
        });
      },

      updateAutoRenew: (enabled) => {
        set({ autoRenew: enabled });
      },

      clearSubscription: () => {
        set({
          hasSubscription: false,
          planId: null,
          planName: null,
          startDate: null,
          nextBilling: null,
          autoRenew: true,
          transactionRef: null,
        });
      },
    }),
    {
      name: "subscription-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
