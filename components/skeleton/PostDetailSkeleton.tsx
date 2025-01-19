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

const PostDetailSkeleton = () => {
  return (
    <ScrollView>
      <VStack className="m-3" space="md">
        <VStack space="md" className="bg-white p-3 shadow-lg rounded-xl">
          <Skeleton className="h-8 w-2/3" />
          <SkeletonText _lines={7} className="h-4" />
        </VStack>
        <VStack space="md" className="bg-white p-3 shadow-lg rounded-xl">
          <Skeleton className="h-8 w-2/3" />
          <SkeletonText _lines={3} className="h-4" />
        </VStack>
        <VStack space="md" className="bg-white p-3 shadow-lg rounded-xl">
          <Skeleton className="h-8 w-2/3" />
          <SkeletonText _lines={5} className="h-4" />
        </VStack>
        <VStack space="md" className="bg-white p-3 shadow-lg rounded-xl">
          <Skeleton className="h-8 w-2/3" />
          <SkeletonText _lines={3} className="h-4" />
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default PostDetailSkeleton;
