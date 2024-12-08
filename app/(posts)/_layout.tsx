import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function PostsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PostDetail"
        options={{ headerShown: true, title: 'Thông tin công việc' }}
      />
      <Stack.Screen
        name="Post"
        options={{
          title: 'Đăng công việc',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="PostForm"
        options={{
          title: 'Thông tin công việc',
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
