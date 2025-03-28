import { FlatList, SafeAreaView, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { i18n } from "@/localization";
import { useGetServicesDetailOfFreelancerQuery } from "@/services";
import { selectUser } from "@/store/reducers";
import { Spinner } from "@/components/ui/spinner";
import colors from "tailwindcss/colors";
import { FreelancerWorkStatus, WorkType } from "@/constants";
import { Card } from "@/components/ui/card";
import { RateModel } from "@/types/workTypes";
import StarRating from "@/components/badge/Rating";

const Service = () => {
  // Fetch dịch vụ của freelancer
  const { serviceId } = useLocalSearchParams();
  const workId = Array.isArray(serviceId) ? serviceId[0] : serviceId;

  const user = useSelector(selectUser);

  const { data, isFetching, error } = useGetServicesDetailOfFreelancerQuery({
    workId: workId,
    freelancerId: user?.id ?? "",
  });

  const RenderItem = (rate: RateModel) => {
    return (
      <Card size="md" variant="outline" className="m-1">
        <VStack>
          <Text size="sm">{rate.freelancer.name}</Text>
          <Text size="lg">{rate.comment}</Text>
        </VStack>
        <StarRating rating={rate.star} size={25} color="orange" />
      </Card>
    );
  };

  return isFetching ? (
    <VStack className="mt-5">
      <Spinner size="large" color={colors.emerald[600]} />
      <Text size="lg" className="text-green-800 text-center">
        {i18n.t("word_loading_your_service_details")}
      </Text>
    </VStack>
  ) : error ? (
    <Text size="lg" className="text-orange-500 text-center mt-5">
      {i18n.t("st_system_error")}
    </Text>
  ) : (
    <SafeAreaView className="h-full w-full flex items-center bg-white">
      <VStack space="lg" className="p-3 w-full">
        <Center>
          <Heading size="xl">
            {WorkType[data?.items.work.name as keyof typeof WorkType].value}
          </Heading>
        </Center>
        <HStack space="sm">
          <Text size="lg" className="font-bold">
            {i18n.t("word_status")}:
          </Text>
          <Text
            size="lg"
            className={`text-${
              FreelancerWorkStatus[
                data?.items.status as keyof typeof FreelancerWorkStatus
              ].bgColor
            }`}
          >
            {
              FreelancerWorkStatus[
                data?.items.status as keyof typeof FreelancerWorkStatus
              ].value
            }
          </Text>
        </HStack>

        <VStack>
          <Text size="lg" className="font-bold">
            {i18n.t("word_your_service_detail")}:
          </Text>
          <Text size="lg">{data?.items.description}</Text>
        </VStack>

        <VStack space="sm">
          <Text size="lg" className="font-bold">
            {i18n.t("word_your_service_image")}:
          </Text>
          <ScrollView horizontal={true}>
            <Image
              size="2xl"
              source={{
                uri: data?.items.work.image,
              }}
              alt={data?.items.work.image}
              className="me-2"
            />
            <Image
              size="2xl"
              source={{
                uri: data?.items.work.image,
              }}
              alt={data?.items.work.image}
              className="me-2"
            />
            <Image
              size="2xl"
              source={{
                uri: data?.items.work.image,
              }}
              alt={data?.items.work.image}
              className="me-2"
            />
          </ScrollView>
        </VStack>

        <VStack space="sm">
          <Text size="lg" className="font-bold">
            {i18n.t("word_rate")}:
          </Text>
          {!data?.items.rate && (
            <Text size="lg" className="text-orange-500">
              {i18n.t("st_not_has_any_rate")}
            </Text>
          )}
          <FlatList
            data={data?.items.rate}
            renderItem={({ item }) => (
              <RenderItem
                freelancer={item.freelancer}
                comment={item.comment}
                star={item.star}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Service;
