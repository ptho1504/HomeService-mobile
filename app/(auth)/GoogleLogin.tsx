import Loading from "@/components/loading/Loading";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from "@/components/ui/toast";
import { i18n } from "@/localization";
import { useGetGoogleLinkQuery } from "@/services";
import React, { useEffect } from "react";
import { Alert, BackHandler, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const GoogleLogin = () => {
  const { data, isLoading, error } = useGetGoogleLinkQuery({
    redirectUri: "http://localhost:3000",
  });
  const toast = useToast();

  useEffect(() => {
    if (error || (data && data.returnCode !== 1000)) {
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = "toast-" + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>{i18n.t("st_google_login_failed")}</ToastTitle>
              <ToastDescription>{error.data.message}</ToastDescription>
            </Toast>
          );
        },
      });
    } else {
      console.log(data);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        // ref={webviewRef}
        source={{
          uri:
            data?.items.url ??
            "https://accounts.google.com/o/oauth2/v2/auth?client_id=547180612748-mlttcf8p0cqo7fkkk8i5f0ctkmgf411q.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=code&scope=openid email profile",
        }}
        onNavigationStateChange={(navState) => {
          if (navState.url.startsWith("http://localhost:3000/")) {
            console.log(navState.url);
            var code = "x";
            if (navState.url.split("?")[1]) {
              const urlParams = new URLSearchParams(navState.url.split("?")[1]);
              code = urlParams.get("publicToken") ?? "x";
            }

            console.log(code);
            // navigation.navigate('BankLink', {
            //   publicToken,
            // });
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  webView: {
    height: 900,
    width: "100%",
    backgroundColor: "white",
  },
});

export default GoogleLogin;
