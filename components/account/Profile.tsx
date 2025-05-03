import { Button, ButtonText } from '@/components/ui/button';
import { LOCAL_STORAGE_JWT_KEY, UserRole } from '@/constants';
import {
  clearAuthState,
  selectIsAuthenticated,
  selectUser,
  setIsAuthenticated,
  setUser,
} from '@/store/reducers';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { i18n } from '@/localization';
import { Image } from '@/components/ui/image';
import { HStack } from '@/components/ui/hstack';
import ListAddress from '@/components/list/AddressList';
import { useDispatch } from 'react-redux';
import { router, useFocusEffect } from 'expo-router';
import RequiredAuthenticationModal from '@/components/authentication/RequiredAuthenticationModal';
import { Config } from '@/config';
import LanguageDropdown from '@/components/customeButton/LanguageDropdown';
import { Card } from '@/components/ui/card';
import { Divider } from '@/components/ui/divider';

// i18n.locale = "vn";
// i18n.enableFallback = true;
// i18n.defaultLocale = Language.VIETNAMESE;

const Profile = () => {
  const currentUser = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // const isAuthenticated = true;
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = React.useState(false);
  const [showModal, setShowModal] = React.useState(!isAuthenticated);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleEdit = () => {
    console.log('Edittt mode');

    router.push('/(profile)');
  };

  const handleFinance = () => {
    console.log('Finace Mode');
    router.push('/(profile)/PaymentHistory');
  };

  const handleAddress = () => {
    console.log('Address Mode');
    router.push('/(profile)/Address');
  };

  const handleWork = () => {
    console.log('Service Mode');
    router.push('/(profile)/Service');
  };

  const handleLogout = async () => {
    console.log('Handle Logout');
    dispatch(clearAuthState());

    dispatch(setUser(null));
    dispatch(setIsAuthenticated(false));
    await SecureStore.deleteItemAsync('jwt');
    // console.log("JWT successfully deleted.");
    setShowModal(false);
    router.replace('/(customer)/(home)');
  };

  useEffect(() => {
    if (isAuthenticated) {
      setShowModal(false);
    }
  }, [isAuthenticated]);
  useFocusEffect(
    React.useCallback(() => {
      if (isAuthenticated) {
        setShowModal(false); // Hide the modal if authenticated
      } else {
        setShowModal(true); // Show the modal if not authenticated
      }
    }, [isAuthenticated]),
  );

  return (
    <>
      {!isAuthenticated && (
        <RequiredAuthenticationModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {isAuthenticated && (
        <SafeAreaView className="h-full w-full flex items-center bg-white">
          <ScrollView
            // contentContainerStyle={{ padding: 16 }} // Add padding inside the scrollable area
            // showsVerticalScrollIndicator={false}
            className="h-full flex w-full"
          >
            <VStack space="lg" className="h-full flex w-full p-2 mt-2">
              {/* Avatar */}
              <Card className={`rounded-xl bg-success-200 shadow-lg`}>
                <Box className="flex flex-row items-center justify-between">
                  <HStack space="md" className="items-center">
                    <Image
                      size="md"
                      source={{
                        uri: currentUser?.avatar
                          ? Config.URL_PATH +
                            currentUser.avatar +
                            `?time=${Date.now()}`
                          : 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
                      }}
                      alt={`${currentUser?.name}`}
                      className="rounded-full"
                    />
                    {/* <Pressable onPress={() => setShowModalEdit(true)}>
                        <AntDesign
                          className="absolute bottom-0 right-0 p-1 bg-black rounded-full"
                          name="camera"
                          size={20}
                          color="white"
                        />
                      </Pressable> */}
                    <VStack>
                      <Text className="text-xl font-bold text-white">
                        {currentUser?.name}
                      </Text>
                      <Text className="text-lg font-medium text-white">
                        {i18n.t('reputation')}: {currentUser?.reputationPoint}
                      </Text>
                      <Text className="text-lg font-medium text-white">
                        {i18n.t('phone')}:{' '}
                        {currentUser?.phoneNumber ||
                          i18n.t('word_not_available')}
                      </Text>
                    </VStack>
                  </HStack>

                  {/* In4 */}

                  <Pressable onPress={handleEdit}>
                    {({ pressed }) => (
                      <View
                        className={`bg-success-400 rounded-md ${
                          pressed && 'opacity-50'
                        }`}
                      >
                        <Text className="text-md px-2 py-1 text-white">
                          {i18n.t('word_update')}
                        </Text>
                      </View>
                    )}
                  </Pressable>
                </Box>
              </Card>

              {/* Finance */}
              <Pressable className="" onPress={handleFinance}>
                {({ pressed }) => (
                  <Card
                    className={`rounded-xl border border-success-200 ${
                      pressed && 'opacity-50'
                    }`}
                  >
                    <Box className="flex flex-row justify-between items-center">
                      <HStack className="flex flex-row gap-4 items-center">
                        <Ionicons size={24} name="cash" color={'green'} />
                        <Text className="text-xl font-bold">
                          {i18n.t('finance')}
                        </Text>
                      </HStack>
                      <Ionicons name="arrow-forward" size={32} color={'gray'} />
                    </Box>
                  </Card>
                )}
              </Pressable>

              <Pressable
                className=""
                onPress={
                  currentUser?.role == UserRole.CUSTOMER
                    ? handleAddress
                    : handleWork
                }
              >
                {({ pressed }) => (
                  <Card
                    className={`rounded-xl border border-success-200 ${
                      pressed && 'opacity-50'
                    }`}
                  >
                    <Box className="flex flex-row justify-between items-center">
                      <HStack className="flex flex-row gap-4 items-center">
                        {currentUser?.role === UserRole.CUSTOMER ? (
                          <Ionicons size={24} name="location" color="red" />
                        ) : (
                          <Text className="text-info-300">
                            <Ionicons size={24} name="grid" />
                          </Text>
                        )}

                        <Text className="text-xl font-bold">
                          {currentUser?.role === UserRole.CUSTOMER
                            ? i18n.t('addresses')
                            : i18n.t('workings')}
                        </Text>
                      </HStack>
                      <Ionicons name="arrow-forward" size={32} color={'gray'} />
                    </Box>
                  </Card>
                )}
              </Pressable>

              <Card className={`rounded-xl border border-success-200`}>
                <Box className="flex flex-row justify-between items-center">
                  <HStack className="flex flex-row gap-4 items-center">
                    <Ionicons size={24} name="globe-outline" color={'blue'} />
                    <Text className="text-xl font-bold">
                      {i18n.t('st_switch_language_to')}
                    </Text>
                  </HStack>
                  <LanguageDropdown />
                </Box>
              </Card>

              <Pressable className="" onPress={handleLogout}>
                {({ pressed }) => (
                  <Card
                    className={`rounded-xl border border-success-200 ${
                      pressed && 'opacity-50'
                    }`}
                  >
                    <HStack className="flex flex-row gap-4 items-center">
                      <Ionicons name="log-out-outline" size={32} />
                      <Text className="text-xl font-bold">
                        {i18n.t('log_out')}
                      </Text>
                    </HStack>
                  </Card>
                )}
              </Pressable>
            </VStack>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default Profile;
