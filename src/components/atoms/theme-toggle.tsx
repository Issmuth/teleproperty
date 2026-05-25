import { MoonStar, SunMedium } from "lucide-react-native";

import { HeaderIconButton } from "@/components/atoms/header-icon-button";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

export function ThemeToggle() {
  const { t } = useI18n();
  const { isDark, toggleTheme, colors } = useAppTheme();

  const icon = isDark ? SunMedium : MoonStar;
  const label = isDark ? t("theme.switchToLight") : t("theme.switchToDark");

  return (
    <HeaderIconButton
      icon={icon}
      label={label}
      onPress={toggleTheme}
      iconColor={colors.icon}
      style={{ backgroundColor: colors.iconButtonBackground }}
    />
  );
}
