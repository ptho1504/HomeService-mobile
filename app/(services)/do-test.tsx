import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { router, useNavigation } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";

import { useGetQuestionOfTestQuery, useSubmitTestMutation } from "@/services";
import { QuestionModel, DoingTestModel } from "@/types/workTypes";

import { useSelector, useDispatch } from "react-redux";
import { selectRegisterProcess, selectTestInfo, setRegisterProcess, setTestResult } from "@/store/reducers";
import { HStack } from "@/components/ui/hstack";

import { VStack } from "@/components/ui/vstack";
import colors from "tailwindcss/colors";
import { Text } from "@/components/ui/text";

import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";
import QuestionSkeleton from "@/components/skeleton/QuestionSkeleton";
import { Spinner } from "@/components/ui/spinner";
import { usePreventRemove } from "@react-navigation/native";

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { i18n } from "@/localization";

const convertAnswers = (
  questions: QuestionModel[],
  answers: Record<string, string>
) => {
  return questions.map(({ id: questionId, type }) => {
    if (type === "MULTICHOICE") {
      return { questionId: questionId, choiceId: answers[questionId] };
    } else {
      return { questionId: questionId, content: answers[questionId] };
    }
  });
};

const getLocalISOTime = (): string => {
  const now = new Date();
  return now.toISOString();
};

let startTime: string = getLocalISOTime();

// Main function
const DoTest = () => {
  const dispatch = useDispatch();

  const registerProcess = useSelector(selectRegisterProcess);

  const navigation = useNavigation();
  // Hiển thị cảnh báo nếu goback
  usePreventRemove(!registerProcess.isRegisterDone, ({ data }) => {
    Alert.alert(i18n.t("word_confirm"), i18n.t("st_confirm_goback"), [
      { text: i18n.t("word_cancel"), style: "cancel" },
      {
        text: i18n.t("word_yes"),
        style: "default",
        onPress: () => navigation.dispatch(data.action),
      },
    ]);
  });


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

  // setup useSubmitTestMutation - use api submit test
  const [
    submitTest,
    {
      data: resultTestData,
      error: errorTestData,
      isLoading: isLoadingSubmitTest,
    },
  ] = useSubmitTestMutation();

  // get test info
  const testInfo = useSelector(selectTestInfo);

  const testId = testInfo.testId ?? "";

  // Fetch danh sách câu hỏi từ API
  const { data, isFetching, error } = useGetQuestionOfTestQuery({ id: testId });

  // Danh sách câu hỏi và sắp xếp trắc nghiệm trước, tự luận sau
  const sortedQuestions: QuestionModel[] = data?.items
    ? [...data.items].sort((a, b) => (a.type === "MULTICHOICE" ? -1 : 1))
    : [];
  // console.log(sortedQuestions);

  // get start time to do test
  useEffect(() => {
    if (!isFetching && !error) {
      startTime = getLocalISOTime();
    }
  }, [isFetching]);

  // State lưu đáp án của người dùng
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Xử lý chọn đáp án trắc nghiệm
  const handleOptionPress = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // Xử lý nhập câu trả lời tự luận
  const handleEssayChange = (questionId: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text }));
  };

  // Xử lý khi nộp bài
  const handleSubmit = async () => {
    // Kiểm tra xem đã làm hết bài kiểm tra chưa.
    const isNotFulfillTest =
      Object.keys(answers).length < sortedQuestions.length;

    if (isNotFulfillTest) {
      showToast(i18n.t("word_warning"), i18n.t("st_please_fullfil_test"), "warning");
      return;
    }

    console.log("start submit");

    const endTime = getLocalISOTime();

    const answer: Partial<DoingTestModel> = {
      startTime: startTime,
      endTime: endTime,
      answerForQuestions: convertAnswers(sortedQuestions, answers),
    };

    try {
      const result = await submitTest({ testId: testId, answer: answer });
    } catch (e) {
      console.log(e);
      showToast(i18n.t("word_failure"), i18n.t("st_try_again"), "error");
    }

    console.log("complete submit");
  };

  useEffect(() => {
    if (isLoadingSubmitTest) {
      return;
    }

    if (resultTestData?.items) {

      console.log(resultTestData.items);
      dispatch(
        setTestResult({
          testResultId: resultTestData.items.id,
          testPoint: resultTestData.items.point,
          isPassed: resultTestData.items.passed,
          numberOfCorrect: resultTestData.items.numOfCorrectAnswers,
          startTime: resultTestData.items.startTime,
          endTime: resultTestData.items.endTime,
        })
      );

      router.push("/(services)/result-test");
    } else {
      if (errorTestData) {
        showToast(i18n.t("word_failure"), i18n.t("st_try_again"), "error");
      }
    }
  }, [isLoadingSubmitTest]);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleCloseAlert = () => setShowAlertDialog(false);
  const handleOpenAlert = () => {
    setShowAlertDialog(true);
  };

  return (
    <SafeAreaView className="flex-1">
      {/* <Center>
        <Heading size="xl" className="my-5">
          LÀM BÀI KIỂM TRA
        </Heading>
      </Center> */}

      {isFetching && (
        <HStack className="mt-5">
          <QuestionSkeleton />
        </HStack>
      )}

      {error && (
        <Text size="lg" className="text-red-800 text-center mt-5">
          {i18n.t("st_system_error")}
        </Text>
      )}

      {isLoadingSubmitTest && (
        <VStack className="mt-5">
          <Spinner size="large" color={colors.emerald[600]} />
          <Text size="lg" className="text-green-800 text-center">
          {i18n.t("wait_for_submitting")}
          </Text>
        </VStack>
      )}

      {!isFetching && !error && !isLoadingSubmitTest && (
        <VStack className="flex-1">
          <FlatList
            data={sortedQuestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <QuestionItem
                questionNumber={index + 1}
                item={item}
                answers={answers}
                onSelect={handleOptionPress}
                onEssayChange={handleEssayChange}
              />
            )}
            className="flex-1 p-2"
          />
          <Center className="py-3">
            <Button
              size="lg"
              variant="solid"
              action="positive"
              className="w-64 h-14"
              onPress={handleOpenAlert}
            >
              <ButtonText className="font-semibold text-lg">{i18n.t("word_submit")}</ButtonText>
            </Button>
          </Center>
        </VStack>
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
            {i18n.t("word_submitting_test")}
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="sm">{i18n.t("st_you_are_sure_submit")}</Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleCloseAlert}
              size="sm"
            >
              <ButtonText>{i18n.t("word_goback")}</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              onPress={() => {
                handleCloseAlert();
                handleSubmit();
              }}
            >
              <ButtonText>{i18n.t("word_submit")}</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SafeAreaView>
  );
};

