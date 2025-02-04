import React from 'react';
import { SafeAreaView } from 'react-native';

import { Text } from '@/components/ui/text';
import { i18n, Language } from '@/localization';
import { RootStackParamList } from '@/types/postTypes';
import { RouteProp } from '@react-navigation/native';
import { useGetNotificationQuery } from '@/services';
import { LinearGradient } from 'expo-linear-gradient';
import NotificationList from '@/components/list/NotificationList';
import NotificationSkeleton from '@/components/skeleton/NotificationSkeleton';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/reducers';

i18n.locale = 'vn';
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

interface Props {
  route:
    | RouteProp<RootStackParamList, 'Notifications'>
    | RouteProp<RootStackParamList, 'Chat'>;
}

type Notification = {
  id: string;
  time: string;
  title: string;
  content: string;
};

type NotificationListProps = {
  notifications: Notification[];
};

const Notifications = ({ route }: Props) => {
  const { status } = route.params;
  const user = useSelector(selectUser);

  const { data, error, isFetching, refetch } = useGetNotificationQuery({
    id: user?.id ?? '',
  });

  return (
    <SafeAreaView className="relative flex-1">
      <LinearGradient
        // Background Linear Gradient
        colors={['#ebf7eb', 'transparent', '#ffffff']}
        className="absolute h-[1000px] left-0 right-0 top-0"
      />

      {isFetching ? (
        <NotificationSkeleton />
      ) : (
        <NotificationList notifications={data?.items} refetch={refetch} />
      )}
    </SafeAreaView>
  );
};

const ChatList = () => {
  return <Text>Hello22</Text>;
};

export default Notifications;
