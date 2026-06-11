import { useState } from "react";

export function useSubscriptionSheet() {
  const [visible, setVisible] = useState(false);

  const openSheet = () => setVisible(true);
  const closeSheet = () => setVisible(false);

  return {
    visible,
    openSheet,
    closeSheet,
  };
}
