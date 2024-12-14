import React, { useState } from 'react';

import { Heading } from '@/components/ui/heading';
import { Text } from '../ui/text';
import { Card } from '../ui/card';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { CreatePostModel, PostModel } from '@/types/postTypes';
import { WorkType, PackageName } from '@/constants';
import PostStatusBadge from '../badge/PostStatusBadge';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, ButtonText } from '../ui/button';

export const numsOfBaby: number[] = [1, 2, 3];

export const ageRange = [
  { key: 6, value: 'Dưới 6 tuổi' },
  { key: 11, value: '7 - 11 tuổi' },
];

export const babysittingDurations: number[] = [3, 4, 5, 6, 7, 8];

interface Props {
  canChange?: boolean;
}

const PostAddress = ({ canChange }: Props) => {
  return (
    <Card size="md" variant="elevated" className="shadow-2xl">
      <VStack space="md">
        <Heading>Địa chỉ làm việc</Heading>
        <VStack
          space="md"
          className="border p-4 rounded-lg border-secondary-50"
        >
          <HStack space="sm" className="items-center">
            <Text className="text-red-600 text-lg">
              <Ionicons name="location" size={24} />
            </Text>
            <Text className="font-medium text-lg">
              Phước Tân, Biên Hòa, Đồng Nai
            </Text>
          </HStack>
          <HStack className="justify-between items-center">
            <HStack space="sm" className="items-center">
              <Text className="text-cyan-600 text-lg">
                <Ionicons name="person" size={24} />
              </Text>
              <VStack>
                <Text className="font-medium text-lg">Nguyễn Đại Tiến</Text>
                <Text>0346066323</Text>
              </VStack>
            </HStack>
            {canChange && (
              <Button
                action="positive"
                className="rounded-2xl bg-success-300"
                size="sm"
              >
                <ButtonText>Thay đổi</ButtonText>
              </Button>
            )}
          </HStack>
        </VStack>
      </VStack>
    </Card>
  );
};

export default PostAddress;
