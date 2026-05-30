import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="projects" />
      <Stack.Screen name="project-details" />
    </Stack>
  );
}
