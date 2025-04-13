import { i18n } from "@/localization";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function PostsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PostDetail"
        options={{ headerShown: true, title: i18n.t("word_job_info_title") }}
      />
      <Stack.Screen
        name="Post"
        options={{
          title: i18n.t("word_post_job_title"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="PostForm"
        options={{
          title: i18n.t("word_job_info_title"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Checkout"
        options={{
          title: i18n.t("word_confirm_and_pay_title"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="FreelancerTakePosts"
        options={{
          title: i18n.t("word_freelancer_list_title"),
          headerShown: true,
        }}
      />
    </Stack>
  );
}
