import { categoryStories, type Story } from "@/data/home";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  visible: boolean;
  categoryKey: string | null;
  onClose: () => void;
};

const STORY_DURATION = 4200;

export function HomeCategoryStory({ visible, categoryKey, onClose }: Props) {
  const { colors } = useAppTheme();
  const { t } = useI18n();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);
  const indexRef = useRef(index);
  const pausedProgressValue = useRef(0);
  const pressStartTime = useRef<number>(0);
  const LONG_PRESS_THRESHOLD = 150; // milliseconds to distinguish tap from hold

  const stories: Story[] = (categoryKey && categoryStories[categoryKey]) || [];
  const total = stories.length;

  // Handle hardware back button and gestures
  useEffect(() => {
    if (!visible) return;

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onClose();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [visible, onClose]);

  useEffect(() => {
    if (!visible) {
      setIndex(0);
      indexRef.current = 0;
      progress.setValue(0);
      animRef.current?.stop?.();
    }
  }, [visible, progress]);

  useEffect(() => {
    if (visible) {
      setIndex(0);
      indexRef.current = 0;
    }
  }, [categoryKey, visible]);

  useEffect(() => {
    if (!visible || total === 0) return;

    progress.setValue(0);
    indexRef.current = index;
    animRef.current?.stop?.();
    pausedProgressValue.current = 0;

    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    });
    animRef.current = anim;
    anim.start(({ finished }) => {
      // use indexRef to avoid stale closure and avoid double-advances
      if (!finished) return;
      if (indexRef.current < total - 1) {
        const nextIndex = indexRef.current + 1;
        indexRef.current = nextIndex;
        setIndex(nextIndex);
      } else {
        onClose();
      }
    });

    return () => anim.stop();
  }, [index, visible, total, progress, onClose]);

  // Handle pause/resume
  useEffect(() => {
    if (!visible || total === 0) return;

    if (isPaused) {
      // Pause: stop animation and save current progress
      animRef.current?.stop?.();
      progress.stopAnimation((value) => {
        pausedProgressValue.current = value;
      });
    } else {
      // Resume: continue from saved progress
      const remainingProgress = 1 - pausedProgressValue.current;
      const remainingDuration = STORY_DURATION * remainingProgress;

      if (remainingDuration > 0) {
        const anim = Animated.timing(progress, {
          toValue: 1,
          duration: remainingDuration,
          useNativeDriver: false,
        });
        animRef.current = anim;
        anim.start(({ finished }) => {
          if (!finished) return;
          if (indexRef.current < total - 1) {
            const nextIndex = indexRef.current + 1;
            indexRef.current = nextIndex;
            setIndex(nextIndex);
          } else {
            onClose();
          }
        });
      }
    }
  }, [isPaused, visible, total, progress, onClose]);

  if (!categoryKey || total === 0) return null;

  const active = stories[index];
  const { width, height } = Dimensions.get("window");

  function next() {
    // stop current animation and advance
    animRef.current?.stop?.();
    if (indexRef.current < total - 1) {
      const nextIndex = indexRef.current + 1;
      indexRef.current = nextIndex;
      setIndex(nextIndex);
    } else {
      onClose();
    }
  }

  function prev() {
    animRef.current?.stop?.();
    if (indexRef.current > 0) {
      const prevIndex = indexRef.current - 1;
      indexRef.current = prevIndex;
      setIndex(prevIndex);
    } else {
      // restart current
      progress.setValue(0);
    }
  }

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (width - 32) / total - 6],
  });

  const handleCtaPress = () => {
    if (active.pathname) {
      onClose();
      router.push({
        pathname: active.pathname as never,
        params: active.params || {},
      });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Image
          source={{ uri: active.image }}
          style={[styles.hero, { height: height }]}
          contentFit="cover"
        />

        {/* Bottom gradient overlay for text visibility */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
          style={styles.gradientOverlay}
          pointerEvents="none"
        />

        <View style={[styles.topBar, { top: insets.top + 20 }]}>
          <View style={styles.progressRow}>
            {stories.map((s, i) => (
              <View key={s.id} style={styles.progressTrack}>
                {i < index ? (
                  <View
                    style={[
                      styles.progressFill,
                      { width: (width - 32) / total - 6 },
                    ]}
                  />
                ) : i === index ? (
                  <Animated.View
                    style={[styles.progressFill, { width: progressWidth }]}
                  />
                ) : null}
              </View>
            ))}
          </View>

          <View style={styles.headerRow}>
            <Text style={styles.headerLabel}>
              {t(`home.categories.${categoryKey}`)}
            </Text>
          </View>
        </View>

        {/* Close button with larger touch area - positioned absolutely */}
        <Pressable 
          onPress={onClose} 
          style={[styles.closeBtn, { top: insets.top + 28 }]}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <X color="white" size={20} />
        </Pressable>

        <Pressable
          style={styles.interactionArea}
          onPressIn={() => {
            pressStartTime.current = Date.now();
            setIsPaused(true);
          }}
          onPressOut={({ nativeEvent }) => {
            const pressDuration = Date.now() - pressStartTime.current;
            setIsPaused(false);
            
            // Only navigate if it was a quick tap (not a hold)
            if (pressDuration < LONG_PRESS_THRESHOLD) {
              const x = nativeEvent.pageX;
              if (x < width / 2) prev();
              else next();
            }
          }}
        >
          <View 
            style={[styles.bottomMeta, { paddingBottom: Math.max(insets.bottom, 20) + 20 }]} 
            pointerEvents="box-none"
          >
            {active.title ? (
              <Text style={styles.storyTitle}>{active.title}</Text>
            ) : null}
            {active.subtitle ? (
              <Text style={styles.storySubtitle}>{active.subtitle}</Text>
            ) : null}
            {active.cta ? (
              <Pressable style={styles.ctaBtn} onPress={handleCtaPress}>
                <Text style={styles.ctaText}>{active.cta}</Text>
              </Pressable>
            ) : null}
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  hero: { width: "100%", position: "absolute", top: 0, left: 0 },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  topBar: { position: "absolute", left: 16, right: 16 },
  progressRow: { flexDirection: "row", gap: 6 },
  progressTrack: {
    height: 3,
    backgroundColor: "rgba(255,255,255,0.2)",
    flex: 1,
    borderRadius: 3,
    overflow: "hidden",
    marginRight: 6,
  },
  progressFill: {
    height: 3,
    backgroundColor: "white",
  },
  headerRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 48,
  },
  headerLabel: { color: "white", fontWeight: "700", fontSize: 16 },
  closeBtn: {
    position: "absolute",
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  interactionArea: { flex: 1, justifyContent: "flex-end" },
  bottomMeta: { padding: 20 },
  storyTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 6,
  },
  storySubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginBottom: 12,
  },
  ctaBtn: {
    backgroundColor: "#00A86B",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  ctaText: { color: "white", fontWeight: "700" },
});
