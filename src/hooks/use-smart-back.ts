import { useNavigationStore } from "@/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";

/**
 * Smart back navigation hook that uses navigation history.
 * 
 * Provides a robust back navigation that:
 * 1. Uses stored navigation history if available
 * 2. Optionally handles Android hardware back button
 * 
 * @param handleHardwareBack - Whether to intercept hardware back button (default: true)
 * @returns A function to trigger smart back navigation
 * 
 * @example
 * ```tsx
 * function MyScreen() {
 *   const goBack = useSmartBack();
 *   
 *   return (
 *     <Pressable onPress={goBack}>
 *       <Text>Back</Text>
 *     </Pressable>
 *   );
 * }
 * ```
 */

export function useSmartBack(handleHardwareBack = true, rootDirectory: any) {
  const router = useRouter();
  const { popRoute, canGoBack, getCurrentRoute } = useNavigationStore();

  const goBack = () => {
    const currentRoute = getCurrentRoute();
    
    // Try to pop from navigation history
    if (canGoBack()) {
      const previousRoute = popRoute();
      if (previousRoute) {
        router.dismissTo(rootDirectory);
        router.replace({
          pathname: previousRoute.pathname as any,
          params: previousRoute.params,
        });
        return true;
      }
    }

    // If no history, check if we're on root
    const isOnRoot = currentRoute?.pathname === "/" || 
                     currentRoute?.pathname === "/(drawer)/(tabs)";
    
    if (isOnRoot) {
      // Already on root, allow exit
      return false;
    } else {
      // Use default back navigation
      router.back();
      return true;
    }
  };

  // Handle Android hardware back button if requested
  useEffect(() => {
    if (!handleHardwareBack) return;

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const handled = goBack();
        return handled; // Return true to prevent default, false to allow app exit
      }
    );

    return () => backHandler.remove();
  }, [handleHardwareBack]);

  return goBack;
}
