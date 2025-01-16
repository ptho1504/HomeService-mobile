import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import {
  CreateTakePostModel,
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
import { selectUser, setPost } from '@/store/reducers';
import { useSelector } from 'react-redux';

import { useTakePostMutation } from '@/services/post';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import { isPostModel } from '@/components/post/PostInfo';
import TakePostDialog from '@/components/dialog/TakePostDialog';
import { useGetUsersQuery } from '@/services';
import { UserModel } from '@/types/userTypes';
import UserSkeleton from '@/components/skeleton/UserSkeleton';

const FreelancerList = () => {
  const { postId } = useLocalSearchParams();
  const { refetch, isFetching, error, data } = useGetUsersQuery({
    postId: postId as string,
    role: UserRole.FREELANCER,
  });
  const [refreshing, setRefreshing] = useState(false);

  console.log(data);

  const currentUser = useSelector(selectUser);
  const router = useRouter();
  const toast = useToast();

  const renderItem = ({ item: freelancer }: ListRenderItemInfo<UserModel>) => {
    return (
      <Pressable
        // onPress={() => navigateToPostDetail(convertToPost(post))}
        key={freelancer.id}
        className="py-2"
      >
        {({ pressed }) => (
          <Box
            className={`rounded-xl shadow-lg flex flex-row justify-between items-center p-3 bg-white ${
              pressed && 'opacity-75'
            }`}
          >
            <HStack space="md" className="items-center">
              <Image
                size="sm"
                source={{
                  uri: `${
                    freelancer.avatar ??
                    'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
                  }`,
                }}
                alt={`${freelancer.name}`}
                className="rounded-full"
              />
              <VStack space="sm">
                <Text className="text-lg font-medium">{freelancer.name}</Text>
                <Text className="text-info-400">{5} sao</Text>
              </VStack>
            </HStack>
            <Text className="text-secondary-400">
              <Ionicons name="chevron-forward-outline" size={20} />
            </Text>
          </Box>
        )}
      </Pressable>
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch(); // Gọi lại hàm refetch để lấy dữ liệu mới
    setRefreshing(false); // Đặt lại trạng thái refreshing sau khi hoàn tất
  }, [refetch]);

  if (isFetching) {
    return <UserSkeleton />;
  } else if (!data?.items || data.items.length <= 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="h-full"
      >
        <Box className="flex flex-1 justify-center items-center">
          <Text className="text-lg text-center mt-10">
            Không có freelancer phù hợp với công việc
          </Text>
        </Box>
      </ScrollView>
    );
  } else {
    return (
      <VStack className="mx-3 my-1" space="md">
        <FlatList
          data={data.items}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="bg-none"
          // onEndReached={loadMore}
          // onEndReachedThreshold={0.5}
          // ListFooterComponent={
          //   isFetching ? <ActivityIndicator size="small" /> : null
          // }
        />
      </VStack>
    );
  }
};

export default FreelancerList;
