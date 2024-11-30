import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Box } from '@/components/ui/box';
import { Badge, BadgeIcon, BadgeText } from '@/components/ui/badge';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Divider } from '@/components/ui/divider';
import { CheckIcon } from '@/components/ui/icon';

const HouseCleaningPost = () => {
  return (
    <SafeAreaView>
      <Card size="md" variant="elevated" className="m-3">
        <VStack space="md">
          <Heading>Công việc đăng gần nhất</Heading>
          <VStack space="md">
            <HStack space="md">
              <Text className="text-cyan-600 text-md">
                <Ionicons name="time-outline" size={24} />
              </Text>
              <Text className="text-md text-primary-100">Nguyễn Đại Tiến</Text>
            </HStack>
            <HStack space="md">
              <Text className="text-gray-600 text-md">
                <Ionicons name="people-outline" size={24} />
              </Text>
              <Text className="text-md">3 người làm</Text>
            </HStack>
            <HStack space="md">
              <Text className="text-green-600 text-md">
                <Ionicons name="square-outline" size={24} />
              </Text>
              <Text className="text-md">3 m^2</Text>
            </HStack>
            <HStack space="md">
              <Text className="text-red-600 text-md">
                <Ionicons name="location-outline" size={24} />
              </Text>
              <Text className="text-md">Nguyễn Đại Tiến</Text>
            </HStack>
          </VStack>
          <Divider className="my-2" />
          <HStack className="justify-between">
            <Badge
              size="lg"
              variant="solid"
              action="success"
              className="rounded-md"
            >
              <BadgeText>Hoàn thành</BadgeText>
              <BadgeIcon as={CheckIcon} className="ml-1" />
            </Badge>
            <Pressable>
              <Text className="text-green-600 text-lg font-semibold">
                Đăng lại
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </Card>
    </SafeAreaView>
  );
};

export default HouseCleaningPost;
