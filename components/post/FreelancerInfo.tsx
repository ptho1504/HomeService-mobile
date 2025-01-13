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

const FreelancerInfo = ({ workType, postForm, showStatus }: Props) => {
  const [showCalendarModal, setShowCalendarModal] = React.useState(false);

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
        </VStack>
      </Card>
    </>
  );
};

export default FreelancerInfo;
