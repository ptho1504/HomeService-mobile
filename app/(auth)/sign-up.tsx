import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { setPost } from "@/store/reducers/post";
import { PostModel } from "@/types/postTypes";
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
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { i18n, Language } from "@/localization";
import { Box } from "@/components/ui/box";
import { useState } from "react";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { AlertCircleIcon, CircleIcon, MailIcon } from "@/components/ui/icon";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { Link, router } from "expo-router";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import FacebookSvg from "@/components/svg/FacebookSvg";
import GoogleSvg from "@/components/svg/GoogleSvg";
import { validateEmail } from "@/utils/helper";
import { useSendOtpMutation } from "@/services";
// i18n.locale = getLocales()[0].languageCode ?? "vn";
i18n.locale = "vn";
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

const SignUp = () => {
  // Set Valid
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  // Set form
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  
  // Call Api
  const [sendOtp] = useSendOtpMutation();

  const handleSubmit = async () => {
    setLoading(true);
    setErrorText("");
    setIsInvalid(false);

    // Check Email
    if (!validateEmail(email)) {
      setIsInvalid(true);
      setErrorText(i18n.t("mail_invalid"));
      setLoading(false);
      return;
    }

    const response = await sendOtp({ email });
    console.log(response);

    if (response.error) {
      const message = response.error.data?.message || "Unknown error";
      // console.log(message);
      setIsInvalid(true);
      setErrorText(message);
      setLoading(false);
    } else {
      setLoading(false);
      setIsInvalid(false);
      router.push(`/(auth)/verify?email=${email}`);
    }
  };

  return (
    <View className="flex h-full items-center">
      <Image
        className="h-full w-full absolute opacity-50"
        source={require("@/assets/images/bg1.png")}
      />
      <View className="p-5 mt-10 flex flex-row items-center justify-between ">
        <View className="flex-1 flex-row gap-1">
          <Text className="text-black text-xl font-extrabold">Home</Text>
          <Text className="text-xl text-success-600 font-extrabold">
            Service
          </Text>
        </View>
        <View className="flex-2 bg-white border-2 border-primary-300 rounded-md">
          <Button
            size="md"
            variant="solid"
            action="primary"
            className="bg-white"
          >
            <ButtonText className="text-primary-500">
              {i18n.t("language")}
            </ButtonText>
          </Button>
        </View>
      </View>

      <View>
        <Text>Logo</Text>
      </View>

      {/* signup */}
      <Box className="p-10 w-[80%] rounded-xl flex gap-5 bg-white border border-gray-200">
        {/* Input */}
        {/* Email */}
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
          <TouchableWithoutFeedback>
            <Input className="my-1 flex items-center h-12">
              <InputSlot className="pl-3 flex items-center">
                <InputIcon as={MailIcon} size={"lg"} />
              </InputSlot>
              <InputField
                className="leading-none px-4 py-2 h-full"
                type="text"
                placeholder={`${i18n.t("mail_placeholder")}`}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </Input>
          </TouchableWithoutFeedback>
          <FormControlHelper>
            <FormControlHelperText>
              {i18n.t("mail_valid")}
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{errorText}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Button */}
        <Box className="flex flex-col justify-between">
          {/* Login */}
          <TouchableWithoutFeedback>
            <Button
              className="w-full self-end mt-2 bg-green-500 border-none"
              size="md"
              onPress={handleSubmit}
              variant="solid"
              action="positive"
            >
              {loading && <ButtonSpinner color={"#D1D5DB"} />}
              <ButtonText className="text-white">{i18n.t("verify")}</ButtonText>
            </Button>
          </TouchableWithoutFeedback>

          {/* You have account */}
          <Box className="flex items-center mt-4">
            <Link className="text-center" href={"/(auth)/log-in"}>
              {i18n.t("have_account")}
            </Link>
          </Box>

          <Box className="mt-3 px-10 w-full flex flex-row items-center justify-center">
            <Divider className="my-1 w-1/2" />
            <Text className="text-center px-4">{i18n.t("or")}</Text>
            <Divider className="my-1 w-1/2" />
          </Box>
          {/* Login third party */}
          <HStack
            space="md"
            reversed={false}
            className="flex justify-center items-center mt-4"
          >
            {/* Google */}
            <TouchableOpacity className="hover:bg-red-500">
              <Button
                variant="outline"
                action="secondary"
                className="bg-white flex flex-row items-center border border-gray-200 py-5"
                isPressed={false}
              >
                <GoogleSvg />
                <ButtonText className="h-6 text-black text-lg flex items-center">
                  Google
                </ButtonText>
              </Button>
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity>
              <Button
                variant="outline"
                action="secondary"
                className="bg-white flex flex-row items-center border border-gray-200 py-5"
              >
                <FacebookSvg className="w-7 h-7" />
                <ButtonText className="h-6 text-black text-lg flex items-center">
                  Facebook
                </ButtonText>
              </Button>
            </TouchableOpacity>
          </HStack>
        </Box>
      </Box>
    </View>
  );
};

export default SignUp;
