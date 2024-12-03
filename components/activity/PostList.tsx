import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Heading } from '@/components/ui/heading';
import { Grid, GridItem } from '@/components/ui/grid';
import { HouseCleaningOption, PostModel, WorkDay } from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  convertMinuteToHour,
  formatTimeRange,
  generateNext7Days,
  normalizeDate,
  normalizeDateTime,
} from '@/utils/dateUtil';
import { ButtonText, Button } from '@/components/ui/button';
import { Icon, CloseIcon } from '@/components/ui/icon';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
} from '@/components/ui/modal';
import { Center } from '../ui/center';
import { Badge, BadgeText } from '../ui/badge';
import { PostStatus, WorkType } from '@/constants';
import moment from 'moment';
import PostStatusBadge from './PostStatusBadge';
import { Divider } from '../ui/divider';

interface Props {
  posts: PostModel[];
}

const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts?.length > 0 ? (
        <ScrollView>
          <VStack className="m-3" space="md">
            {posts.map(post => (
              <Card key={post.id} className="rounded-xl shadow-lg">
                <Box className="flex flex-row items-center justify-between">
                  <VStack space="sm">
                    <Text className="font-semibold text-lg">
                      {WorkType[post.work.name as keyof typeof WorkType].value}
                    </Text>
                    <Text className="text-secondary-400">
                      Đăng ngày:{' '}
                      {moment(normalizeDateTime(post.createdAt))?.format(
                        'DD/MM/YYYY',
                      )}
                    </Text>
                  </VStack>
                  <PostStatusBadge status={post.status} />
                </Box>
                <Divider className="my-4" />
                <VStack space="md">
                  <HStack space="md" className="items-center">
                    <Text className="text-cyan-600">
                      <Ionicons size={20} name="calendar-outline" />
                    </Text>
                    <Text>{normalizeDate(post.workSchedules[0].date)}</Text>
                  </HStack>
                  <HStack space="md" className="items-center">
                    <Text className="text-info-500">
                      <Ionicons size={20} name="time-outline" />
                    </Text>
                    <Text>{`${convertMinuteToHour(
                      post.duration,
                    )}, ${formatTimeRange(
                      post.startTime,
                      post.duration,
                    )}`}</Text>
                  </HStack>
                  {post.work.name === WorkType.HOUSECLEANING.key && (
                    <HStack space="md" className="items-center">
                      <Text className="text-tertiary-600">
                        <Ionicons size={20} name="square-outline" />
                      </Text>
                      <Text>{post.houseCleaning?.area} m²</Text>
                    </HStack>
                  )}
                  {post.work.name === WorkType.BABYSITTING.key && (
                    <HStack space="md" className="items-center">
                      <Text className="text-tertiary-600">
                        <Ionicons size={20} name="happy-outline" />
                      </Text>
                      <Text>{post.babysitting?.numOfBaby} trẻ</Text>
                    </HStack>
                  )}
                  <HStack space="md" className="items-center">
                    <Text>
                      <Ionicons size={20} name="people-outline" />
                    </Text>
                    <Text>
                      {post.numOfFreelancer}/{post.totalFreelancer}
                    </Text>
                  </HStack>
                  <HStack space="md" className="items-center">
                    <Text className="text-red-600">
                      <Ionicons size={20} name="location-outline" />
                    </Text>
                    <Text>{post.address.detail}</Text>
                  </HStack>
                  <HStack space="md" className="items-center">
                    <Text className="text-green-600">
                      <Ionicons size={20} name="cash-outline" />
                    </Text>
                    <Text>{post.price.toLocaleString()} VND</Text>
                  </HStack>
                </VStack>
                {[
                  PostStatus.CANCELED.key,
                  PostStatus.COMPLETED.key,
                  PostStatus.FAILED.key,
                ].includes(post.status) && (
                  <Box>
                    <Divider className="my-4" />
                    <HStack reversed={true}>
                      <Pressable className="">
                        {({ pressed }) => (
                          <Text
                            className={`${
                              pressed ? 'text-green-800' : 'text-green-600'
                            } text-lg font-semibold`}
                          >
                            Đăng lại
                          </Text>
                        )}
                      </Pressable>
                    </HStack>
                  </Box>
                )}
              </Card>
            ))}
          </VStack>
        </ScrollView>
      ) : (
        <Box className="flex-1 justify-center items-center">
          <Text className="text-lg text-center">
            Bạn chưa có thông tin công việc
          </Text>
          <Text className="text-lg text-center">Hãy đăng công việc mới</Text>
        </Box>
      )}
    </>
  );
};

export default PostList;
