import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account" />
      <Stack.Screen name="admin" />
      <Stack.Screen name="broker-hub" />
      <Stack.Screen name="developer-hub" />
      <Stack.Screen name="register" />
      <Stack.Screen name="callbacks" />
      <Stack.Screen name="listings" />
      <Stack.Screen name="reviews" />
      <Stack.Screen name="saved" />
      <Stack.Screen name="messages" />
    </Stack>
  );
}
