import { Stack } from "expo-router";

export default function NotificationLayout() {
  // const lang = useSelector(getLang);

  // useEffect(() => {
  //   i18n.locale = lang;
  //   i18n.enableFallback = true;
  //   i18n.defaultLocale = Language.VIETNAMESE;
  // }, [lang]);

  // console.log("language in freelancer notif: ", lang);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
