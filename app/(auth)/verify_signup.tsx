import {
  Image,
  ImageSourcePropType,
  Keyboard,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import Swiper from "react-native-swiper";

import { useState } from "react";
import { OtpInput } from "react-native-otp-entry";
import { useLoginMutation, useVerifyOtpMutation } from "@/services";
import { router, useLocalSearchParams } from "expo-router";
import onboarding3 from "@/assets/images/onboarding3.png";
import { i18n, Language } from "@/localization";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setUser, authenticateUser } from "@/store/reducers/auth";
import * as SecureStore from "expo-secure-store";
import { LOCAL_STORAGE_JWT_KEY, LOCAL_STORAGE_OTP } from "@/constants";
import { Button as ButtonReacNative } from "react-native";
// i18n.locale = getLocales()[0].languageCode ?? "vn";
i18n.locale = "vn";
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

const VerifySignUp = () => {
  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const [isLoading, SetIsLoading] = useState(false);
  const [otp, setOtp] = useState<string | null>(null);
  const [verifyOtp] = useVerifyOtpMutation();
  const dispatch = useDispatch();

  // Handle Submit
  const handleSubmit = async () => {
    if (otp) {
      console.log("email", email);
      SetIsLoading(true);
      const response = await verifyOtp({ email, otp: otp });
      console.log(response);
      if (response.error) {
        SetIsLoading(false);
        // router.replace("/(auth)/verify");
      } else if (response.data) {
        // Save to Async storage

        await SecureStore.setItemAsync(LOCAL_STORAGE_OTP, otp);

        SetIsLoading(false);
        router.replace(`/(auth)/register?email=${email}`);
      }
    }
  };

  // Handle Resend
  const handleResend = async () => {};

  return (
    <TouchableWithoutFeedback
      className="flex h-full items-center justify-between"
      onPress={Keyboard.dismiss}
    >
      <View className="flex h-full bg-white p-4 items-center">
        <StatusBar />
        <Image
          source={require("@/assets/images/verify_signup.jpg")}
          resizeMode="contain"
          className="w-60 h-60 mb-4"
        />
        <Text className="text-2xl font-bold my-3">
          {i18n.t("enter_verify")}
        </Text>
        <Text className="text-xl font-font-normal">
          We are automatically send OTP to
        </Text>
        <Text className="text-xl font-font-normal">
          your email. Check your email{" "}
        </Text>
        {/* OTP */}
        <View className="my-5 w-full">
          <OtpInput
            numberOfDigits={6}
            onTextChange={(text) => setOtp(text)}
            focusColor={"#397e52"}
            focusStickBlinkingDuration={400}
            disabled={false}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: "white",
                width: 58,
                height: 58,
                borderRadius: 12,
              },
            }}
          />
        </View>

        <View className="my-3 flex items-center flex-row gap-3">
          <Text>{i18n.t("send_otp_text")}</Text>
          <TouchableOpacity onPress={handleResend}>
            <Text className="text-base font-bold color-green-600">
              {i18n.t("resend")}
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          className="w-full self-end mt-2 bg-green-500 rounded-lg"
          size="md"
          onPress={handleSubmit}
          variant="solid"
          action="positive"
          disabled={otp?.length != 6}
        >
          {isLoading && <ButtonSpinner color={"#D1D5DB"} />}
          <ButtonText className="text-white">{i18n.t("signup")}</ButtonText>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VerifySignUp;
