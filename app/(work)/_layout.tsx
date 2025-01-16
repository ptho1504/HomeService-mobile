import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function WorkLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="index"
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: 'Làm công việc' }}
      />
    </Stack>
  );
}
