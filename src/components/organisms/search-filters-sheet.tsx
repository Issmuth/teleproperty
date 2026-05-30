import { AppBottomSheet } from "@/components/atoms/app-bottom-sheet";
import type {
    SearchFilterOption,
    SearchFilterSection,
    SearchFiltersConfig,
} from "@/data/search-filters";
import { useAppTheme } from "@/theme/app-theme";
import { ChevronDown, SlidersHorizontal } from "lucide-react-native";
import { useEffect, useState, type ReactNode } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";

const FILTER_ICON_SIZE = 18;

type SearchFiltersSheetProps = {
  visible: boolean;
  onClose: () => void;
  config: SearchFiltersConfig;
  minFieldLabel?: string;
  maxFieldLabel?: string;
};

type FilterState = Record<string, string | string[] | boolean>;

export function SearchFiltersSheet({
  visible,
  onClose,
  config,
  minFieldLabel = "Min",
  maxFieldLabel = "Max",
}: SearchFiltersSheetProps) {
  const { colors } = useAppTheme();
  const [state, setState] = useState<FilterState>({});
  const [expandedSelectId, setExpandedSelectId] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setState(createInitialState(config.sections));
    setExpandedSelectId(null);
  }, [config.sections, visible]);

  const handleSegmentPress = (groupId: string, key: string) => {
    setState((current) => ({ ...current, [groupId]: key }));
  };

  const handleChipPress = (
    groupId: string,
    key: string,
    multiSelect: boolean | undefined,
  ) => {
    setState((current) => {
      if (multiSelect) {
        const existing = (current[groupId] as string[] | undefined) ?? [];
        const next = existing.includes(key)
          ? existing.filter((item) => item !== key)
          : [...existing, key];
        return { ...current, [groupId]: next };
      }

      return { ...current, [groupId]: key };
    });
  };

  const handleToggle = (groupId: string) => {
    setState((current) => ({
      ...current,
      [groupId]: !(current[groupId] as boolean),
    }));
  };

  const handleSelectPress = (selectId: string) => {
    setExpandedSelectId((current) => (current === selectId ? null : selectId));
  };

  const handleSelectOption = (groupId: string, option: SearchFilterOption) => {
    setState((current) => ({ ...current, [groupId]: option.label }));
    setExpandedSelectId(null);
  };

  const handleRangeChange = (
    groupId: string,
    which: "min" | "max",
    value: string,
  ) => {
    setState((current) => ({ ...current, [`${groupId}_${which}`]: value }));
  };

  return (
    <AppBottomSheet
      visible={visible}
      onClose={onClose}
      title={config.title}
      subtitle={config.subtitle}
      leadingIcon={
        <SlidersHorizontal size={FILTER_ICON_SIZE} color={colors.activeText} />
      }
      sheetStyle={styles.sheet}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {config.sections.map((section) => (
          <FilterSectionView
            key={section.id}
            section={section}
            state={state}
            expandedSelectId={expandedSelectId}
            onSegmentPress={handleSegmentPress}
            onChipPress={handleChipPress}
            onToggle={handleToggle}
            onSelectPress={handleSelectPress}
            onSelectOption={handleSelectOption}
            onRangeChange={handleRangeChange}
            minFieldLabel={minFieldLabel}
            maxFieldLabel={maxFieldLabel}
          />
        ))}
      </ScrollView>
    </AppBottomSheet>
  );
}

type FilterSectionViewProps = {
  section: SearchFilterSection;
  state: FilterState;
  expandedSelectId: string | null;
  onSegmentPress: (groupId: string, key: string) => void;
  onChipPress: (
    groupId: string,
    key: string,
    multiSelect: boolean | undefined,
  ) => void;
  onToggle: (groupId: string) => void;
  onSelectPress: (selectId: string) => void;
  onSelectOption: (groupId: string, option: SearchFilterOption) => void;
  onRangeChange: (groupId: string, which: "min" | "max", value: string) => void;
  minFieldLabel: string;
  maxFieldLabel: string;
};

