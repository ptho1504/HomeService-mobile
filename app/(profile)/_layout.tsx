import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PaymentHistory"
        options={{ headerShown: true, title: 'Lịch sử giao dịch' }}
      />
    </Stack>
  );
}
