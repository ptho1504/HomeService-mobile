import { Button, ButtonText } from "@/components/ui/button";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
import { selectIsAuthenticated, selectUser } from "@/store/reducers";
import { WorkType } from "@/constants";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "@/components/ui/text";
import FlagVN from "@/components/svg/FlagVN";
import { Pressable } from "@/components/ui/pressable";
import { i18n, Language } from "@/localization";
import { HStack } from "@/components/ui/hstack";
import Carousel from "@/components/carousel/Carousel";
import ListServices from "@/components/list-services/ListServices";
import LanguageToggleButton from "@/components/customeButton/LanguageToggleButton";

// i18n.locale = "vn";
// i18n.enableFallback = true;
// i18n.defaultLocale = Language.VIETNAMESE;

const Home = () => {
  const currentUser = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // console.log("currentUser", currentUser);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView className="relative flex-1">
      <ScrollView
        className="h-full"
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Image
          className="h-full w-full absolute top-0 left-0 opacity-30"
          source={require("@/assets/images/bg2.jpg")}
        />
        <VStack space="2xl" className="px-5 h-full flex items-center">
          {/* Hello And change languae */}
          <Box className="w-full m-5 px-8 py-2 flex flex-row items-center justify-between h-auto bg-green-300 rounded-full">
            <VStack>
              <Text size="xl" className="px-4 w-full text-white font-semibold">
                {i18n.t("word_hello")} 👋
              </Text>
              <Text
                size="xl"
                className={
                  "px-4 w-full text-white font-semibold " +
                  (currentUser !== null ? "block" : "hidden")
                }
              >
                {currentUser?.name}
              </Text>
            </VStack>
            <Box className="px-4 rounded-full flex flex-row items-center justify-between gap-3 bg-white">
              <LanguageToggleButton className="bg-green-200 p-3 rounded-full" />
              <Pressable className="bg-green-200 p-3 rounded-full">
                <Ionicons name="calendar-sharp" size={20} color="black" />
              </Pressable>
            </Box>
          </Box>
          <Box className="w-full h-auto px-8 bg-white flex gap-2 py-5 rounded-3xl shadow-2xl shadow-green-400">
            <Text size="xl" className="font-bold">
              {i18n.t("discover_welcome")}
            </Text>
            {/* Login */}
            {!isAuthenticated && (
              <Pressable
                onPress={() => {
                  router.push("/(auth)/log-in");
                }}
              >
                {({ pressed }) => (
                  <HStack
                    className={`border-2 bg-gray-200 border-green-500 max-w-56 
                  gap-1 flex flex-row justify-around items-center py-2 px-5 rounded-lg ${
                    pressed
                      ? "bg-green-500 shadow-md shadow-gray-400"
                      : "bg-white"
                  }`}
                  >
                    <Text
                      size="md"
                      className={`font-bold text-green-400 max-w-24 text-center
                     ${pressed ? "text-white" : ""}
                    `}
                    >
                      {i18n.t("login")}
                    </Text>
                    <Text
                      size="md"
                      className={`font-bold text-green-400 max-w-24 text-center
                    ${pressed ? "text-white" : ""}
                   `}
                    >
                      -
                    </Text>
                    <Text
                      size="md"
                      className={`font-bold text-green-400  max-w-24 text-center
                    ${pressed ? "text-white" : ""}
                   `}
                    >
                      {i18n.t("signup")}
                    </Text>
                  </HStack>
                )}
              </Pressable>
            )}
          </Box>
          {/* Carousel */}
          <Box className="w-full h-auto rounded-3xl bg-white px-7">
            <Carousel />
          </Box>
          {/* Service */}
          <Box className="p-4 w-full h-auto rounded-3xl bg-white">
            <Text size="2xl" className="font-bold">
              {i18n.t("service")}
            </Text>
            <ListServices />
          </Box>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
{
  /* <View className="flex">
<TouchableWithoutFeedback>
  <Button
    className="w-fit self-end mt-4"
    size="md"
    onPress={() => {
      router.push(`/Post?workType=${WorkType.HOUSECLEANING.key}`);
    }}
  >
    <ButtonText>Đăng việc {WorkType.HOUSECLEANING.value}</ButtonText>
  </Button>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback>
  <Button
    className="w-fit self-end mt-4"
    size="md"
    onPress={() => {
      router.push(`/Post?workType=${WorkType.BABYSITTING.key}`);
    }}
  >
    <ButtonText>Đăng việc {WorkType.BABYSITTING.value}</ButtonText>
  </Button>
</TouchableWithoutFeedback>
</View> */
}
