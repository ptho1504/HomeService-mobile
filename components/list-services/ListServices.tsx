import { View, Dimensions, ScrollView } from "react-native";
import React, { Fragment } from "react";
import Services from "./Services";
import { Box } from "../ui/box";
import Animated, { useSharedValue } from "react-native-reanimated";
import { Text } from "../ui/text";
import { Pressable } from "../ui/pressable";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { WorkType } from "@/constants";
import { Href, router } from "expo-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/reducers";
import RequiredAuthenticationModal from "../authentication/RequiredAuthenticationModal";

const OFFSET = 45;
const ITEM_WIDTH = Dimensions.get("window").width - OFFSET * 2;
const ITEM_HEIGHT = 280;

export interface IService {
  title: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  id: number;
  href: Href;
}
const services: IService[] = [
  {
    id: 1,
    title: "Dọn dẹp",
    iconName: "cleaning-services",
    href: `/Post?workType=${WorkType.HOUSECLEANING.key}`,
  },
  {
    id: 2,
    title: "Trông trẻ",
    iconName: "baby-changing-station",
    href: `/Post?workType=${WorkType.BABYSITTING.key}`,
  },
];

export default function ListServices() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showModal, setShowModal] = React.useState(false);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="my-2"
    >
      {services.map((item) => {
        return (
          <Pressable
            key={item.id}
            onPress={() => {
              if (!isAuthenticated) {
                setShowModal(true);
              } else {
                router.push(item.href);
              }
            }}
            className="flex py-2"
          >
            {({ pressed }) => (
              <>
                <Box
                  className={`mx-4 px-2 w-16 h-16 border border-success-200 flex justify-center items-center bg-success-0 rounded-3xl ${
                    pressed ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <Services item={item} />
                </Box>
                <Text size="lg" className="text-black text-center">
                  {item.title}
                </Text>
              </>
            )}
          </Pressable>
        );
      })}
      {!isAuthenticated && (
        <RequiredAuthenticationModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </ScrollView>
  );
}
