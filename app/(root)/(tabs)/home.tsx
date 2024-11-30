import { Button, ButtonText } from "@/components/ui/button";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";

const Home = () => {
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
                router.push("/(root)/(home)/(package)?service=housecleaning");
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
                router.push("/(root)/(home)/(package)?service=babykeeping");
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
