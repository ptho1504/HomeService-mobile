import React, { useEffect, useRef, useState } from "react";
import { Redirect, router } from "expo-router";
import { authenticateUser, setUser } from "@/store/reducers";
import * as SecureStore from "expo-secure-store";
import { LOCAL_STORAGE_JWT_KEY, UserRole } from "@/constants";
import { useVerifyJwtForUserMutation } from "@/services";
import { useDispatch } from "react-redux";
import Loading from "@/components/loading/Loading";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/utils/firebaseUtil";
import { UserModel } from "@/types/userTypes";
import "react-native-get-random-values";
const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Ensure the app waits for initialization
  const [initialized, setInitialized] = useState(false);
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  // Call API
  const [verifyJwtForUser] = useVerifyJwtForUserMutation();

  const getToken = async () => {
    try {
      const jwt = await SecureStore.getItemAsync(LOCAL_STORAGE_JWT_KEY);
      if (!jwt) {
        return;
      }

      const response = await verifyJwtForUser({ jwt });

      if (response.error) {
        const message = response.error.data?.message || "Unknown error";
        console.error(message);
        return;
      } else if (response.data) {
        const user: UserModel = response.data.items;
        dispatch(setUser(user));
        dispatch(authenticateUser(true));
        if (user.role === UserRole.CUSTOMER) {
          router.replace("/(customer)/(home)");
        } else {
          router.replace("/(freelancer)/(home)");
        }
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  const getFirstTime = async () => {
    try {
      const firsttime = await SecureStore.getItemAsync("FT");
      if (!firsttime) {
        await SecureStore.setItemAsync("FT", "false");
        router.replace("/(auth)/welcome");
      } else if (firsttime !== "false") {
        router.replace("/(auth)/welcome");
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await getToken();
        await getFirstTime();
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setInitialized(true); // Signal that initialization is complete
        setLoading(false);
      }
    };

    initializeApp();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (initialized) {
    return <Redirect href={"/(customer)/(home)"} />;
  }
  return null; // Prevent rendering until initialization is complete
};

export const screenOptions = {
  headerShown: false, // Hides the header
};

export default App;
