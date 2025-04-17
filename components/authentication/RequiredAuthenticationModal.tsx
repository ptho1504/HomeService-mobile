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
}

const RequiredAuthenticationModal = ({ showModal, setShowModal }: Props) => {
  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          router.push("/(customer)/(home)");
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-error-600">
              {i18n.t("st_system_error")}
            </Heading>
            <ModalCloseButton
              onPress={() => {
                router.push("/(customer)/(home)");
                setShowModal(false);
              }}
            >
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text size="sm" className="text-typography-500">
              {i18n.t("word_require_login")}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                router.push("/(customer)/(home)");
                setShowModal(false);
              }}
            >
              <ButtonText>{i18n.t("word_cancel")}</ButtonText>
            </Button>
            <Button
              onPress={() => {
                router.push("/(auth)/log-in");
                setShowModal(false);
              }}
            >
              <ButtonText>{i18n.t("login")}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default RequiredAuthenticationModal;
