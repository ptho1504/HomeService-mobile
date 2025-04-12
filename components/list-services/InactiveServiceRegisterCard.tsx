// components/InactiveServiceCard.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { WorkModel } from "@/types/workTypes";
import { WorkType, FreelancerWorkStatus } from "@/constants";
import { i18n } from "@/localization";

type Props = {
  service: WorkModel;
};

export const InactiveServiceRegisterCard = ({ service }: Props) => (
  <Card className="p-5 rounded-lg w-full mb-5 opacity-50">
    <Image
      source={{ uri: service.image }}
      className="mb-6 w-full h-[120px] rounded-md"
      alt={service.name}
    />
    <Heading size="md" className="mb-1">
      {WorkType[service.name as keyof typeof WorkType].value}
    </Heading>
    <HStack space="sm">
      <Text size="md" className="font-semibold">
        {i18n.t("word_status")}:
      </Text>
      <Text
        size="md"
        className={`font-bold text-${
          FreelancerWorkStatus[service.status as keyof typeof FreelancerWorkStatus].bgColor
        }`}
      >
        {
          FreelancerWorkStatus[service.status as keyof typeof FreelancerWorkStatus]
            .value
        }
      </Text>
    </HStack>
  </Card>
);
