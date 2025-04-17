import {
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import Swiper from "react-native-swiper";

import { useEffect, useRef, useState } from "react";
import { OtpInput } from "react-native-otp-entry";
import {
  useLoginMutation,
  useRechargeMutation,
  useVerifyOtpMutation,
  useWithdrawMutation,
} from "@/services";
import { router, useLocalSearchParams } from "expo-router";
import { i18n, Language } from "@/localization";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setUser, authenticateUser, selectUser } from "@/store/reducers/auth";
import * as SecureStore from "expo-secure-store";
import { LOCAL_STORAGE_JWT_KEY, UserRole } from "@/constants";
import { Keyboard } from "react-native";
import { Text } from "@/components/ui/text";
import { obfuscateEmail, useDebounce } from "@/utils/helper";
import { Spinner } from "@/components/ui/spinner";
import { registerForPushNotificationsAsync } from "@/utils/firebaseUtil";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useSelector } from "react-redux";
import { Box } from "@/components/ui/box";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { LinearGradient } from "expo-linear-gradient";
import { Mode } from "@/components/list/PostList";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from "@/components/ui/toast";
import { TransactionModel } from "@/types/userTypes";

// i18n.locale = getLocales()[0].languageCode ?? "vn";
i18n.locale = "vn";
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

const Transaction = () => {
  const { type } = useLocalSearchParams();
  const quickSelectValues = [50000, 100000, 200000, 500000, 1000000, 2000000];
  const successUrl = "http://localhost:3000/success";
  const cancelUrl = "http://localhost:3000/cancel";
  const user = useSelector(selectUser);
  const minAmount = 10000;
  const [amount, setAmount] = useState<string>();
  const [error, setError] = useState<string>("");
  const [recharge, { isLoading, error: rechargeError }] = useRechargeMutation();
  const [withdraw, { isLoading: isWithdrawLoading, error: withdrawError }] =
    useWithdrawMutation();
  const toast = useToast();
  const dispatch = useDispatch();

  const parseCurrency = (str: string) => {
    let cleanedString = str.replace(/\./g, "").replace(/,/g, "");

    return Number(cleanedString);
  };

  const validateAmount = (value: string) => {
    const num = parseCurrency(value);
    var isValid = false;
    if (isNaN(num) || num < minAmount) {
      setError(
        i18n.t("st_amount_must_be_greater") +
          " " +
          minAmount.toLocaleString() +
          " VND"
      );
    } else if (user?.balance && num > user?.balance && type === "withdraw") {
      setError(i18n.t("st_withdraw_amount_must_be_less_than_balance"));
    } else {
      isValid = true;
      setError("");
    }
    setAmount(value ? num.toLocaleString() : "");
    return isValid;
  };

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    validateAmount(numericValue);
  };

  const handleQuickSelect = (value: number) => {
    setAmount(value.toLocaleString());
    validateAmount(value.toString());
  };

  const handleTransaction = async () => {
    if (!validateAmount(amount || "")) {
      return;
    }

    const data: TransactionModel = {
      amount: parseCurrency(amount ?? ""),
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      userId: user?.id ?? "",
    };

    if (type === "recharge") {
      const res = await recharge(data);
      if (rechargeError || res.data?.returnCode !== 1000) {
        toast.show({
          placement: "top",
          duration: 3000,
          render: ({ id }) => {
            const uniqueToastId = "toast-" + id;
            return (
              <Toast nativeID={uniqueToastId} action="error" variant="outline">
                <ToastTitle>{i18n.t("st_top_up_failed")}</ToastTitle>
                <ToastDescription>{res.error.data.message}</ToastDescription>
              </Toast>
            );
          },
        });
      } else {
        router.push(
          `/(profile)/PaymentQr?checkoutUrl=${
            res.data.items
          }&amount=${parseCurrency(amount ?? "")}`
        );
      }
    } else {
      const res = await withdraw(data);
      if (withdrawError || res.data?.returnCode !== 1000) {
        toast.show({
          placement: "top",
          duration: 3000,
          render: ({ id }) => {
            const uniqueToastId = "toast-" + id;
            return (
              <Toast nativeID={uniqueToastId} action="error" variant="outline">
                <ToastTitle>{i18n.t("st_withdraw_failed")}</ToastTitle>
                <ToastDescription>{res.error.data.message}</ToastDescription>
              </Toast>
            );
          },
        });
      } else {
        toast.show({
          placement: "top",
          duration: 3000,
          render: ({ id }) => {
            const uniqueToastId = "toast-" + id;
            return (
              <Toast
                nativeID={uniqueToastId}
                action="success"
                variant="outline"
              >
                <ToastTitle>{i18n.t("word_success")}</ToastTitle>
                <ToastDescription>
                  {i18n.t("st_withdraw_success")}
                </ToastDescription>
              </Toast>
            );
          },
        });
        dispatch(setUser(res.data.items));
        router.back();
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 h-full">
      <LinearGradient
        // Background Linear Gradient
        colors={["#ebf7eb", "transparent", "#ffffff"]}
        className="absolute h-[1000px] left-0 right-0 top-0"
      />
      <VStack space="xl" className="p-5">
        <FormControl isInvalid={error != ""} size="md">
          <Box className="rounded-lg p-3 bg-success-300 mb-2">
            <View className="p-2 rounded-lg my-2 flex-row justify-between items-center bg-success-400">
              <Text className="text-white text-lg">
                {i18n.t("word_account_balance")}:
              </Text>
              <Text className="text-white font-bold text-lg">
                {user?.balance.toLocaleString()} đ
              </Text>
            </View>
            <Text className="text-xl text-white font-bold my-2">
              {i18n.t("word_enter_amount")} (VND):
            </Text>
            <TextInput
              style={{ color: "#79AC78", textAlign: "center" }} // Centered cursor
              className="font-bold bg-white rounded-lg p-2 mb-1 mx-4 text-center text-2xl"
              keyboardType="numeric"
              value={amount}
              onChangeText={handleAmountChange}
              autoFocus={true}
            />
          </Box>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{error}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Box className="flex-wrap flex-row justify-around">
          {quickSelectValues.map((value, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white p-1 rounded-lg mb-3 border border-gray-300 w-[31%]"
              onPress={() => handleQuickSelect(value)}
            >
              <Text className="text-center text-lg">
                {value.toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))}
        </Box>
      </VStack>
      <Box className="sticky bottom-0 p-4 w-full">
        <Button
          onPress={handleTransaction}
          size="xl"
          className="bg-success-300 flex flex-row items-center justify-center"
          action="positive"
          isDisabled={error !== ""}
        >
          {(isLoading || isWithdrawLoading) && <ButtonSpinner />}
          <ButtonText>
            {type === "withdraw"
              ? i18n.t("word_withdraw")
              : i18n.t("word_top_up")}
          </ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default Transaction;
