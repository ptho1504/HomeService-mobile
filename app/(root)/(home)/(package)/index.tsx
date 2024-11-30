import { Button, ButtonText } from "@/components/ui/button";
import { Href, router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";

const SelectPackage = () => {
  const { service } = useLocalSearchParams();
  console.log(service);

  return (
    <View className="flex">
      <View>
        <TouchableWithoutFeedback>
          <Button
            className="w-fit self-end mt-4"
            size="md"
            onPress={() => {
              router.push(`/(root)/(home)/(package)/${service}/one` as Href);
            }}
          >
            <ButtonText>Chọn gói cá nhân</ButtonText>
          </Button>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback>
        <Button
          className="w-fit self-end mt-4"
          size="md"
          onPress={() => {
            router.push(`/(root)/(home)/(package)/${service}/many` as Href);
          }}
        >
          <ButtonText>Chọn gói tháng</ButtonText>
        </Button>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SelectPackage;
