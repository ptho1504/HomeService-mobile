import React from "react";
import { TouchableOpacity, Text, Animated } from "react-native";

interface Props {
  onPress: () => void;
}

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const GettingStartedButton = ({ onPress }: Props) => {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedButton
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{
        transform: [{ scale: scaleAnim }],
        backgroundColor: "#0286FF", // Tailwind: bg-blue-500
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25, // Tailwind: rounded-full
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
      }}
    >
      <Text
        style={{
          color: "white", // Tailwind: text-white
          fontSize: 18, // Tailwind: text-lg
          fontWeight: "600", // Tailwind: font-semibold
        }}
      >
        Get Started
      </Text>
    </AnimatedButton>
  );
};

export default GettingStartedButton;
