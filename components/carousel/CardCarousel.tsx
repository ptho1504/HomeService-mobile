import { CarouselItem } from "@/types/types";
import React from "react";
import { Box } from "../ui/box";
import { Dimensions, ImageBackground, View } from "react-native";
import { ImageSourcePropType } from "react-native";
import { Text } from "../ui/text";
import { Image } from "../ui/image";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const OFFSET = 45;
const ITEM_WIDTH = Dimensions.get("window").width - OFFSET * 2;
const ITEM_HEIGHT = 140;

interface Props {
  item: CarouselItem;
  total: number;
  scrollX: SharedValue<number>;
  id: number;
}

const CardCarousel = ({ item, total, scrollX, id }: Props) => {
  const inputRange = [
    (id - 1) * ITEM_WIDTH,
    id * ITEM_WIDTH,
    (id + 1) * ITEM_WIDTH,
  ];
  const translateStyle = useAnimatedStyle(() => {
    const translate = interpolate(
      scrollX.value,
      inputRange,
      [0.97, 0.97, 0.97],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [1, 1, 1],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale: translate }],
      opacity,
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          marginLeft: id === 0 ? OFFSET : undefined,
          //   marginRight: id === total - 1 ? OFFSET : undefined,F
          borderRadius: 14,
        },
        translateStyle,
      ]}
    >
      <ImageBackground
        className="border border-gray-100 rounded-2xl w-full object-cover overflow-hidden h-full"
        source={item.poster as ImageSourcePropType}
      ></ImageBackground>
    </Animated.View>
  );
};

export default CardCarousel;
