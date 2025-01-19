import { Box } from '@/components/ui/box';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import { PackageName } from '@/constants';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { router, useFocusEffect } from 'expo-router';
import PostList from '@/components/list/PostList';
import PostSkeleton from '@/components/skeleton/PostSkeleton';
import { PostModel, RootStackParamList } from '@/types/postTypes';
import { RouteProp } from '@react-navigation/native';
import { useGetPostsByCustomerIdQuery } from '@/services/post';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/reducers';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetPaymentHistoriesQuery } from '@/services';
import { PaymentHistoryModel } from '@/types/userTypes';
import PaymentHistoryList from '@/components/list/PaymentHistoryList';
import PaymentHistorySkeleton from '@/components/skeleton/PaymentHistorySkeleton';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';

const PaymentHistory = () => {
  const currentUser = useSelector(selectUser);
  const userId = currentUser?.id ? currentUser.id : '';

  const { data, error, isFetching, refetch } = useGetPaymentHistoriesQuery({
    id: userId,
  });

  const toast = useToast();

  const handleRecharge = async () => {};

  const handleWithdraw = async () => {};

  useEffect(() => {
    if (error || (data && data.returnCode !== 1000)) {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>Lấy thông tin lịch sử giao dịch thất bại</ToastTitle>
              <ToastDescription>{error.data.message}</ToastDescription>
            </Toast>
          );
        },
      });
    }
  }, []);

  let paymentHitories: PaymentHistoryModel[] = data?.items ? data?.items : [];

  return (
    <SafeAreaView className="flex-1 h-full bg-[#ebf7eb]">
      <LinearGradient
        // Background Linear Gradient
        colors={['#ebf7eb', 'transparent', '#ffffff']}
        className="absolute h-[1000px] left-0 right-0 top-0"
      />
      <VStack space="md" className="bg-success-300 m-5 p-4 rounded-md">
        <Text className="text-2xl font-bold text-white">Số dư tài khoản</Text>
        <Box className="items-center bg-white rounded-md p-2">
          <Text className="text-2xl mt-1 font-bold text-success-300">
            {currentUser?.balance.toLocaleString('en-US')} VND
          </Text>
        </Box>
      </VStack>
      <VStack space="md" className="mx-5 bg-white rounded-md shadow p-4">
        <Heading>Lịch sử giao dịch</Heading>
        <Divider></Divider>
        {isFetching ? (
          <PaymentHistorySkeleton />
        ) : (
          <PaymentHistoryList
            paymentHitories={paymentHitories}
            refetch={refetch}
          />
        )}
      </VStack>

      <Box className="absolute w-full bottom-0 p-4 bg-white">
        <HStack space="md" className="justify-center">
          <VStack className="w-1/2">
            <Button
              size="xl"
              action="positive"
              className="bg-success-300"
              onPress={handleRecharge}
            >
              <ButtonText>Nạp tiền</ButtonText>
            </Button>
          </VStack>
          <VStack className="w-1/2">
            <Button
              size="xl"
              action="default"
              className="bg-info-300"
              onPress={handleWithdraw}
            >
              <ButtonText>Rút tiền</ButtonText>
            </Button>
          </VStack>
        </HStack>
      </Box>
    </SafeAreaView>
  );
};

export default PaymentHistory;
