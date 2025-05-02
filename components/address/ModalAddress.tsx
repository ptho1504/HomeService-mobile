import React from "react";
import { Center } from "../ui/center";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../ui/modal";
import { Heading } from "../ui/heading";
import { CloseIcon, Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { Button, ButtonText } from "../ui/button";
import { router } from "expo-router";
import { i18n } from "@/localization";

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  onDelete: () => void;
}
const ModalAddress = ({ showModal, setShowModal, onDelete }: Props) => {
  const handleClose = () => setShowModal(false);

  const handleCancel = () => {
    handleClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };
  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-error-600">
              {i18n.t("st_confirm_delete")}
            </Heading>
            <ModalCloseButton onPress={handleClose}>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text size="sm" className="text-typography-500">
              {i18n.t("msg_confirm_delete_address")}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" action="secondary" onPress={handleCancel}>
              <ButtonText>{i18n.t("word_cancel")}</ButtonText>
            </Button>
            <Button onPress={handleDelete}>
              <ButtonText>{i18n.t("word_delete")}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};
export default ModalAddress;
