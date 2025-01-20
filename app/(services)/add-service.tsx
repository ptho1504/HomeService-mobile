import { View, Text, Pressable } from "react-native";
import React from "react";
import { i18n, Language } from "@/localization";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
i18n.locale = "vn";
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;
const AddAService = () => {
  const handleVisit = () => {
    console.log("Do testing");
    router.push('/(services)/do-test')
  };
  return (
    <View>
      <Text>{i18n.t("list_workings")}</Text>
      {/*  */}
      <View className="w-[90%] border border-gray-200 rounded-md flex flex-row p-3 items-center">
        <View className="w-full flex gap-1">
          <Text className="text-2xl font-semibold">Dọn dẹp nhà</Text>
        </View>
        <Pressable onPress={handleVisit}>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default AddAService;
