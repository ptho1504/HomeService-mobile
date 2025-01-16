import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import {
  CreateTakePostModel,
  ImageModel,
  PostModel,
  TakePostModel,
} from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  convertMinuteToHour,
  formatTimeRange,
  normalizeDate,
  normalizeDateTime,
} from '@/utils/dateUtil';
import {
  PackageName,
  PostStatus,
  TakePostStatus,
  UserRole,
  WorkType,
} from '@/constants';
import { Image } from '@/components/ui/image';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { selectPost, selectUser, setPost } from '@/store/reducers';
import { useSelector } from 'react-redux';

import {
  useGetPostsByFreelancerIdQuery,
  useTakePostMutation,
  useUploadImagesMutation,
} from '@/services/post';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import PostInfo, { isPostModel } from '@/components/post/PostInfo';
import TakePostDialog from '@/components/dialog/TakePostDialog';
import { useGetUsersQuery } from '@/services';
import { UserModel } from '@/types/userTypes';
import UserSkeleton from '@/components/skeleton/UserSkeleton';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { LinearGradient } from 'expo-linear-gradient';
import PostAddress from '@/components/post/PostAddress';
import { Heading } from '@/components/ui/heading';
import * as ImagePicker from 'expo-image-picker';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from '@/components/ui/form-control';
import { AlertCircleIcon } from '@/components/ui/icon';
import DoWorkDialog from '@/components/dialog/DoWorkDialog';

const Work = () => {
  const { workType, status } = useLocalSearchParams();
  const post = useSelector(selectPost);
  const [images, setImages] = useState<ImageModel[]>([]);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const currentUser = useSelector(selectUser);
  const userId = currentUser?.id ? currentUser.id : '';

  const query =
    status === 'UPCOMING'
      ? { id: userId, packageName: PackageName._1DAY.key }
      : status === 'PACKAGE'
      ? { id: userId, packageName: PackageName._1MONTH.key }
      : { id: userId };
  const { refetch } = useGetPostsByFreelancerIdQuery(query);

  const [uploadImages, { isLoading, error }] = useUploadImagesMutation();

  const toast = useToast();
  const router = useRouter();

  const doWork = () => {
    if (images.length <= 0) {
      setIsInvalid(true);
      return;
    }
    setShowAlertDialog(true);
  };

  const handleUploadImages = async () => {
    const formData = new FormData();

    images.forEach((image, index) => {
      if (image.uri && image.type && image.name) {
        formData.append('images', {
          uri: image.uri,
          type: image.type,
          name: image.name,
        } as any); // Thêm `as any` để tránh lỗi TypeScript
      } else {
        console.warn(`Image at index ${index} is missing required fields.`);
      }
    });
    const res = await uploadImages({
      id: post?.id ?? '',
      workType: workType as string,
      formData,
    });

    console.log(res);

    if (error || res.data?.returnCode != 1000) {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>Thất bại</ToastTitle>
              <ToastDescription>{res.error.data.message}</ToastDescription>
            </Toast>
          );
        },
      });
    } else {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="success" variant="outline">
              <ToastTitle>Thành công</ToastTitle>
              <ToastDescription>
                {workType === 'start' ? 'Bắt đầu' : 'Kết thúc'} công việc thành
                công
              </ToastDescription>
            </Toast>
          );
        },
      });
      refetch();
      router.back();
    }
  };

  const handleImagePick = async () => {
    // Kiểm tra quyền truy cập máy ảnh
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>Bạn cần cấp quyền sử dụng tính năng này</ToastTitle>
            </Toast>
          );
        },
      });
      return;
    }

    // Mở máy ảnh để chụp ảnh
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Cho phép chỉnh sửa ảnh (nếu cần)
      quality: 0.8, // Chất lượng ảnh
    });

    if (!result.canceled) {
      setImages([
        ...images,
        {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name:
            result.assets[0].fileName || result.assets[0].uri.split('/').pop(),
        },
      ]); // Lưu URI ảnh vào state
      setIsInvalid(false);
    }
  };

  const handleDeleteImage = (uri?: string) => {
    setImages(images.filter(image => image.uri !== uri)); // Xóa ảnh theo URI
    if (images.length <= 1) {
      setIsInvalid(true);
    }
  };

  return (
    <SafeAreaView className="flex h-full">
      <LinearGradient
        // Background Linear Gradient
        colors={['#ebf7eb', 'transparent', '#ffffff']}
        className="absolute h-[1000px] left-0 right-0 top-0"
      />
      {post === null ? (
        <Box>
          <Text>Công việc không tồn tại</Text>
        </Box>
      ) : (
        <>
          <ScrollView>
            <Box className="overflow-y-auto m-3">
              <VStack space="md">
                <PostInfo
                  workType={post.work.name}
                  postForm={post}
                  showStatus={true}
                />
                <PostAddress canChange={false} />
                <Card size="md" variant="elevated" className="shadow-2xl">
                  <VStack space="md">
                    <Heading>Chụp hình minh chứng</Heading>
                    <Text>
                      Chụp 1 hoặc nhiều ảnh để minh chứng bản thân đã có mặt tại
                      nơi làm việc
                    </Text>
                    <FormControl isInvalid={isInvalid} size="md">
                      <HStack space="md" className="flex flex-row flex-wrap">
                        {images.map(
                          (image, index) =>
                            image &&
                            image.uri && (
                              <Box key={index} className="relative w-1/4 h-24">
                                <Image
                                  source={{ uri: image.uri }}
                                  className="rounded-lg w-full h-full"
                                />
                                <Pressable
                                  onPress={() => handleDeleteImage(image.uri)}
                                  className="absolute top-1 right-0 bg-secondary-300 p-1 rounded-full "
                                >
                                  <Ionicons
                                    name="close"
                                    size={20}
                                    color="white"
                                  />
                                </Pressable>
                              </Box>
                            ),
                        )}
                        <Pressable
                          onPress={handleImagePick}
                          className="w-1/4 h-24"
                        >
                          {({ pressed }) => (
                            <Box
                              className={`border h-full border-secondary-400 p-2 rounded-lg flex flex-row justify-center items-center ${
                                pressed && 'opacity-50'
                              }`}
                            >
                              <Text
                                className="text-center text-secondary-400"
                                size="6xl"
                              >
                                <Ionicons name="add" size={50} />
                              </Text>
                            </Box>
                          )}
                        </Pressable>
                      </HStack>
                      <FormControlError className="mt-4">
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          Vui lòng chụp hình minh chứng
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </VStack>
                </Card>
              </VStack>
            </Box>
          </ScrollView>

          <Box className="sticky bg-white p-4 rounded-t-lg shadow-lg">
            <Button
              size="xl"
              action="positive"
              className="bg-success-300"
              onPress={doWork}
            >
              {isLoading && <ButtonSpinner className="text-secondary-50" />}
              <ButtonText>
                {workType === 'start' ? 'Bắt đầu làm' : 'Hoàn thành công việc'}
              </ButtonText>
            </Button>
          </Box>

          <DoWorkDialog
            showAlertDialog={showAlertDialog}
            setShowAlertDialog={setShowAlertDialog}
            workType={workType as string}
            handleUploadImages={handleUploadImages}
            isLoading={isLoading}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Work;
