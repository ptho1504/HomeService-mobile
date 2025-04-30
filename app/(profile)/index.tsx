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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box } from '@/components/ui/box';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser, setAVTUser, setUser } from '@/store/reducers';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { i18n, Language } from '@/localization';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BankModel } from '@/types/userTypes';
import {
  useGetBanksQuery,
  usePostBanksMutation,
  useUploadAVTMutation,
  useUploadUserByIdMutation,
} from '@/services';
import { Picker } from '@react-native-picker/picker';
import { BankAccount } from '@/types/types';
import { useDebounce } from '@/utils/helper';
import { LinearGradient } from 'expo-linear-gradient';
import { Config } from '@/config';
// i18n.locale = "vn";
// i18n.enableFallback = true;
// i18n.defaultLocale = Language.VIETNAMESE;

const InforSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, i18n.t('word_name_min_2_chars'))
    .required(i18n.t('word_name_required')),

  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, i18n.t('word_phone_invalid'))
    .min(10, i18n.t('word_phone_min_10_digits'))
    .required(i18n.t('word_phone_required')),

  email: Yup.string()
    .required(i18n.t('word_email_required'))
    .email(i18n.t('word_email_invalid')),

  // bank: Yup.object<BankModel>().required(i18n.t("word_bank_required")),
});

const EditProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const defaultAvatar =
    'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';

  // State
  const [avt, setAvt] = useState<string | undefined>(currentUser?.avatar);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const [selectedBank, SetSelectedBank] = useState(
    currentUser?.bankAccount?.bank || undefined,
  );
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(
    currentUser?.bankAccount?.accountNumber,
  );
  const debounceAccountNumber = useDebounce(selectedAccountNumber, 500);
  // Call api
  const { data: banks, isLoading, error } = useGetBanksQuery();
  const [uploadAVT, { data: urlPath, isLoading: AVTLoading, error: AVTError }] =
    useUploadAVTMutation();
  const [userForEdit] = useState({
    name: currentUser?.name,
    // gender: currentUser?.gender,
    phone: currentUser?.phoneNumber,
    email: currentUser?.email,
    bank: currentUser?.bankAccount,
    ...currentUser,
  });

  const [
    upLoadUserById,
    { data: updatedUser, isLoading: upLoading, error: uploadError },
  ] = useUploadUserByIdMutation();

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
      // console.log("Form submitted with values:", dataUpdated);
      try {
        setIsLoadingButton(true);
        // console.log("updated: ", dataUpdated.name);
        // console.log("updated: ", dataUpdated.phoneNumber);
        // console.log("updated: ", dataUpdated.bankAccount?.accountNumber);
        // console.log("updated: ", dataUpdated.bankAccount?.bank);
        const response = await upLoadUserById({
          userId: currentUser?.id!,
          body: {
            name: values.name,
            phoneNumber: values.phoneNumber,
            bankAccount: {
              bin: dataUpdated?.bankAccount?.bank.bin!,
              accountNumber: dataUpdated.bankAccount?.accountNumber!,
            },
          },
        });
        // console.log("resposne", response);
        if (!response.data?.items) {
          Alert.alert('Error', 'Failed to update user info.');
          return;
        }

        dispatch(
          setUser({
            ...currentUser!,
            name: response.data?.items.name ?? 'Error',
            phoneNumber: response.data?.items.phoneNumber ?? 'Error',
            bankAccount: {
              bank: {
                bin: dataUpdated?.bankAccount?.bank.bin,
              },
              accountNumber: dataUpdated?.bankAccount?.accountNumber,
            },
          }),
        );

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
      bank => bank.bin === bin,
    );
    // console.log(selected);
    if (selected !== undefined) {
      SetSelectedBank(selected);
    }
    formik.setFieldValue('bank', {
      bin: bin,
    });
  };
  const handleUpdateAvatar = async () => {
    console.log('Handle update avt');
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Thông báo', 'Bạn cần cấp quyền để sử dụng chức năng này!');
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
          result.assets[0].fileName || result.assets[0].uri.split('/').pop(),
      };
      // !TODO: Need api to update avt
      const formData = new FormData();
      formData.append('avatar', image as any);

      try {
        const res = await uploadAVT({
          userId: currentUser?.id!,
          formData,
        });

        dispatch(setAVTUser(res.data?.items!));

        // Alert.alert("Thành công", "Cập nhật ảnh đại diện thành công!");
      } catch (error) {
        console.error('Error uploading avatar:', error);
        Alert.alert('Lỗi', 'Không thể cập nhật ảnh đại diện.');
      }
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

      if (BankAccountValid.message === 'Success') {
        formik.setErrors({ bankAccount: '' });
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
    <SafeAreaView className="flex-1 h-full">
      <LinearGradient
        // Background Linear Gradient
        colors={['#ebf7eb', 'transparent', '#ffffff']}
        className="absolute h-[1000px] left-0 right-0 top-0"
      />
      <ScrollView
        className="flex h-full w-full"
        // contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack space="xl" className="m-5">
          <Pressable
            className="flex justify-center items-center"
            onPress={handleUpdateAvatar}
          >
            <Box className="">
              <Box className="flex justify-center items-center rounded-full">
                <Image
                  size="xl"
                  source={{
                    uri: currentUser?.avatar
                      ? Config.URL_PATH +
                        currentUser?.avatar +
                        `?time=${Date.now()}`
                      : defaultAvatar,
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
          </Pressable>

          {/* Name */}
          <VStack space="md">
            <Text className="text-md text-gray-500">{i18n.t('username')}</Text>
            <TextInput
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              className="border border-gray-400 py-3 px-5 rounded-md text-lg"
            />
            {formik.errors.name && (
              <Text className="text-md font-medium text-error-500">
                {formik.errors.name}
              </Text>
            )}
          </VStack>

          {/* Phone */}
          <VStack space="md">
            <Text className="text-md text-gray-500">{i18n.t('phone')}</Text>
            <TextInput
              keyboardType="numeric"
              value={formik.values.phoneNumber}
              onChangeText={formik.handleChange('phoneNumber')}
              className="border border-gray-400 py-3 px-5 rounded-md text-lg"
            />
            {formik.errors.phoneNumber && (
              <Text className="text-md font-medium text-error-500">
                {formik.errors.phoneNumber}
              </Text>
            )}
          </VStack>

          {/* Email */}
          <VStack space="md">
            <Text className="text-md text-gray-500">{i18n.t('email')}</Text>
            <TextInput
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              readOnly
              className="border border-gray-400 py-3 px-5 rounded-md text-lg opacity-75"
            />
            {formik.errors.email && (
              <Text className="text-md font-medium text-error-500">
                {formik.errors.email}
              </Text>
            )}
          </VStack>

          {/* Bank  */}
          <VStack space="md">
            <Text className="text-md text-gray-500">{i18n.t('banks')}</Text>
            <Box className="flex flex-row w-full items-center justify-between py-2 px-5 border border-gray-400 rounded-md">
              <Image
                className="h-12 w-12"
                source={{
                  uri:
                    selectedBank?.logo ||
                    'https://img.bankhub.dev/rounded/ocb.png',
                }}
                alt="Banks Logo"
              />
              <Picker
                onValueChange={handleBankChange}
                style={styles.picker}
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
            </Box>
          </VStack>

          {/* STK */}
          {selectedBank && (
            <VStack space="md">
              <Text className="text-md text-gray-500">
                {i18n.t('account_number')}
              </Text>
              <TextInput
                value={selectedAccountNumber}
                // onChangeText={formik.handleChange("phoneNumber")}
                onChangeText={handleChangeAccountNumber}
                className="border border-gray-400 py-3 px-5 rounded-md font-normal"
                placeholder={i18n.t('placeholder_account_number')}
                style={{
                  textAlignVertical: 'center',
                  fontSize: 18,
                }}
              />
              {formik.errors.bankAccount && (
                <Text className="text-md font-medium text-error-500">
                  {formik.errors.bankAccount as string}
                </Text>
              )}
            </VStack>
          )}

          <Button
            onPress={() => formik.handleSubmit()}
            size="xl"
            className="bg-success-300 flex flex-row items-center justify-center mt-10"
            action="positive"
            disabled={isLoading || isLoadingButton}
          >
            <ButtonText>{i18n.t('save')}</ButtonText>
            {isLoadingButton && <ButtonSpinner color="#D1D5DB" />}
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  picker: {
    // borderWidth: 1,
    // borderColor: "#d1d5db", // Tailwind's border-gray-400
    // borderRadius: 8,
    // fontSize: 18, // Tailwind's text-lg
    width: '90%',
    // height: 50,
  },
});

export default EditProfile;
