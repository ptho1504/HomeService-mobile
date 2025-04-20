import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';

export default function AccountLayout() {
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
        name="edit-profile"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-address"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="map-address"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
