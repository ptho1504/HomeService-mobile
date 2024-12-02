import { Button, ButtonText } from '@/components/ui/button';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { WorkType } from '@/constants';
import { Box } from '@/components/ui/box';
import { useGetPostsByUserIdQuery } from '@/services/post';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import PostSkeleton from '@/components/activity/PostSkeleton';
import PostList from '@/components/activity/PostList';
import { PostModel } from '@/types/postTypes';

const userId = 'USER-1';

const Post = () => {
  const { workType } = useLocalSearchParams();
  const { data, error, isLoading } = useGetPostsByUserIdQuery(userId);
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
    ? data?.items.filter(
        post =>
          post.work.name === WorkType[workType as keyof typeof WorkType].key,
      )
    : [];

  return (
    <SafeAreaView className="flex h-full">
      {isLoading ? <PostSkeleton /> : <PostList posts={posts} />}
      <Box className="sticky bottom-0 p-4">
        <Button
          onPress={() => router.push('/HouseCleaningForm')}
          size="xl"
          className="bg-green-500 flex flex-row items-center justify-center"
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
