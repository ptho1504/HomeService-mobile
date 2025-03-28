import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { i18n, Language } from '@/localization';

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
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="home-outline" color={color} />
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
            <Ionicons size={24} name="clipboard-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(notifications)"
        options={{
          title: i18n.t('chat'),
          headerShown: true,
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(account)"
        options={{
          title: i18n.t('account'),
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="person-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
