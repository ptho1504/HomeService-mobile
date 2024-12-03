import { Button, ButtonText } from "@/components/ui/button";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
import { selectUser } from "@/store/reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector } from "react-redux";

const getToken = async () => {
  return await AsyncStorage.getItem(LOCAL_STORAGE_JWT_KEY);
};

const Home = () => {
  const currentUser = useSelector(selectUser);
  const token = getToken();

  console.log("Currentuser", currentUser, token);

  return (
    <SafeAreaView>
      <Text>Home Page</Text>
      <View className="flex">
        <View>
          <TouchableWithoutFeedback>
            <Button
              className="w-fit self-end mt-4"
              size="md"
              onPress={() => {
                router.push("/(customer)/(home)/HouseCleaningPost");
              }}
            >
              <ButtonText>Đăng việc dọn nhà</ButtonText>
            </Button>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback>
            <Button
              className="w-fit self-end mt-4"
              size="md"
              onPress={() => {
                router.push("/(customer)/(home)");
              }}
            >
              <ButtonText>Đăng việc giữ trẻ</ButtonText>
            </Button>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
