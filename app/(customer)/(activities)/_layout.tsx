import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from '@/types/postTypes';
import Posts from '.';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

export default function ActivityLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: '#059669',
        },
      }}
    >
      <Tab.Screen
        name="UpcomingWork"
        options={{ title: 'Chờ làm' }}
        component={Posts} // Truyền component mà không cần hàm inline
        initialParams={{ status: 'UPCOMING' }} // Truyền tham số
      />
      <Tab.Screen
        name="PackageWork"
        options={{ title: 'Theo gói' }}
        component={Posts}
        initialParams={{ status: 'PACKAGE' }}
      />
      <Tab.Screen
        name="PastWork"
        options={{ title: 'Lịch sử' }}
        component={Posts}
        initialParams={{ status: 'ALL' }}
      />
    </Tab.Navigator>
  );
}
