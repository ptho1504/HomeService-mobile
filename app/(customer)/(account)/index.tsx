import { Button, ButtonText } from "@/components/ui/button";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
import { selectUser } from "@/store/reducers";
import { WorkType } from "@/constants";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "@/components/ui/text";
import FlagVN from "@/components/svg/FlagVN";
import { Pressable } from "@/components/ui/pressable";
import { i18n, Language } from "@/localization";
import { HStack } from "@/components/ui/hstack";
import Carousel from "@/components/carousel/Carousel";
import ListServices from "@/components/list-services/ListServices";

i18n.locale = "vn";
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

const Home = () => {
  const currentUser = useSelector(selectUser);
  // console.log("currentUser", currentUser);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return <SafeAreaView className="relative flex-1">
    <Text>SCrp;;</Text>
  </SafeAreaView>;
};

export default Home;
