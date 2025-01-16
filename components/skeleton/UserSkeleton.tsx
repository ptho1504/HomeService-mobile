import React from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Card } from '@/components/ui/card';
import { Skeleton, SkeletonText } from '../ui/skeleton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Box } from '../ui/box';
import { HStack } from '../ui/hstack';
import { Image } from '../ui/image';
import { Text } from '../ui/text';

const UserSkeleton = () => {
  return (
    <ScrollView>
      <VStack className="m-3" space="md">
        <HStack
          space="md"
          className="align-middle bg-white p-3 shadow-lg rounded-xl items-center"
        >
          <Skeleton variant="circular" className="h-16 w-16" />
          <SkeletonText _lines={2} gap={4} className="h-4 w-2/3" />
        </HStack>
        <HStack
          space="md"
          className="align-middle bg-white p-3 shadow-lg rounded-xl items-center"
        >
          <Skeleton variant="circular" className="h-16 w-16" />
          <SkeletonText _lines={2} gap={4} className="h-4 w-2/3" />
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default UserSkeleton;
