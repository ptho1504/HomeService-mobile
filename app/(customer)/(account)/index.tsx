import { Button, ButtonText } from "@/components/ui/button";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
import {
  clearAuthState,
  selectIsAuthenticated,
  selectUser,
  setIsAuthenticated,
  setUser,
} from "@/store/reducers";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { i18n, Language } from "@/localization";
import { Image } from "@/components/ui/image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { HStack } from "@/components/ui/hstack";
import ListAddress from "@/components/account/ListAddress";
import { useDispatch } from "react-redux";
import { router, useFocusEffect } from "expo-router";
import RequiredAuthenticationModal from "@/components/authentication/RequiredAuthenticationModal";
i18n.locale = "vn";
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

const Home = () => {
  const currentUser = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const isAuthenticated = true;
  const dispatch = useDispatch();

  // console.log("currentUser", currentUser);

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
    console.log("Edit mode");

    router.push("/(customer)/(account)/edit-profile");
  };

  const handleFinance = () => {
    console.log("Finace Mode");
    router.push("/(profile)/PaymentHistory");
  };

  const handleAdd = () => {
    console.log("Add address");
    router.push("/(customer)/(account)/add-address");
  };

  const handleLogout = async () => {
    console.log("Handle Logout");
    dispatch(clearAuthState());

    dispatch(setUser(null));
    dispatch(setIsAuthenticated(false));
    await SecureStore.deleteItemAsync("jwt");
    // console.log("JWT successfully deleted.");
    setShowModal(false);
    router.replace("/(customer)/(home)");
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
    }, [isAuthenticated])
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
            <VStack space="xl" className="h-full flex w-full px-2">
              {/* Title */}
              <Box className="flex w-full">
                <Text className="text-2xl font-bold text-center">
                  {i18n.t("account")}
                </Text>
              </Box>

              {/* Avatar */}
              <Box className="
              rounded-lg bg-success-200
              border border-gray-100 w-full p-4 flex flex-row items-center gap-4">
                {/* Avatar */}
                <Pressable className="" onPress={() => setShowModalEdit(true)}>
                  {currentUser?.avatar && (
                    <Box>
                      <Image
                        size="md"
                        source={{
                          uri: `${currentUser?.avatar}`,
                        }}
                        alt={`${currentUser?.name}`}
                        className="rounded-full shadow-lg"
                      />
                      <AntDesign
                        className="absolute bottom-0 right-0 p-1 bg-black rounded-full"
                        name="camerao"
                        size={24}
                        color="white"
                      />
                    </Box>
                  )}
                  {!currentUser?.avatar && (
                    <Box className="relative w-16 h-16  rounded-full bg-black flex items-center justify-center border border-gray-300">
                      <Text className="text-white text-3xl font-bold">
                        {currentUser?.name[0]?.toUpperCase()}
                      </Text>
                      <AntDesign
                        className="absolute bottom-0 right-0 p-1 bg-black rounded-full border border-gray-50"
                        name="camerao"
                        size={12}
                        color="white"
                      />
                    </Box>
                  )}
                </Pressable>
                {/* In4 */}
                <VStack className="w-full">
                  {/* Name */}
                  <HStack className="flex items-center gap-5 w-[70%]">
                    <Text className="text-xl font-bold text-white">
                      {currentUser?.name}
                    </Text>
                    <Pressable onPress={handleEdit}>
                      {/* <View className="bg-[#66B584] rounded-md"> */}
                      <View className="bg-success-400 rounded-md">
                        <Text className="text-md text-white px-2 py-1">
                          Cập nhập
                        </Text>
                      </View>
                    </Pressable>
                  </HStack>

                  {/* Reputation */}
                  <HStack>
                    <Text className="text-lg text-white font-medium">
                      {i18n.t("reputation")}: {currentUser?.reputationPoint}
                    </Text>
                  </HStack>

                  {/* Phone */}
                  <HStack>
                    <Text className="text-lg text-white font-medium">
                      {i18n.t("phone")}: {currentUser?.phoneNumber || "Chưa có"}
                    </Text>
                  </HStack>

                  {/* Phone */}
                  <HStack className="w-full ">
                    <Text className="text-lg overflow-hidden text-white font-medium">
                      {i18n.t("email")}: {currentUser?.email}
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              {/* Finance */}
              <Pressable
                className=" rounded-lg border border-gray-100 bg-success-200 p-4 flex flex-row items-center gap-4 justify-between hover:opacity-50"
                onPress={handleFinance}
              >
                <Box className="flex flex-row gap-2 items-center">
                  <Ionicons name="wallet-outline" size={32} color="white" />
                  <Text className="text-xl font-bold text-white">
                    {i18n.t("finance")}
                  </Text>
                </Box>
                <Ionicons
                  name="arrow-forward-circle-outline"
                  size={32}
                  color="#fff"
                />
              </Pressable>

              {/* Logout */}
              <Pressable
                className="rounded-lg border border-gray-100 bg-success-200 p-4 flex flex-row items-center gap-4 justify-between hover:opacity-50"
                onPress={handleLogout}
              >
                <Box className="flex flex-row gap-2 items-center">
                  <Ionicons name="log-out-outline" size={32} color="white" />
                  <Text className="text-xl font-bold text-white">
                    {i18n.t("log_out")}
                  </Text>
                </Box>
              </Pressable>

              {/* Addresses */}

              <Box className="border border-gray-100 p-4 flex items-center gap-4">
                <View className="flex flex-row items-center justify-between w-full">
                  <Text className="text-xl font-bold ">
                    {i18n.t("addresses")}
                  </Text>
                  <Pressable
                    className="flex flex-row items-center"
                    onPress={handleAdd}
                  >
                    <Ionicons name="add-sharp" size={32} color="#66B584" />
                    <Text className="text-lg font-bold text-[#66B584]">
                      {i18n.t("add_addresses")}
                    </Text>
                  </Pressable>
                </View>

                {/* List Addresses */}
                <View className="flex items-center w-full px-4 gap-3">
                  {currentUser?.addresses ? (
                    <>
                      {[1, 2, 3].map((item, index) => (
                        <ListAddress key={index} address={item as any} />
                      ))}
                    </>
                  ) : (
                    <View>
                      <Text className="text-lg font-semibold">
                        {i18n.t("no_addresses")}
                      </Text>
                    </View>
                  )}
                </View>
              </Box>
            </VStack>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default Home;
