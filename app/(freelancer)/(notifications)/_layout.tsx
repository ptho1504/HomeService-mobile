import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from '@/types/postTypes';
import Notifications from '.';
import { i18n } from '@/localization';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

export default function NotificationLayout() {
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
