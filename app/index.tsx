import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'expo-router';
import { authenticateUser, setUser } from '@/store/reducers';
import * as SecureStore from 'expo-secure-store';
import { LOCAL_STORAGE_JWT_KEY } from '@/constants';
import { useVerifyJwtForUserMutation } from '@/services';
import { useDispatch } from 'react-redux';
import Loading from '@/components/loading/Loading';
import * as Notifications from 'expo-notifications';
import { View, Text, Button } from 'react-native';
import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from '@/utils/firebaseUtil';

const App = () => {
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAuthenticated = false;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
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

      if (response.error) {
        const message = response.error.data?.message || 'Unknown error';
        console.error(message);
        return;
      } else if (response.data) {
        dispatch(setUser(response.data.items));
        dispatch(authenticateUser(true));
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => {
        console.log(token);
        setExpoPushToken(token ?? '');
      })
      .catch((error: any) => setExpoPushToken(`${error}`));

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

  // return (
  //   <View
  //     style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}
  //   >
  //     <Text>Your Expo push token: {expoPushToken}</Text>
  //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
  //       <Text>
  //         Title: {notification && notification.request.content.title}{' '}
  //       </Text>
  //       <Text>Body: {notification && notification.request.content.body}</Text>
  //       <Text>
  //         Data:{' '}
  //         {notification && JSON.stringify(notification.request.content.data)}
  //       </Text>
  //     </View>
  //     <Button
  //       title="Press to Send Notification"
  //       onPress={async () => {
  //         await sendPushNotification(expoPushToken);
  //       }}
  //     />
  //   </View>
  // );

  if (loading) {
    return <Loading />;
  }

  // if (isAuthenticated) {
  //   return <Redirect href={'/(customer)/(home)'} />;
  // }

  return <Redirect href="/(auth)/welcome" />;
};
export const screenOptions = {
  headerShown: false, // Hides the header
};

export default App;
