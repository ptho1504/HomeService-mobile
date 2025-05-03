import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Alert,
} from 'react-native';
import { Text } from '@/components/ui/text';
import * as ImagePicker from 'expo-image-picker';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { CloseIcon, EditIcon, Icon } from '@/components/ui/icon';
import { Center } from '@/components/ui/center';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectTestInfo,
  selectTestResult,
  setRegisterProcess,
  selectUser,
  selectRegisterProcess,
} from '@/store/reducers';

import {
  useRegisterServiceMutation,
  useUploadImagesForRegisterServiceMutation,
} from '@/services';

import { ImageModel } from '@/types/postTypes';
import { router, useNavigation } from 'expo-router';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import { Spinner } from '@/components/ui/spinner';
import colors from 'tailwindcss/colors';

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Heading } from '@/components/ui/heading';
import { usePreventRemove } from '@react-navigation/native';
import { i18n } from '@/localization';

import AlertConfirmDialog from '@/components/dialog/AlertConfirmDialog';
import { showToastMessage } from '@/components/Toast/ToastMessage';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '@/components/ui/box';

const AdditionInfo = () => {
  const dispatch = useDispatch();

  const registerProcess = useSelector(selectRegisterProcess);

  const navigation = useNavigation();

  usePreventRemove(!registerProcess.isRegisterDone, ({ data }) => {
    Alert.alert(i18n.t('word_confirm'), i18n.t('st_confirm_goback'), [
      { text: i18n.t('word_cancel'), style: 'cancel' },
      {
        text: i18n.t('word_yes'),
        style: 'default',
        onPress: () => navigation.dispatch(data.action),
      },
    ]);
  });

  const toast = useToast();

  const [
    registerService,
    { data: registerData, error: registerError, isLoading: registerIsLoading },
  ] = useRegisterServiceMutation();

  const testResult = useSelector(selectTestResult);
  const testInfo = useSelector(selectTestInfo);
  const user = useSelector(selectUser);

  const [note, setNote] = useState('');
  const [images, setImages] = useState<ImageModel[]>([]);

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: false,
        quality: 0.1,
        allowsMultipleSelection: true,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('Chọn ảnh bị hủy hoặc không hợp lệ');
        return;
      }

      const selectedImages = result.assets.map(asset => ({
        uri: asset.uri,
        type: asset.mimeType || 'image/jpeg',
        name: asset.fileName || asset.uri.split('/').pop(),
      }));

      setImages(prev => [...prev, ...selectedImages]); // Thêm ảnh vào state
    } catch (error) {
      console.error('Lỗi khi chọn ảnh:', error);

      showToastMessage(
        toast,
        i18n.t('word_failure'),
        i18n.t('st_error_at_choice_image'),
        'error',
      );
    }
  };

  // Xóa ảnh khỏi danh sách
  const removeImage = (uri: string | undefined) => {
    setImages(images.filter(image => image.uri !== uri));
  };

  const handleRegisterService = async () => {
    const dataToRegister = {
      serviceId: testInfo.serviceId ?? '',
      freelancerId: user?.id ?? '',
      data: {
        status: 'INITIAL',
        description: note,
        testResultId: testResult.testResultId ?? '',
      },
    };

    console.log('register data', dataToRegister);

    try {
      const result = await registerService(dataToRegister).unwrap();
      console.log('register result', result.items.testResult);
      return result.items.id ?? null;
    } catch (err) {
      console.error('Lỗi khi đăng ký dịch vụ:', err);

      showToastMessage(
        toast,
        i18n.t('word_failure'),
        i18n.t('st_error_at_register_service'),
        'error',
      );
      return null;
    }
  };

  const [
    uploadImagesForRegisterService,
    {
      data: uploadImagesData,
      error: uploadImagesError,
      isLoading: uploadImagesIsLoading,
    },
  ] = useUploadImagesForRegisterServiceMutation();

  const handleUploadImages = async (id: string) => {
    const formData = new FormData();

    console.log('handleUploadImages');

    images.forEach((image, index) => {
      if (image.uri && image.type && image.name) {
        formData.append('images', {
          uri: image.uri,
          type: image.type,
          name: image.name,
        } as any); // Ép kiểu để tránh lỗi TypeScript
      } else {
        console.warn(`Ảnh tại index ${index} thiếu thông tin cần thiết.`);
      }
    });

    try {
      const response = await uploadImagesForRegisterService({
        id, // Dùng ID đã lấy được
        formData,
      }).unwrap();

      console.log('Upload thành công:', response.items.testResult);
    } catch (error) {
      console.error('Lỗi khi upload hình ảnh:', error);

      showToastMessage(
        toast,
        i18n.t('word_failure'),
        i18n.t('st_error_at_upload_image'),
        'error',
      );
    }
  };

  const handleSubmit = async () => {
    if (note === '') {
      console.log('Không có ghi chú để upload');

      showToastMessage(
        toast,
        i18n.t('word_warning'),
        i18n.t('st_please_enter_note'),
        'warning',
      );
      return null;
    }

    if (images.length === 0) {
      console.log('Không có hình ảnh để upload');

      showToastMessage(
        toast,
        i18n.t('word_warning'),
        i18n.t('st_please_upload_image'),
        'warning',
      );
      return;
    }
    try {
      // Gọi API đăng ký dịch vụ
      const registerResponseId = await handleRegisterService();

      if (!registerResponseId) {
        console.error('Lỗi: Không lấy được ID sau khi đăng ký');

        showToastMessage(
          toast,
          i18n.t('word_failure'),
          i18n.t('st_system_error'),
          'error',
        );
        return;
      }

      // console.log("Register ID:", registerResponseId);

      try {
        // Gọi hàm upload ảnh với ID đã lấy được
        await handleUploadImages(registerResponseId);
      } catch (uploadError) {
        console.error('Lỗi khi upload hình ảnh:', uploadError);

        showToastMessage(
          toast,
          i18n.t('word_failure'),
          i18n.t('st_system_error'),
          'error',
        );
      }
    } catch (error) {
      console.error('Lỗi khi submit:', error);

      showToastMessage(
        toast,
        i18n.t('word_failure'),
        i18n.t('st_system_error'),
        'error',
      );
    }
    dispatch(setRegisterProcess({ isRegisterDone: true }));
  };

  useEffect(() => {
    if (registerProcess.isRegisterDone) {
      router.dismissAll();

      showToastMessage(
        toast,
        i18n.t('word_success'),
        i18n.t('st_register_successfully'),
        'success',
      );
    }
  }, [registerProcess]);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleCloseAlert = () => setShowAlertDialog(false);
  const handleOpenAlert = () => {
    setShowAlertDialog(true);
  };
  return (
    <SafeAreaView className="h-full w-full flex items-center bg-white">
      <LinearGradient
        // Background Linear Gradient
        colors={['#ebf7eb', 'transparent', '#ffffff']}
        className="absolute h-[1000px] left-0 right-0 top-0"
      />

      {registerIsLoading || uploadImagesIsLoading ? (
        <VStack className="mt-5">
          <Spinner size="large" color={colors.emerald[600]} />
          <Text size="lg" className="text-green-800 text-center">
            {i18n.t('st_wait_for_registering')}
          </Text>
        </VStack>
      ) : (
        <Box className="m-4">
          <VStack space="xl" className="bg-white rounded-md shadow px-4 py-8">
            <VStack space="4xl">
              <VStack space="md">
                <Text className="font-bold text-lg">
                  {i18n.t('st_enter_your_addition_info')}:
                </Text>
                <Textarea size="md">
                  <TextareaInput
                    placeholder={i18n.t('st_enter_your_addition_info_here')}
                    onChangeText={setNote}
                    value={note}
                  />
                </Textarea>
              </VStack>
              <VStack space="md">
                {/* Tải hình ảnh */}
                <Text className="font-bold text-lg">
                  {i18n.t('st_upload_your_image')}:
                </Text>
                <Button
                  size="lg"
                  variant="solid"
                  className="w-full"
                  action="secondary"
                  onPress={handlePickImage}
                >
                  <ButtonText> {i18n.t('st_choice_image')}</ButtonText>
                  <ButtonIcon as={EditIcon} />
                </Button>

                {/* Hiển thị hình ảnh đã chọn */}
                {images.length > 0 && (
                  <FlatList
                    horizontal
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingVertical: 12 }}
                    renderItem={({ item }) => (
                      <ImageBackground
                        source={{ uri: item.uri }}
                        className="w-32 h-32 me-1 border"
                      >
                        <TouchableOpacity
                          onPress={() => removeImage(item.uri)}
                          className="absolute top-1 right-1 border border-red-500 bg-white rounded-full"
                        >
                          <Icon
                            as={CloseIcon}
                            className="text-red-500 m-1 w-4 h-4"
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    )}
                  />
                )}
              </VStack>
            </VStack>
            <VStack>
              <Text size="lg" className="text-orange-500 font-bold">
                *{i18n.t('word_note')}:
              </Text>
              <VStack className="ms-3">
                <Text className="font-semibold">
                  - {i18n.t('st_note_addition_info')}
                </Text>
                <Text className="font-semibold">
                  - {i18n.t('st_note_addition_image')}
                </Text>
              </VStack>
            </VStack>
            <Center>
              <Button
                size="lg"
                variant="solid"
                action="positive"
                className={'w-64 h-14'}
                onPress={handleOpenAlert}
              >
                <ButtonText className="font-bold text-xl">
                  {i18n.t('st_send_register')}
                </ButtonText>
              </Button>
            </Center>
          </VStack>
        </Box>
      )}

      {/* Alert dialog */}
      <AlertConfirmDialog
        isOpen={showAlertDialog}
        onClose={handleCloseAlert}
        onConfirm={() => {
          handleCloseAlert();
          handleSubmit();
        }}
        title={i18n.t('word_confirm')}
        body={i18n.t('st_are_ready_send_register')}
        cancelText={i18n.t('word_cancel')}
        confirmText={i18n.t('word_register')}
      />
    </SafeAreaView>
  );
};

export default AdditionInfo;
