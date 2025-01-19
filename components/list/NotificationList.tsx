import { data, UserRole } from '@/constants';
import { NotificationModel } from '@/types/userTypes';
import { normalizeDateTime } from '@/utils/dateUtil';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { Pressable, FlatList, RefreshControl, ScrollView } from 'react-native';
import { Box } from '../ui/box';
import { Card } from '../ui/card';
import { Heading } from '../ui/heading';
import { VStack } from '../ui/vstack';
import { Text } from '../ui/text';
import { useCallback, useState } from 'react';
import { useViewNotificationMutation } from '@/services';
import { Toast, ToastDescription, ToastTitle, useToast } from '../ui/toast';
import { Mode } from './PostList';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/reducers';

interface Props {
  notifications: NotificationModel[] | undefined;
  refetch: (options?: {
    force?: boolean;
    throwOnError?: boolean;
  }) => Promise<any>;
}

const NotificationList = ({ notifications, refetch }: Props) => {
  const router = useRouter();
  const currentUser = useSelector(selectUser);
  const [refreshing, setRefreshing] = useState(false);
  const [viewNotification, { isLoading, error, data }] =
    useViewNotificationMutation();
  const toast = useToast();

  const handleViewNotification = async (
    userNotification: NotificationModel,
  ) => {
    const res = await viewNotification({
      userId: currentUser?.id ?? '',
      id: userNotification.id,
    });
    if (error || res.data?.returnCode != 1000) {
      console.log(res.error.data.message);
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>Xem thông báo thất bại</ToastTitle>
              <ToastDescription>{res.error.data.message}</ToastDescription>
            </Toast>
          );
        },
      });
    } else {
      router.push(
        `/(posts)/PostDetail?id=${userNotification.notification.post.id}`,
      );
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch(); // Gọi lại hàm refetch để lấy dữ liệu mới
    setRefreshing(false); // Đặt lại trạng thái refreshing sau khi hoàn tất
  }, [refetch]);

  if (!notifications || notifications.length <= 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="h-full"
      >
        <Box className="flex flex-1 justify-center items-center">
          <Text className="text-lg text-center mt-10">
            Không có thông báo mới
          </Text>
        </Box>
      </ScrollView>
    );
  }

  const renderItem = ({ item }: { item: NotificationModel }) => (
    <Card
      size="md"
      variant="elevated"
      className={`m-3 shadow-lg ${item.view ? 'bg-secondary-0' : 'bg-info-0'}`}
    >
      <Pressable className="" onPress={() => handleViewNotification(item)}>
        {({ pressed }) => (
          <Box className={pressed ? 'opacity-75' : ''}>
            <Heading className="mb-1">{item.notification.title}</Heading>

            <VStack space="xs">
              <Text>{item.notification.content}</Text>
              <Text className="text-info-600">
                {moment(normalizeDateTime(item.notification.createdAt))?.format(
                  'DD/MM/YYYY',
                )}
              </Text>
            </VStack>
          </Box>
        )}
      </Pressable>
    </Card>
  );

  return (
    <FlatList
      data={notifications}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default NotificationList;
