import PostStatusBadge from '@/components/activity/PostStatusBadge';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import { VStack } from '@/components/ui/vstack';
import { PackageName, PostStatus, WorkType } from '@/constants';
import { useGetPostsByUserIdQuery } from '@/services/post';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import moment from 'moment';
import {
  convertMinuteToHour,
  formatTimeRange,
  normalizeDate,
  normalizeDateTime,
} from '@/utils/dateUtil';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { Center } from '@/components/ui/center';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
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

const Activities = ({ route }: Props) => {
  const { data, error, isLoading } = useGetPostsByUserIdQuery(userId);
  const { status } = route.params;
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
  if (status === 'UPCOMING') {
    posts = posts.filter(
      post =>
        [
          PostStatus.SCHEDULED.key,
          PostStatus.DOING.key,
          PostStatus.INITIAL.key,
        ].includes(post.status) && post.packageName === PackageName._1DAY.key,
    );
  } else if (status === 'PACKAGE') {
    posts = posts.filter(
      post =>
        [
          PostStatus.SCHEDULED.key,
          PostStatus.DOING.key,
          PostStatus.INITIAL.key,
        ].includes(post.status) && post.packageName !== PackageName._1DAY.key,
    );
  }

  return (
    <SafeAreaView className="flex h-full">
      {isLoading ? <PostSkeleton /> : <PostList posts={posts} />}
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

export default Activities;
