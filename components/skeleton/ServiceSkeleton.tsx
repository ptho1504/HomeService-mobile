import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { ScrollView } from "react-native";
import { VStack } from "../ui/vstack";

const ServiceSkeleton = () => {
  return (
    <ScrollView>
      <VStack className="m-3">
        <VStack className="p-5 mb-5 rounded-lg w-full shadow-sm bg-white">
          <Skeleton
            variant="rounded"
            className="mb-6 w-full h-[200px] rounded-md"
          />
          <VStack space="sm">
            <SkeletonText _lines={1} className="h-6 w-3/5" />
            <SkeletonText _lines={1} className="h-4 w-2/5" />
          </VStack>
        </VStack>

        <VStack className="p-5 mb-5 rounded-lg w-full shadow-sm bg-white">
          <Skeleton
            variant="rounded"
            className="mb-6 w-full h-[200px] rounded-md"
          />
          <VStack space="sm">
            <SkeletonText _lines={1} className="h-6 w-3/5" />
            <SkeletonText _lines={1} className="h-4 w-2/5" />
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default ServiceSkeleton;
