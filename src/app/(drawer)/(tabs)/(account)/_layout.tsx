import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account" />
      <Stack.Screen name="admin" />
      <Stack.Screen name="broker-hub" />
      <Stack.Screen name="broker-register" />
      <Stack.Screen name="broker-dashboard" />
      <Stack.Screen name="broker-verified-leads" />
      <Stack.Screen name="broker-wallet" />
      <Stack.Screen name="subscriptions" />
      <Stack.Screen name="my-subscription" />
      <Stack.Screen name="broker-whatsapp" />
      <Stack.Screen name="payment-history" />
      <Stack.Screen name="broker-profile-verification" />
      <Stack.Screen name="broker-analytics" />
      <Stack.Screen name="developer-hub" />
      <Stack.Screen name="developer-register" />
      <Stack.Screen name="developer-dashboard" />
      <Stack.Screen name="callbacks" />
      <Stack.Screen name="listings" />
      <Stack.Screen name="reviews" />
      <Stack.Screen name="saved" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="privacy-security" />
    </Stack>
  );
}
