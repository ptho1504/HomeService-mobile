import React, { useEffect, useRef } from "react";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import LottieView from "lottie-react-native";
import { VStack } from "../ui/vstack";
import { Animated, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Loading = () => {
  const translateXHome = useRef(new Animated.Value(-500)).current;
  const translateXService = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    // Animate "Home" from left to center
    Animated.timing(translateXHome, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animate "Service" from right to center
    Animated.timing(translateXService, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  {
  }
  return (
    <SafeAreaView className="flex h-full">
      <VStack space="lg" className="h-full flex items-center">
        <LottieView
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            position: "absolute",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("@/assets/lotties/splash.json")}
        />
        <Box className="h-full flex-row gap-2 my-[20%]">
          {/* Animated "Home" */}
          <Animated.Text
            className="text-black font-bold text-4xl"
            style={[
              {
                transform: [{ translateX: translateXHome }],
              },
            ]}
          >
            Home
          </Animated.Text>

          {/* Animated "Service" */}
          <Animated.Text
            className="text-success-600 text-4xl font-bold"
            style={[
              // styles.textSuccess,
              {
                transform: [{ translateX: translateXService }],
              },
            ]}
          >
            Service
          </Animated.Text>
        </Box>
      </VStack>
    </SafeAreaView>
  );
};
export default Loading;
