import React, { useState } from 'react';

import { Heading } from '@/components/ui/heading';
import { Text } from '../ui/text';
import { Pressable, ScrollView } from 'react-native';
import { Card } from '../ui/card';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { HouseCleaningOption } from '@/types/postTypes';
import { Grid, GridItem } from '../ui/grid';

export const numsOfBaby: number[] = [1, 2, 3];

export const ageRange = [
  { key: 6, value: 'Dưới 6 tuổi' },
  { key: 11, value: '7 - 11 tuổi' },
];

export const babysittingDurations: number[] = [3, 4, 5, 6, 7, 8];

interface Props {
  duration: number;
  handleSelectDuration: (value: number) => void;
  numOfBaby: number;
  handleSelectNumOfBaby: (value: number) => void;
  ages: number[];
  handleAddBaby: (i: number, age: number) => void;
}

const Babysitting = ({
  duration,
  handleSelectDuration,
  numOfBaby,
  handleSelectNumOfBaby,
  ages,
  handleAddBaby,
}: Props) => {
  return (
    <>
      <Card size="md" variant="elevated">
        <VStack space="md">
          <Heading>Số lượng trẻ</Heading>
          <VStack space="md">
            <Grid
              className="gap-4"
              _extra={{
                className: 'grid-cols-10',
              }}
            >
              {numsOfBaby.map((option, index) => (
                <GridItem
                  key={index}
                  _extra={{
                    className: 'col-span-3',
                  }}
                >
                  <Pressable
                    key={index}
                    onPress={() => handleSelectNumOfBaby(option)}
                    className={`border rounded-lg py-4 px-6 ${
                      numOfBaby === option
                        ? 'border-success-400 bg-success-0'
                        : 'border-gray-400 bg-white'
                    }`}
                  >
                    <Text
                      size="lg"
                      className={`font-semibold ${
                        numOfBaby === option ? 'text-success-400' : ''
                      }`}
                    >
                      {option} trẻ
                    </Text>
                  </Pressable>
                </GridItem>
              ))}
            </Grid>
            <VStack space="md">
              {Array.from({ length: numOfBaby }, (_, childIndex) => (
                <VStack key={childIndex} space="md">
                  <Text className="text-lg font-semibold">
                    Độ tuổi trẻ {childIndex + 1}:
                  </Text>
                  <Grid
                    className="gap-4"
                    _extra={{
                      className: 'grid-cols-10',
                    }}
                  >
                    {ageRange.map((age, index) => (
                      <GridItem
                        key={index}
                        _extra={{
                          className: 'col-span-4',
                        }}
                      >
                        <Pressable
                          onPress={() => handleAddBaby(childIndex, age.key)}
                          className={`border rounded-lg py-4 px-6 ${
                            ages[childIndex] === age.key
                              ? 'border-success-400 bg-success-0'
                              : 'border-gray-400 bg-white'
                          }`}
                        >
                          <Text
                            size="lg"
                            className={`font-semibold ${
                              ages[childIndex] === age.key
                                ? 'text-success-400'
                                : ''
                            }`}
                          >
                            {age.value}
                          </Text>
                        </Pressable>
                      </GridItem>
                    ))}
                  </Grid>
                </VStack>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </Card>
      <Card size="md" variant="elevated">
        <VStack space="md">
          <Heading>Thời lượng</Heading>
          <VStack space="sm">
            <Grid
              className="gap-4"
              _extra={{
                className: 'grid-cols-10',
              }}
            >
              {babysittingDurations.map((option, index) => (
                <GridItem
                  key={index}
                  _extra={{
                    className: 'col-span-3',
                  }}
                >
                  <Pressable
                    key={index}
                    onPress={() => handleSelectDuration(option)}
                    className={`border rounded-lg p-4 ${
                      duration === option
                        ? 'border-success-400 bg-success-0'
                        : 'border-gray-400 bg-white'
                    }`}
                  >
                    <VStack>
                      <Text
                        size="lg"
                        className={`font-semibold ${
                          duration === option ? 'text-success-400' : ''
                        }`}
                      >
                        {option} giờ
                      </Text>
                    </VStack>
                  </Pressable>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </VStack>
      </Card>
    </>
  );
};

export default Babysitting;
