import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { useLoginMutation, useSendOtpMutation } from "@/services";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
// import Swiper from "react-native-swiper";

const LogIn = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [sendOtp] = useSendOtpMutation();


  const handleSubmit = async () => {
    try {
      console.log("email", email);
      const response = await sendOtp({ email });
      if (response) {
        console.log(response);
        router.replace("/(auth)/verify");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between">
      <View className="flex p-5 items-center justify-start h-full bg-white">
        {/* header */}
        <View className="flex flex-row items-center justify-between ">
          <View className="flex-1 flex-row gap-2">
            <Text className="text-black text-xl font-extrabold">Home</Text>
            <Text className="text-xl text-success-600 font-extrabold">
              Service
            </Text>
          </View>
          <View className="flex-2 bg-white border border-primary-200 rounded-xl">
            <Button
              size="md"
              variant="solid"
              action="primary"
              className="bg-white"
            >
              <ButtonText className="text-primary-500">Tiếng Việt</ButtonText>
            </Button>
          </View>
        </View>
        <View>
          <Text>Logo</Text>
        </View>

        {/* login */}
        <View className="w-full">
          <FormControl
            isInvalid={isInvalid}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" size={"lg"}>
              <InputField
                type="text"
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Must be atleast 6 characters.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Atleast 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <TouchableWithoutFeedback>
            <Button
              className="w-fit self-end mt-4"
              size="md"
              onPress={handleSubmit}
            >
              <ButtonText>Đăng nhập</ButtonText>
            </Button>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LogIn;
