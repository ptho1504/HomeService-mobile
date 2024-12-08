import React, { useEffect, useRef } from "react";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import LottieView from "lottie-react-native";
import { VStack } from "../ui/vstack";
import { Animated, StyleSheet } from "react-native";
const Loading = () => {
  const translateX = useRef(new Animated.Value(-500)).current;
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Box className="flex-1 justify-start items-center bg-white">
      {/* <LottieView
        autoPlay
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          position: "absolute",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("@/assets/lotties/splash.json")}
      /> */}
      <VStack className="my-[20%] ">
        <Box className="flex-1 flex-row gap-2">
          <Animated.Text
            style={[
              styles.text,
              {
                transform: [{ translateX }],
              },
            ]}
          >
            Home
          </Animated.Text>
          <Animated.Text
            style={[
              styles.text,
              {
                transform: [{ translateX }],
              },
            ]}
            className="text-success-600 font-extrabold"
          >
            Service
          </Animated.Text>
        </Box>
      </VStack>
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "bold",
    color: "#000",
  },
});
export default Loading;
