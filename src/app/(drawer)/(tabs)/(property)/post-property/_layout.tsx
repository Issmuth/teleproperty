import { Stack } from "expo-router";

import { PostPropertyDraftProvider } from "@/components/organisms/post-property/post-property-draft-context";

export default function PostPropertyLayout() {
  return (
    <PostPropertyDraftProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="details" />
        <Stack.Screen name="contact" />
      </Stack>
    </PostPropertyDraftProvider>
  );
}
