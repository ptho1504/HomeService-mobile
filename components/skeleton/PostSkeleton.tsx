import React from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Card } from '@/components/ui/card';
import { Skeleton, SkeletonText } from '../ui/skeleton';

const PostSkeleton = () => {
  return (
    <ScrollView>
      <VStack className="m-3" space="md">
        <Card className="rounded-xl shadow-lg">
          <VStack space="md">
            <Skeleton variant="rounded" className="h-20" />
            <SkeletonText _lines={5} className="h-5" />
          </VStack>
        </Card>
        <Card className="rounded-xl shadow-lg">
          <VStack space="md">
            <Skeleton variant="rounded" className="h-20" />
            <SkeletonText _lines={5} className="h-5" />
          </VStack>
        </Card>
      </VStack>
    </ScrollView>
  );
};

export default PostSkeleton;
