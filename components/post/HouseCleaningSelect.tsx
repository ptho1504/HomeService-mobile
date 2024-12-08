import React from 'react';

import { Heading } from '@/components/ui/heading';
import { Text } from '../ui/text';
import { Pressable, ScrollView } from 'react-native';
import { Card } from '../ui/card';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { HouseCleaningOption } from '@/types/postTypes';

export const houseCleaningOptions: HouseCleaningOption[] = [
  { area: 40, totalFreelancers: 1, duration: 2 },
  { area: 60, totalFreelancers: 2, duration: 3 },
  { area: 80, totalFreelancers: 2, duration: 4 },
  { area: 100, totalFreelancers: 3, duration: 3 },
  { area: 200, totalFreelancers: 4, duration: 6 },
  { area: 400, totalFreelancers: 4, duration: 8 },
];

interface Props {
  selectedOption: HouseCleaningOption;
  handleOptionSelect: (value: HouseCleaningOption) => void;
}

const HouseCleaningSelect = ({ selectedOption, handleOptionSelect }: Props) => {
  return (
    <Card size="md" variant="elevated">
      <VStack space="md">
        <Heading>Thời lượng và diện tích</Heading>
        <Text className="text-gray-500">
          Vui lòng ước tính chính xác diện tích cần dọn đẹp.
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <VStack space="sm">
            <HStack space="sm" className="justify-between items-center">
              {houseCleaningOptions.slice(0, 3).map((option, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleOptionSelect(option)}
                  className={`border rounded-lg p-4 ${
                    selectedOption === option
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <VStack>
                    <Text
                      size="lg"
                      className={`font-semibold ${
                        selectedOption === option ? 'text-green-600' : ''
                      }`}
                    >
                      Tối đa {option.area}m²
                    </Text>
                    <Text size="md" className="text-gray-500">
                      {option.totalFreelancers} người / {option.duration} giờ
                    </Text>
                  </VStack>
                </Pressable>
              ))}
            </HStack>
            <HStack space="sm" className="justify-between items-center">
              {houseCleaningOptions.slice(3).map((option, index) => (
                <Pressable
                  key={index + 3} // Đảm bảo key là duy nhất
                  onPress={() => handleOptionSelect(option)}
                  className={`border rounded-lg p-4 ${
                    selectedOption === option
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <VStack>
                    <Text
                      size="lg"
                      className={`font-semibold ${
                        selectedOption === option ? 'text-green-600' : ''
                      }`}
                    >
                      Tối đa {option.area}m²
                    </Text>
                    <Text size="md" className="text-gray-500">
                      {option.totalFreelancers} người / {option.duration} giờ
                    </Text>
                  </VStack>
                </Pressable>
              ))}
            </HStack>
          </VStack>
        </ScrollView>
      </VStack>
    </Card>
  );
};

export default HouseCleaningSelect;
