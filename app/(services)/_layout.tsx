import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";

export default function ServiceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-service"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="do-test"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="result-test"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
