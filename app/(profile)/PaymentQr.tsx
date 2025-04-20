import React from "react";
import { SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import WebView from "react-native-webview";
import { useDispatch } from "react-redux";
import { selectUser, setUser } from "@/store/reducers";
import { useSelector } from "react-redux";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { useGetPaymentHistoriesQuery } from "@/services/users";
import { i18n } from "@/localization";

const PaymentQr = () => {
  const successUrl = "http://localhost:3000/success";
  const cancelUrl = "http://localhost:3000/cancel";
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { checkoutUrl, amount } = useLocalSearchParams();
  const toast = useToast();
  const { refetch } = useGetPaymentHistoriesQuery({
    id: user?.id ?? "",
  });

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 h-full">
      <WebView
        source={{ uri: checkoutUrl as string }}
        onShouldStartLoadWithRequest={(event) => {
          if (event.url.startsWith(cancelUrl)) {
            setTimeout(() => {
              router.back();
            }, 10);
            return false;
          } else if (event.url.startsWith(successUrl)) {
            setTimeout(() => {
              if (user) {
                dispatch(
                  setUser({ ...user, balance: user?.balance + Number(amount) })
                );
              }
              refetch();
              toast.show({
                placement: "top",
                duration: 3000,
                render: ({ id }) => {
                  const uniqueToastId = "toast-" + id;
                  return (
                    <Toast
                      nativeID={uniqueToastId}
                      action="success"
                      variant="outline"
                    >
                      <ToastTitle>{i18n.t("word_success")}</ToastTitle>
                      <ToastDescription>
                        {i18n.t("st_top_up_successfully")}
                      </ToastDescription>
                    </Toast>
                  );
                },
              });
              router.dismissTo("/PaymentHistory");
            }, 10);
            return false;
          }
          return true;
        }}
        // onNavigationStateChange={navState => {

        // }}
      />
    </SafeAreaView>
  );
};

export default PaymentQr;
