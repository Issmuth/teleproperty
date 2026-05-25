import { ScreenTemplate } from "@/components/atoms/screen-template";
import { useI18n } from "@/i18n";

export default function PropertyScreen() {
  const { t } = useI18n();

  return <ScreenTemplate title={t("nav.property")} />;
}
