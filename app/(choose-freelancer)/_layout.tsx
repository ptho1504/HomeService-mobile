import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function ListLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="FreelancerList"
        options={{ headerShown: true, title: 'Chọn freelancers' }}
      />
      <Stack.Screen
        name="Freelancer"
        options={{ headerShown: true, title: 'Thông tin Freelancer' }}
      />
    </Stack>
  );
}
