import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Post"
        options={{
          title: 'Đăng công việc',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="HouseCleaningForm"
        options={{
          title: 'Dọn dẹp nhà',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Checkout"
        options={{
          title: 'Xác nhận và thanh toán',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
