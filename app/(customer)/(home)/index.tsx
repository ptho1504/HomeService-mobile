import { Button, ButtonText } from "@/components/ui/button";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
import { selectUser } from "@/store/reducers";
import { WorkType } from "@/constants";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { useGetPostsByUserIdQuery } from "@/services/post";

const Home = () => {
  const currentUser = useSelector(selectUser);
  // console.log("currentUser", currentUser);

  return (
    <SafeAreaView>
      <Text>Home Page</Text>
      <Text>Hello {currentUser?.name}</Text>
      <View className="flex">
        <View>
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
        </View>
        <View>
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
