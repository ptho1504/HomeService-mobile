import { View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useGetAllServicesQuery } from "@/services";
import { selectUser } from "@/store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";
import { Text } from "@/components/ui/text";
import { i18n } from "@/localization";
import { FreelancerWorkStatus, WorkType } from "@/constants";
import { Box } from "../ui/box";
import { Card } from "../ui/card";
import { VStack } from "../ui/vstack";
import colors from "tailwindcss/colors";
import { Spinner } from "../ui/spinner";

const ListWorking = () => {
  // lấy thông tin user
  const user = useSelector(selectUser);

  const [isDone, setDone] = useState(false);

  const [dataServices, setDataService] = useState<
    {
      serviceId: string;
      serviceName: string;
      serviceImage: string;
      serviceStatus: string | null;
    }[]
  >([]);

  // Fetch dịch vụ của freelancer
  const { data, isFetching, error } = useGetAllServicesQuery({ id: user?.id });

  useEffect(() => {
    if (data) {
      const dataFilter = data.items.filter((item) => item.status !== null);

      const dataConvert = dataFilter.map((item) => ({
        serviceId: item.id,
        serviceName: item.name,
        serviceImage: item.image,
        serviceStatus: item.status,
      }));

      setDataService(dataConvert);
      setDone(true);
    }
  }, [data]);

  const handleVisit = (serviceId: string) => {
    console.log("Visist service: ", serviceId);
    router.push({ pathname: "/(services)", params: { serviceId: serviceId } });
  };

  const RenderItem = ({
    serviceId,
    serviceName,
    serviceImage,
    serviceStatus,
  }: {
    serviceId: string;
    serviceName: string;
    serviceImage: string;
    serviceStatus: string | null;
  }) => {
    return (
      <Pressable onPress={() => handleVisit(serviceId)}>
        {({ pressed }) => (
          <Card
            className={`w-full mb-3 border border-gray-200 rounded-md shadow-sm flex-row p-3 items-center justify-between ${
              pressed ? "opacity-50" : "opacity-100"
            }`}
          >
            <View className="flex flex-row items-center">
              <Avatar size="lg">
                <AvatarFallbackText>{serviceName}</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: serviceImage,
                  }}
                />
              </Avatar>
              <VStack>
                <Text size="2xl" className="ms-3 font-semibold">
                  {WorkType[serviceName as keyof typeof WorkType].value}
                </Text>
                <Text
                  size="sm"
                  className={`ms-4 text-${
                    FreelancerWorkStatus[
                      serviceStatus as keyof typeof FreelancerWorkStatus
                    ].bgColor
                  }`}
                >
                  {
                    FreelancerWorkStatus[
                      serviceStatus as keyof typeof FreelancerWorkStatus
                    ].value
                  }
                </Text>
              </VStack>
            </View>
            <Ionicons name="arrow-forward" size={24} />
          </Card>
        )}
      </Pressable>
    );
  };

  return error ? (
    <Text size="lg" className="text-orange-500 text-center mt-5">
      {i18n.t("st_system_error")}
    </Text>
  ) : !isDone ? (
    <VStack className="mt-5">
      <Spinner size="large" color={colors.emerald[600]} />
      <Text size="lg" className="text-green-800 text-center">
        {i18n.t("word_loading_your_service")}
      </Text>
    </VStack>
  ) : isDone && dataServices.length === 0 ? (
    <Text size="lg" className="text-orange-500 text-center mt-5">
      {i18n.t("st_not_in_services")}
    </Text>
  ) : (
    <FlatList
      data={dataServices}
      renderItem={({ item }) => (
        <RenderItem
          serviceId={item.serviceId}
          serviceName={item.serviceName}
          serviceImage={item.serviceImage}
          serviceStatus={item.serviceStatus}
        />
      )}
      keyExtractor={(item) => item.serviceId}
    />
  );
};

export default ListWorking;
