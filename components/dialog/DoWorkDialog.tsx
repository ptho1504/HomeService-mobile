import React from 'react';

import { Heading } from '@/components/ui/heading';
import { Text } from '../ui/text';
import { Card } from '../ui/card';
import { Grid, GridItem } from '../ui/grid';
import { VStack } from '../ui/vstack';
import { Package } from '@/types/postTypes';
import { isLoading } from 'expo-font';
import { Mode } from '../activity/PostList';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '../ui/alert-dialog';
import { ButtonText, ButtonSpinner, Button } from '../ui/button';

interface Props {
  showAlertDialog: boolean;
  setShowAlertDialog: (value: boolean) => void;
  workType: string;
  handleUploadImages: () => void;
  isLoading: boolean;
}

const DoWorkDialog = ({
  showAlertDialog,
  setShowAlertDialog,
  workType,
  handleUploadImages,
  isLoading,
}: Props) => {
  const handleClose = () => setShowAlertDialog(false);

  return (
    <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="md">
            Bạn có muốn {workType === 'start' ? 'bắt đầu' : 'kết thúc'} công
            việc này?
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          <Text>
            Vui lòng xác nhận để{' '}
            {workType === 'start' ? 'bắt đầu' : 'hoàn thành'} công việc
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter className="">
          <Button variant="outline" action="secondary" onPress={handleClose}>
            <ButtonText>Hủy</ButtonText>
          </Button>
          <Button onPress={handleUploadImages} action="positive">
            {isLoading && <ButtonSpinner className="text-secondary-50" />}
            <ButtonText>Đồng ý</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DoWorkDialog;
