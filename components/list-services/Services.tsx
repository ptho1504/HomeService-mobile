import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { IService } from "./ListServices";

interface Props {
  item: IService;
}

export default function Services({ item }: Props) {
  return (
    <View>
      <MaterialIcons name={item.iconName} size={24} color="black" />
    </View>
  );
}
