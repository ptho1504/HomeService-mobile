import { Box } from '@/components/ui/box';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import { PackageName } from '@/constants';
import { useGetPostsByUserIdQuery } from '@/services/post';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import PostList from '@/components/activity/PostList';
import PostSkeleton from '@/components/activity/PostSkeleton';
import { PostModel, RootStackParamList } from '@/types/postTypes';
import { RouteProp } from '@react-navigation/native';

const userId = 'USER-1';

interface Props {
  route:
    | RouteProp<RootStackParamList, 'UpcomingWork'>
    | RouteProp<RootStackParamList, 'PackageWork'>
    | RouteProp<RootStackParamList, 'PastWork'>;
}

const Posts = ({ route }: Props) => {
  const { status } = route.params;
  const query =
    status === 'UPCOMING'
      ? { id: userId, packageName: PackageName._1DAY.key }
      : status === 'PACKAGE'
      ? { id: userId, packageName: PackageName._1MONTH.key }
      : { id: userId };
  const { data, error, isFetching } = useGetPostsByUserIdQuery(query);

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

  let posts: PostModel[] = data?.items ? data?.items : [];

  return (
    <SafeAreaView className="flex h-full">
      {isFetching ? <PostSkeleton /> : <PostList posts={posts} />}
      <Box className="sticky bottom-0 p-4">
        <Button
          onPress={() => router.push('../(home)')}
          size="xl"
          className="bg-green-500 flex flex-row items-center justify-center"
          action="positive"
        >
          <ButtonText>Đăng việc mới</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default Posts;
