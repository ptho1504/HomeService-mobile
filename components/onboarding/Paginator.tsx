import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

interface Props {
  data: any;
  scrollX: Animated.Value;
}

const Paginator = ({ data, scrollX }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <View className="flex flex-row h-[12px]">
      {data.map((_: any, index: number) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={index}
          ></Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    marginHorizontal: 8,
  },
});

export default Paginator;
