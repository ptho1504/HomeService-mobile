import { View, Text, Pressable } from "react-native";
import React from "react";
import { i18n, Language } from "@/localization";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
i18n.locale = "vn";
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;
const DoTest = () => {
  const handleVisit = () => {
    console.log("Result test");
    router.push("/(services)/result-test");
  };
  return (
    <View>
      <Text>Làm bài kiểm tra</Text>
      {/*  */}
      <View className="w-[90%] border border-gray-200 rounded-md flex flex-row p-3 items-center">
        <View className="w-full flex gap-1">
          <Text className="text-2xl font-semibold">câu 1</Text>
        </View>
        <Pressable onPress={handleVisit}>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default DoTest;
