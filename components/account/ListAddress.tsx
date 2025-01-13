import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { AddressModel } from "@/types/userTypes";

import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  address: AddressModel;
}

const ListAddress = ({ address }: Props) => {
  const handleDelete = () => {
    console.log("Delete");
  };
  return (
    <View className="border border-gray-200 rounded-md flex flex-row p-3 items-center">
      <View className="w-full flex gap-1">
        <Text className="text-2xl font-semibold">123 Nguyễn Trãi</Text>
        <View>
          <Text className="text-lg">
            123 Nguyễn Trãi, phường 12, Quận 1, Thành Phố Hồ Chí Minh
          </Text>
        </View>
        <View>
          <Text className="text-lg font-semibold">Nguyễn Văn A</Text>
          <Text className="text-lg">(+84) 0123456789</Text>
        </View>
      </View>
      <Pressable onPress={handleDelete}>
        <Ionicons name="trash-sharp" size={32} color="red" />
      </Pressable>
    </View>
  );
};

export default ListAddress;
