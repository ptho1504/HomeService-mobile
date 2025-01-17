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

const notificationData : Notification[] = [
  {
    id: "0",
    time: "2025-01-11T10:10:00.000Z",
    title: "System notification",
    content: "Update system at 03:03 12/01/2025.",
  },
  {
    id: "1",
    time: "2025-01-12T08:45:00.000Z",
    title: "Reminder",
    content: "Don't forget to check your tasks today.",
  },
  {
    id: "2",
    time: "2025-01-10T16:30:00.000Z",
    title: "New Feature",
    content: "We've added new functionalities to enhance your experience!",
  },
  {
    id: "3",
    time: "2025-01-09T09:00:00.000Z",
    title: "Maintenance Alert",
    content: "System maintenance scheduled from 01:00 to 03:00 AM on 2025-01-10.",
  },
  {
    id: "4",
    time: "2025-01-08T14:15:00.000Z",
    title: "Task Completed",
    content: "Your scheduled task has been successfully completed.",
  },
  {
    id: "5",
    time: "2025-01-07T11:25:00.000Z",
    title: "Payment Received",
    content: "Your payment for the recent task has been processed.",
  },
  {
    id: "6",
    time: "2025-01-06T18:00:00.000Z",
    title: "Welcome",
    content: "Thank you for signing up! Start exploring our features today.",
  },
  {
    id: "7",
    time: "2025-01-05T20:45:00.000Z",
    title: "Feedback Request",
    content: "We'd love to hear your thoughts about our service!",
  },
  {
    id: "8",
    time: "2025-01-04T07:30:00.000Z",
title: "Security Notice",
    content: "Please update your password for enhanced security.",
  },
  {
    id: "9",
    time: "2025-01-03T15:00:00.000Z",
    title: "Weekly Summary",
    content: "Here's a summary of your activities this week.",
  },
  {
    id: "10",
    time: "2025-01-02T12:15:00.000Z",
    title: "Holiday Greetings",
    content: "Happy New Year! Wishing you success and happiness in 2025.",
  },
  {
    id: "11",
    time: "2025-01-01T10:00:00.000Z",
    title: "System Update",
    content: "A new version of the app is now available. Update today!",
  },
  {
    id: "12",
    time: "2024-12-31T23:59:00.000Z",
    title: "New Year's Countdown",
    content: "The countdown to 2025 has begun! Celebrate with us.",
  },
  {
    id: "13",
    time: "2024-12-30T17:45:00.000Z",
    title: "Event Reminder",
    content: "Don't miss the webinar tomorrow at 10:00 AM.",
  },
  {
    id: "14",
    time: "2024-12-29T09:30:00.000Z",
    title: "Account Notice",
    content: "Your account settings were successfully updated.",
  },
];


const Notifications = ({ route }: Props) => {
  const { status } = route.params;
  console.log(status);
  return (
    <SafeAreaView className="relative flex-1">
      <NotificationList notifications={notificationData} />
    </SafeAreaView>
  );
};

const NotificationList = ({ notifications }: NotificationListProps) => {
  const renderItem = ({ item }: { item: Notification }) => (
    <Card size="md" variant="filled" className="m-3 bg-secondary-0">
      <Heading size="md" className="mb-1">
        {item.title}
      </Heading>
      <VStack>
        <Text size="sm">{item.content}</Text>
        <Text size="xs">{item.time}</Text>
      </VStack>
    </Card>
      
  );

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const ChatList = () => {
  return <Text>Hello22</Text>
}

export default Notifications;