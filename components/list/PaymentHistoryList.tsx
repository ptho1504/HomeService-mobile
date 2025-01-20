import { data, UserRole } from '@/constants';
import { NotificationModel, PaymentHistoryModel } from '@/types/userTypes';
import { normalizeDateTime } from '@/utils/dateUtil';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { Pressable, FlatList, RefreshControl, ScrollView } from 'react-native';
import { Box } from '../ui/box';
import { Card } from '../ui/card';
import { Heading } from '../ui/heading';
import { VStack } from '../ui/vstack';
import { Text } from '../ui/text';
import { useCallback, useState } from 'react';
import { useViewNotificationMutation } from '@/services';
import { Toast, ToastDescription, ToastTitle, useToast } from '../ui/toast';
import { Mode } from './PostList';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/reducers';
import { Divider } from '../ui/divider';
import { ButtonText, Button } from '../ui/button';
import { Icon, CloseIcon } from '../ui/icon';
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
} from '../ui/modal';
import { HStack } from '../ui/hstack';

interface Props {
  paymentHitories: PaymentHistoryModel[] | undefined;
  refetch: (options?: {
    force?: boolean;
    throwOnError?: boolean;
  }) => Promise<any>;
}

const PaymentHistoryList = ({ paymentHitories, refetch }: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryModel>();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch(); // Gọi lại hàm refetch để lấy dữ liệu mới
    setRefreshing(false); // Đặt lại trạng thái refreshing sau khi hoàn tất
  }, [refetch]);

  if (!paymentHitories || paymentHitories.length <= 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="h-full"
      >
        <Box className="flex flex-1 justify-center items-center">
          <Text className="text-lg text-center mt-10">
            Không có lịch sử giao dịch mới
          </Text>
        </Box>
      </ScrollView>
    );
  }

  const viewDetail = (item: PaymentHistoryModel) => {
    setPaymentHistory(item);
    setShowModal(true);
  };

  const renderItem = ({ item }: { item: PaymentHistoryModel }) => (
    <Pressable className="mb-3" onPress={() => viewDetail(item)}>
      {({ pressed }) => (
        <VStack space="md">
          <Divider></Divider>
          <Box
            className={`${
              pressed ? 'opacity-50' : ''
            } flex flex-row justify-between items-center`}
          >
            <VStack space="xs">
              <Text className="font-medium text-lg">
                {item.amount > 0 ? 'Nạp tiền' : 'Rút tiền'}
              </Text>
              <Text className="">
                {moment(normalizeDateTime(item.createdAt))?.format(
                  'DD/MM/YYYY HH:mm:ss',
                )}
              </Text>
            </VStack>
            <Text
              className={`font-medium text-lg ${
                item.amount > 0 ? 'text-success-400' : 'text-error-400'
              }`}
            >
              {item.amount > 0 ? '+' : '-'}{' '}
              {Math.abs(item.amount).toLocaleString()} VND
            </Text>
          </Box>
        </VStack>
      )}
    </Pressable>
  );

  return (
    <>
      <FlatList
        data={paymentHitories}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {paymentHistory && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          size="md"
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg" className="text-typography-950 mb-4">
                Chi tiết giao dịch
              </Heading>
              <ModalCloseButton
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Icon
                  as={CloseIcon}
                  size="md"
                  className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <VStack space="md">
                <HStack>
                  <Text className="text-md font-medium">Mã giao dịch : </Text>
                  <Text>{paymentHistory.refId}</Text>
                </HStack>
                <HStack className="items-center">
                  <Text className="text-md font-medium">
                    {paymentHistory.amount > 0 ? 'Nạp' : 'Rút'} tiền :{' '}
                  </Text>
                  <Text
                    className={`font-medium ${
                      paymentHistory.amount > 0
                        ? 'text-success-400'
                        : 'text-error-400'
                    }`}
                  >
                    {Math.abs(paymentHistory.amount).toLocaleString()} VND
                  </Text>
                </HStack>
                <HStack>
                  <Text className="text-md font-medium">Ngày giao dịch : </Text>
                  <Text>
                    {moment(
                      normalizeDateTime(paymentHistory.createdAt),
                    )?.format('DD/MM/YYYY HH:mm:ss')}
                  </Text>
                </HStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default PaymentHistoryList;
