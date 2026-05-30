import { categoryStories, type Story } from "@/data/home";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { Image } from "expo-image";
import { X } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
  visible: boolean;
  categoryKey: string | null;
  onClose: () => void;
};

const STORY_DURATION = 4200;

export function HomeCategoryStory({ visible, categoryKey, onClose }: Props) {
  const { colors } = useAppTheme();
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);
  const indexRef = useRef(index);

  const stories: Story[] = (categoryKey && categoryStories[categoryKey]) || [];
  const total = stories.length;

  useEffect(() => {
    if (!visible) return;
    // reset
    setIndex(0);
    indexRef.current = 0;
    progress.setValue(0);
    // stop any previous animation
    animRef.current?.stop?.();
  }, [visible, categoryKey, progress]);

  useEffect(() => {
    if (!visible || total === 0) return;

    progress.setValue(0);
    // stop any running animation first
    animRef.current?.stop?.();
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

  useEffect(() => {
    // reset progress when index changes
    progress.setValue(0);
    indexRef.current = index;
  }, [index, progress]);

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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Image
          source={{ uri: active.image }}
          style={[styles.hero, { height: height }]}
          contentFit="cover"
        />

        <View style={styles.topBar}>
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
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <X color="white" />
            </Pressable>
          </View>
        </View>

        <Pressable
          style={styles.interactionArea}
          onPress={({ nativeEvent }) => {
            const x = nativeEvent.pageX;
            if (x < width / 2) prev();
            else next();
          }}
        >
          <View style={styles.bottomMeta} pointerEvents="none">
            {active.titleKey ? (
              <Text style={styles.storyTitle}>{t(active.titleKey)}</Text>
            ) : null}
            {active.subtitleKey ? (
              <Text style={styles.storySubtitle}>{t(active.subtitleKey)}</Text>
            ) : null}
            {active.ctaKey ? (
              <View style={styles.ctaBtn}>
                <Text style={styles.ctaText}>{t(active.ctaKey)}</Text>
              </View>
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
  topBar: { position: "absolute", top: 20, left: 16, right: 16 },
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
  },
  headerLabel: { color: "white", fontWeight: "700", fontSize: 16 },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  interactionArea: { flex: 1, justifyContent: "flex-end" },
  bottomMeta: { padding: 20, paddingBottom: 40 },
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
