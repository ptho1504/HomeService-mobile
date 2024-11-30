import { Stack } from "expo-router";
import "react-native-reanimated";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="one" options={{ headerShown: true }} />
      <Stack.Screen name="many" options={{ headerShown: true }} />
    </Stack>
  );
}
