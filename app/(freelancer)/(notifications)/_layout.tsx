import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from '@/types/postTypes';
import Notifications from '.';

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
        options={{ title: 'Tin nhắn' }}
        component={Notifications}
        initialParams={{ status: 'CHAT' }}
      />
      <Tab.Screen
        name="Notifications"
        options={{ title: 'Thông báo' }}
        component={Notifications} // Truyền component mà không cần hàm inline
        initialParams={{ status: 'NOTIFICATION' }}
      />
    </Tab.Navigator>
  );
}
