import { i18n } from "@/localization";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function ListLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="FreelancerList"
        options={{
          headerShown: true,
          title: i18n.t("word_freelancer_list_title"),
        }}
      />
      <Stack.Screen
        name="Freelancer"
        options={{
          headerShown: true,
          title: i18n.t("word_freelancer_info_title"),
        }}
      />
    </Stack>
  );
}
