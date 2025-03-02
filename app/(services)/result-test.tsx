import React, { useEffect } from "react";
import { View, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { useSelector } from "react-redux";
import {
  selectRegisterProcess,
  selectTestInfo,
  selectTestResult,
  setRegisterProcess,
} from "@/store/reducers";

import { router, useNavigation } from "expo-router";
import { Center } from "@/components/ui/center";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import moment from "moment";
import { normalizeDateTime } from "@/utils/dateUtil";
import { usePreventRemove } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const calculateDuration = (startTime: number[], endTime: number[]): string => {
  const start = moment(normalizeDateTime(startTime));
  const end = moment(normalizeDateTime(endTime));

  const duration = moment.duration(end.diff(start));
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.minutes());
  const seconds = Math.floor(duration.seconds());

  let result = [];
  if (hours > 0) result.push(`${hours} giờ`);
  if (minutes > 0) result.push(`${minutes} phút`);
  if (seconds > 0 || result.length === 0) result.push(`${seconds} giây`);

  return result.join(" ");
};

const ResultTest = () => {
  const dispatch = useDispatch();

  const testInfo = useSelector(selectTestInfo);
  const testResult = useSelector(selectTestResult);

  const isPassed = testResult?.isPassed ?? false;
  // const isPassed = false;

  const primaryColor = isPassed ? "green" : "red"; // Xanh lá nếu đậu, đỏ nếu trượt

  const registerProcess = useSelector(selectRegisterProcess);

  const navigation = useNavigation();
  // Hiển thị cảnh báo nếu goback
  usePreventRemove(!registerProcess.isRegisterDone, ({ data }) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn quay lại?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đồng ý",
        style: "default",
        onPress: () => navigation.dispatch(data.action),
      },
    ]);
  });

  // Hàm điều hướng khi rớt
  const handleGoHome = () => {
    dispatch(setRegisterProcess({ isRegisterDone: true }));
  };

  useEffect(() => {
    if (registerProcess.isRegisterDone) {
      router.dismissAll();
    }
  }, [registerProcess]);

  // Hàm điều hướng khi đậu
  const handleContinuePage = () => {
    router.push("/(services)/addition-info");
  };

  return (
    <SafeAreaView className="flex-1">
      {testResult.isPassed === null ? (
        <Text size="lg" className="text-red-800 text-center mt-5">
          Đã xảy ra lỗi. Vui lòng thử lại.
        </Text>
      ) : (
        <View className="flex-1 bg-white m-4 rounded-2xl p-6">
          {/* Score Circle */}
          <View className="items-center mt-10">
            <View
              className={`w-44 h-44 rounded-full flex items-center justify-center border-4 ${isPassed ? "border-green-300 bg-green-500" : "border-red-300 bg-red-500" }`}
            >
              <Center className="">
                <Text className="text-white text-lg font-semibold">
                  Điểm của bạn
                </Text>
                <Text size="4xl" className="text-white font-bold">
                  {`${testResult.testPoint ?? 0} / ${
                    testInfo.passedPoint ?? 0
                  }`}
                </Text>
              </Center>
            </View>
          </View>
          <Center className="mt-3">
            <Text className="text-lg font-semibold">
              {calculateDuration(
                testResult.startTime ?? [],
                testResult.endTime ?? []
              )}
            </Text>
          </Center>
          {/* Congratulation or Encouragement Text */}
          <View className="items-center mt-4">
            {isPassed ? (
              <>
                <Text size="3xl" className="text-green-700 font-bold">
                  Chúc mừng!
                </Text>
                <Text className="text-green-600 text-md mt-1">
                  Bạn đã hoàn thành bài kiểm tra xuất sắc!
                </Text>
              </>
            ) : (
              <>
                <Text className="text-red-700 text-2xl font-semibold">
                  Thử lại nhé!
                </Text>
                <Text className="text-red-600 text-md mt-1">
                  Đừng nản lòng, hãy cố gắng lần sau!
                </Text>
              </>
            )}
          </View>

          {/* Buttons */}
          <View className="mt-10 space-y-4">
            <Center>
              <Button
                size="lg"
                variant="solid"
                action={isPassed ? "positive" : "negative"}
                className="w-64 h-14"
                onPress={isPassed ? handleContinuePage : handleGoHome}
              >
                <ButtonText className="font-semibold text-lg">
                  {isPassed ? "Tiếp tục" : "Thoát"}
                </ButtonText>
              </Button>
            </Center>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ResultTest;
