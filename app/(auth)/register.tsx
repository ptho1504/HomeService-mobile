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
import { Link, router, useLocalSearchParams } from "expo-router";
import { Divider } from "@/components/ui/divider";
import * as SecureStore from "expo-secure-store";
import { validateEmail } from "@/utils/helper";
import { useSendOtpMutation, useSignupMutation } from "@/services";
import { LOCAL_STORAGE_JWT_KEY, LOCAL_STORAGE_OTP } from "@/constants";
import { useDispatch } from "react-redux";
import { authenticateUser, setUser } from "@/store/reducers";
// i18n.locale = getLocales()[0].languageCode ?? "vn";
i18n.locale = "vn";
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

const Register = () => {
  //
  // const email = "tho.nguyen1504@hcmut.edu.vn";
  const dispatch = useDispatch();
  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  // Set Valid
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const [isRoleInvalid, setIsRoleInvalid] = useState(false);
  const [errorRoleText, setErrorRoleText] = useState("");

  // Set form
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  // Call Api
  const [signUp] = useSignupMutation();

  const handleSubmit = async () => {
    const otp = await SecureStore.getItemAsync(LOCAL_STORAGE_OTP);
    if (!otp) {
      return;
    }
    console.log(email, username, role, otp);

    setLoading(true);
    setErrorText("");
    setIsInvalid(false);
    setIsRoleInvalid(false);

    // Check Role
    if (!role) {
      setIsRoleInvalid(true);
      setErrorRoleText(i18n.t("role_not_found"));
      setLoading(false);
      return;
    }

    // console.log(email, role);

    const response = await signUp({
      email: email,
      role: role,
      name: username,
      otp: otp!,
    });
    console.log(response);

    if (response.error) {
      const message = response.error.data?.message || "Unknown error";
      // console.log(message);
      setIsInvalid(true);
      setErrorText(message);
      setLoading(false);
    } else if (response.data) {
      setIsInvalid(false);

      dispatch(setUser(response.data.items));
      dispatch(authenticateUser(true));

      // Save to Async storage
      if (!response.data.items.jwt) {
        console.error("JWT is missing!");
        return;
      }

      await SecureStore.deleteItemAsync(LOCAL_STORAGE_OTP);

      await SecureStore.setItemAsync(
        LOCAL_STORAGE_JWT_KEY,
        response.data.items.jwt!
      );

      setLoading(false);
      router.replace("/(customer)/(home)");
    }
  };

  return (
    <View className="flex h-full items-center justify-between">
      <View className="flex items-center justify-start h-full bg-white">
        <Image
          className="h-full w-full absolute opacity-50"
          source={require("@/assets/images/bg.png")}
        />

        {/* header */}
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

        {/* Logo */}
        <View>
          <Text>Logo</Text>
        </View>

        {/* login */}
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
              <Input className="my-1 flex items-center h-12 border-none">
                <InputSlot className="pl-3 flex items-center">
                  <InputIcon as={MailIcon} size={"lg"} />
                </InputSlot>
                <InputField
                  className="leading-none px-4 py-2 h-full cursor-not-allowed opacity-80"
                  type="text"
                  value={email}
                  readOnly
                  editable={false}
                />
              </Input>
            </TouchableWithoutFeedback>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errorText}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Username */}
          <FormControl
            isInvalid={isInvalid}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Username</FormControlLabelText>
            </FormControlLabel>
            <TouchableWithoutFeedback>
              <Input className="my-1 flex items-center h-12">
                <InputSlot className="pl-3 flex items-center">
                  <InputIcon as={MailIcon} size={"lg"} />
                </InputSlot>
                <InputField
                  className="leading-none px-4 py-2 h-full"
                  type="text"
                  placeholder={`${i18n.t("username_placeholder")}`}
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
              </Input>
            </TouchableWithoutFeedback>
            <FormControlHelper>
              <FormControlHelperText>
                {i18n.t("username_valid")}
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errorText}</FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* Role */}
          <FormControl
            isInvalid={isRoleInvalid}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Role</FormControlLabelText>
            </FormControlLabel>
            <RadioGroup value={role} onChange={setRole}>
              <Radio
                value="FREELANCER"
                size="md"
                isInvalid={false}
                isDisabled={false}
              >
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>{i18n.t("freelancer")}</RadioLabel>
              </Radio>
              <Radio
                value="CUSTOMER"
                size="md"
                isInvalid={false}
                isDisabled={false}
              >
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>{i18n.t("customer")}</RadioLabel>
              </Radio>
            </RadioGroup>
            <FormControlHelper>
              <FormControlHelperText>
                {i18n.t("role_valid")}
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errorRoleText}</FormControlErrorText>
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
                <ButtonText className="text-white">
                  {i18n.t("login")}
                </ButtonText>
              </Button>
            </TouchableWithoutFeedback>

            <Box className="mt-3 px-10  flex flex-row items-center justify-center opacity-0 ">
              <Divider className="my-1 w-1/2" />
              <Text className="text-center px-4">{i18n.t("or")}</Text>
              <Divider className="my-1 w-1/2" />
            </Box>
          </Box>
        </Box>
      </View>
    </View>
  );
};

export default Register;
