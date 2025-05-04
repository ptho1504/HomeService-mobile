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
import { i18n } from '@/localization';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/reducers';
import { router } from 'expo-router';

export const numsOfBaby: number[] = [1, 2, 3];

export const ageRange = [
  { key: 6, value: i18n.t('word_under_6_years') },
  { key: 11, value: i18n.t('word_under_6_yword_7_to_11_yearsears') },
];

export const babysittingDurations: number[] = [3, 4, 5, 6, 7, 8];

interface Props {
  canChange?: boolean;
}

const PostAddress = ({ canChange }: Props) => {
  const user = useSelector(selectUser);
  const address = user?.addresses.filter(addr => addr.default)[0];
  const navigateToAddress = () => {
    router.push('/(profile)/Address');
  };
  return (
    <Card size="md" variant="elevated" className="shadow-2xl">
      <VStack space="md">
        <Heading>{i18n.t('word_work_address')}</Heading>
        <VStack
          space="md"
          className="border p-4 rounded-lg border-secondary-50"
        >
          <HStack space="sm" className="items-center">
            <Text className="text-red-600 text-lg">
              <Ionicons name="location" size={24} />
            </Text>
            <Text className="font-medium text-lg">{address?.detail}</Text>
          </HStack>
          <HStack className="justify-between items-center">
            <HStack space="sm" className="items-center">
              <Text className="text-cyan-600 text-lg">
                <Ionicons name="person" size={24} />
              </Text>
              <VStack>
                <Text className="font-medium text-lg">
                  {address?.customerName}
                </Text>
                <Text>{address?.phoneNumber}</Text>
              </VStack>
            </HStack>
            {canChange && (
              <Button
                action="positive"
                className="rounded-2xl bg-success-300"
                size="sm"
                onPress={navigateToAddress}
              >
                <ButtonText>{i18n.t('word_change')}</ButtonText>
              </Button>
            )}
          </HStack>
        </VStack>
      </VStack>
    </Card>
  );
};

export default PostAddress;
