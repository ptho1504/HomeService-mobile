import { i18n } from '@/localization';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="log-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="verify" options={{ headerShown: true, title: i18n.t("verify") }} />
      <Stack.Screen name="verify_signup" options={{ headerShown: true, title: i18n.t("verify") }} />
      <Stack.Screen name="register" options={{ headerShown: false, title: i18n.t("word_register") }} />
      <Stack.Screen name="GoogleLogin" options={{ headerShown: false }} />
    </Stack>
  );
}
