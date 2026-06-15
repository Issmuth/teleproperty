# Zustand State Management

This directory contains all Zustand stores for global state management.

## Stores

### 1. Navigation Store (`navigation-store.ts`)
Tracks navigation history with full route information including pathname and params.

**Usage:**
```tsx
import { useNavigationStore } from "@/store";

function MyComponent() {
  const { history, currentRoute, canGoBack, getPreviousRoute } = useNavigationStore();
  
  // Check if we can go back
  if (canGoBack()) {
    const previous = getPreviousRoute();
    console.log("Previous route:", previous?.pathname);
  }
}
```

**Automatic Tracking:**
Navigation is automatically tracked via `useNavigationTracker()` hook in the root layout.

### 2. Auth Store (`auth-store.ts`)
Manages authentication state with session persistence to AsyncStorage.

**Usage:**
```tsx
import { useAuth } from "@/hooks/use-auth";
// or directly: import { useAuthStore } from "@/store";

function MyComponent() {
  const { isAuthenticated, session, signOut, completeAuth } = useAuth();
  
  if (!isAuthenticated) {
    return <Text>Please log in</Text>;
  }
  
  return (
    <View>
      <Text>Welcome {session?.displayName}</Text>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
}
```

**Selective subscription:**
```tsx
// Only re-renders when isAuthenticated changes
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

// Only re-renders when session changes  
const session = useAuthStore((state) => state.session);
```

**Migration Note:**
Auth has been migrated from Context API to Zustand. The old `AuthProvider` wrapper is no longer needed and can be removed. The `useAuth()` hook maintains the same API for backward compatibility.

### 3. Subscription Store (`subscription-store.ts`)
Manages user subscription state with persistence to AsyncStorage.

**Usage:**
```tsx
import { useSubscriptionStore } from "@/store";

function MyComponent() {
  const { hasSubscription, planId, setSubscription } = useSubscriptionStore();
  
  // Set subscription after payment
  setSubscription({
    planId: "pro",
    planName: "Professional",
    startDate: new Date(),
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}
```

**Persistence:**
Data is automatically persisted to AsyncStorage and rehydrated on app launch.

### 3. App Store (`app-store.ts`)
General app-wide state like loading, modals, notifications, network status.

**Usage:**
```tsx
import { useAppStore } from "@/store";

function MyComponent() {
  const { isLoading, setLoading, unreadNotifications } = useAppStore();
  
  // Show global loading
  setLoading(true);
  
  // Check notifications
  console.log("Unread:", unreadNotifications);
}
```

## Why Zustand?

- **Simple API**: No boilerplate, just `create()` and use
- **Performance**: Selective re-renders, only subscribes to what you use
- **DevTools**: Works with Redux DevTools for debugging
- **Persistence**: Easy integration with AsyncStorage
- **TypeScript**: Full type safety out of the box
- **Small bundle size**: ~1KB compared to Redux's larger footprint

## Adding a New Store

1. Create a new file in `src/store/`
2. Define your state interface and create the store:

```tsx
import { create } from "zustand";

type MyState = {
  value: string;
  setValue: (value: string) => void;
};

export const useMyStore = create<MyState>((set) => ({
  value: "",
  setValue: (value) => set({ value }),
}));
```

3. Export it from `src/store/index.ts`

## Best Practices

1. **Granular selectors**: Only select the state you need
   ```tsx
   // Good - only re-renders when hasSubscription changes
   const hasSubscription = useSubscriptionStore((state) => state.hasSubscription);
   
   // Bad - re-renders on any subscription store change
   const subscriptionStore = useSubscriptionStore();
   ```

2. **Actions in store**: Keep logic in the store, not components
   ```tsx
   // Good
   const cancelSubscription = useSubscriptionStore((state) => state.cancelSubscription);
   
   // Bad - logic in component
   const set = useSubscriptionStore((state) => state.set);
   set({ hasSubscription: false, autoRenew: false });
   ```

3. **Persist only when needed**: Not all state needs persistence
   - User preferences: YES (theme, language)
   - Subscription data: YES
   - Navigation history: NO (transient)
   - Loading states: NO (transient)
