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
import { Divider } from '../ui/divider';

const PaymentHistorySkeleton = () => {
  return (
    <VStack space="lg">
      <VStack space="lg">
        <Divider></Divider>
        <Box className="flex flex-row justify-between items-center">
          <Box className="w-1/2">
            <SkeletonText _lines={2} gap={4} className="h-4" />
          </Box>
          <Box className="w-1/3">
            <SkeletonText _lines={1} className="h-4" />
          </Box>
        </Box>
      </VStack>
      <VStack space="md">
        <Divider></Divider>
        <Box className="flex flex-row justify-between items-center">
          <Box className="w-1/2">
            <SkeletonText _lines={2} gap={4} className="h-4" />
          </Box>
          <Box className="w-1/3">
            <SkeletonText _lines={1} className="h-4" />
          </Box>
        </Box>
      </VStack>
    </VStack>
  );
};

export default PaymentHistorySkeleton;
