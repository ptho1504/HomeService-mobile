import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { i18n, Language } from "@/localization";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";

import { Card } from "@/components/ui/card";
// import { Heading } from "@/components/ui/heading"
// import { HStack } from "@/components/ui/hstack"
import { Image } from "@/components/ui/image";
import { Link, LinkText } from "@/components/ui/link";
// import { Text } from "@/components/ui/text"
import { Icon, ArrowRightIcon } from "@/components/ui/icon";

import { useGetAllServicesQuery } from "@/services";
import { WorkModel } from "@/types/workTypes";

import { useDispatch, useSelector } from "react-redux";
import { setTestInfo, selectUser, setRegisterProcess } from "@/store/reducers";
import ServiceSkeleton from "@/components/skeleton/ServiceSkeleton";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";

i18n.locale = "vn";
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

const AddService = () => {
  // State để lưu lỗi hệ thống
  const [hasErrorSystem, setHasErrorSystem] = useState(false);

  // Fetch tất cả dịch vụ trong hệ thống
  const {
    data: allServices,
    isFetching: fetchingAll,
    error: errorFetchingAll,
  } = useGetAllServicesQuery({ id: undefined });

  // lấy thông tin user
  const user = useSelector(selectUser);

  // Fetch dịch vụ của freelancer
  const {
    data: freelancerServices,
    isFetching: fetchingFreelancer,
    error: errorFreelancerService,
  } = useGetAllServicesQuery({ id: user?.id });

  // State để lưu danh sách dịch vụ chưa đăng ký
  const [unregisteredServices, setUnregisteredServices] = useState<WorkModel[]>(
    []
  );

  useEffect(() => {
    setHasErrorSystem(false);

    // Khi bắt đầu fetch, xóa danh sách cũ để tránh hiển thị sai
    if (fetchingAll || fetchingFreelancer) {
      setUnregisteredServices([]);
      return;
    }

    if (allServices) {
      if (freelancerServices) {
        // Lọc ra các dịch vụ freelancer chưa đăng ký
        const registeredServiceIds = new Set(
          freelancerServices.items.map((service) => service.id)
        );

        const filteredServices = allServices.items.filter(
          (service) => !registeredServiceIds.has(service.id)
        );

        setUnregisteredServices(filteredServices);
      } else {
        // Nếu fetch useGetAllServicesQuery({ id: userId}) trả về lỗi, kiểm tra xem lỗi gì ???
        // Lỗi về việc freelancer chưa có đăng ký dịch vụ nào
        if (
          errorFreelancerService &&
          errorFreelancerService.data.returnCode === -1319
        ) {
          setUnregisteredServices(allServices.items);
          return;
        }

        // Lỗi khác
        // console.log(errorFreelancerService);
        setHasErrorSystem(true);
        return;
      }
    } else {
      if (errorFetchingAll) {
        setHasErrorSystem(true);
        return;
      }
    }
  }, [fetchingAll, fetchingFreelancer]);

  // Use redux to store testInfo
  const dispatch = useDispatch();

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleCloseAlert = () => setShowAlertDialog(false);
  const handleOpenAlert = (service: WorkModel) => {
    setSelectedWork(service);
    setShowAlertDialog(true);
  };

  // Toast
  const [toastId, setToastId] = useState<string>(Date.now().toString());

  const toast = useToast();

  const showToast = (
    title: string,
    message: string,
    type: "error" | "muted" | "warning" | "success" | "info" | undefined
  ) => {
    if (toast.isActive(toastId)) {
      return;
    }
    const uniqueToastId = Date.now().toString();
    setToastId(uniqueToastId);
    toast.show({
      id: uniqueToastId,
      placement: "top",
      duration: 3000,
      render: ({ id }) => (
        <Toast nativeID={uniqueToastId} action={type} variant="solid">
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{message}</ToastDescription>
        </Toast>
      ),
    });
  };

  const [selectedWork, setSelectedWork] = useState<WorkModel | null>(null);

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

      dispatch(setRegisterProcess({isRegisterDone: false}));

      router.push({
        pathname: "/(services)/do-test",
      });
    } else {
      showToast("Thât bại", "Vui lòng chọn lại dịch vụ", "error");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <Center>
        {/* <Heading size="xl" className="my-5">
          DỊCH VỤ CHƯA ĐĂNG KÝ
        </Heading> */}

        {hasErrorSystem ? (
          <Text size="lg" className="text-red-800 text-center mt-5">
            Đã xảy ra lỗi. Vui lòng thử lại.
          </Text>
        ) : fetchingAll || fetchingFreelancer ? (
          <HStack>
            <ServiceSkeleton />
          </HStack>
        ) : (
          <ScrollView className="w-full p-3">
            {unregisteredServices.length > 0 ? (
              unregisteredServices.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  onPress={() => handleOpenAlert(service)}
                >
                  <Card className="p-5 rounded-lg w-full mb-5 shadow-sm">
                    <Image
                      source={{
                        uri: service.image,
                      }}
                      className="mb-6 w-full h-[200px] rounded-md"
                      alt={service.name}
                    />
                    <Heading size="md" className="mb-1">
                      {service.name}
                    </Heading>
                    {/* <Text className="text-sm font-normal mb-2 text-typography-700">
                      May 15, 2023
                    </Text> */}

                    <HStack className="items-center">
                      <Text
                        size="sm"
                        className="font-semibold text-green-600 no-underline"
                      >
                        Tham gia ngay
                      </Text>
                      <Icon
                        as={ArrowRightIcon}
                        size="sm"
                        className="text-green-600 mt-0.5 ml-0.5"
                      />
                    </HStack>
                  </Card>
                </TouchableOpacity>
              ))
            ) : (
              <Text size="lg" className="text-green-800 text-center mt-5">
                Bạn đã tham gia tất cả dịch vụ có sẵn.
              </Text>
            )}
          </ScrollView>
        )}

        {/* Alert dialog */}
        <AlertDialog
          isOpen={showAlertDialog}
          onClose={handleCloseAlert}
          size="md"
        >
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading className="text-typography-950 font-semibold" size="md">
                Bạn muốn tham gia dịch vụ này?
              </Heading>
            </AlertDialogHeader>
            <AlertDialogBody className="mt-3 mb-4">
              <Text size="sm">Sẵn sàng làm bài kiểm tra!</Text>
            </AlertDialogBody>
            <AlertDialogFooter className="">
              <Button
                variant="outline"
                action="secondary"
                onPress={handleCloseAlert}
                size="sm"
              >
                <ButtonText>Huỷ</ButtonText>
              </Button>
              <Button
                size="sm"
                action="positive"
                onPress={() => {
                  handleCloseAlert();
                  handleVisit();
                }}
              >
                <ButtonText>Bắt đầu</ButtonText>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Center>
    </SafeAreaView>
  );
};

export default AddService;
