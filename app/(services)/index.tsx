import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Service = () => {
  const { id } = useLocalSearchParams();
  console.log("Id of your service", id);
  return (
    <View>
      <Text>Service</Text>
    </View>
  );
};

export default Service;
