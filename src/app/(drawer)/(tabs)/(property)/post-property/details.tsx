import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { AppBottomSheet } from "@/components/atoms/app-bottom-sheet";
import { PostPropertyChoiceGrid } from "@/components/organisms/post-property/post-property-choice-grid";
import { usePostPropertyDraft } from "@/components/organisms/post-property/post-property-draft-context";
import { PostPropertyShell } from "@/components/organisms/post-property/post-property-shell";
import { ethiopianCities } from "@/data/property";
import { useAppTheme } from "@/theme/app-theme";
import {
    ChevronRight,
    House,
    LayoutGrid,
    MapPin,
    Plus,
    Sparkles,
} from "lucide-react-native";

export default function PostPropertyStep2() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const { draft, updateDraft } = usePostPropertyDraft();
  const [citySheetVisible, setCitySheetVisible] = useState(false);

  const propertyTypeOptions = [
    { key: "residential", label: "Residential", icon: House },
    { key: "commercial", label: "Commercial", icon: LayoutGrid },
    { key: "land", label: "Land / Plot", icon: MapPin },
    { key: "hotel", label: "Hotel / Guest House", icon: Sparkles },
  ];

  const purposeOptions = [
    { key: "rent", label: "Rent", icon: Sparkles },
    { key: "sale", label: "Sale", icon: Plus },
    { key: "new-project", label: "New Project", icon: LayoutGrid },
    { key: "short-term", label: "Short-Term Rental", icon: House },
  ];

  const cityOptions = ethiopianCities.map((item) => item.name);

  return (
    <PostPropertyShell
      step={2}
      title="Property Details"
      subtitle="Fill in the core property information"
      footer={
        <Pressable
          onPress={() => router.push("/post-property/contact" as never)}
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
          <Text style={[styles.label, { color: colors.text }]}>
            Property Type *
          </Text>
          <PostPropertyChoiceGrid
            options={propertyTypeOptions}
            selectedKey={draft.propertyType}
            onSelect={(key) =>
              updateDraft({ propertyType: key as typeof draft.propertyType })
            }
            twoColumn
          />

          <Text
            style={[styles.label, styles.topSpacing, { color: colors.text }]}
          >
            Purpose *
          </Text>
          <PostPropertyChoiceGrid
            options={purposeOptions}
            selectedKey={draft.purpose}
            onSelect={(key) =>
              updateDraft({ purpose: key as typeof draft.purpose })
            }
            twoColumn
          />

          <Text
            style={[styles.label, styles.topSpacing, { color: colors.text }]}
          >
            City *
          </Text>
          <Pressable
            onPress={() => setCitySheetVisible(true)}
            style={[
              styles.selectField,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.selectContent}>
              <MapPin size={16} color={colors.textMuted} />
              <Text style={[styles.selectText, { color: colors.text }]}>
                {draft.city}
              </Text>
            </View>
            <Text style={[styles.chevronText, { color: colors.textMuted }]}>
              ⌄
            </Text>
          </Pressable>

          <Text
            style={[styles.label, styles.topSpacing, { color: colors.text }]}
          >
            Area / Location
          </Text>
          <TextInput
            value={draft.areaLocation}
            onChangeText={(value) => updateDraft({ areaLocation: value })}
            placeholder="e.g. Bole, Kazanchis"
            placeholderTextColor={colors.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />

          <View style={styles.dualRow}>
            <View style={styles.flexOne}>
              <Field
                label="Price"
                value={draft.price}
                onChangeText={(value) => updateDraft({ price: value })}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.flexOne}>
              <Field
                label="Bedrooms / Size"
                value={draft.size}
                onChangeText={(value) => updateDraft({ size: value })}
                placeholder="e.g. 3 BR or 250m²"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <AppBottomSheet
        visible={citySheetVisible}
        onClose={() => setCitySheetVisible(false)}
        title="Choose City"
        subtitle="Select the city where the property is located"
      >
        <View style={styles.sheetList}>
          {cityOptions.map((option) => {
            const selected = option === draft.city;

            return (
              <Pressable
                key={option}
                onPress={() => {
                  updateDraft({ city: option });
                  setCitySheetVisible(false);
                }}
                style={[
                  styles.sheetItem,
                  {
                    backgroundColor: selected
                      ? colors.activeSurface
                      : colors.surface,
                    borderColor: selected ? colors.activeText : colors.border,
                  },
                ]}
              >
                <MapPin
                  size={16}
                  color={selected ? colors.activeText : colors.textMuted}
                />
                <Text style={[styles.sheetItemText, { color: colors.text }]}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </AppBottomSheet>
    </PostPropertyShell>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
  inputStyle,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  multiline?: boolean;
  inputStyle?: object;
}) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.fieldGroup}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.multilineInput,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.text,
          },
          inputStyle,
        ]}
      />
    </View>
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
  label: {
    fontSize: 13,
    fontWeight: "900",
  },
  note: {
    fontSize: 12,
    fontWeight: "600",
  },
  topSpacing: {
    marginTop: 4,
  },
  dualRow: {
    flexDirection: "row",
    gap: 10,
  },
  flexOne: {
    flex: 1,
  },
  fieldGroup: {
    gap: 8,
  },
  input: {
    minHeight: 46,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 14,
    fontWeight: "600",
  },
  multilineInput: {
    minHeight: 110,
    paddingTop: 14,
    textAlignVertical: "top",
  },
  radioList: {
    gap: 8,
  },
  radioItem: {
    minHeight: 46,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: "800",
  },
  selectField: {
    minHeight: 46,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  selectText: {
    fontSize: 14,
    fontWeight: "700",
  },
  chevronText: {
    fontSize: 16,
    fontWeight: "900",
    marginTop: -2,
  },
  sheetList: {
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 18,
  },
  sheetItem: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sheetItemText: {
    fontSize: 14,
    fontWeight: "700",
  },
  primaryButton: {
    minHeight: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
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
