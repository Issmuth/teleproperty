import { Stack } from "expo-router";

export default function PropertyStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="property" />
      <Stack.Screen name="property-details" />
    </Stack>
  );
}
