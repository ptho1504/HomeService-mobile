import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  PaymentType,
  PostStatus,
  TakePostStatus,
  UserRole,
  WorkScheduleStatus,
} from '@/constants';

import PostInfo, { isPostModel } from '@/components/post/PostInfo';
import PostAddress from '@/components/post/PostAddress';
import PaymentStatusBadge from '@/components/badge/PaymentStatusBadge';
import { useSelector } from 'react-redux';
import { selectPost, selectUser } from '@/store/reducers';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetPostByIdQuery, useTakePostMutation } from '@/services/post';
import { Mode } from '@/components/list/PostList';
import TakePostDialog from '@/components/dialog/TakePostDialog';
import { CreateTakePostModel, PostModel } from '@/types/postTypes';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import FreelancerInfo from '@/components/post/FreelancerInfo';
import { Divider } from '@/components/ui/divider';
import PostDetailSkeleton from '@/components/skeleton/PostDetailSkeleton';
import { useViewNotificationMutation } from '@/services';

const PostDetail = () => {
  const { takePostStatus, id, notificationId, status } = useLocalSearchParams();
  const [mode, setMode] = React.useState(Mode.TAKE.key);
  const [post, setPost] = useState<PostModel>();

  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [takePost, { isLoading, error, data }] = useTakePostMutation();
  const [viewNotification, { isLoading: notiLoading, error: notiError }] =
    useViewNotificationMutation();
  const {
    isFetching,
    error: postError,
    data: postData,
  } = useGetPostByIdQuery({ id: id as string });
  const currentUser = useSelector(selectUser);
  const toast = useToast();
  const currentPost = useSelector(selectPost);

  useEffect(() => {
    const fetchPost = async () => {
      if (currentPost && !id) {
        setPost(currentPost);
      } else if (!postError && postData?.returnCode === 1000) {
        if (notificationId) {
          const res = await viewNotification({
            userId: currentUser?.id ?? '',
            id: notificationId as string,
          });
          if (error || res.data?.returnCode != 1000) {
            console.log(res.error.data.message);
            toast.show({
              placement: 'top',
              duration: 3000,
              render: ({ id }) => {
                const uniqueToastId = 'toast-' + id;
                return (
                  <Toast
                    nativeID={uniqueToastId}
                    action="error"
                    variant="outline"
                  >
                    <ToastTitle>Xem thông báo thất bại</ToastTitle>
                    <ToastDescription>
                      {res.error.data.message}
                    </ToastDescription>
                  </Toast>
                );
              },
            });
          }
        }

        setPost(postData.items);
      }
    };
    fetchPost();
  }, [postData]);

  const actionPost = (mode: string) => {
    setMode(mode);
    setShowAlertDialog(true);
  };

  const handleTakePost = async () => {
    if (!post || !currentUser || !currentUser.id) {
      return;
    }
    const data: CreateTakePostModel = {
      id: post?.id,
      freelancerId: currentUser?.id,
      status:
        mode === Mode.REJECT.key
          ? TakePostStatus.REJECTED.key
          : TakePostStatus.ACCEPTED.key,
    };
    const res = await takePost(data);
    if (error || res.data?.returnCode != 1000) {
      console.log(Mode[mode as keyof typeof Mode].value);
      console.log(res.error.data.message);
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>
                {Mode[mode as keyof typeof Mode].value} công việc thất bại
              </ToastTitle>
              <ToastDescription>{res.error.data.message}</ToastDescription>
            </Toast>
          );
        },
      });
    } else {
      console.log(Mode[mode as keyof typeof Mode].value);
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="success" variant="outline">
              <ToastTitle>Thành công</ToastTitle>
              <ToastDescription>
                {Mode[mode as keyof typeof Mode].value} công việc thành công
              </ToastDescription>
            </Toast>
          );
        },
      });
      router.back();
    }
    setShowAlertDialog(false);
  };

  const doWork = (post: PostModel, workType: string) => {
    router.push(`/(work)?workType=${workType}&status=${status}`);
  };

  if (isFetching || !post) {
    return <PostDetailSkeleton />;
  }

  // if (!post) {
  //   return (
  //     <Box>
  //       <Text>Lấy thông tin bài đăng thất bại</Text>
  //     </Box>
  //   );
  // }

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
                    <Heading>Thanh toán</Heading>
                    <VStack
                      space="md"
                      className="border p-4 rounded-lg border-secondary-50"
                    >
                      <HStack space="md" className="items-center">
                        <Text className="font-medium text-lg">
                          Tổng thanh toán :
                        </Text>
                        <Text className="font-medium text-lg text-success-400">
                          {post.price.toLocaleString()} VND
                        </Text>
                      </HStack>
                      <HStack space="md" className="items-center">
                        <Text className="font-medium text-lg">Hình thức :</Text>
                        <HStack space="md" className="items-center">
                          <Text className="text-md">
                            <Ionicons
                              name={
                                post.paymentType === PaymentType.CASH.key
                                  ? 'cash-outline'
                                  : 'qr-code-outline'
                              }
                              size={20}
                            />
                          </Text>
                          <Text className="font-medium text-lg">
                            {
                              PaymentType[
                                post.paymentType as keyof typeof PaymentType
                              ].value
                            }
                          </Text>
                        </HStack>
                      </HStack>
                      <HStack space="md" className="items-center">
                        <Text className="font-medium text-lg">
                          Trạng thái :
                        </Text>
                        <PaymentStatusBadge status={post.payment} />
                      </HStack>
                    </VStack>
                  </VStack>
                </Card>
                {post.customerNote && (
                  <Card size="md" variant="elevated" className="shadow-2xl">
                    <VStack space="md">
                      <Heading>Ghi chú cho Freelancers</Heading>
                      <Text>{post.customerNote}</Text>
                    </VStack>
                  </Card>
                )}

                <FreelancerInfo
                  workType={post.work.name}
                  postForm={post}
                  showStatus={true}
                />
              </VStack>
            </Box>
          </ScrollView>
          {takePostStatus && (
            <Box className="sticky p-4">
              {takePostStatus === 'REQUEST' ? (
                <HStack space="md" className="justify-center">
                  <VStack className="w-1/2">
                    <Button
                      size="xl"
                      action="negative"
                      className="bg-error-400"
                      onPress={() => actionPost(Mode.REJECT.key)}
                    >
                      <ButtonText>Từ chối</ButtonText>
                    </Button>
                  </VStack>
                  <VStack className="w-1/2">
                    <Button
                      size="xl"
                      action="positive"
                      className="bg-success-300"
                      onPress={() => actionPost(Mode.ACCEPT.key)}
                    >
                      <ButtonText>Chấp nhận</ButtonText>
                    </Button>
                  </VStack>
                </HStack>
              ) : (
                <Button
                  size="xl"
                  action="positive"
                  className="bg-success-300"
                  onPress={() => actionPost(Mode.TAKE.key)}
                >
                  <ButtonText>Nhận việc</ButtonText>
                </Button>
              )}
            </Box>
          )}

          {[
            PostStatus.CANCELED.key,
            PostStatus.COMPLETED.key,
            PostStatus.FAILED.key,
          ].includes(post.status) &&
            currentUser?.role === UserRole.CUSTOMER && (
              <Box className="sticky p-4">
                <Button
                  size="xl"
                  action="positive"
                  className="bg-success-300"
                  onPress={() => actionPost(Mode.TAKE.key)}
                >
                  <ButtonText>Đăng lại</ButtonText>
                </Button>
              </Box>
            )}

          {isPostModel(post) &&
            [PostStatus.INITIAL.key].includes(post.status) &&
            currentUser?.role === UserRole.CUSTOMER &&
            post.chooseFreelancer && (
              <Box className="sticky p-4">
                <Button
                  size="xl"
                  action="positive"
                  className="bg-success-300"
                  onPress={() => actionPost(Mode.TAKE.key)}
                >
                  <ButtonText>Chọn Freelancer</ButtonText>
                </Button>
              </Box>
            )}

          {post.workSchedules.length > post.numOfWorkedDay &&
            currentUser?.role === UserRole.FREELANCER &&
            [
              WorkScheduleStatus.INITIAL.key,
              WorkScheduleStatus.DOING.key,
            ].includes(post.workSchedules[post.numOfWorkedDay].status) && (
              <Box className="sticky p-4">
                <Button
                  size="xl"
                  action="positive"
                  className="bg-success-300"
                  onPress={() =>
                    doWork(
                      post,
                      post.workSchedules[post.numOfWorkedDay].status ===
                        WorkScheduleStatus.INITIAL.key
                        ? 'start'
                        : 'end',
                    )
                  }
                >
                  <ButtonText>
                    {post.workSchedules[post.numOfWorkedDay].status ===
                    WorkScheduleStatus.INITIAL.key
                      ? 'Bắt đầu làm'
                      : 'Hoàn thành công việc'}
                  </ButtonText>
                </Button>
              </Box>
            )}

          <TakePostDialog
            showAlertDialog={showAlertDialog}
            setShowAlertDialog={setShowAlertDialog}
            mode={mode}
            handleTakePost={handleTakePost}
            isLoading={isLoading}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default PostDetail;
