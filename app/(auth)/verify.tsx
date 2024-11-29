import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import Swiper from "react-native-swiper";
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
import { Input, InputField } from "@/components/ui/input";
import { useState } from "react";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { useVerifyOtpMutation } from "@/services";
import { router } from "expo-router";
const Verify = () => {
  const email = "tho.nguyen1504@hcmut.edu.vn";
  const [otp, setOtp] = useState<string | null>(null);
  const [verifyOtp] = useVerifyOtpMutation();
  const handleSubmit = async () => {
    try {
      if (otp) {
        console.log("otp", otp);
        const response = await verifyOtp({ email, otp: otp });
        if (response) {
          console.log(response);
          router.replace("/(auth)/verify");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <View>
        <Text className="text-red-500">Verify OTP</Text>
      </View>
      <View className="w-full">
        <FormControl
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
              placeholder="OTP"
              value={otp!}
              onChangeText={(text) => setOtp(text)}
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
    </SafeAreaView>
  );
};

export default Verify;
