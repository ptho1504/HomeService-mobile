import { OnboardingItem } from "@/types/types";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

interface Props {
  item: OnboardingItem;
}

const OnboardItem = ({ item }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <View
      key={item.id}
      style={[{ width }]}
      className="flex items-center justify-center p-5"
    >
      <Image
        source={item.image as ImageSourcePropType}
        className="w-full h-[300px]"
        resizeMode="contain"
      />
      <View className="flex flex-row items-center justify-center w-full mt-10">
        <Text className="text-black text-3xl font-bold mx-10 text-center">
          {item.title}
        </Text>
      </View>
      <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
        {item.description}
      </Text>
    </View>
  );
};

export default OnboardItem;
