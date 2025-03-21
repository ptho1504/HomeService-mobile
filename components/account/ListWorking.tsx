import { View, Text, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const ListWorking = () => {
  const handleVisit = () => {
    router.push("/(services)?id=1");
  };
  return (
    <View className="border border-gray-200 rounded-md flex flex-row p-3 items-center">
      <View className="w-full flex gap-1">
        <Text className="text-2xl font-semibold">Dọn dẹp nhà</Text>
      </View>
      <Pressable onPress={handleVisit}>
        <Ionicons name="arrow-forward" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default ListWorking;
