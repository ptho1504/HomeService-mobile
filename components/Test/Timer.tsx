import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { i18n } from "@/localization";
import { Text } from "@/components/ui/text";

const Timer = ({ timeLeft }: { timeLeft: number }) => {
  const formatTimeInTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View className="bg-green-600 p-5 flex flex-row items-center justify-between">
      <Text size="2xl" className="text-white">
        {i18n.t("st_time_of_doing_test")}:
      </Text>
      <Text size="2xl" className="text-white font-bold">
        ⏳{formatTimeInTimer(timeLeft)}
      </Text>
    </View>
  );
};

export default Timer;
