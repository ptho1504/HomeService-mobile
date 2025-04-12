import React from "react";
import { TouchableOpacity } from "react-native";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Icon, ArrowRightIcon } from "@/components/ui/icon";
import { WorkModel } from "@/types/workTypes";
import { WorkType } from "@/constants";
import { i18n } from "@/localization";

type Props = {
  service: WorkModel;
  onPress: (service: WorkModel) => void;
};

export const ServiceRegisterCard = ({ service, onPress }: Props) => (
  <TouchableOpacity onPress={() => onPress(service)}>
    <Card className="p-5 rounded-lg w-full mb-5 shadow-sm">
      <Image
        source={{ uri: service.image }}
        className="mb-6 w-full h-[200px] rounded-md"
        alt={service.name}
      />
      <Heading size="md" className="mb-1">
        {WorkType[service.name as keyof typeof WorkType].value}
      </Heading>
      <HStack className="items-center">
        <Text size="sm" className="font-semibold text-green-600 no-underline">
          {i18n.t("word_join_now")}
        </Text>
        <Icon
          as={ArrowRightIcon}
          size="sm"
          className="text-green-600 mt-0.5 ml-0.5"
        />
      </HStack>
    </Card>
  </TouchableOpacity>
);
