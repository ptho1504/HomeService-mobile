import React from "react";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";



const App = () => {
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
