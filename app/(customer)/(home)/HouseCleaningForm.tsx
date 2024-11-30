import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Heading } from '@/components/ui/heading';
import { Grid, GridItem } from '@/components/ui/grid';
import { HouseCleaningOption } from '@/types/postTypes';
import { Box } from '@/components/ui/box';

const options: HouseCleaningOption[] = [
  { area: 60, totalFreelancers: 2, duration: 3 },
  { area: 80, totalFreelancers: 2, duration: 4 },
  { area: 100, totalFreelancers: 3, duration: 3 },
  { area: 150, totalFreelancers: 3, duration: 4 },
  { area: 200, totalFreelancers: 4, duration: 6 },
  { area: 400, totalFreelancers: 4, duration: 8 },
];

const HouseCleaningForm = () => {
  const [selectedOption, setSelectedOption] = useState<HouseCleaningOption>(
    options[0],
  );

  const handleOptionSelect = (option: HouseCleaningOption) => {
    console.info({ option });
    setSelectedOption(option);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Box className="overflow-y-auto">
          <Card size="md" variant="elevated" className="m-3">
            <VStack space="md">
              <Heading>Thời lượng</Heading>
              <Text className="text-gray-500">
                Vui lòng ước tính chính xác diện tích cần dọn đẹp.
              </Text>
              <Grid
                className="gap-4"
                _extra={{
                  className: 'grid-cols-12',
                }}
              >
                {options.map((option, index) => (
                  <GridItem
                    key={index}
                    _extra={{
                      className: 'col-span-5',
                    }}
                  >
                    <Pressable
                      onPress={() => handleOptionSelect(option)}
                      className={`border rounded-lg p-4 ${
                        selectedOption === option
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      <VStack className="">
                        <Text
                          size="lg"
                          className={`font-semibold ${
                            selectedOption === option ? 'text-green-600' : ''
                          }`}
                        >
                          Tối đa {option.area}m²
                        </Text>
                        <Text size="md" className="text-gray-500">
                          {option.totalFreelancers} người / {option.duration}{' '}
                          giờ
                        </Text>
                      </VStack>
                    </Pressable>
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          </Card>
          <Card size="md" variant="elevated" className="m-3">
            <VStack space="md">
              <Heading>Thời gian làm việc</Heading>
              <Text className="text-gray-500">
                Vui lòng ước tính chính xác diện tích cần dọn đẹp.
              </Text>
              <Grid
                className="gap-4"
                _extra={{
                  className: 'grid-cols-12',
                }}
              >
                {options.map((option, index) => (
                  <GridItem
                    key={index}
                    _extra={{
                      className: 'col-span-5',
                    }}
                  >
                    <Pressable
                      onPress={() => handleOptionSelect(option)}
                      className={`border rounded-lg p-4 ${
                        selectedOption === option
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      <VStack className="">
                        <Text
                          size="lg"
                          className={`font-semibold ${
                            selectedOption === option ? 'text-green-600' : ''
                          }`}
                        >
                          Tối đa {option.area}m²
                        </Text>
                        <Text size="md" className="text-gray-500">
                          {option.totalFreelancers} người / {option.duration}{' '}
                          giờ
                        </Text>
                      </VStack>
                    </Pressable>
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          </Card>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HouseCleaningForm;
