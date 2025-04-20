import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import React, { useEffect, useState } from "react";
import "../global.css";
import { useFonts } from "expo-font";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { i18n, Language } from "@/localization";
import { useSelector } from "react-redux";
import { getLang, setLanguage } from "@/store/reducers";
import { getLocales } from "expo-localization";
import { useDispatch } from "react-redux";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InnerRootLayout() {
  const [currentLang, setCurrentLang] = useState<Language | null>(null)

  const dispatch = useDispatch();
  const language = useSelector(getLang);

  // Chỉ thực hiện setup mặc định 1 lần khi language === null
  useEffect(() => {
    if (language === null) {
      const systemLang = (getLocales()[0].languageCode ?? "vi") === Language.ENGLISH ? Language.ENGLISH : Language.VIETNAMESE;
      dispatch(setLanguage(systemLang));
    } else {
      console.log("app/_layout: ", language);
      i18n.locale = language;
      setCurrentLang(language);
    }
  }, [language]);

  console.log(currentLang);

  return (
    <GluestackUIProvider mode="light" key={currentLang}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("../assets/fonts/Roboto-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InnerRootLayout />
      </PersistGate>
    </Provider>
  );
}
