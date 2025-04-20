import { Pressable, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Language } from "@/localization";
import { getLang, setLanguage } from "@/store/reducers/language";
import FlagVN from "../svg/FlagVN";
import FlagUK from "../svg/FlagUK";

const LanguageToggleButton = ({ className }: { className?: string }) => {
  const lang = useSelector(getLang);
  const dispatch = useDispatch();

  const toggleLanguage = () => {
    const newLang =
      lang === Language.ENGLISH ? Language.VIETNAMESE : Language.ENGLISH;
    dispatch(setLanguage(newLang));
  };

  return (
    <Pressable
      onPress={toggleLanguage}
      className={className}
    >
      {lang === Language.VIETNAMESE ? <FlagVN /> : <FlagUK />}
    </Pressable>
  );
};

export default LanguageToggleButton;