const QuestionItem = ({
  questionNumber,
  item,
  answers,
  onSelect,
  onEssayChange,
}: {
  questionNumber: number;
  item: QuestionModel;
  answers: Record<string, string>;
  onSelect: (questionId: string, optionId: string) => void;
  onEssayChange: (questionId: string, text: string) => void;
}) => (
  <View className="mb-5 p-3">
    <Text className="text-xl font-semibold mb-2">
    {i18n.t("word_question")} {questionNumber}: {item.content}
    </Text>

    {item.type === "MULTICHOICE" && (
      <FlatList
        data={item.choices.filter((choice) => !choice.deleted)} // Chỉ hiển thị lựa chọn không bị xóa
        keyExtractor={(choice) => choice.id || ""}
        renderItem={({ item: choice }) => (
          <TouchableOpacity
            className={`p-4 my-1 rounded-lg border-2 ${
              answers[item.id] === choice.id
                ? "bg-green-600 border-green-500"
                : "bg-white border-gray-200"
            }`}
            onPress={() => onSelect(item.id, choice.id || "")}
          >
            <Text
              className={`text-xl ${
                answers[item.id] === choice.id
                  ? "text-white font-semibold"
                  : "text-black"
              }`}
            >
              {choice.content}
            </Text>
          </TouchableOpacity>
        )}
      />
    )}

    {item.type === "ESSAY" && (
      <TextInput
        className="border border-gray-300 p-3 rounded-lg mt-2 bg-white text-lg"
        placeholder= {i18n.t("st_enter_your_answer")}
        multiline
        value={answers[item.id] || ""}
        onChangeText={(text) => onEssayChange(item.id, text)}
      />
    )}
  </View>
);

export default DoTest;
