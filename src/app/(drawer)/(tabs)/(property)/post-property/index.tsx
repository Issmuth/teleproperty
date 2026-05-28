import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { PostPropertyChoiceGrid } from "@/components/organisms/post-property/post-property-choice-grid";
import { usePostPropertyDraft } from "@/components/organisms/post-property/post-property-draft-context";
import { PostPropertyShell } from "@/components/organisms/post-property/post-property-shell";
import { useAppTheme } from "@/theme/app-theme";
import {
    ChevronRight,
    House,
    LayoutGrid,
    Sparkles,
    UserRound,
} from "lucide-react-native";

export default function PostPropertyStep1() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const { draft, updateDraft } = usePostPropertyDraft();

  return (
    <PostPropertyShell
      step={1}
      title="I am a..."
      subtitle="Select your role to personalize the experience"
      footer={
        <Pressable
          onPress={() => router.push("/post-property/details" as never)}
          style={[styles.primaryButton, { backgroundColor: colors.activeText }]}
        >
          <View style={styles.primaryButtonContent}>
            <Text style={styles.primaryLabel}>Continue</Text>
            <ChevronRight size={16} color="#FFFFFF" />
          </View>
        </Pressable>
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <PostPropertyChoiceGrid
            options={[
              {
                key: "owner",
                label: "Owner",
                subtitle: "List my property",
                icon: House,
              },
              {
                key: "broker-agent",
                label: "Broker / Agent",
                subtitle: "Represent buyers or sellers",
                icon: UserRound,
              },
              {
                key: "developer",
                label: "Developer",
                subtitle: "Manage projects & units",
                icon: LayoutGrid,
              },
              {
                key: "property-manager",
                label: "Property Manager",
                subtitle: "Manage listings & tenants",
                icon: Sparkles,
              },
            ]}
            selectedKey={draft.role}
            onSelect={(key) => updateDraft({ role: key as typeof draft.role })}
            twoColumn
          />
        </View>
      </ScrollView>
    </PostPropertyShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 16,
    paddingBottom: 8,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    gap: 12,
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  primaryButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  primaryLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
});
