import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { i18n } from "@/localization";

export default function NotFoundScreen() {
  return (
    <>
      <SafeAreaView>
        <Text className="text-3xl color-red-500">
          {i18n.t("st_css_not_found")}
        </Text>
      </SafeAreaView>
    </>
  );
}
