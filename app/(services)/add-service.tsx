import React, { useEffect, useState } from "react";
import { SectionList, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { i18n, Language } from "@/localization";
import { setTestInfo, selectUser, setRegisterProcess } from "@/store/reducers";

import { useGetAllServicesQuery } from "@/services";
import { WorkModel } from "@/types/workTypes";
import ServiceSkeleton from "@/components/skeleton/ServiceSkeleton";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";

import { ServiceRegisterCard } from "@/components/list-services/ServiceRegisterCard";
import { InactiveServiceRegisterCard } from "@/components/list-services/InactiveServiceRegisterCard";
import AlertConfirmDialog from "@/components/dialog/AlertConfirmDialog";
import { useToast } from "@/components/ui/toast";
import { showToastMessage } from "@/components/Toast/ToastMessage";

// i18n.locale = "vn";
// i18n.enableFallback = true;
// i18n.defaultLocale = Language.VIETNAMESE;

const AddService = () => {
  const user = useSelector(selectUser);
  const {
    data: freelancerServices,
    isFetching: fetchingFreelancer,
    error: errorFreelancerService,
  } = useGetAllServicesQuery({ id: user?.id });

  const [unregisteredServices, setUnregisteredServices] = useState<WorkModel[]>(
    []
  );
  const [unactivedServices, setUnactivedServices] = useState<WorkModel[]>([]);
  const [selectedWork, setSelectedWork] = useState<WorkModel | null>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (freelancerServices) {
      const dataFilterUnregistered = freelancerServices.items.filter(
        (item) => item.status === null
      );
      const dataFilterUnactivated = freelancerServices.items.filter(
        (item) => item.status !== "WORK" && item.status !== null
      );

      setUnregisteredServices(dataFilterUnregistered);
      setUnactivedServices(dataFilterUnactivated);
    }
  }, [freelancerServices]);

  const handleVisit = () => {
    if (selectedWork) {
      dispatch(
        setTestInfo({
          serviceId: selectedWork.id,
          testId: selectedWork.test.id,
          numberOfQuestions: selectedWork.test.questionCount,
          time: selectedWork.test.testDuration,
          passedPoint: selectedWork.test.passedPoint,
        })
      );
      dispatch(setRegisterProcess({ isRegisterDone: false }));
      setShowAlertDialog(false);
      router.push({ pathname: "/(services)/do-test" });
    } else {
      showToastMessage(
        toast,
        i18n.t("word_failure"),
        i18n.t("st_try_again"),
        "error"
      );
    }
  };

  const handleCloseAlert = () => setShowAlertDialog(false);
  const handleOpenAlert = (service: WorkModel) => {
    setSelectedWork(service);
    setShowAlertDialog(true);
  };

  return (
    <SafeAreaView>
      <Center>
        {errorFreelancerService ? (
          <Text size="lg" className="text-red-800 text-center mt-5">
            {i18n.t("st_system_error")}
          </Text>
        ) : fetchingFreelancer ? (
          <HStack className="w-11/12">
            <ServiceSkeleton />
          </HStack>
        ) : (
          <SectionList
            className="w-full"
            sections={[
              {
                title: i18n.t("st_unregistered_services"),
                data: unregisteredServices,
                renderItem: ({ item }) => (
                  <ServiceRegisterCard
                    service={item}
                    onPress={handleOpenAlert}
                  />
                ),
              },
              {
                title: i18n.t("st_unactivated_services"),
                data: unactivedServices,
                renderItem: ({ item }) => (
                  <InactiveServiceRegisterCard service={item} />
                ),
              },
            ]}
            keyExtractor={(item) => item.id.toString()}
            renderSectionHeader={({ section: { title, data } }) =>
              data.length > 0 ? (
                <View className="bg-gray-200 p-3 rounded-md my-3">
                  <Text className="text-xl font-bold">{title}</Text>
                </View>
              ) : null
            }
            contentContainerStyle={{ paddingHorizontal: 12 }}
            ListEmptyComponent={() => (
              <Text size="lg" className="text-green-800 text-center mt-5">
                {i18n.t("st_all_job_registered")}
              </Text>
            )}
          />
        )}

        <AlertConfirmDialog
          isOpen={showAlertDialog}
          onClose={handleCloseAlert}
          onConfirm={handleVisit}
          title={i18n.t("st_you_are_ready_join")}
          body={i18n.t("st_ready_doing_test")}
          cancelText={i18n.t("word_cancel")}
          confirmText={i18n.t("word_start")}
        />
      </Center>
    </SafeAreaView>
  );
};

export default AddService;