function FilterSectionView({
  section,
  state,
  expandedSelectId,
  onSegmentPress,
  onChipPress,
  onToggle,
  onSelectPress,
  onSelectOption,
  onRangeChange,
  minFieldLabel,
  maxFieldLabel,
}: FilterSectionViewProps) {
  const { colors } = useAppTheme();

  if (section.kind === "segmented") {
    const activeKey = String(state[section.id] ?? section.selectedKey);

    return (
      <SectionBlock title={section.label}>
        <View
          style={[styles.segmentRow, { backgroundColor: colors.surfaceMuted }]}
        >
          {section.options.map((option) => {
            const isActive = option.key === activeKey;

            return (
              <Pressable
                key={option.key}
                onPress={() => onSegmentPress(section.id, option.key)}
                style={({ pressed }) => [
                  styles.segmentButton,
                  isActive && [
                    styles.segmentButtonActive,
                    { backgroundColor: colors.activeText },
                  ],
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.segmentLabel,
                    { color: isActive ? "#FFFFFF" : colors.textMuted },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </SectionBlock>
    );
  }

  if (section.kind === "dual-select") {
    return (
      <View style={styles.dualSelectRow}>
        {section.fields.map((field) => {
          const selectedValue = String(state[field.id] ?? field.value);
          const isExpanded = expandedSelectId === field.id;

          return (
            <View key={field.id} style={styles.dualSelectColumn}>
              <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
                {field.label}
              </Text>
              <Pressable
                onPress={() => onSelectPress(field.id)}
                style={[
                  styles.selectField,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[styles.selectValue, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {selectedValue}
                </Text>
                <ChevronDown size={16} color={colors.textMuted} />
              </Pressable>

              {isExpanded && (
                <View
                  style={[
                    styles.optionPanel,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  {field.options.map((option) => {
                    const isSelected = option.label === selectedValue;

                    return (
                      <Pressable
                        key={option.key}
                        onPress={() => onSelectOption(field.id, option)}
                        style={({ pressed }) => [
                          styles.optionItem,
                          isSelected && {
                            backgroundColor: colors.surfaceMuted,
                          },
                          pressed && styles.pressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            {
                              color: isSelected
                                ? colors.activeText
                                : colors.text,
                            },
                          ]}
                        >
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  }

  if (section.kind === "range") {
    const activeKey = String(state[section.id] ?? section.selectedKey);

    return (
      <SectionBlock title={section.label}>
        <View style={styles.rangeRow}>
          <View
            style={[
              styles.rangeField,
              {
                backgroundColor: colors.surfaceMuted,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.rangeFieldLabel, { color: colors.textMuted }]}>
              {minFieldLabel}
            </Text>
            <TextInput
              style={[styles.rangeInput, { color: colors.text }]}
              placeholder={section.minLabel}
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={String(state[`${section.id}_min`] ?? "")}
              onChangeText={(text) => onRangeChange(section.id, "min", text)}
            />
          </View>

          <View
            style={[
              styles.rangeField,
              {
                backgroundColor: colors.surfaceMuted,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.rangeFieldLabel, { color: colors.textMuted }]}>
              {maxFieldLabel}
            </Text>
            <TextInput
              style={[styles.rangeInput, { color: colors.text }]}
              placeholder={section.maxLabel}
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={String(state[`${section.id}_max`] ?? "")}
              onChangeText={(text) => onRangeChange(section.id, "max", text)}
            />
          </View>
        </View>
        <View style={styles.chipWrapRow}>
          {section.quickOptions.map((option) => {
            const isActive = option.key === activeKey;

            return (
              <FilterChip
                key={option.key}
                label={option.label}
                selected={isActive}
                onPress={() => onSegmentPress(section.id, option.key)}
              />
            );
          })}
        </View>
      </SectionBlock>
    );
  }

  if (section.kind === "chips") {
    const activeKeys =
      (state[section.id] as string[] | string | undefined) ??
      section.selectedKeys;
    const selectedSet = Array.isArray(activeKeys) ? activeKeys : [activeKeys];

    return (
      <SectionBlock title={section.label}>
        <View style={styles.chipWrapRow}>
          {section.options.map((option) => {
            const isActive = selectedSet.includes(option.key);

            return (
              <FilterChip
                key={option.key}
                label={option.label}
                selected={isActive}
                onPress={() =>
                  onChipPress(section.id, option.key, section.multiSelect)
                }
              />
            );
          })}
        </View>
      </SectionBlock>
    );
  }

  return (
    <SectionBlock title={section.label}>
      <View
        style={[
          styles.toggleCard,
          {
            backgroundColor: colors.surfaceMuted,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.toggleCopy}>
          <Text style={[styles.toggleTitle, { color: colors.text }]}>
            {section.label}
          </Text>
          <Text style={[styles.toggleDescription, { color: colors.textMuted }]}>
            {section.description}
          </Text>
        </View>
        <Switch
          value={Boolean(state[section.id] ?? section.value)}
          onValueChange={() => onToggle(section.id)}
          trackColor={{ false: colors.surface, true: colors.activeSurface }}
          thumbColor={
            Boolean(state[section.id] ?? section.value)
              ? colors.activeText
              : "#FFFFFF"
          }
        />
      </View>
    </SectionBlock>
  );
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.sectionBlock}>
      <Text style={[styles.sectionHeading, { color: colors.textMuted }]}>
        {title.toUpperCase()}
      </Text>
      {children}
    </View>
  );
}

function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress: () => void;
}) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? colors.activeText : colors.surface,
          borderColor: selected ? colors.activeText : colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.chipLabel,
          { color: selected ? "#FFFFFF" : colors.text },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function createInitialState(
  sections: readonly SearchFilterSection[],
): FilterState {
  const nextState: FilterState = {};

  for (const section of sections) {
    if (section.kind === "segmented" || section.kind === "range") {
      nextState[section.id] = section.selectedKey;
      continue;
    }

    if (section.kind === "dual-select") {
      for (const field of section.fields) {
        nextState[field.id] = field.value;
      }
      continue;
    }

    if (section.kind === "chips") {
      nextState[section.id] = [...section.selectedKeys];
      continue;
    }

    nextState[section.id] = section.value;
  }

  return nextState;
}

const styles = StyleSheet.create({
  sheet: {
    minHeight: "82%",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 34,
    gap: 18,
  },
  sectionBlock: {
    gap: 10,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  segmentRow: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 16,
    gap: 4,
  },
  segmentButton: {
    flex: 1,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  segmentButtonActive: {
    shadowColor: "rgba(0,0,0,0.18)",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  segmentLabel: {
    fontSize: 14,
    fontWeight: "800",
  },
  dualSelectRow: {
    flexDirection: "row",
    gap: 12,
  },
  dualSelectColumn: {
    flex: 1,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  selectField: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  selectValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
  },
  optionPanel: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 6,
    overflow: "hidden",
  },
  optionItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 13,
    fontWeight: "700",
  },
  rangeRow: {
    flexDirection: "row",
    gap: 12,
  },
  rangeField: {
    flex: 1,
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    justifyContent: "center",
    gap: 2,
  },
  rangeFieldLabel: {
    fontSize: 11,
    fontWeight: "800",
  },
  rangeFieldValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  rangeInput: {
    fontSize: 16,
    fontWeight: "700",
    paddingVertical: 6,
  },
  chipWrapRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    minHeight: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  toggleCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  toggleCopy: {
    flex: 1,
    gap: 4,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: "900",
  },
  toggleDescription: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.86,
  },
});
