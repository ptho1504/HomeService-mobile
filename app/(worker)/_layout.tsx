import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { i18n, Language } from '@/localization';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/reducers';

// Language

// i18n.locale = getLocales()[0].languageCode ?? "vn";
i18n.locale = 'vn';
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

export default function Layout() {
  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        tabBarActiveTintColor: '#059669',
        tabBarStyle: { paddingVertical: 10 },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: i18n.t('home'),
          headerShown: true,
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(activities)"
        options={{
          title: i18n.t('activities'),
          headerShown: true,
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="clipboard-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(notifications)"
        options={{
          title: i18n.t('chat'),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: i18n.t('activities'),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
