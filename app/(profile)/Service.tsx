import { Box } from '@/components/ui/box';

import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';

import { useSelector } from 'react-redux';
import { selectUser } from '@/store/reducers';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { i18n } from '@/localization';
import { Ionicons } from '@expo/vector-icons';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import AddressList from '@/components/list/AddressList';
import { Divider } from '@/components/ui/divider';
import ListWorking from '@/components/account/ListWorking';

const Address = () => {
  const currentUser = useSelector(selectUser);
  const router = useRouter();

  const handleAdd = () => {
    router.push('/(services)/add-service');
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
          <Heading>{i18n.t('workings')}</Heading>
          <Divider></Divider>
          <ListWorking />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Address;
