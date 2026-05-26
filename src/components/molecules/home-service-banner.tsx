import { Image } from "expo-image";
import { type LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

type HomeServiceBannerProps = {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  image?: string;
  customLogo?: React.ReactNode;
  backgroundColor: string;
  textColor?: string;
  size?: "full" | "half" | "full-tall";
  style?: ViewStyle;
};

export function HomeServiceBanner({
  title,
  subtitle,
  icon: Icon,
  image,
  customLogo,
  backgroundColor,
  textColor = "#FFFFFF",
  size = "full",
  style,
}: HomeServiceBannerProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      style={[
        styles.container,
        size === "half" ? styles.containerHalf : undefined,
        size === "full-tall" ? styles.containerFallTall : undefined,
        { backgroundColor },
        style,
      ]}
    >
      <View
        style={[
          styles.content,
          size === "half" ? styles.contentHalf : undefined,
        ]}
      >
        {Icon && (
          <View style={styles.iconWrap}>
            <Icon
              size={size === "half" ? 20 : 24}
              color={textColor}
              strokeWidth={2.5}
            />
          </View>
        )}
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: textColor, opacity: 0.85 }]}>
          {subtitle}
        </Text>
      </View>
      {image && (
        <View
          style={[
            styles.imageWrap,
            size === "half" ? styles.imageWrapHalf : undefined,
          ]}
        >
          <Image
            source={{ uri: image }}
            style={styles.image}
            contentFit="cover"
          />
          <View style={styles.imageOverlay} />
        </View>
      )}
      {customLogo && <View style={styles.logoWrap}>{customLogo}</View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    height: 124,
    position: "relative",
  },
  containerHalf: {
    flex: 1,
    height: 180,
    flexDirection: "column",
  },
  containerFallTall: {
    height: 160,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    zIndex: 2,
    maxWidth: "60%",
  },
  contentHalf: {
    padding: 12,
    justifyContent: "flex-start",
    maxWidth: "100%",
    height: "50%",
  },
  iconWrap: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  imageWrap: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "40%",
    zIndex: 1,
  },
  imageWrapHalf: {
    top: "auto",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  logoWrap: {
    position: "absolute",
    right: 16,
    top: 16,
    bottom: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
