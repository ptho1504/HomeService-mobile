import React, { useState } from 'react';

import { Heading } from '@/components/ui/heading';
import { Text } from '../ui/text';
import { Card } from '../ui/card';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { CreatePostModel, PostModel, TakePostModel } from '@/types/postTypes';
import { WorkType, PackageName, TakePostStatus } from '@/constants';
import PostStatusBadge from '../badge/PostStatusBadge';
import moment from 'moment';
import { normalizeDate, normalizeDateTime } from '@/utils/dateUtil';
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '../ui/modal';
import { CloseIcon, Icon } from '../ui/icon';
import { Pressable } from '../ui/pressable';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Box } from '../ui/box';
import WorkScheduleCalendar from '../date/WorkScheduleCalendar';
import { useGetFreelancerTakePostsQuery } from '@/services/post';
import { TouchableOpacity } from 'react-native';
import UserSkeleton from '../skeleton/UserSkeleton';
import { Image } from '../ui/image';

export const numsOfBaby: number[] = [1, 2, 3];

export const ageRange = [
  { key: 6, value: 'Dưới 6 tuổi' },
  { key: 11, value: '7 - 11 tuổi' },
];

export const babysittingDurations: number[] = [3, 4, 5, 6, 7, 8];

export const renderStar = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating); // Số ngôi sao đầy
  const hasHalfStar = rating % 1 !== 0; // Kiểm tra xem có nửa sao hay không

  // Thêm ngôi sao đầy
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Ionicons key={i} name="star" size={20} color="gold" />);
  }

  // Thêm nửa sao nếu có
  if (hasHalfStar) {
    stars.push(
      <Ionicons key={fullStars} name="star-half" size={20} color="gold" />,
    );
  }
  return stars;
};

interface Props {
  workType: string | string[];
  postForm: CreatePostModel | PostModel | null;
  showStatus?: boolean;
}

export function isPostModel(postForm: any): postForm is PostModel {
  return postForm && 'numOfWorkedDay' in postForm;
}

const FreelancerInfo = ({ workType, postForm, showStatus }: Props) => {
  const [showCalendarModal, setShowCalendarModal] = React.useState(false);
  const [freelancerTakePosts, setFreelancerTakePosts] =
    useState<TakePostModel>();

  const query = {
    id: isPostModel(postForm) ? postForm.id : '',
    takePostStatus: TakePostStatus.ACCEPTED.key,
  };

  const { data, error, isFetching, refetch } =
    useGetFreelancerTakePostsQuery(query);

  return (
    <>
      <Card size="md" variant="elevated" className="shadow-2xl">
        <VStack space="md">
          <Heading>Thông tin người làm</Heading>

          <VStack
            space="md"
            className="border p-4 rounded-lg border-secondary-50"
          >
            <HStack space="sm" className="items-center">
              <Text className="font-medium text-lg">Tự chọn freelancer: </Text>
              <Text className="text-lg">
                {postForm?.chooseFreelancer ? 'Có' : 'Không'}
              </Text>
            </HStack>

            <HStack space="sm" className="items-center">
              <Text className="font-medium text-lg">Số lượng freelancer: </Text>
              <Text className="text-lg">{postForm?.totalFreelancer}</Text>
            </HStack>
          </VStack>

          <Text className="font-medium text-lg">Danh sách người làm</Text>

          {isFetching ? (
            <UserSkeleton />
          ) : (
            <VStack space="md" className="">
              {data && data.items.length > 0 ? (
                data?.items.map(takePost => (
                  <Pressable
                    // onPress={() => navigateToPostDetail(convertToPost(post))}
                    key={takePost.id}
                    className="py-2"
                  >
                    {({ pressed }) => (
                      <Box
                        className={`rounded-xl border border-secondary-100 flex flex-row justify-between items-center p-3 bg-white ${
                          pressed && 'opacity-75'
                        }`}
                      >
                        <HStack space="md" className="items-center">
                          <Image
                            size="sm"
                            source={{
                              uri: `${
                                takePost.freelancer.avatar ??
                                'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
                              }`,
                            }}
                            alt={`${takePost.freelancer.name}`}
                            className="rounded-full"
                          />
                          <VStack space="sm">
                            <Text className="text-lg font-medium">
                              {takePost.freelancer.name}
                            </Text>
                            <HStack space="xs">{renderStar(4.55)}</HStack>
                          </VStack>
                        </HStack>
                        <Text className="text-secondary-400">
                          <Ionicons name="chevron-forward-outline" size={20} />
                        </Text>
                      </Box>
                    )}
                  </Pressable>
                ))
              ) : (
                <Text>Chưa có freelancer nhận công việc</Text>
              )}
            </VStack>
          )}
        </VStack>
      </Card>
    </>
  );
};

export default FreelancerInfo;
