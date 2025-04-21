import { Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Language } from "@/localization";
import { getLang, setLanguage } from "@/store/reducers/language";
import FlagVN from "../svg/FlagVN";
import FlagUK from "../svg/FlagUK";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuItem } from "../ui/menu";
import { Selection } from "@react-types/shared";
import { Button } from "../ui/button";
import { Pressable } from "../ui/pressable";

const LanguageToggleButton = ({ className }: { className?: string }) => {
  const lang = useSelector(getLang);
  const dispatch = useDispatch();

  const handleSelectLanguage = (keys: Selection) => {
    if (keys != "all") {
      dispatch(
        setLanguage(
          Array.from(keys)[0] === "vi" ? Language.VIETNAMESE : Language.ENGLISH
        )
      );
    }
  };

  return (
    <Menu
      placement="bottom"
      selectionMode="single"
      onSelectionChange={handleSelectLanguage}
      trigger={({ ...triggerProps }) => {
        return (
          <Pressable {...triggerProps} className={className}>
            <View className="flex flex-row gap-2 items-center">
              <Text className="text-xl">
                {lang === Language.VIETNAMESE ? "🇻🇳" : "🇬🇧"}
              </Text>
              <Text className="text-base font-medium">
                {lang === Language.VIETNAMESE ? "Tiếng Việt" : "English"}
              </Text>
            </View>
          </Pressable>
        );
      }}
    >
      <MenuItem
        key="vi"
        textValue="Tiếng Việt"
        className="px-4 py-3 hover:bg-gray-100 flex flex-row justify-between gap-2"
      >
        <Text className="text-base">Tiếng Việt</Text>
        <Text className="text-xl">🇻🇳</Text>
      </MenuItem>
      <MenuItem
        key="en"
        textValue="English"
        className="px-4 py-3 hover:bg-gray-100 flex flex-row justify-between gap-2"
      >
        <Text className="text-base">English</Text>
        <Text className="text-xl">🇬🇧</Text>
      </MenuItem>
    </Menu>
  );
};

export default LanguageToggleButton;
