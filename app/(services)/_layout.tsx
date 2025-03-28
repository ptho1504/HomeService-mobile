import { i18n } from "@/localization";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack, useNavigation } from "expo-router";
import { Alert, Button } from "react-native";

// const CustomBackButton = () => {
//   const navigation = useNavigation();

//   const handleGoBack = () => {
//     Alert.alert("Xác nhận", "Bạn có chắc muốn quay lại?", [
//       { text: "Hủy", style: "cancel" },
//       { text: "Đồng ý", onPress: () => navigation.goBack() },
//     ]);
//   };

//   return <Button title="Back" onPress={handleGoBack} />;
// };

export default function ServiceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // gestureEnabled: false,
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: i18n.t("word_service_detail"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="add-service"
        options={{
          title: i18n.t("add_workings"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="do-test"
        options={{
          title: i18n.t("doing_test"),
          headerShown: true,
          // headerLeft: () => <CustomBackButton />
        }}
      />

      <Stack.Screen
        name="result-test"
        options={{
          title: i18n.t("result_test"),
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="addition-info"
        options={{
          title: i18n.t("add_addition_info"),
          headerShown: true,
        }}
      />
    </Stack>
  );
}
