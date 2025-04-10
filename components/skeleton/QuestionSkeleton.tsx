import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { ScrollView } from "react-native";
import { VStack } from "../ui/vstack";

const QuestionSkeleton = () => {
  return (
    <ScrollView>
      <VStack className="m-1" space="md">
        <VStack space="sm" className="p-3 rounded-xl mb-4">
          <SkeletonText _lines={1} className="h-4 w-full" />
          <SkeletonText _lines={1} className="h-4 w-3/4" />
          <VStack className="mt-3" space="md">
            <Box className="p-3 bg-white rounded-xl">
              <Skeleton variant="rounded" className="h-6 w-3/5" />
            </Box>
            <Box className="p-3 bg-white rounded-xl">
              <Skeleton variant="rounded" className="h-6 w-2/5" />
            </Box>
            <Box className="p-3 bg-white rounded-xl">
              <Skeleton variant="rounded" className="h-6 w-4/5" />
            </Box>
            <Box className="p-3 bg-white rounded-xl">
              <Skeleton variant="rounded" className="h-6 w-5/6" />
            </Box>
          </VStack>
        </VStack>
        <VStack space="sm" className="p-3 rounded-xl mb-4">
          <SkeletonText _lines={1} className="h-4 w-full" />
          <SkeletonText _lines={1} className="h-4 w-1/6" />
          <VStack className="mt-3" space="md">
            <Box className="p-3 bg-white rounded-xl">
              <Skeleton variant="rounded" className="h-6 w-3/4" />
            </Box>
            <Box className="p-3 bg-white rounded-xl">
              <Skeleton variant="rounded" className="h-6 w-2/5" />
            </Box>
            <Box className="p-3 bg-white rounded-xl">
              <Skeleton variant="rounded" className="h-6 w-2/6" />
            </Box>
            <Box className="p-3 bg-white rounded-xl">
              <Skeleton variant="rounded" className="h-6 w-4/6" />
            </Box>
          </VStack>
        </VStack>

      </VStack>
    </ScrollView>
  );
};

export default QuestionSkeleton;
