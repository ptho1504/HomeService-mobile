import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { i18n, Language } from "@/localization";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Icon, SearchIcon } from "@/components/ui/icon";

// i18n.locale = "vn";
// i18n.enableFallback = true;
// i18n.defaultLocale = Language.VIETNAMESE;

const AddAdress = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }} // Ensure KeyboardAvoidingView fills the screen
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 bg-white">
            {/* Header */}
            <View className="flex flex-row items-center px-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="px-2 bg-white rounded-full w-16 h-16 items-center justify-center"
              >
                <Ionicons name="arrow-back" size={28} color="black" />
              </TouchableOpacity>
              {/* Title */}
              <View className="flex flex-row items-center justify-center flex-1">
                <Text className="text-2xl font-medium text-black px-2 py-1 w-full">
                  {i18n.t("add_addresses")}
                </Text>
              </View>
            </View>
            {/* Body */}
            <View className="px-10 flex flex-col gap-2">
              <Input>
                <InputField />
                <InputSlot>
                  <Icon
                    as={SearchIcon}
                    className="text-typography-500 m-2 w-4 h-4"
                  />
                </InputSlot>
              </Input>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddAdress;
