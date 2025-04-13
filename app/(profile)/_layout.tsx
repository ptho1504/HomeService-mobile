import { i18n } from "@/localization";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PaymentHistory"
        options={{ headerShown: true, title: i18n.t("word_transaction") }}
      />
      <Stack.Screen
        name="Transaction"
        options={{
          headerShown: true,
          title: i18n.t("word_transaction_history"),
        }}
      />
      <Stack.Screen
        name="PaymentQr"
        options={{ headerShown: false, title: i18n.t("word_payment_code") }}
      />
    </Stack>
  );
}
