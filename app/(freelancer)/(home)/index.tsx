import { Box } from '@/components/ui/box';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import { TakePostStatus } from '@/constants';
import {
  useGetPostsByFreelancerIdQuery,
  useGetPostsQuery,
} from '@/services/post';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import PostList from '@/components/list/PostList';
import PostSkeleton from '@/components/skeleton/PostSkeleton';
import {
  PostModel,
  RootStackParamList,
  TakePostModel,
} from '@/types/postTypes';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/reducers';
import { LinearGradient } from 'expo-linear-gradient';
import { isPostModel } from '@/components/post/PostInfo';
import { i18n } from '@/localization';

interface Props {
  route:
    | RouteProp<RootStackParamList, 'NewPost'>
    | RouteProp<RootStackParamList, 'RequestPost'>;
}

const Posts = ({ route }: Props) => {
  const { status } = route.params;
  const currentUser = useSelector(selectUser);
  const toast = useToast();

  const { data, error, isFetching, refetch } =
    status === 'NEW'
      ? useGetPostsQuery({ freelancerId: currentUser?.id ?? '' })
      : useGetPostsByFreelancerIdQuery({
          id: currentUser?.id ?? '',
          workStatus: TakePostStatus.PENDING.key,
        });

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
                {i18n.t("st_failed_in_getting_posts")}
              </ToastTitle>
              <ToastDescription>{error.data.message}</ToastDescription>
            </Toast>
          );
        },
      });
    }
  }, []);

  let posts = data?.items ? data?.items : [];

  return (
    <SafeAreaView className="flex h-full">
      <LinearGradient
        // Background Linear Gradient
        colors={['#ebf7eb', 'transparent', '#ffffff']}
        className="absolute h-[1000px] left-0 right-0 top-0"
      />
      {isFetching ? (
        <PostSkeleton />
      ) : (
        <PostList posts={posts} takePostStatus={status} refetch={refetch} />
      )}
    </SafeAreaView>
  );
};

export default Posts;
