import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { LOCAL_STORAGE_JWT_KEY } from '@/constants';
import { selectUser } from '@/store/reducers';
import { WorkType } from '@/constants';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import FlagVN from '@/components/svg/FlagVN';
import { Pressable } from '@/components/ui/pressable';
import { i18n, Language } from '@/localization';
import { HStack } from '@/components/ui/hstack';
import Carousel from '@/components/carousel/Carousel';
import ListServices from '@/components/list-services/ListServices';
import { RootStackParamList } from '@/types/postTypes';
import { RouteProp } from '@react-navigation/native';
import { useGetNotificationQuery } from '@/services';
import { NotificationModel } from '@/types/userTypes';
import moment from 'moment';
import { normalizeDateTime } from '@/utils/dateUtil';

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
  console.log(status);
  return (
    <SafeAreaView className="relative flex-1">
      <NotificationList />
    </SafeAreaView>
  );
};

const NotificationList = () => {

  const { data, error, isFetching, refetch } = useGetNotificationQuery({id: "USER-1"});

  const renderItem = ({ item }: { item: NotificationModel }) => (
    <Card size="md" variant="filled" className="m-3 bg-secondary-0">
      <Heading size="md" className="mb-1">
        {item.notification.title}
      </Heading>
      <VStack>
        <Text size="sm">{item.notification.content}</Text>
        <Text size="xs">{moment(normalizeDateTime(item.notification.createdAt))?.format('DD/MM/YYYY')}</Text>
      </VStack>
    </Card>
      
  );

  return (
    <FlatList
      data={data?.items}
      keyExtractor={(item) => item.notification.title}
      renderItem={renderItem}
    />
  );
};

const ChatList = () => {
  return <Text>Hello22</Text>
}

export default Notifications;