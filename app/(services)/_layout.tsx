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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-service"
        options={{
          title: "Thêm dịch vụ",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="do-test"
        options={{
          title: "Bài kiểm tra",
          headerShown: true,
          // headerLeft: () => <CustomBackButton />
        }}
      />

      <Stack.Screen
        name="result-test"
        options={{
          title: "Kết quả",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="addition-info"
        options={{
          title: "Bổ sung thông tin",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
