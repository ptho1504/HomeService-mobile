import { Stack } from "expo-router";
import "react-native-reanimated";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="babykeeping" options={{ headerShown: false }} />
      <Stack.Screen name="housecleaning" options={{ headerShown: false }} />
    </Stack>
  );
}
