import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Heading } from '@/components/ui/heading';
import { Grid, GridItem } from '@/components/ui/grid';
import { HouseCleaningOption, WorkDay } from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import { generateNext7Days } from '@/utils/dateUtil';
import { ButtonText, Button } from '@/components/ui/button';
import { Icon, CloseIcon } from '@/components/ui/icon';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
} from '@/components/ui/modal';
import { Center } from '../ui/center';

interface Props {
  showPickerModal: boolean;
  setShowPickerModal: (value: boolean) => void;
  selectedHour: number;
  setSelectedHour: (value: number) => void;
  setSelectedMinute: (value: number) => void;
  selectedMinute: number;
}

const ScrollPickerModal = ({
  showPickerModal,
  setShowPickerModal,
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
}: Props) => {
  const hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  const minutes: number[] = Array.from({ length: 60 }, (_, i) => i);

  const handleApplyTime = () => {
    setShowPickerModal(false);
  };

  return (
    <Modal
      isOpen={showPickerModal}
      onClose={() => {
        setShowPickerModal(false);
      }}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            Chọn giờ làm
          </Heading>
        </ModalHeader>
        <ModalBody>
          <HStack space="xl">
            <ScrollPicker
              dataSource={hours}
              selectedIndex={hours.findIndex(value => value === selectedHour)}
              onValueChange={(data, selectedIndex) => {
                setSelectedHour(hours[selectedIndex]);
              }}
              wrapperHeight={180}
              wrapperBackground="#FFFFFF"
              itemHeight={60}
              highlightColor="#d8d8d8"
              highlightBorderWidth={2}
            />
            <ScrollPicker
              dataSource={minutes}
              selectedIndex={minutes.findIndex(
                value => value === selectedMinute,
              )}
              onValueChange={(data, selectedIndex) => {
                setSelectedMinute(minutes[selectedIndex]);
              }}
              wrapperHeight={180}
              wrapperBackground="#FFFFFF"
              itemHeight={60}
              highlightColor="#d8d8d8"
              highlightBorderWidth={2}
            />
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={() => {
              setShowPickerModal(false);
            }}
          >
            <ButtonText>Hủy</ButtonText>
          </Button>
          <Button
            className="bg-green-600"
            action="positive"
            onPress={handleApplyTime}
          >
            <ButtonText>Áp dụng</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScrollPickerModal;
