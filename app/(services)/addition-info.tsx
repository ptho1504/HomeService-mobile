import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Alert,
} from "react-native";
import { Text } from "@/components/ui/text";
import * as ImagePicker from "expo-image-picker";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { CloseIcon, EditIcon, Icon } from "@/components/ui/icon";
import { Center } from "@/components/ui/center";

import { useDispatch, useSelector } from "react-redux";
import { selectTestInfo, selectTestResult, setRegisterProcess, selectUser, selectRegisterProcess } from "@/store/reducers";

import {
  useRegisterServiceMutation,
  useUploadImagesForRegisterServiceMutation,
} from "@/services";

import { ImageModel } from "@/types/postTypes";
import { router, useNavigation } from "expo-router";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import colors from "tailwindcss/colors";

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";
import { usePreventRemove } from "@react-navigation/native";

const AdditionInfo = () => {

  const dispatch = useDispatch();

  const registerProcess = useSelector(selectRegisterProcess);

  const navigation = useNavigation();

  usePreventRemove(!registerProcess.isRegisterDone, ({ data }) => {
    
    Alert.alert("Xác nhận", "Bạn có chắc muốn quay lại?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đồng ý",
        style: "default",
        onPress: () => navigation.dispatch(data.action),
      },
    ]);
  });

  const [toastId, setToastId] = useState<string>(Date.now().toString());

  const toast = useToast();

  const showToast = (
    title: string,
    message: string,
    type: "error" | "muted" | "warning" | "success" | "info" | undefined
  ) => {
    if (toast.isActive(toastId)) {
      return;
    }
    const uniqueToastId = Date.now().toString();
    setToastId(uniqueToastId);
    toast.show({
      id: uniqueToastId,
      placement: "top",
      duration: 3000,
      render: ({ id }) => (
        <Toast nativeID={uniqueToastId} action={type} variant="solid">
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{message}</ToastDescription>
        </Toast>
      ),
    });
  };

  const [
    registerService,
    { data: registerData, error: registerError, isLoading: registerIsLoading },
  ] = useRegisterServiceMutation();

  const testResult = useSelector(selectTestResult);
  const testInfo = useSelector(selectTestInfo);
  const user = useSelector(selectUser);

  const [note, setNote] = useState("");
  const [images, setImages] = useState<ImageModel[]>([]);

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: false,
        quality: 0.1,
        allowsMultipleSelection: true,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("Chọn ảnh bị hủy hoặc không hợp lệ");
        return;
      }

      const selectedImages = result.assets.map((asset) => ({
        uri: asset.uri,
        type: asset.mimeType || "image/jpeg",
        name: asset.fileName || asset.uri.split("/").pop(),
      }));

      setImages((prev) => [...prev, ...selectedImages]); // Thêm ảnh vào state
    } catch (error) {
      console.error("Lỗi khi chọn ảnh:", error);

      showToast("Thất bại", "Lỗi khi chọn ảnh", "error");
    }
  };

  // Xóa ảnh khỏi danh sách
  const removeImage = (uri: string | undefined) => {
    setImages(images.filter((image) => image.uri !== uri));
  };

  const handleRegisterService = async () => {
    if (note === "") {
      console.log("Không có ghi chú để upload");
      showToast("Lưu ý", "Hãy nhập ghi chú", "warning");
      return null;
    }

    const dataToRegister = {
      serviceId: testInfo.serviceId ?? "",
      freelancerId: user?.id ?? "",
      data: {
        status: "INITIAL",
        description: note,
        testResultId: testResult.testResultId ?? "",
      },
    };

    // console.log(dataToRegister);

    try {
      const result = await registerService(dataToRegister).unwrap();
      console.log("Register ID", result.items.id);
      return result.items.id ?? null;
    } catch (err) {
      console.error("Lỗi khi đăng ký dịch vụ:", err);
      showToast("Thất bại", "Lỗi khi đăng ký dịch vụ", "error");
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
    if (images.length === 0) {
      console.log("Không có hình ảnh để upload");
      showToast("Lưu ý", "Hãy tải hình ảnh ghi chú", "warning");
      return;
    }

    const formData = new FormData();

    console.log("handleUploadImages");

    images.forEach((image, index) => {
      if (image.uri && image.type && image.name) {
        formData.append("images", {
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

      console.log("Upload thành công:", response);
    } catch (error) {
      console.error("Lỗi khi upload hình ảnh:", error);
      showToast("Thất bại", "Lỗi khi đăng tải hình ảnh", "error");
    }
  };

  const handleSubmit = async () => {
    // Check input

    if (note === "") {
      console.log("Không có ghi chú để upload");
      showToast("Lưu ý", "Hãy nhập ghi chú", "warning");
      return;
    }

    if (images.length === 0) {
      console.log("Không có hình ảnh để upload");
      showToast("Lưu ý", "Hãy tải hình ảnh ghi chú", "warning");
      return;
    }

    try {
      // Gọi API đăng ký dịch vụ
      const registerResponseId = await handleRegisterService();

      if (!registerResponseId) {
        console.error("Lỗi: Không lấy được ID sau khi đăng ký");
        return;
      }

      // console.log("Register ID:", registerResponseId);

      try {
        // Gọi hàm upload ảnh với ID đã lấy được
        await handleUploadImages(registerResponseId);
      } catch (uploadError) {
        console.error("Lỗi khi upload hình ảnh:", uploadError);
        showToast("Xin lỗi", "Hệ thống xuất hiện lỗi", "error");
      }
    } catch (error) {
      console.error("Lỗi khi submit:", error);
      showToast("Xin lỗi", "Hệ thống xuất hiện lỗi", "error");
    }

    dispatch(setRegisterProcess({isRegisterDone: true}));

    showToast("Chúc mừng", "Bạn đã hoàn thành đăng ký dịch vụ", "success");
  };

  useEffect(() => {
    if (registerProcess.isRegisterDone) {
      router.dismissAll();
    }
  }, [registerProcess]);


  // const handleGoOutButton = () => {
  //   showToast("Chúc mừng", "Bạn đã hoàn thành đăng ký dịch vụ", "success");
  //   // router.push("/(services)/add-service");
  //   setIsRegisterSuccessly(false);
  // };

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleCloseAlert = () => setShowAlertDialog(false);
  const handleOpenAlert = () => {
    setShowAlertDialog(true);
  };

  return (
    <SafeAreaView className="flex-1">
      {/* isRegisterSuccessly ? (
        <Center>
          <Button
            size="lg"
            variant="solid"
            action="positive"
            className={"w-64 h-14"}
            onPress={handleGoOutButton}
          >
            <ButtonText className="font-bold text-xl">"Gửi đăng ký"</ButtonText>
          </Button>
        </Center>
      ) :  */}
      {registerIsLoading || uploadImagesIsLoading ? (
        <VStack className="mt-5">
          <Spinner size="large" color={colors.emerald[600]} />
          <Text size="lg" className="text-green-800 text-center">
            Đang gửi đăng ký dịch vụ
          </Text>
        </VStack>
      ) : (
        <VStack className="px-3 mt-5">
          <VStack space="4xl">
            <VStack space="md">
              <Text className="font-bold text-lg">Nhập ghi chú của bạn:</Text>
              <Textarea size="md">
                <TextareaInput
                  placeholder="Nhập ghi chú tại đây..."
                  onChangeText={setNote}
                  value={note}
                />
              </Textarea>
            </VStack>
            <VStack space="md" className="h-72">
              {/* Tải hình ảnh */}
              <Text className="font-bold text-lg">
                Tải hình ghi chú của bạn:
              </Text>
              <Button
                size="lg"
                variant="solid"
                className="w-full"
                action="secondary"
                onPress={handlePickImage}
              >
                <ButtonText>Chọn hình ảnh</ButtonText>
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
          <Center>
            <Button
              size="lg"
              variant="solid"
              action="positive"
              className={"w-64 h-14"}
              onPress={handleOpenAlert}
            >
              <ButtonText className="font-bold text-xl">Gửi đăng ký</ButtonText>
            </Button>
          </Center>
        </VStack>
      )}

      {/* Alert dialog */}
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={handleCloseAlert}
        size="md"
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              Gửi đăng ký
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="sm">Bạn xác nhận gửi đăng ký!</Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleCloseAlert}
              size="sm"
            >
              <ButtonText>Huỷ</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              onPress={() => {
                handleCloseAlert();
                handleSubmit();
              }}
            >
              <ButtonText>Gửi</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SafeAreaView>
  );
};

export default AdditionInfo;
