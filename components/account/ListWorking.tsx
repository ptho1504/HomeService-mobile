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
import { WorkType } from "@/constants";
import { Box } from "../ui/box";
import { Card } from "../ui/card";
import { VStack } from "../ui/vstack";
import colors from "tailwindcss/colors";
import { Spinner } from "../ui/spinner";

const ListWorking = () => {
  const dispatch = useDispatch();

  // lấy thông tin user
  const user = useSelector(selectUser);

  const [dataServices, setDataService] = useState<
    {
      serviceId: string;
      serviceName: string;
      serviceImage: string;
    }[]
  >([]);

  // Fetch dịch vụ của freelancer
  const { data, isFetching, error } = useGetAllServicesQuery({ id: user?.id });

  useEffect(() => {
    if (data) {

      const dataFilter = data.items.filter(item => item.status !== null)

      const dataConvert = dataFilter.map((item) => ({
        serviceId: item.id,
        serviceName:
          WorkType[item.name as keyof typeof WorkType].key === "BABYSITTING"
            ? i18n.t("job_babysitting")
            : i18n.t("job_homecleaning"),
        serviceImage: item.image,
      }));

      setDataService(dataConvert);
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
  }: {
    serviceId: string;
    serviceName: string;
    serviceImage: string;
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
              <Text className="ms-3 text-2xl font-semibold">{serviceName}</Text>
            </View>
            <Ionicons name="arrow-forward" size={24} color="green" />
          </Card>
        )}
      </Pressable>
    );
  };

  return isFetching ? (
    <VStack className="mt-5">
      <Spinner size="large" color={colors.emerald[600]} />
      <Text size="lg" className="text-green-800 text-center">
        {i18n.t("word_loading_your_service")}
      </Text>
    </VStack>
  ) : error ? (
    <Text size="lg" className="text-orange-500 text-center mt-5">
      {i18n.t("st_system_error")}
    </Text>
  ) : !error && dataServices.length === 0 ? (
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
        />
      )}
      keyExtractor={(item) => item.serviceId}
    />
  );
};

export default ListWorking;
