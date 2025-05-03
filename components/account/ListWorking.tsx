import { View, Pressable, FlatList, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import {
  useGetAllServicesQuery,
  useGetServicesByUserIdQuery,
} from '@/services';
import { selectUser, setRegisterProcess, setTestInfo } from '@/store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallbackText, AvatarImage } from '../ui/avatar';
import { Text } from '@/components/ui/text';
import { i18n } from '@/localization';
import { FreelancerWorkStatus, WorkType } from '@/constants';
import { Box } from '../ui/box';
import { Card } from '../ui/card';
import { VStack } from '../ui/vstack';
import colors from 'tailwindcss/colors';
import { Spinner } from '../ui/spinner';
import { WorkModel } from '@/types/workTypes';
import AlertConfirmDialog from '../dialog/AlertConfirmDialog';

const ListWorking = () => {
  // lấy thông tin user
  const user = useSelector(selectUser);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [currentWork, setCurrentWork] = useState<WorkModel>();

  const handleCloseAlert = () => setShowAlertDialog(false);

  // Fetch dịch vụ của freelancer
  const { data, refetch, isFetching, error } = useGetAllServicesQuery({
    id: user?.id ?? '',
  });

  const sortedWork = data
    ? [...data.items].sort((a, b) => {
        if (a.status != null && b.status == null) return -1;
        if (a.status == null && b.status != null) return 1;
        return 0;
      })
    : [];

  const handleVisit = (work: WorkModel) => {
    if (work.status != null) {
      router.push({ pathname: '/(services)', params: { serviceId: work.id } });
    } else {
      setShowAlertDialog(true);
      setCurrentWork(work);
    }
  };

  const handleAdd = () => {
    if (currentWork) {
      dispatch(
        setTestInfo({
          serviceId: currentWork.id,
          testId: currentWork.test.id,
          numberOfQuestions: currentWork.test.questionCount,
          time: currentWork.test.testDuration,
          passedPoint: currentWork.test.passedPoint,
        }),
      );
      dispatch(setRegisterProcess({ isRegisterDone: false }));
      setShowAlertDialog(false);
      router.push({ pathname: '/(services)/do-test' });
    } else {
      setShowAlertDialog(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch(); // Gọi lại hàm refetch để lấy dữ liệu mới
    setRefreshing(false); // Đặt lại trạng thái refreshing sau khi hoàn tất
  }, [refetch]);

  const RenderItem = ({ work }: { work: WorkModel }) => {
    return (
      <Pressable onPress={() => handleVisit(work)}>
        {({ pressed }) => (
          <Card
            className={`w-full mb-3 border border-gray-200 rounded-md shadow-sm flex-row p-3 items-center justify-between ${
              pressed ? 'opacity-50' : 'opacity-100'
            }`}
          >
            <View className="flex flex-row items-center">
              <Avatar size="lg">
                <AvatarFallbackText>{work.name}</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: work.image,
                  }}
                />
              </Avatar>
              <VStack>
                <Text size="2xl" className="ms-3 font-semibold">
                  {WorkType[work.name as keyof typeof WorkType].value}
                </Text>
                <Text
                  size="sm"
                  className={`ms-4 text-${
                    work.status
                      ? FreelancerWorkStatus[
                          work.status as keyof typeof FreelancerWorkStatus
                        ].bgColor
                      : 'typography-300'
                  }`}
                >
                  {work.status
                    ? FreelancerWorkStatus[
                        work.status as keyof typeof FreelancerWorkStatus
                      ].value
                    : 'Chưa đăng ký'}
                </Text>
              </VStack>
            </View>
            <Ionicons
              name={work.status ? 'arrow-forward' : 'add-outline'}
              size={24}
            />
          </Card>
        )}
      </Pressable>
    );
  };

  return error ? (
    <Text size="lg" className="text-orange-500 text-center mt-5">
      {i18n.t('st_system_error')}
    </Text>
  ) : isFetching ? (
    <VStack className="mt-5">
      <Spinner size="large" color={colors.emerald[600]} />
      <Text size="lg" className="text-green-800 text-center">
        {i18n.t('word_loading_your_service')}
      </Text>
    </VStack>
  ) : !isFetching && sortedWork.length === 0 ? (
    <Text size="lg" className="text-orange-500 text-center mt-5">
      {i18n.t('st_not_in_services')}
    </Text>
  ) : (
    <>
      <FlatList
        data={sortedWork}
        renderItem={({ item }) => <RenderItem work={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={item => item.id}
      />
      <AlertConfirmDialog
        isOpen={showAlertDialog}
        onClose={handleCloseAlert}
        onConfirm={handleAdd}
        title={i18n.t('st_you_are_ready_join')}
        body={i18n.t('st_ready_doing_test')}
        cancelText={i18n.t('word_cancel')}
        confirmText={i18n.t('word_start')}
      />
    </>
  );
};

export default ListWorking;
