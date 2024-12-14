import { Button, ButtonText } from '@/components/ui/button';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { WorkType } from '@/constants';
import { Box } from '@/components/ui/box';
import { useGetPostsByCustomerIdQuery } from '@/services/post';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import PostSkeleton from '@/components/activity/PostSkeleton';
import PostList from '@/components/activity/PostList';
import { PostModel } from '@/types/postTypes';
import { LinearGradient } from 'expo-linear-gradient';

const userId = 'USER-1';

const Post = () => {
  const { workType } = useLocalSearchParams();
  const { data, error, isFetching } = useGetPostsByCustomerIdQuery({
    id: userId,
    workId: workType === WorkType.BABYSITTING.key ? 'WORK-2' : 'WORK-1',
  });
  const toast = useToast();

  useEffect(() => {
    if (error || (data && data.returnCode !== 1000)) {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>
                Lấy thông tin các bài đăng công việc thất bại
              </ToastTitle>
              <ToastDescription>{data?.message}</ToastDescription>
            </Toast>
          );
        },
      });
    }
  }, []);

  let posts: PostModel[] = data?.items
    ? data?.items.slice().sort((a, b) => {
        const dateA = new Date(
          a.createdAt[0],
          a.createdAt[1],
          a.createdAt[2],
          a.createdAt[3],
          a.createdAt[4],
          a.createdAt[5],
        );
        const dateB = new Date(
          b.createdAt[0],
          b.createdAt[1],
          b.createdAt[2],
          b.createdAt[3],
          b.createdAt[4],
          b.createdAt[5],
        );
        // Nếu các phần tử so sánh được bằng nhau, ưu tiên mảng có độ dài lớn hơn
        return dateB.getTime() - dateA.getTime();
      })
    : [];

  return (
    <SafeAreaView className="flex h-full">
      <LinearGradient
        // Background Linear Gradient
        colors={['#ebf7eb', 'transparent', '#ffffff']}
        className="absolute h-[1000px] left-0 right-0 top-0"
      />
      {isFetching ? <PostSkeleton /> : <PostList posts={posts} />}
      <Box className="sticky bottom-0 p-4">
        <Button
          onPress={() => router.push(`/PostForm?workType=${workType}`)}
          size="xl"
          className="bg-success-300 flex flex-row items-center justify-center"
          action="positive"
        >
          <ButtonText>
            Đăng việc {WorkType[workType as keyof typeof WorkType].value}
          </ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default Post;
