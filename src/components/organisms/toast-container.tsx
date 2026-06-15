import { useToastStore } from "@/store/toast-store";
import { useAppTheme } from "@/theme/app-theme";
import { AlertCircle, CheckCircle2, Info, X, XCircle } from "lucide-react-native";
import { useEffect } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function ToastItem({ toast }: { toast: any }) {
  const { colors, isDark } = useAppTheme();
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(-20);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      useToastStore.getState().removeToast(toast.id);
    });
  };

  const getToastConfig = () => {
    switch (toast.type) {
      case "success":
        return {
          icon: CheckCircle2,
          iconColor: "#16A34A",
          bgColor: isDark ? "rgba(2, 36, 15, 1)" : "#F0FDF4",
          borderColor: "#16A34A",
        };
      case "error":
        return {
          icon: XCircle,
          iconColor: "#DC2626",
          bgColor: isDark ? "rgba(41, 2, 2, 0.75)" : "#FEF2F2",
          borderColor: "#DC2626",
        };
      case "warning":
        return {
          icon: AlertCircle,
          iconColor: "#EA580C",
          bgColor: isDark ? "rgba(45, 17, 2, 0.75)" : "#FFF7ED",
          borderColor: "#EA580C",
        };
      case "info":
      default:
        return {
          icon: Info,
          iconColor: "#2563EB",
          bgColor: isDark ? "rgba(2, 17, 50, 0.15)" : "#EFF6FF",
          borderColor: "#2563EB",
        };
    }
  };

  const config = getToastConfig();
  const Icon = config.icon;

  return (
    <Animated.View
      style={[
        styles.toastItem,
        {
          backgroundColor: config.bgColor,
          borderColor: config.borderColor,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.toastContent}>
        <Icon size={20} color={config.iconColor} strokeWidth={2.5} />
        <Text
          style={[styles.toastMessage, { color: colors.text }]}
          numberOfLines={2}
        >
          {toast.message}
        </Text>
      </View>
      <Pressable onPress={handleDismiss} hitSlop={8} style={styles.closeBtn}>
        <X size={16} color={colors.textMuted} strokeWidth={2.5} />
      </Pressable>
    </Animated.View>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const insets = useSafeAreaInsets();

  if (toasts.length === 0) return null;

  return (
    <View
      style={[
        styles.container,
        {
          top: insets.top + 12,
        },
      ]}
      pointerEvents="box-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 9999,
    gap: 8,
  },
  toastItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 56,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  toastMessage: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  closeBtn: {
    padding: 4,
    marginLeft: 8,
  },
});
