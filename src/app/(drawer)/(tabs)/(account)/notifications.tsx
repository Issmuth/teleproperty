import { useRouter } from "expo-router";
import { Bell, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

type NotifCategory = "All" | "Property Alerts" | "Government/News" | "Rewards & Lottery" | "Subscription";

const filters: NotifCategory[] = [
  "All",
  "Property Alerts",
  "Government/News",
  "Rewards & Lottery",
  "Subscription",
];

const categoryMeta: Record<string, { color: string; bg: string }> = {
  "Property Alerts":    { color: "#2563EB", bg: "#EFF6FF" },
  "Government/News":    { color: "#16A34A", bg: "#F0FDF4" },
  "Rewards & Lottery":  { color: "#D97706", bg: "#FFFBEB" },
  "Subscription":       { color: "#7C3AED", bg: "#F5F3FF" },
};

type Notification = {
  id: string;
  emoji: string;
  title: string;
  body: string;
  category: Exclude<NotifCategory, "All">;
  time: string;
  read: boolean;
};

const initialNotifs: Notification[] = [
  {
    id: "n1",
    emoji: "🏠",
    title: "New Property Match",
    body: "3-bed villa in Bole matches your saved search criteria",
    category: "Property Alerts",
    time: "2h ago",
    read: false,
  },
  {
    id: "n2",
    emoji: "📰",
    title: "Land Lease Update",
    body: "New government regulations on residential land leases announced",
    category: "Government/News",
    time: "4h ago",
    read: false,
  },
  {
    id: "n3",
    emoji: "🎁",
    title: "Campaign Live",
    body: "Monthly ETB 500,000 prize campaign started - join now!",
    category: "Rewards & Lottery",
    time: "6h ago",
    read: false,
  },
  {
    id: "n4",
    emoji: "💳",
    title: "Renewal Reminder",
    body: "Your subscription renews in 7 days - ETB 1,200/month",
    category: "Subscription",
    time: "1d ago",
    read: false,
  },
  {
    id: "n5",
    emoji: "🏠",
    title: "Price Drop Alert",
    body: "A saved property in Kazanchis dropped by ETB 200,000",
    category: "Property Alerts",
    time: "2d ago",
    read: true,
  },
  {
    id: "n6",
    emoji: "🎁",
    title: "Referral Bonus",
    body: "You earned ETB 150 for referring a new user",
    category: "Rewards & Lottery",
    time: "3d ago",
    read: true,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const [activeFilter, setActiveFilter] = useState<NotifCategory>("All");
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifs);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const filtered =
    activeFilter === "All"
      ? notifs
      : notifs.filter((n) => n.category === activeFilter);

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function clearAll() {
    setNotifs([]);
  }

  function markRead(id: string) {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Top bar */}
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          Notifications
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header row */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Bell size={22} color={colors.text} />
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Notifications
              </Text>
              {unreadCount > 0 && (
                <Text style={[styles.unreadCount, { color: colors.textMuted }]}>
                  {unreadCount} unread
                </Text>
              )}
            </View>
          </View>
          <View style={styles.headerActions}>
            <Pressable onPress={markAllRead}>
              <Text style={styles.markAllLabel}>Mark all as read</Text>
            </Pressable>
            <Pressable
              onPress={clearAll}
              style={[styles.trashBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Trash2 size={16} color={colors.textMuted} />
            </Pressable>
          </View>
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {filters.map((f) => {
            const isActive = activeFilter === f;
            return (
              <Pressable
                key={f}
                onPress={() => setActiveFilter(f)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: isActive
                      ? isDark ? "#1E3A8A" : "#1D4ED8"
                      : colors.surface,
                    borderColor: isActive ? "transparent" : colors.border,
                  },
                ]}
              >
                {f !== "All" && (
                  <Text style={{ fontSize: 13 }}>
                    {f === "Property Alerts" ? "🏠" : f === "Government/News" ? "📰" : f === "Rewards & Lottery" ? "🎁" : "💳"}
                  </Text>
                )}
                <Text
                  style={[
                    styles.filterLabel,
                    { color: isActive ? "#FFFFFF" : colors.textMuted },
                    isActive && { fontWeight: "900" },
                  ]}
                >
                  {f}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Notification cards */}
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={40} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              No notifications
            </Text>
          </View>
        ) : (
          filtered.map((notif) => {
            const meta = categoryMeta[notif.category];
            return (
              <Pressable key={notif.id} onPress={() => markRead(notif.id)}>
                <View
                  style={[
                    styles.notifCard,
                    {
                      backgroundColor: notif.read
                        ? colors.surface
                        : isDark
                          ? "#1E2D4A"
                          : "#EFF6FF",
                      borderColor: notif.read ? colors.border : "#BFDBFE",
                    },
                  ]}
                >
                  <View style={styles.notifRow}>
                    {/* Emoji icon */}
                    <View
                      style={[
                        styles.emojiWrap,
                        {
                          backgroundColor: isDark
                            ? colors.surfaceMuted
                            : meta?.bg ?? "#F8FAFC",
                        },
                      ]}
                    >
                      <Text style={{ fontSize: 22 }}>{notif.emoji}</Text>
                    </View>

                    {/* Content */}
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.notifTitle, { color: colors.text }]}>
                        {notif.title}
                      </Text>
                      <Text
                        style={[styles.notifBody, { color: colors.textMuted }]}
                      >
                        {notif.body}
                      </Text>
                      <View style={styles.notifMeta}>
                        <View
                          style={[
                            styles.categoryBadge,
                            { backgroundColor: isDark ? colors.surfaceMuted : meta?.bg ?? "#F8FAFC" },
                          ]}
                        >
                          <Text
                            style={[
                              styles.categoryBadgeLabel,
                              { color: meta?.color ?? colors.textMuted },
                            ]}
                          >
                            {notif.category}
                          </Text>
                        </View>
                        <Text
                          style={[styles.timeLabel, { color: colors.textMuted }]}
                        >
                          {notif.time}
                        </Text>
                      </View>
                    </View>

                    {/* Unread dot */}
                    {!notif.read && <View style={styles.unreadDot} />}
                  </View>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  backLabel: { fontSize: 24, lineHeight: 24, fontWeight: "700", marginTop: -2 },
  pageTitle: { fontSize: 18, fontWeight: "900" },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32, gap: 14 },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  sectionTitle: { fontSize: 20, fontWeight: "900" },
  unreadCount: { fontSize: 12, fontWeight: "600", marginTop: 1 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 10 },
  markAllLabel: { color: "#2563EB", fontSize: 13, fontWeight: "800" },
  trashBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  filtersRow: { gap: 8 },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    minHeight: 36,
    borderRadius: 999,
    borderWidth: 1,
  },
  filterLabel: { fontSize: 13, fontWeight: "700" },

  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 12,
  },
  emptyText: { fontSize: 14, fontWeight: "600" },

  notifCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },
  notifRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  emojiWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  notifTitle: { fontSize: 14, fontWeight: "900" },
  notifBody: { fontSize: 12, fontWeight: "600", marginTop: 3, lineHeight: 17 },
  notifMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  categoryBadgeLabel: { fontSize: 11, fontWeight: "800" },
  timeLabel: { fontSize: 11, fontWeight: "600" },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563EB",
    marginTop: 4,
  },
});
