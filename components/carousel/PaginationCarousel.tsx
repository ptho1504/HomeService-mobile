import { Box } from "../ui/box/index.web";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Text } from "../ui/text";
import { CarouselItem } from "@/types/types";
const OFFSET = 45;
const ITEM_WIDTH = Dimensions.get("window").width - OFFSET * 2;
const ITEM_HEIGHT = 140;

interface Props {
  data: CarouselItem[];
  scrollX: SharedValue<number>;
}

const PaginationDot = ({
  index,
  scrollX,
}: {
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const inputRange = [
    (index - 1) * ITEM_WIDTH,
    index * ITEM_WIDTH,
    (index + 1) * ITEM_WIDTH,
  ];

  const animatedDot = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      scrollX.value,
      inputRange,
      [10, 25, 10],
      Extrapolation.CLAMP
    );
    const opacityAnimatedDot = interpolate(
      scrollX.value,
      inputRange,
      [0.2, 1, 0.2],
      Extrapolation.CLAMP
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimatedDot,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollX.value,
      [0, ITEM_WIDTH, 2 * ITEM_WIDTH],
      ["#9095A7", "#9095A7", "#9095A7"]
    );
    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Animated.View
      style={[styles.dots, animatedDot, animatedColor]}
      //   className="h-3 mx-2 rounded-full bg-red-500"
    />
  );
};

export const PaginationCarousel = ({ data, scrollX }: Props) => {
  return (
    <View className="flex flex-row justify-center items-center py-3">
      {data.map((_, index: number) => {
        return <PaginationDot key={index} index={index} scrollX={scrollX} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dots: {
    height: 10,
    marginHorizontal: 8,
    borderRadius: 5,
  },
});
