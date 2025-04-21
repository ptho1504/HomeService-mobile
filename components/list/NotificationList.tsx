import { NotificationModel } from "@/types/userTypes";
import { normalizeDateTime } from "@/utils/dateUtil";
import { useRouter } from "expo-router";
import moment from "moment";
import { Pressable, FlatList, RefreshControl, ScrollView } from "react-native";
import { Box } from "../ui/box";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { useCallback, useState } from "react";
import { i18n } from "@/localization";

interface Props {
  notifications: NotificationModel[] | undefined;
  refetch: (options?: {
    force?: boolean;
    throwOnError?: boolean;
  }) => Promise<any>;
}

const NotificationList = ({ notifications, refetch }: Props) => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const handleViewNotification = async (
    userNotification: NotificationModel
  ) => {
    if (userNotification.view) {
      router.push(`/(posts)/PostDetail?id=${userNotification.postId}`);
    } else {
      router.push(
        `/(posts)/PostDetail?id=${userNotification.postId}&notificationId=${userNotification.id}`
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
            {i18n.t("st_not_has_any_new_notification")}
          </Text>
        </Box>
      </ScrollView>
    );
  }

  const renderItem = ({ item }: { item: NotificationModel }) => (
    <Card
      size="md"
      variant="elevated"
      className={`mx-2 my-1 shadow-lg ${
        item.view ? "bg-secondary-0" : "bg-info-0"
      }`}
    >
      <Pressable className="" onPress={() => handleViewNotification(item)}>
        {({ pressed }) => (
          <Box className={pressed ? "opacity-75" : ""}>
            <Heading className="mb-1">{item.title}</Heading>

            <VStack space="xs">
              <Text>{item.content}</Text>
              <Text className="text-info-600">
                {moment(normalizeDateTime(item.createdAt))?.format(
                  "DD/MM/YYYY"
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
      className="mt-1"
      data={notifications}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default NotificationList;
