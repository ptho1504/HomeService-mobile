import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import {
  authenticateUser,
  selectIsAuthenticated,
  setUser,
} from "@/store/reducers";
import * as SecureStore from "expo-secure-store";
import { LOCAL_STORAGE_JWT_KEY } from "@/constants";
import { useVerifyJwtForUserMutation } from "@/services";
import { useDispatch } from "react-redux";
import Loading from "@/components/loading/Loading";

const App = () => {
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAuthenticated = false;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Call Api
  const [verifyJwtForUser] = useVerifyJwtForUserMutation();

  const getToken = async () => {
    try {
      setLoading(true);
      const jwt = await SecureStore.getItemAsync(LOCAL_STORAGE_JWT_KEY);
      if (!jwt) {
        return;
      }

      const response = await verifyJwtForUser({ jwt });

      if (response.error) {
        const message = response.error.data?.message || "Unknown error";
        console.error(message);
        return;
      } else if (response.data) {
        dispatch(setUser(response.data.items));
        dispatch(authenticateUser(true));
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Redirect href={"/(customer)/(home)"} />;
  }

  return <Redirect href="/(auth)/welcome" />;
};
export const screenOptions = {
  headerShown: false, // Hides the header
};

export default App;
