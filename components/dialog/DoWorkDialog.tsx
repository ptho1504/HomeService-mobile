import React from 'react';

import { Heading } from '@/components/ui/heading';
import { Text } from '../ui/text';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '../ui/alert-dialog';
import { ButtonText, ButtonSpinner, Button } from '../ui/button';
import { i18n } from '@/localization';

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
            {workType === 'start'
              ? i18n.t('st_confirm_start_work')
              : i18n.t('st_confirm_end_work')}
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          <Text>
            {workType === 'start'
              ? i18n.t('st_confirm_start_job')
              : i18n.t('st_confirm_finish_job')}
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter className="">
          <Button variant="outline" action="secondary" onPress={handleClose}>
            <ButtonText>{i18n.t('word_cancel')}</ButtonText>
          </Button>
          <Button onPress={handleUploadImages} action="positive">
            {isLoading && <ButtonSpinner className="text-secondary-50" />}
            <ButtonText>{i18n.t('word_confirm')}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DoWorkDialog;
