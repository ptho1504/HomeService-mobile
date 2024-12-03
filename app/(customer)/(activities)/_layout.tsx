import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Activities from '.';
import { RootStackParamList } from '@/types/postTypes';

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
        component={Activities} // Truyền component mà không cần hàm inline
        initialParams={{ status: 'UPCOMING' }} // Truyền tham số
      />
      <Tab.Screen
        name="PackageWork"
        options={{ title: 'Theo gói' }}
        component={Activities}
        initialParams={{ status: 'PACKAGE' }}
      />
      <Tab.Screen
        name="PastWork"
        options={{ title: 'Lịch sử' }}
        component={Activities}
        initialParams={{ status: 'ALL' }}
      />
    </Tab.Navigator>
  );
}
