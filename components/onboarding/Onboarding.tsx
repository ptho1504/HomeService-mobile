import { OnboardingItem } from "@/types/types";
import React, { useRef, useState } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import OnboardItem from "./OnboardItem";
import AntDesign from "@expo/vector-icons/AntDesign";
import Paginator from "./Paginator";
import { router } from "expo-router";

interface Props {
  onboardings: OnboardingItem[];
}

const Onboarding = ({ onboardings }: Props) => {
  

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setCurrentIndex(viewableItems[0].index);
    }
  ).current;
  const slidesRef = useRef<FlatList<any>>(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < onboardings.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  return (
    <View className="h-full bg-white flex justify-center items-center">
      <FlatList
        className="h-[100px]"
        data={onboardings}
        renderItem={({ item }) => <OnboardItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        onViewableItemsChanged={viewableItemsChanged}
      />
      <Paginator data={onboardings} scrollX={scrollX} />
      <View className="w-full flex flex-row justify-between p-5">
        {currentIndex != onboardings.length - 1 ? (
          <>
            <TouchableOpacity
              className=""
              onPress={() => {
                // router.replace('/(auth)/log-in');
                router.replace('/(customer)/(home)');
                // router.push(`/(auth)/verify?email=${email}&role=${role}`);
              }}
            >
              <Text className="text-black text-md p-5 font-normal text-xl">
                Bỏ qua
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={scrollTo}
              className="bg-green-500 flex rounded-full w-16 h-16 items-center justify-center"
            >
              <AntDesign name="rightcircleo" size={56} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              className=""
              onPress={() => {
                router.replace('/(auth)/log-in');
              }}
            >
              <Text className="text-white text-lg font-semibold my-4 py-3 px-12 bg-green-600 rounded-full shadow-lg shadow-green-500">
                Bắt đầu
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default Onboarding;
