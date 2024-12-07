import React from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { PostModel } from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  convertMinuteToHour,
  formatTimeRange,
  normalizeDate,
  normalizeDateTime,
} from '@/utils/dateUtil';
import { PackageName, PostStatus, WorkType } from '@/constants';
import moment from 'moment';
import PostStatusBadge from '../badge/PostStatusBadge';
import { Divider } from '../ui/divider';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setPost } from '@/store/reducers';

interface Props {
  posts: PostModel[];
}

const PostList = ({ posts }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const navigateToPostDetail = (post: PostModel) => {
    dispatch(setPost(post));
    router.push('/(posts)/PostDetail');
  };

  return (
    <>
      {posts?.length > 0 ? (
        <ScrollView>
          <VStack className="m-3" space="md">
            {posts.map(post => (
              <Pressable
                onPress={() => navigateToPostDetail(post)}
                key={post.id}
              >
                {({ pressed }) => (
                  <Card
                    className={`rounded-xl shadow-lg ${
                      pressed && 'opacity-75'
                    }`}
                  >
                    <Box className="flex flex-row items-center justify-between">
                      <VStack space="sm">
                        <Text className="font-semibold text-lg">
                          {
                            WorkType[post.work.name as keyof typeof WorkType]
                              .value
                          }
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
                        <HStack space="sm">
                          {post.packageName !== PackageName._1DAY.key && (
                            <Text className="font-medium">
                              Ngày làm thứ {post.numOfWorkedDay + 1}/
                              {post.totalWorkDay}:
                            </Text>
                          )}
                          <Text>
                            {normalizeDate(
                              post.workSchedules[post.numOfWorkedDay].date,
                              '/',
                              false,
                            )}
                          </Text>
                        </HStack>
                      </HStack>
                      <HStack space="md" className="items-center">
                        <Text className="text-info-500">
                          <Ionicons size={20} name="time-outline" />
                        </Text>
                        <Text>{`${post.duration} giờ, ${formatTimeRange(
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
                        <Text className="flex-1">{post.address.detail}</Text>
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
                )}
              </Pressable>
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
