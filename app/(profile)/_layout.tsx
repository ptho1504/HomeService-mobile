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
      <Stack.Screen
        name="Transaction"
        options={{ headerShown: true, title: 'Giao dịch' }}
      />
      <Stack.Screen
        name="PaymentQr"
        options={{ headerShown: false, title: 'Mã thanh toán' }}
      />
    </Stack>
  );
}
