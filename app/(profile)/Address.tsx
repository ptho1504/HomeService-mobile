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
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
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
import { Pressable } from '@/components/ui/pressable';
import { i18n } from '@/localization';
import ListAddress from '@/components/list/AddressList';
import { Ionicons } from '@expo/vector-icons';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import AddressList from '@/components/list/AddressList';
import { Divider } from '@/components/ui/divider';

const Address = () => {
  const currentUser = useSelector(selectUser);
  const router = useRouter();

  const handleAdd = () => {
    console.log('Add address');
    router.push('/(profile)/AddAddress');
  };

  return (
    <SafeAreaView className="flex-1 h-full bg-[#ebf7eb]">
      <LinearGradient
        // Background Linear Gradient
        colors={['#ebf7eb', 'transparent', '#ffffff']}
        className="absolute h-[1000px] left-0 right-0 top-0"
      />
      <VStack className="m-5">
        <VStack space="md" className="bg-white rounded-md shadow p-4">
          <Heading>{i18n.t('addresses')}</Heading>
          <Divider></Divider>
          <AddressList addresses={currentUser?.addresses ?? []} />
        </VStack>

        <Button
          onPress={handleAdd}
          size="xl"
          className="bg-success-300 flex flex-row items-center justify-center mt-10"
          action="positive"
        >
          <ButtonText>{i18n.t('add_addresses')}</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default Address;
