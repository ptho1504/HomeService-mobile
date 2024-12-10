import React, { Fragment } from "react";
import { Box } from "../ui/box";
import { Dimensions, ScrollView } from "react-native";
import { carousels } from "@/constants";
import { Text } from "../ui/text";
import CardCarousel from "./CardCarousel";
import Animated, { useSharedValue } from "react-native-reanimated";
import { PaginationCarousel } from "./PaginationCarousel";

const OFFSET = 45;
const ITEM_WIDTH = Dimensions.get("window").width - OFFSET * 2;
const ITEM_HEIGHT = 280;

const Carousel = () => {
  const scrollX = useSharedValue(0);
  return (
    <Box className="py-8">
      <Animated.ScrollView
        horizontal
        decelerationRate={"fast"}
        snapToInterval={ITEM_WIDTH}
        bounces={false}
        disableIntervalMomentum
        scrollEventThrottle={12}
        onScroll={(event) => {
          scrollX.value = event.nativeEvent.contentOffset.x;
        }}
      >
        {carousels.map((item) => (
          <CardCarousel
            key={item.id}
            item={item}
            scrollX={scrollX}
            total={carousels.length}
            id={item.id}
          />
        ))}
      </Animated.ScrollView>
      <PaginationCarousel data={carousels} scrollX={scrollX} />
    </Box>
  );
};

export default Carousel;
