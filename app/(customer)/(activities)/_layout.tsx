import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RootStackParamList } from "@/types/postTypes";
import Posts from ".";
import { i18n } from "@/localization";

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

export default function ActivityLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#059669",
        },
      }}
    >
      <Tab.Screen
        name="UpcomingWork"
        options={{ title: i18n.t("word_title_upcoming_work") }}
        component={Posts} // Truyền component mà không cần hàm inline
        initialParams={{ status: "UPCOMING" }} // Truyền tham số
      />
      <Tab.Screen
        name="PackageWork"
        options={{ title: i18n.t("word_title_package_work") }}
        component={Posts}
        initialParams={{ status: "PACKAGE" }}
      />
      <Tab.Screen
        name="PastWork"
        options={{ title: i18n.t("word_title_all_work") }}
        component={Posts}
        initialParams={{ status: "ALL" }}
      />
    </Tab.Navigator>
  );
}
