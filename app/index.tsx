import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/reducers";
import * as SecureStore from "expo-secure-store";

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const getToken = async () => {
    try {
      const result = await SecureStore.getItemAsync("jwt");
      // console.log("api ", result);
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const signIn = false;
  if (signIn) {
    return <Redirect href={"./(root)/(tabs)/home"} />;
  }

  return <Redirect href="/(auth)/welcome" />;
};
export const screenOptions = {
  headerShown: false, // Hides the header
};

export default App;
