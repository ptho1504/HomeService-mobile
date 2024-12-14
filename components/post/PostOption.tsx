import React from 'react';

import { Heading } from '@/components/ui/heading';
import { Text } from '../ui/text';
import { Pressable, Switch } from 'react-native';
import { Card } from '../ui/card';
import { Grid, GridItem } from '../ui/grid';
import { VStack } from '../ui/vstack';
import { Package } from '@/types/postTypes';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HStack } from '../ui/hstack';

interface Props {
  chooseFreelancers: boolean;
  toggleSwitch: (value: boolean) => void;
}

const PostOption = ({ chooseFreelancers, toggleSwitch }: Props) => {
  return (
    <Card size="md" variant="elevated">
      <VStack space="md">
        <Heading>Tùy chọn</Heading>

        <VStack space="lg">
          <HStack space="sm" className="items-center justify-between">
            <HStack space="sm" className="items-center">
              <Text className="text-success-400 text-md">
                <Ionicons name="people-outline" size={24} />
              </Text>
              <Text className="text-lg font-medium">Tự chọn freelancers</Text>

              <Text className="text-success-400 text-md">
                <Ionicons name="help-circle-outline" size={16} />
              </Text>
            </HStack>

            <Switch
              trackColor={{ false: '#767577', true: '#D1FAE5' }}
              thumbColor={chooseFreelancers ? '#22C55E' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={chooseFreelancers}
            />
          </HStack>
        </VStack>
      </VStack>
    </Card>
  );
};

export default PostOption;
