import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SectionList,
  Animated,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';

import { useGetQuestionOfTestQuery, useSubmitTestMutation } from '@/services';
import { QuestionModel, DoingTestModel } from '@/types/workTypes';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectRegisterProcess,
  selectTestInfo,
  setRegisterProcess,
  setTestResult,
} from '@/store/reducers';
import { HStack } from '@/components/ui/hstack';

import { VStack } from '@/components/ui/vstack';
import colors from 'tailwindcss/colors';
import { Text } from '@/components/ui/text';

import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from '@/components/ui/toast';
import QuestionSkeleton from '@/components/skeleton/QuestionSkeleton';
import { Spinner } from '@/components/ui/spinner';
import { usePreventRemove } from '@react-navigation/native';

import { i18n } from '@/localization';
import AlertConfirmDialog from '@/components/dialog/AlertConfirmDialog';
import { showToastMessage } from '@/components/Toast/ToastMessage';
import Timer from '@/components/Test/Timer';
import QuestionItem from '@/components/Test/QuestionItem';

const convertAnswers = (
  questions: QuestionModel[],
  answers: Record<string, string>,
) => {
  const dataFilter = questions.filter(item => answers[item.id]);

  const dataMap = dataFilter.map(({ id: questionId, type }) => {
    if (type === 'MULTICHOICE') {
      return { questionId: questionId, choiceId: answers[questionId] };
    } else {
      return { questionId: questionId, content: answers[questionId] };
    }
  });

  console.log(dataMap);

  return dataMap;
};

const getLocalISOTime = (): string => {
  const now = new Date();
  return now.toISOString();
};

let startTime: string = getLocalISOTime();

// main function
const DoTest = () => {
  const dispatch = useDispatch();

  const registerProcess = useSelector(selectRegisterProcess);

  const navigation = useNavigation();
  usePreventRemove(!registerProcess.isRegisterDone, ({ data }) => {
    Alert.alert(i18n.t('word_confirm'), i18n.t('st_confirm_goback'), [
      { text: i18n.t('word_cancel'), style: 'cancel' },
      {
        text: i18n.t('word_yes'),
        style: 'default',
        onPress: () => navigation.dispatch(data.action),
      },
    ]);
  });

  const toast = useToast();

  const [
    submitTest,
    {
      data: resultTestData,
      error: errorTestData,
      isLoading: isLoadingSubmitTest,
    },
  ] = useSubmitTestMutation();

  const testInfo = useSelector(selectTestInfo);
  const testId = testInfo.testId ?? '';

  const { data, isFetching, error } = useGetQuestionOfTestQuery({ id: testId });

  const sortedQuestions: QuestionModel[] = data?.items
    ? [...data.items].sort((a, b) => (a.type === 'MULTICHOICE' ? -1 : 1))
    : [];

  const [isStartTest, setIsStartTest] = useState(false);

  // useEffect(() => {
  //   if (data) {
  //     startTime = getLocalISOTime();
  //     setIsStartTest(true);
  //   } else {
  //     setIsStartTest(false);
  //   }
  // }, [data]);

  const [timeLeft, setTimeLeft] = useState(
    testInfo.time ? testInfo.time * 60 : 100,
  );

  // useEffect(() => {
  //   if (timeLeft <= 0) {
  //     showToastMessage(
  //       toast,
  //       i18n.t('word_notification'),
  //       i18n.t('st_out_of_time'),
  //       'warning',
  //     );
  //     return;
  //   }

  //   const timer = setInterval(() => {
  //     setTimeLeft(prev => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [timeLeft, isStartTest]);

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleOptionPress = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleEssayChange = (questionId: string, text: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: text }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < sortedQuestions.length) {
      showToastMessage(
        toast,
        i18n.t('word_notification'),
        i18n.t('st_please_fullfil_test'),
        'warning',
      );
      return;
    }

    const endTime = getLocalISOTime();

    const answer: Partial<DoingTestModel> = {
      startTime: startTime,
      endTime: endTime,
      answerForQuestions: convertAnswers(sortedQuestions, answers),
    };

    const result = await submitTest({ testId: testId, answer: answer });
    console.log(result.data?.items);
  };

  useEffect(() => {
    if (resultTestData) {
      dispatch(
        setTestResult({
          testResultId: resultTestData.items.id,
          testPoint: resultTestData.items.point,
          isPassed: resultTestData.items.passed,
          numberOfCorrect: resultTestData.items.numOfCorrectAnswers,
          startTime: resultTestData.items.startTime,
          endTime: resultTestData.items.endTime,
        }),
      );
      router.push('/(services)/result-test');
    }
  }, [resultTestData]);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleCloseAlert = () => setShowAlertDialog(false);
  const handleOpenAlert = () => setShowAlertDialog(true);

  // Chia các câu hỏi thành 2 nhóm
  const sections = [
    {
      title: i18n.t('word_multiple_choice'),
      data: sortedQuestions.filter(question => question.type === 'MULTICHOICE'),
    },
    {
      title: i18n.t('word_essay'),
      data: sortedQuestions.filter(question => question.type === 'ESSAY'),
    },
  ];

  const [scrollY] = useState(new Animated.Value(0)); // Animated value to track scroll position
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );

  return (
    <SafeAreaView className="flex-1">
      {isFetching && (
        <HStack className="mt-5">
          <QuestionSkeleton />
        </HStack>
      )}

      {(error || errorTestData) && (
        <Text size="lg" className="text-red-800 text-center mt-5">
          {i18n.t('st_system_error')}
        </Text>
      )}

      {!isFetching && !error && !isLoadingSubmitTest && !errorTestData && (
        <VStack className="flex-1">
          {isVisible && <Timer timeLeft={timeLeft} />}

          <SectionList
            sections={sections}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <QuestionItem
                questionNumber={index + 1}
                item={item}
                answers={answers}
                onSelect={handleOptionPress}
                onEssayChange={handleEssayChange}
              />
            )}
            renderSectionHeader={({ section: { title, data } }) =>
              data.length > 0 ? (
                <View className="bg-gray-200 p-3 rounded-md my-3">
                  <Text className="text-xl font-bold">{title}</Text>
                </View>
              ) : null
            }
            onScroll={handleScroll} // Sử dụng onScroll để theo dõi cuộn
            scrollEventThrottle={16} // Giới hạn tần suất sự kiện cuộn
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
              <ButtonText className="font-semibold text-lg">
                {i18n.t('word_submit')}
              </ButtonText>
              {isLoadingSubmitTest && <ButtonSpinner color={'#D1D5DB'} />}
            </Button>
          </Center>
        </VStack>
      )}

      <AlertConfirmDialog
        isOpen={showAlertDialog}
        onClose={handleCloseAlert}
        onConfirm={() => {
          handleCloseAlert();
          handleSubmit();
        }}
        title={i18n.t('word_submitting_test')}
        body={i18n.t('st_you_are_sure_submit')}
        cancelText={i18n.t('word_goback')}
        confirmText={i18n.t('word_submit')}
      />
    </SafeAreaView>
  );
};

export default DoTest;
