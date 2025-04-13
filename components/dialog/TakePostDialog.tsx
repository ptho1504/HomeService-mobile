import React from "react";

import { Heading } from "@/components/ui/heading";
import { Text } from "../ui/text";
import { Card } from "../ui/card";
import { Grid, GridItem } from "../ui/grid";
import { VStack } from "../ui/vstack";
import { Package } from "@/types/postTypes";
import { isLoading } from "expo-font";
import { Mode } from "../list/PostList";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { ButtonText, ButtonSpinner, Button } from "../ui/button";
import { i18n } from "@/localization";

interface Props {
  showAlertDialog: boolean;
  setShowAlertDialog: (value: boolean) => void;
  mode: string;
  handleTakePost: () => void;
  isLoading: boolean;
}

const TakePostDialog = ({
  showAlertDialog,
  setShowAlertDialog,
  mode,
  handleTakePost,
  isLoading,
}: Props) => {
  const handleClose = () => setShowAlertDialog(false);

  return (
    <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="md">
            {i18n.t("word_confirm_action")}{" "}
            {Mode[mode as keyof typeof Mode].value} {i18n.t("word_job_this")}
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          <Text>{Mode[mode as keyof typeof Mode].description}</Text>
        </AlertDialogBody>
        <AlertDialogFooter className="">
          <Button variant="outline" action="secondary" onPress={handleClose}>
            <ButtonText>{i18n.t("word_cancel")}</ButtonText>
          </Button>
          <Button
            onPress={handleTakePost}
            action={mode === Mode.REJECT.key ? "negative" : "positive"}
          >
            {isLoading && <ButtonSpinner className="text-secondary-50" />}
            <ButtonText>{i18n.t("word_confirm")}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TakePostDialog;
