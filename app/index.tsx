import React, { useEffect, useRef, useState } from 'react';
import { Redirect, router } from 'expo-router';
import { authenticateUser, setUser } from '@/store/reducers';
import * as SecureStore from 'expo-secure-store';
import { LOCAL_STORAGE_JWT_KEY, UserRole } from '@/constants';
import { useVerifyJwtForUserMutation } from '@/services';
import { useDispatch } from 'react-redux';
import Loading from '@/components/loading/Loading';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '@/utils/firebaseUtil';
import { UserModel } from '@/types/userTypes';

const App = () => {
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAuthenticated = false;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  // Call Api
  const [verifyJwtForUser] = useVerifyJwtForUserMutation();

  const getToken = async () => {
    try {
      setLoading(true);
      const jwt = await SecureStore.getItemAsync(LOCAL_STORAGE_JWT_KEY);
      if (!jwt) {
        return;
      }

      const response = await verifyJwtForUser({ jwt });

      console.info({ response });

      if (response.error) {
        const message = response.error.data?.message || 'Unknown error';
        console.error(message);
        return;
      } else if (response.data) {
        const user: UserModel = response.data.items;
        dispatch(setUser(user));
        dispatch(authenticateUser(true));
        if (user.role === UserRole.CUSTOMER) {
          router.replace('/(customer)/(home)');
        } else {
          router.replace('/(freelancer)/(home)');
        }
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    } finally {
      setLoading(false);
    }
  };
  const getFirstTime = async () => {
    setLoading(false);
    try {
      const firsttime = await SecureStore.getItemAsync('FT');
      if (!firsttime) {
        await SecureStore.setItemAsync('FT', 'false');
        router.replace('/(auth)/welcome');
      } else {
        if (firsttime !== 'false') {
          router.replace('/(auth)/welcome');
        }
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getToken();
    getFirstTime();

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <Redirect href={'/(customer)/(home)'} />;
};
export const screenOptions = {
  headerShown: false, // Hides the header
};

export default App;
