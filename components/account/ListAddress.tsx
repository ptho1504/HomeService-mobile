import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { AddressModel } from "@/types/userTypes";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useDeleteAddressByIdMutation } from "@/services";
import { useDispatch } from "react-redux";
import { deleteAddressById } from "@/store/reducers";

interface Props {
  address: AddressModel;
}

const ListAddress = ({ address }: Props) => {
  // console.log("add", address);
  const title = address.detail.split(",")[0] ?? "";
  const dispatch = useDispatch();
  const [deleteAddById, { isLoading, error, data }] =
    useDeleteAddressByIdMutation();

  const handleDelete = async () => {
    try {
      // console.log("delete id", address.id);

      const res = await deleteAddById(address.id!);
      dispatch(deleteAddressById(address.id!));
      // console.log("Deleted successfully", res);
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
  };

  return (
    <View className="border border-gray-200 rounded-md flex flex-row p-3 items-center">
      <View className="w-full flex gap-1">
        <Text className="text-2xl font-semibold">{title}</Text>
        <View>
          <Text className="text-lg">
            {address.detail}, Thành Phố Hồ Chí Minh
          </Text>
        </View>
        <View>
          <Text className="text-lg font-semibold">{address.customerName}</Text>
          <Text className="text-lg">
            (+84) {address.phoneNumber || "Chưa có"}
          </Text>
        </View>
      </View>
      <Pressable onPress={handleDelete}>
        <Ionicons name="trash-sharp" size={32} color="red" />
      </Pressable>
    </View>
  );
};

export default ListAddress;
