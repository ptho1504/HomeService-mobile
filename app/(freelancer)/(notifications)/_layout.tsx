import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from '@/types/postTypes';
import Notifications from '.';
import { i18n, Language } from '@/localization';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getLang } from '@/store/reducers';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

export default function NotificationLayout() {

  // const lang = useSelector(getLang);

  // useEffect(() => {
  //   i18n.locale = lang;
  //   i18n.enableFallback = true;
  //   i18n.defaultLocale = Language.VIETNAMESE;
  // }, [lang]);

  // console.log("language in freelancer notif: ", lang);
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: '#059669',
        },
      }}
    >
      <Tab.Screen
        name="Chat"
        options={{ title: i18n.t('word_title_chat') }}
        component={Notifications}
        initialParams={{ status: 'CHAT' }}
      />
      <Tab.Screen
        name="Notifications"
        options={{ title: i18n.t('word_title_notification') }}
        component={Notifications} // Truyền component mà không cần hàm inline
        initialParams={{ status: 'NOTIFICATION' }}
      />
    </Tab.Navigator>
  );
}
