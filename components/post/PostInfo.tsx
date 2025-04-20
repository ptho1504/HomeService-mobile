import React, { useState } from "react";

import { Heading } from "@/components/ui/heading";
import { Text } from "../ui/text";
import { Card } from "../ui/card";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import { CreatePostModel, PostModel } from "@/types/postTypes";
import { WorkType, PackageName } from "@/constants";
import PostStatusBadge from "../badge/PostStatusBadge";
import moment from "moment";
import { normalizeDate, normalizeDateTime } from "@/utils/dateUtil";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../ui/modal";
import { CloseIcon, Icon } from "../ui/icon";
import { Pressable } from "../ui/pressable";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Box } from "../ui/box";
import WorkScheduleCalendar from "../date/WorkScheduleCalendar";
import { i18n } from "@/localization";

export const numsOfBaby: number[] = [1, 2, 3];

export const ageRange = [
  { key: 6, value: i18n.t("word_under_6_years") },
  { key: 11, value: i18n.t("word_under_6_yword_7_to_11_yearsears") },
];

export const babysittingDurations: number[] = [3, 4, 5, 6, 7, 8];

interface Props {
  workType: string | string[];
  postForm: CreatePostModel | PostModel | null;
  showStatus?: boolean;
}

export function isPostModel(postForm: any): postForm is PostModel {
  return postForm && "numOfWorkedDay" in postForm;
}

const PostInfo = ({ workType, postForm, showStatus }: Props) => {
  const [showCalendarModal, setShowCalendarModal] = React.useState(false);

  return (
    <>
      <Card size="md" variant="elevated" className="shadow-2xl">
        <VStack space="md">
          <Heading>{i18n.t("word_detail_information")}</Heading>
          <VStack
            space="md"
            className="border p-4 rounded-lg border-secondary-50"
          >
            <HStack space="sm" className="items-center">
              <Text className="font-medium text-lg">
                {i18n.t("word_job_type")}:
              </Text>
              <Text className="text-lg">
                {WorkType[workType as keyof typeof WorkType].value}
              </Text>
            </HStack>
            {workType === WorkType.BABYSITTING.key ? (
              <HStack space="sm" className="items-center">
                <Text className="font-medium text-lg">
                  {i18n.t("word_children_quantity")}:
                </Text>
                <Text className="text-lg">
                  {postForm?.babysitting?.numOfBaby}{" "}
                  {postForm?.babysitting?.numOfBaby === 1
                    ? i18n.t("word_baby_unit")
                    : i18n.t("word_baby_unit_s")}
                </Text>
              </HStack>
            ) : (
              <HStack space="sm" className="items-center">
                <Text className="font-medium text-lg">
                  {i18n.t("word_area")}:
                </Text>
                <Text className="text-lg">
                  {postForm?.houseCleaning?.area} m²
                </Text>
              </HStack>
            )}

            <HStack space="sm" className="items-center">
              <Text className="font-medium text-lg">
                {i18n.t("word_duration")}:
              </Text>
              <Text className="text-lg">
                {workType === WorkType.BABYSITTING.key
                  ? `${postForm?.duration} ${
                      postForm?.duration === 1
                        ? i18n.t("word_time_unit")
                        : i18n.t("word_time_unit_s")
                    }`
                  : `${postForm?.totalFreelancer} ${
                      postForm?.totalFreelancer === 1
                        ? i18n.t("word_human_unit")
                        : i18n.t("word_human_unit_s")
                    } / ${postForm?.duration} ${
                      postForm?.duration === 1
                        ? i18n.t("word_time_unit")
                        : i18n.t("word_time_unit_s")
                    }`}
              </Text>
            </HStack>
            <HStack space="sm" className="items-center">
              <Text className="font-medium text-lg">
                {i18n.t("word_package_type")}:
              </Text>
              <Text className="text-lg">
                {
                  PackageName[postForm?.packageName as keyof typeof PackageName]
                    .value
                }
                {postForm?.packageName !== PackageName._1DAY.key &&
                  ` (${postForm?.totalWorkDay} ${i18n.t("word_work_date")})`}
              </Text>
            </HStack>
            <HStack space="sm" className="items-center">
              <Text className="font-medium text-lg">{`${i18n.t(
                "word_next_work_date"
              )} ${
                postForm?.packageName !== PackageName._1DAY.key &&
                isPostModel(postForm)
                  ? " (" +
                    (postForm.numOfWorkedDay + 1) +
                    "/" +
                    postForm?.totalWorkDay +
                    ")"
                  : ""
              }:`}</Text>
              <Text className="text-lg">
                {normalizeDate(postForm?.workSchedules[0].date, "/", false)}
              </Text>
            </HStack>
            <HStack space="sm" className="items-center">
              <Text className="font-medium text-lg">
                {i18n.t("word_start_time")}:
              </Text>
              <Text className="text-lg">{postForm?.startTime}</Text>
            </HStack>
            {showStatus && (
              <HStack space="sm" className="items-center">
                <Text className="font-medium text-lg">
                  {i18n.t("word_status")}:
                </Text>
                <PostStatusBadge status={(postForm as PostModel).status} />
              </HStack>
            )}
          </VStack>
          {postForm?.packageName !== PackageName._1DAY.key && (
            <Pressable onPress={() => setShowCalendarModal(true)}>
              {({ pressed }) => (
                <Box
                  className={`flex flex-row justify-between items-center p-2 border border-gray-400 rounded-lg ${
                    pressed && "opacity-50"
                  }`}
                >
                  <HStack space="md" className="items-center">
                    <Text className="text-cyan-600">
                      <Ionicons size={20} name="calendar-outline" />
                    </Text>
                    <Text className="font-medium text-lg text-cyan-600">
                      {i18n.t("word_view_schedule")}
                    </Text>
                  </HStack>
                  <Text className="">
                    <Ionicons size={20} name="chevron-forward-outline" />
                  </Text>
                </Box>
              )}
            </Pressable>
          )}
        </VStack>
      </Card>
      {postForm?.workSchedules && (
        <Modal
          isOpen={showCalendarModal}
          onClose={() => {
            setShowCalendarModal(false);
          }}
          size="md"
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="md" className="text-typography-950">
                {i18n.t("word_package_schedule")}
              </Heading>
              <ModalCloseButton
                onPress={() => {
                  setShowCalendarModal(false);
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
              <WorkScheduleCalendar workSchedules={postForm?.workSchedules} />
            </ModalBody>
            <ModalFooter className="justify-start">
              <VStack space="md">
                <Text className="font-medium">
                  {i18n.t("word_work_status")}
                </Text>
                <Box className="flex w-full flex-row justify-between items-center">
                  <HStack className="items-center" space="xs">
                    <Box className="rounded-full bg-secondary-200 w-4 h-4"></Box>
                    <Text className="">{i18n.t("word_not_yet_worked")}</Text>
                  </HStack>
                  <HStack className="items-center" space="xs">
                    <Box className="rounded-full bg-green-500 w-4 h-4"></Box>
                    <Text className="">{i18n.t("word_success")}</Text>
                  </HStack>
                  <HStack className="items-center" space="xs">
                    <Box className="rounded-full bg-error-500 w-4 h-4"></Box>
                    <Text className="">{i18n.t("word_failure")}</Text>
                  </HStack>
                </Box>
              </VStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default PostInfo;
