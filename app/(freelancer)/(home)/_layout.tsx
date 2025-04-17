import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from '@/types/postTypes';
import Posts from '.';
import { i18n } from '@/localization';

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
        name="NewPost"
        options={{ title: i18n.t("word_newpost") }}
        component={Posts} // Truyền component mà không cần hàm inline
        initialParams={{ status: 'NEW' }} // Truyền tham số
      />
      <Tab.Screen
        name="RequestPost"
        options={{ title: i18n.t("word_requestpost") }}
        component={Posts}
        initialParams={{ status: 'REQUEST' }}
      />
    </Tab.Navigator>
  );
}
