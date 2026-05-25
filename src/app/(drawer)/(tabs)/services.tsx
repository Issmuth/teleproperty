import { ScreenTemplate } from "@/components/templates/screen-template";
import { useI18n } from "@/i18n";

export default function ServicesScreen() {
  const { t } = useI18n();

  return <ScreenTemplate title={t("nav.services")} />;
}

