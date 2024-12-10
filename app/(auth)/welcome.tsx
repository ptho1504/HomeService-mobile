import { Box } from "@/components/ui/box";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Button,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { onboardings } from "@/constants";
import Onboarding from "@/components/onboarding/Onboarding";
import Loading from "@/components/loading/Loading";

const Welcome = () => {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-red-700">
      {/* Onboards */}
      <View className="py-24 bg-white flex items-center justify-between">
        <View className="flex h- justify-center flex-row gap-2">
          <Text className="text-black text-3xl font-extrabold">Home</Text>
          <Text className="text-3xl text-success-600 font-extrabold">
            Service
          </Text>
        </View>
        <Onboarding onboardings={onboardings} />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
