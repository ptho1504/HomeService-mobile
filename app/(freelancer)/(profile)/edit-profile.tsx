import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/reducers";
import { useFormik } from "formik";
import * as Yup from "yup";
import { i18n, Language } from "@/localization";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { BankModel } from "@/types/userTypes";
import { useGetBanksQuery, usePostBanksMutation } from "@/services";
import { Picker } from "@react-native-picker/picker";
import { BankAccount } from "@/types/types";
import { useDebounce } from "@/utils/helper";
import { LinearGradient } from "expo-linear-gradient";

i18n.locale = "vn";
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

const InforSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .required("Vui lòng nhập tên"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .required("Vui lòng nhập số điện thoại"),
  email: Yup.string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  // bank: Yup.object<BankModel>().required("Vui lòng chọn Bank"),
});

const EditProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  // State
  const [avt, setAvt] = useState<string | undefined>(currentUser?.avatar);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const [selectedBank, SetSelectedBank] = useState(
    currentUser?.bankAccount?.bank || undefined
  );
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(
    currentUser?.bankAccount?.accountNumber
  );
  const debounceAccountNumber = useDebounce(selectedAccountNumber, 500);
  // Call api
  const { data: banks, isLoading, error } = useGetBanksQuery();

  const [userForEdit] = useState({
    name: currentUser?.name,
    // gender: currentUser?.gender,
    phone: currentUser?.phoneNumber,
    email: currentUser?.email,
    bank: currentUser?.bankAccount,
    ...currentUser,
  });

  // console.log("SelectedBank", selectedBank);

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: InforSchema,
    onSubmit: async (values, { setSubmitting }) => {
      let dataUpdated = {
        ...values,
      };
      // Update body
      if (selectedBank && selectedAccountNumber) {
        dataUpdated = {
          ...dataUpdated,
          bankAccount: {
            accountNumber: selectedAccountNumber,
            bank: selectedBank,
          },
        };
      }
      console.log("Form submitted with values:", dataUpdated);
      try {
        setIsLoadingButton(true);
        // const response = await update({
        //   ...values,
        // });
        // // console.log(response);
        // if (response.error) {
        //   const message =
        //     response.error.data.message ||
        //     response.error.message ||
        //     "Unknown error";
        // } else {
        //   //   Update user
        //   dispatch(setUser(values as any));
        //   router.replace(`/(tabs)/(profile)/profile`);
        // }
      } catch (error) {
        console.error(error);
        router.replace(`/+not-found`);
      } finally {
        setIsLoadingButton(false);
      }
    },
  });
  const handleBankChange = (bin: string) => {
    const selected: BankModel | undefined = banks!.items.find(
      (bank) => bank.bin === bin
    );
    // console.log(selected);
    if (selected !== undefined) {
      SetSelectedBank(selected);
    }
    formik.setFieldValue("bank", {
      bin: bin,
    });
  };
  // console.log("avt", currentUser?.name[0]?.toUpperCase());
  const handleUpdateAvatar = async () => {
    console.log("Handle update avt");
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Thông báo", "Bạn cần cấp quyền để sử dụng chức năng này!");
      return;
    }

    // Chọn ảnh từ thư viện
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // Chọn 1 ảnh/lần (nhiều lần để thêm)
      quality: 0.8, // Chất lượng ảnh
    });

    if (!result.canceled) {
      setAvt(result.assets[0].uri);

      // Data  Update avt
      const image = {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name:
          result.assets[0].fileName || result.assets[0].uri.split("/").pop(),
      };

      // !TODO: Need api to update avt
    }
  };
  const handleChangeAccountNumber = async (text: string) => {
    setSelectedAccountNumber(text);
  };

  const [
    postBanks,
    {
      data: BankAccountValid,
      isLoading: BankAcountLoading,
      error: BankAccountError,
    },
  ] = usePostBanksMutation();
  useEffect(() => {
    if (debounceAccountNumber !== undefined && selectedBank !== undefined) {
      // console.log(
      //   "Account number and Bank",
      //   selectedAccountNumber,
      //   selectedBank
      // );
      //  call api check account number with
      postBanks({
        accountNumber: debounceAccountNumber!,
        bin: selectedBank.bin,
      });
    }
  }, [debounceAccountNumber, selectedBank]);

  useEffect(() => {
    if (BankAcountLoading) {
      // console.log("Loading bank account validation...");
      return;
    }

    if (BankAccountValid) {
      // console.log("BankAccountValid data:", BankAccountValid);

      if (BankAccountValid.message === "Success") {
        formik.setErrors({ bankAccount: "" });
      } else {
        formik.setErrors({ bankAccount: BankAccountValid.message });
      }
    }

    if (BankAccountError) {
      // console.error("BankAccountError: ", BankAccountError);

      formik.setErrors({ bankAccount: BankAccountError.data.message });
    }
  }, [BankAcountLoading, BankAccountValid, BankAccountError]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <LinearGradient
        colors={["#ebf7eb", "transparent", "#ffffff"]}
        className="absolute h-[1000px] left-0 right-0 top-0"
      >
        <SafeAreaView className="h-full w-full flex items-center bg-white">
          <TouchableWithoutFeedback
            // className="flex h-full"
            onPress={Keyboard.dismiss}
          >
            <ScrollView
              className="flex h-full w-full"
              // contentContainerStyle={{ flexGrow: 1 }}
            >
              <VStack className="h-full flex w-full">
                {/* header */}
                <HStack className="flex flex-row items-center">
                  <TouchableOpacity
                    onPress={() => router.back()}
                    // className="bg-white flex rounded-full w-16 h-16 items-center justify-center"
                    className="px-2 bg-white"
                  >
                    <Ionicons name="arrow-back" size={28} color="black" />
                  </TouchableOpacity>
                  {/* Title */}
                  <View className="flex flex-row items-center justify-center">
                    <Text className="text-2xl font-medium text-black px-2 py-1 w-full">
                      {i18n.t("edit_profile")}
                    </Text>
                  </View>
                </HStack>

                {/* Edit form */}

                <View className="h-full flex w-full justify-center">
                  {/* Avatar */}
                  <Pressable
                    className="flex justify-center items-center"
                    onPress={handleUpdateAvatar}
                  >
                    {avt && (
                      <Box className="">
                        <Box className="flex justify-center p-2 items-center border border-gray-300 rounded-full">
                          <Image
                            size="xl"
                            source={{
                              uri: `${avt}`,
                            }}
                            alt={`${currentUser?.name}`}
                            className="rounded-full shadow-lg"
                          />
                        </Box>
                        <Ionicons
                          className="absolute bottom-0 right-0 p-1 bg-black rounded-full border border-gray-300"
                          name="camera-outline"
                          size={28}
                          color="white"
                        />
                      </Box>
                    )}
                    {!avt && (
                      <Box className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center border border-gray-300">
                        <Text className="text-white text-lg font-bold">
                          {currentUser?.name[0]?.toUpperCase()}
                        </Text>
                        <Ionicons
                          name="camera-outline"
                          size={24}
                          color="white"
                        />
                      </Box>
                    )}
                  </Pressable>

                  {/* Body */}
                  <VStack space="md">
                    {/* Name */}
                    <View className="px-10 flex flex-col gap-2">
                      <Text className="text-md font-nomral text-gray-500">
                        {i18n.t("username")}
                      </Text>
                      <TextInput
                        value={formik.values.name}
                        onChangeText={formik.handleChange("name")}
                        className="border border-gray-400 py-3 px-5 rounded-md font-normal"
                        style={{
                          textAlignVertical: "center",
                          fontSize: 18,
                        }}
                      />
                      {formik.errors.name && (
                        <Text className="text-md font-medium text-error-500">
                          {formik.errors.name}
                        </Text>
                      )}
                    </View>

                    {/* Phone */}
                    <View className="px-10 flex flex-col gap-2">
                      <TextInput
                        className="text-md font-nomral text-gray-500"
                        keyboardType="numeric"
                      >
                        {i18n.t("phone")}
                      </TextInput>
                      <TextInput
                        value={formik.values.phoneNumber}
                        onChangeText={formik.handleChange("phoneNumber")}
                        className="border border-gray-400 py-3 px-5 rounded-md font-normal"
                        style={{
                          textAlignVertical: "center",
                          fontSize: 18,
                        }}
                      />
                      {formik.errors.phoneNumber && (
                        <Text className="text-md font-medium text-error-500">
                          {formik.errors.phoneNumber}
                        </Text>
                      )}
                    </View>

                    {/* Email */}
                    <View className="px-10 flex flex-col gap-2">
                      <Text className="text-md font-nomral text-gray-500">
                        {i18n.t("email")}
                      </Text>
                      <TextInput
                        value={formik.values.email}
                        onChangeText={formik.handleChange("email")}
                        editable={false}
                        className="border border-gray-400 py-3 px-5 rounded-md font-normal bg-gray-100"
                        style={{
                          textAlignVertical: "center",
                          fontSize: 18,
                        }}
                      />
                      {formik.errors.email && (
                        <Text className="text-md font-medium text-error-500">
                          {formik.errors.email}
                        </Text>
                      )}
                    </View>

                    {/* Bank  */}
                    <View className="px-10 flex flex-col gap-2">
                      <Text className="text-md font-nomral text-gray-500">
                        {i18n.t("banks")}
                      </Text>
                      <View className="flex flex-row w-full items-center justify-between py-2 px-5 border border-gray-400 rounded-mdl">
                        <Image
                          className="h-12 w-12"
                          source={{
                            uri:
                              selectedBank?.logo ||
                              "https://img.bankhub.dev/rounded/ocb.png",
                          }}
                          alt="Banks Logo"
                        />
                        <Picker
                          onValueChange={handleBankChange}
                          style={styles.picker}
                          itemStyle={{
                            height: 50, // Set the height of each item
                            fontSize: 16, // Adjust font size for better visibility
                          }}
                          selectedValue={selectedBank?.bin}
                        >
                          {banks?.items &&
                            banks.items.map((bank, index) => (
                              <Picker.Item
                                key={index}
                                label={bank.fiName}
                                value={bank.bin}
                              />
                            ))}
                        </Picker>
                      </View>
                    </View>

                    {/* STK */}
                    {selectedBank && (
                      <View className="px-10 flex flex-col gap-2">
                        <TextInput
                          className="text-md font-nomral text-gray-500"
                          keyboardType="numeric"
                        >
                          {i18n.t("account_number")}
                        </TextInput>
                        <TextInput
                          value={selectedAccountNumber}
                          // onChangeText={formik.handleChange("phoneNumber")}
                          onChangeText={handleChangeAccountNumber}
                          className="border border-gray-400 py-3 px-5 rounded-md font-normal"
                          placeholder={i18n.t("placeholder_account_number")}
                          style={{
                            textAlignVertical: "center",
                            fontSize: 18,
                          }}
                        />
                        {formik.errors.bankAccount && (
                          <Text className="text-md font-medium text-error-500">
                            {formik.errors.bankAccount}
                          </Text>
                        )}
                      </View>
                    )}

                    <View className="px-10 flex flex-col">
                      <Pressable
                        className="bg-success-400 p-3 text-center"
                        onPress={() => formik.handleSubmit()}
                        disabled={isLoading || isLoadingButton}
                      >
                        <Box className="flex flex-row items-center justify-center gap-3">
                          {isLoadingButton && <ButtonSpinner color="#D1D5DB" />}
                          {!isLoadingButton && (
                            <Text className="text-white text-xl rounded-lg">
                              {i18n.t("save")}
                            </Text>
                          )}
                        </Box>
                      </Pressable>
                    </View>
                  </VStack>
                </View>
              </VStack>
            </ScrollView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  picker: {
    // borderWidth: 1,
    // borderColor: "#d1d5db", // Tailwind's border-gray-400
    // borderRadius: 8,
    // fontSize: 18, // Tailwind's text-lg
    width: "90%",
    // height: 50,
  },
});

export default EditProfile;
