import React from 'react';

import { Heading } from '@/components/ui/heading';
import { Text } from '../ui/text';
import { Pressable } from 'react-native';
import { Card } from '../ui/card';
import { Grid, GridItem } from '../ui/grid';
import { VStack } from '../ui/vstack';
import { Package } from '@/types/postTypes';

export const packages: Package[] = [
  {
    key: '_1DAY',
    value: 'Gói lẻ',
    month: 0,
  },
  {
    key: '_1MONTH',
    value: '1 tháng',
    month: 1,
  },
  {
    key: '_2MONTH',
    value: '2 tháng',
    month: 2,
  },
  {
    key: '_3MONTH',
    value: '3 tháng',
    month: 3,
  },
];

interface Props {
  selectedPackage: Package;
  handlePackageSelect: (value: Package) => void;
}

const PackageSelect = ({ selectedPackage, handlePackageSelect }: Props) => {
  return (
    <Card size="md" variant="elevated">
      <VStack space="md">
        <Heading>Loại gói</Heading>

        <Grid
          className="gap-4"
          _extra={{
            className: 'grid-cols-12',
          }}
        >
          {packages.map((pack, index) => (
            <GridItem
              key={index}
              _extra={{
                className: 'col-span-5',
              }}
            >
              <Pressable
                onPress={() => handlePackageSelect(pack)}
                className={`border rounded-lg p-4 ${
                  selectedPackage === pack
                    ? 'border-success-400 bg-success-0'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Text
                  size="lg"
                  className={`font-semibold ${
                    selectedPackage === pack ? 'text-success-400' : ''
                  }`}
                >
                  {pack.value}
                </Text>
              </Pressable>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Card>
  );
};

export default PackageSelect;
