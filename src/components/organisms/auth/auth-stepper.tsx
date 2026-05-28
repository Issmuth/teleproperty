import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

type AuthStepperProps = {
  currentStep: number;
  steps: number;
};

export function AuthStepper({ currentStep, steps }: AuthStepperProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      {Array.from({ length: steps }, (_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isDone = step < currentStep;

        return (
          <View key={step} style={styles.stepWrap}>
            <View
              style={[
                styles.stepCircle,
                {
                  backgroundColor:
                    isDone || isActive ? colors.activeText : colors.surface,
                  borderColor:
                    isDone || isActive ? colors.activeText : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.stepLabel,
                  { color: isDone || isActive ? "#FFFFFF" : colors.textMuted },
                ]}
              >
                {step}
              </Text>
            </View>

            {step !== steps ? (
              <View
                style={[
                  styles.stepLine,
                  {
                    backgroundColor: isDone ? colors.activeText : colors.border,
                  },
                ]}
              />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  stepWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: "900",
  },
  stepLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
    borderRadius: 999,
  },
});
