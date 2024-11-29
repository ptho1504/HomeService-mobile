import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
};
import { getLocales } from "expo-localization";
import { i18n, Language } from "@/localization";
import { OnboardingItem } from "@/types/types";
// i18n.locale = getLocales()[0].languageCode ?? "vn";
i18n.locale = "vn";
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

export const onboardings: OnboardingItem[] = [
  {
    id: 1,
    title: i18n.t("onboard_1_title"),
    description: i18n.t("onboard_1_decription"),
    image: images.onboarding1,
  },
  {
    id: 2,
    title: i18n.t("onboard_2_title"),
    description: i18n.t("onboard_2_decription"),
    image: images.onboarding2,
  },
  {
    id: 3,
    title: i18n.t("onboard_3_title"),
    description: i18n.t("onboard_3_decription"),
    image: images.onboarding3,
  },
];

export const data = {
  onboardings,
};
