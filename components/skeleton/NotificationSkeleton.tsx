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

const NotificationSkeleton = () => {
  return (
    <ScrollView>
      <VStack className="m-3" space="md">
        <VStack space="sm" className="bg-white p-3 shadow-lg rounded-xl">
          <Skeleton className="h-6" />
          <SkeletonText _lines={1} className="h-4" />
          <SkeletonText _lines={1} className="h-4 w-2/3" />
        </VStack>
        <VStack space="sm" className="bg-white p-3 shadow-lg rounded-xl">
          <Skeleton className="h-6" />
          <SkeletonText _lines={1} className="h-4" />
          <SkeletonText _lines={1} className="h-4 w-2/3" />
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default NotificationSkeleton;
