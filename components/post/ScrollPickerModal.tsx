import React, { useEffect, useState } from 'react';

import { HStack } from '@/components/ui/hstack';

import { Heading } from '@/components/ui/heading';

import { ButtonText, Button } from '@/components/ui/button';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
} from '@/components/ui/modal';

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
  const hours: number[] = Array.from({ length: 19 - 7 + 1 }, (_, i) => i + 7);
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
            className="bg-success-400"
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
