import React, { Key, useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getLang, setLanguage } from "@/store/reducers/language";
import { i18n, Language } from "@/localization";
import { Divider } from "../ui/divider";
import { Ionicons } from "@expo/vector-icons";
import { HStack } from "../ui/hstack";
import FlagVN from "../svg/FlagVN";
import FlagUK from "../svg/FlagUK";
import { ButtonText, Button } from "../ui/button";
import { Icon, AddIcon, GlobeIcon, PlayIcon, SettingsIcon } from "../ui/icon";
import { Menu, MenuItem, MenuItemLabel } from "../ui/menu";
import { Selection } from "@react-types/shared";

const LanguageDropdown = () => {
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
          <Button
            className="bg-success-400 px-3 py-2 rounded-lg"
            {...triggerProps}
          >
            <View className="flex flex-row gap-2 items-center">
              {lang === Language.VIETNAMESE ? <FlagVN /> : <FlagUK />}
              <Text className="text-white text-base font-medium">
                {lang === Language.VIETNAMESE ? "Tiếng Việt" : "English"}
              </Text>
              <Ionicons
                name="chevron-down"
                size={18}
                color="white"
                className="mt-1"
              />
            </View>
          </Button>
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

  // return (
  //   <View className="self-start">
  //     <Pressable
  //       onPress={() => setIsModalVisible(true)}
  //       className="bg-success-400 px-3 py-2 rounded-lg"
  //     >
  //       <View className="flex flex-row gap-1 items-center">
  //         {lang === Language.VIETNAMESE ? <FlagVN /> : <FlagUK />}
  //         <Text className="text-white text-base font-medium">
  //           {lang === Language.VIETNAMESE ? "Tiếng Việt" : "English"}
  //         </Text>
  //         <Ionicons
  //           name="chevron-down"
  //           size={18}
  //           color="white"
  //           className="mt-1"
  //         />
  //       </View>
  //     </Pressable>

  //     <Modal
  //       visible={isModalVisible}
  //       transparent
  //       animationType="fade"
  //       onRequestClose={() => setIsModalVisible(false)}
  //     >
  //       <Pressable
  //         className="flex-1 justify-center items-center bg-black/30"
  //         onPress={() => setIsModalVisible(false)}
  //       >
  //         <View className="bg-white w-52 rounded-xl shadow-lg py-2">
  //           <Pressable
  //             className="px-4 py-3 hover:bg-gray-100 flex flex-row justify-between"
  //             onPress={() => handleSelectLanguage(Language.VIETNAMESE)}
  //           >
  //             <Text className="text-lg">Tiếng Việt</Text>
  //             <Text className="text-3xl">🇻🇳</Text>
  //           </Pressable>
  //           <Divider />
  //           <Pressable
  //             className="px-4 py-3 hover:bg-gray-100 flex flex-row justify-between"
  //             onPress={() => handleSelectLanguage(Language.ENGLISH)}
  //           >
  //             <Text className="text-lg">English</Text>
  //             <Text className="text-3xl">🇺🇸</Text>
  //           </Pressable>
  //         </View>
  //       </Pressable>
  //     </Modal>
  //   </View>
  // );
};

export default LanguageDropdown;
