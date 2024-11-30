import { Button, ButtonText } from '@/components/ui/button';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Badge, BadgeIcon, BadgeText } from '@/components/ui/badge';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Divider } from '@/components/ui/divider';
import { CheckIcon } from '@/components/ui/icon';
import { Center } from '@/components/ui/center';
import { WorkType } from '@/constants';

const Post = () => {
  const { workType } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <VStack space="md">
        <Card size="md" variant="elevated" className="m-3">
          <VStack space="md">
            <Heading>Công việc đăng gần nhất</Heading>
            <VStack space="md">
              <HStack className="items-center" space="md">
                <Text className="text-cyan-600 text-md">
                  <Ionicons name="time-outline" size={24} />
                </Text>
                <Text className="text-md text-primary-100">
                  Nguyễn Đại Tiến
                </Text>
              </HStack>
              <HStack className="items-center" space="md">
                <Text className="text-gray-600 text-md">
                  <Ionicons name="people-outline" size={24} />
                </Text>
                <Text className="text-md">3 người làm</Text>
              </HStack>
              <HStack className="items-center" space="md">
                <Text className="text-green-600 text-md">
                  <Ionicons name="square-outline" size={24} />
                </Text>
                <Text className="text-md">3 m^2</Text>
              </HStack>
              <HStack className="items-center" space="md">
                <Text className="text-red-600 text-md">
                  <Ionicons name="location-outline" size={24} />
                </Text>
                <Text className="text-md">Nguyễn Đại Tiến</Text>
              </HStack>
            </VStack>
            <Divider className="my-2" />
            <HStack className="items-center justify-between">
              <Badge
                size="lg"
                variant="solid"
                action="success"
                className="rounded-md"
              >
                <BadgeText>Hoàn thành</BadgeText>
                <BadgeIcon as={CheckIcon} className="ml-1" />
              </Badge>
              <Pressable className="">
                <Text className="text-green-600 text-lg font-semibold">
                  Đăng lại
                </Text>
              </Pressable>
            </HStack>
          </VStack>
        </Card>
        <Center>
          <Button
            className="bg-green-600 focus:bg-green-800 text-white"
            size="lg"
            variant="solid"
            action="positive"
            onPress={() => router.push('/HouseCleaningForm')}
          >
            <ButtonText>
              Đăng việc {WorkType[workType as keyof typeof WorkType].value}
            </ButtonText>
          </Button>
        </Center>
      </VStack>
    </SafeAreaView>
  );
};

export default Post;
