import { Button, ButtonText } from '@/components/ui/button';
import { LOCAL_STORAGE_JWT_KEY } from '@/constants';
import { selectUser } from '@/store/reducers';
import { WorkType } from '@/constants';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { useGetPostsByUserIdQuery } from "@/services/post";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import Ionicons from "@expo/vector-icons/Ionicons";

const Home = () => {
  const currentUser = useSelector(selectUser);
  // console.log("currentUser", currentUser);

  return (
    <SafeAreaView className="relative flex h-full">
      <Image
        className="h-full w-full absolute opacity-30"
        source={require("@/assets/images/bg2.jpg")}
      />
      <Box className="h-full flex items-center justify-between">
        {/* Hello And change languae */}
        <Box className="w-full m-5 px-8 py-2 flex flex-row justify-center h-auto bg-green-300 rounded-full">
          <Text className="w-3/4 text-xl text-white font-semibold">
            Xin chào 👋, {currentUser?.name}
          </Text>
          <Box className="px-4 rounded-full flex flex-row items-center justify-between gap-3 bg-white">
            <Box className="bg-green-200 p-2 rounded-full">
              
            </Box>
            <Box className="bg-green-200 p-2 rounded-full">
              <Ionicons name="calendar-sharp" size={20} color="black" />
            </Box>
          </Box>
        </Box>
        <Box className="w-full h-20 bg-gray-100">
          <Text className="text-center">ABC</Text>
        </Box>
        <Box className="w-full h-20 bg-gray-100">
          <Text className="text-center">ABC</Text>
        </Box>
      </Box>
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
