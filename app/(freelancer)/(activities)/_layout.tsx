import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RootStackParamList } from "@/types/postTypes";
import Posts from ".";
import { i18n, Language } from "@/localization";
import { getLang } from "@/store/reducers";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

export default function ActivityLayout() {
  // const lang = useSelector(getLang);

  // useEffect(() => {
  //   i18n.locale = lang;
  //   i18n.enableFallback = true;
  //   i18n.defaultLocale = Language.VIETNAMESE;
  // }, [lang]);

  // console.log("language in freelancer activity: ", lang);

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
