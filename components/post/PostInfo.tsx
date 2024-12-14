import React, { useState } from 'react';

import { Heading } from '@/components/ui/heading';
import { Text } from '../ui/text';
import { Card } from '../ui/card';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { CreatePostModel, PostModel } from '@/types/postTypes';
import { WorkType, PackageName } from '@/constants';
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

export const numsOfBaby: number[] = [1, 2, 3];

export const ageRange = [
  { key: 6, value: 'Dưới 6 tuổi' },
  { key: 11, value: '7 - 11 tuổi' },
];

export const babysittingDurations: number[] = [3, 4, 5, 6, 7, 8];

interface Props {
  workType: string | string[];
  postForm: CreatePostModel | PostModel | null;
  showStatus?: boolean;
}

export function isPostModel(postForm: any): postForm is PostModel {
  return postForm && 'numOfWorkedDay' in postForm;
}

const PostInfo = ({ workType, postForm, showStatus }: Props) => {
  const [showCalendarModal, setShowCalendarModal] = React.useState(false);

  return (
    <>
      <Card size="md" variant="elevated" className="shadow-2xl">
        <VStack space="md">
          <Heading>Thông tin chi tiết</Heading>
          <VStack
            space="md"
            className="border p-4 rounded-lg border-secondary-50"
          >
            <HStack space="sm" className="items-center">
              <Text className="font-medium text-lg">Loại công việc: </Text>
              <Text className="text-lg">
                {WorkType[workType as keyof typeof WorkType].value}
              </Text>
            </HStack>
            {workType === WorkType.BABYSITTING.key ? (
              <HStack space="sm" className="items-center">
                <Text className="font-medium text-lg">Số trẻ:</Text>
                <Text className="text-lg">
                  {postForm?.babysitting?.numOfBaby} trẻ
                </Text>
              </HStack>
            ) : (
              <HStack space="sm" className="items-center">
                <Text className="font-medium text-lg">Diện tích:</Text>
                <Text className="text-lg">
                  {postForm?.houseCleaning?.area} m²
                </Text>
              </HStack>
            )}

            <HStack space="sm" className="items-center">
              <Text className="font-medium text-lg">Thời lượng:</Text>
              <Text className="text-lg">
                {workType === WorkType.BABYSITTING.key
                  ? `${postForm?.duration} giờ`
                  : `${postForm?.totalFreelancer} người/${postForm?.duration} giờ`}
              </Text>
            </HStack>
            <HStack space="sm" className="items-center">
              <Text className="font-medium text-lg">Loại gói:</Text>
              <Text className="text-lg">
                {
                  PackageName[postForm?.packageName as keyof typeof PackageName]
                    .value
                }
                {postForm?.packageName !== PackageName._1DAY.key &&
                  ` (${postForm?.totalWorkDay} ngày làm)`}
              </Text>
            </HStack>
            <HStack space="sm" className="items-center">
              <Text className="font-medium text-lg">{`Ngày làm sắp tới${
                postForm?.packageName !== PackageName._1DAY.key &&
                isPostModel(postForm)
                  ? ' (' +
                    (postForm.numOfWorkedDay + 1) +
                    '/' +
                    postForm?.totalWorkDay +
                    ')'
                  : ''
              }:`}</Text>
              <Text className="text-lg">
                {normalizeDate(postForm?.workSchedules[0].date, '/', false)}
              </Text>
            </HStack>
            <HStack space="sm" className="items-center">
              <Text className="font-medium text-lg">Giờ bắt đầu làm:</Text>
              <Text className="text-lg">{postForm?.startTime}</Text>
            </HStack>
            {showStatus && (
              <HStack space="sm" className="items-center">
                <Text className="font-medium text-lg">Trạng thái:</Text>
                <PostStatusBadge status={(postForm as PostModel).status} />
              </HStack>
            )}
          </VStack>
          {postForm?.packageName !== PackageName._1DAY.key && (
            <Pressable onPress={() => setShowCalendarModal(true)}>
              {({ pressed }) => (
                <Box
                  className={`flex flex-row justify-between items-center p-2 border border-gray-400 rounded-lg ${
                    pressed && 'opacity-50'
                  }`}
                >
                  <HStack space="md" className="items-center">
                    <Text className="text-cyan-600">
                      <Ionicons size={20} name="calendar-outline" />
                    </Text>
                    <Text className="font-medium text-lg text-cyan-600">
                      Xem lịch làm việc
                    </Text>
                  </HStack>
                  <Text className="">
                    <Ionicons size={20} name="chevron-forward-outline" />
                  </Text>
                </Box>
              )}
            </Pressable>
          )}
        </VStack>
      </Card>
      {postForm?.workSchedules && (
        <Modal
          isOpen={showCalendarModal}
          onClose={() => {
            setShowCalendarModal(false);
          }}
          size="md"
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="md" className="text-typography-950">
                Lịch làm việc của gói
              </Heading>
              <ModalCloseButton
                onPress={() => {
                  setShowCalendarModal(false);
                }}
              >
                <Icon
                  as={CloseIcon}
                  size="md"
                  className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <WorkScheduleCalendar workSchedules={postForm?.workSchedules} />
            </ModalBody>
            <ModalFooter className="justify-start">
              <VStack space="md">
                <Text className="font-medium">Trạng thái làm việc</Text>
                <Box className="flex w-full flex-row justify-between items-center">
                  <HStack className="items-center" space="xs">
                    <Box className="rounded-full bg-secondary-200 w-4 h-4"></Box>
                    <Text className="">Chưa làm</Text>
                  </HStack>
                  <HStack className="items-center" space="xs">
                    <Box className="rounded-full bg-green-500 w-4 h-4"></Box>
                    <Text className="">Thành công</Text>
                  </HStack>
                  <HStack className="items-center" space="xs">
                    <Box className="rounded-full bg-error-500 w-4 h-4"></Box>
                    <Text className="">Thất bại</Text>
                  </HStack>
                </Box>
              </VStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default PostInfo;
