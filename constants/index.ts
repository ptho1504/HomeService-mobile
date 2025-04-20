import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import mk1 from "@/assets/images/mkt/mkt1.jpg";
import mk2 from "@/assets/images/mkt/mkt2.jpg";
import mk3 from "@/assets/images/mkt/mkt3.png";
import mk4 from "@/assets/images/mkt/mkt4.png";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  mk1,
  mk2,
  mk3,
  mk4,
};

import { i18n, Language } from "@/localization";
import { CarouselItem, OnboardingItem } from "@/types/types";

export const onboardings: OnboardingItem[] = [
  {
    id: 1,
    get title() {
      return i18n.t("onboard_1_title");
    },
    get description() {
      return i18n.t("onboard_1_decription");
    },
    image: images.onboarding1,
  },
  {
    id: 2,
    get title() {
      return i18n.t("onboard_2_title");
    },
    get description() {
      return i18n.t("onboard_2_decription");
    },
    image: images.onboarding2,
  },
  {
    id: 3,
    get title() {
      return i18n.t("onboard_3_title");
    },
    get description() {
      return i18n.t("onboard_3_decription");
    },
    image: images.onboarding3,
  },
];

export const carousels: CarouselItem[] = [
  {
    id: 1,
    title: "Title 1",
    get description() {
      return i18n.t("onboard_1_decription");
    },
    poster: images.mk1,
  },
  {
    id: 2,
    title: "Title 2",
    get description() {
      return i18n.t("onboard_2_decription");
    },
    poster: images.mk2,
  },
  {
    id: 3,
    title: "Title 3",
    get description() {
      return i18n.t("onboard_3_decription");
    },
    poster: images.mk3,
  },
  {
    id: 4,
    title: "Title 4",
    get description() {
      return i18n.t("onboard_3_decription");
    },
    poster: images.mk4,
  },
];

export const data = {
  onboardings,
};

export const UserStatus = {
  ACTIVE: {
    key: "ACTIVE",
    get value() {
      return i18n.t("word_user_status_active");
    },
    bgColor: "bg-green-400",
  },
  PROHIBITIVE: {
    key: "PROHIBITIVE",
    get value() {
      return i18n.t("word_user_status_prohibitive");
    },
    bgColor: "bg-red-400",
  },
};

export const QuestionType = {
  MULTICHOICE: {
    key: "MULTICHOICE",
    get value() {
      return i18n.t("word_multiple_choice");
    },
    bgColor: "bg-blue-400",
  },
  ESSAY: {
    key: "ESSAY",
    get value() {
      return i18n.t("word_essay");
    },
    bgColor: "bg-yellow-400",
  },
};

export const UserRole = {
  CUSTOMER: "CUSTOMER",
  FREELANCER: "FREELANCER",
};

export const WorkType = {
  BABYSITTING: {
    key: "BABYSITTING",
    get value() {
      return i18n.t("job_babysitting");
    },
    color: "gray",
  },
  HOUSECLEANING: {
    key: "HOUSECLEANING",
    get value() {
      return i18n.t("job_homecleaning");
    },
    color: "gray",
  },
};

export const PackageName = {
  _1DAY: {
    key: "_1DAY",
    get value() {
      return i18n.t("word__1day");
    },
  },
  _1MONTH: {
    key: "_1MONTH",
    get value() {
      return i18n.t("word__1month");
    },
  },
  _2MONTH: {
    key: "_2MONTH",
    get value() {
      return i18n.t("word__2month");
    },
  },
  _3MONTH: {
    key: "_3MONTH",
    get value() {
      return i18n.t("word__3month");
    },
  },
  _4MONTH: {
    key: "_4MONTH",
    get value() {
      return i18n.t("word__4month");
    },
  },
};

export const PaymentType = {
  QR: {
    key: "QR",
    get value() {
      return i18n.t("word_payment_qr");
    },
  },
  CASH: {
    key: "CASH",
    get value() {
      return i18n.t("word_payment_cash");
    },
  },
};

export const PostStatus = {
  INITIAL: {
    key: "INITIAL",
    get value() {
      return i18n.t("word_poststatus_initial");
    },
    bgColor: "bg-gray-400",
    action: "muted",
  },
  SCHEDULED: {
    key: "SCHEDULED",
    get value() {
      return i18n.t("word_poststatus_scheduled");
    },
    bgColor: "bg-blue-400",
    action: "info",
  },
  CANCELED: {
    key: "CANCELED",
    get value() {
      return i18n.t("word_poststatus_canceled");
    },
    bgColor: "bg-red-400",
    action: "warning",
  },
  DOING: {
    key: "DOING",
    get value() {
      return i18n.t("word_poststatus_doing");
    },
    bgColor: "bg-yellow-400",
    action: "info",
  },
  COMPLETED: {
    key: "COMPLETED",
    get value() {
      return i18n.t("word_poststatus_completed");
    },
    bgColor: "bg-green-400",
    action: "success",
  },
  FAILED: {
    key: "FAILED",
    get value() {
      return i18n.t("word_poststatus_failed");
    },
    bgColor: "bg-orange-400",
    action: "error",
  },
};

export const FreelancerWorkStatus = {
  INITIAL: {
    key: "INITIAL",
    get value() {
      return i18n.t("word_freelancer_work_initial");
    },
    bgColor: "blue-400",
  },
  PROHIBITIVE: {
    key: "PROHIBITIVE",
    get value() {
      return i18n.t("word_freelancer_work_prohibitive");
    },
    bgColor: "red-400",
  },
  WORK: {
    key: "WORK",
    get value() {
      return i18n.t("word_freelancer_work_work");
    },
    bgColor: "green-400",
  },
  DISABLE: {
    key: "DISABLE",
    get value() {
      return i18n.t("word_freelancer_work_disable");
    },
    bgColor: "gray-400",
  },
};

export const TakePostStatus = {
  PENDING: {
    key: "PENDING",
    get value() {
      return i18n.t("word_poststatus_pending");
    },
    bgColor: "bg-gray-400",
    priority: 1,
  },
  ACCEPTED: {
    key: "ACCEPTED",
    get value() {
      return i18n.t("word_poststatus_accepted");
    },
    bgColor: "bg-green-400",
    priority: 2,
  },
  REJECTED: {
    key: "REJECTED",
    get value() {
      return i18n.t("word_poststatus_rejected");
    },
    bgColor: "bg-red-400",
    priority: 0,
  },
};

export const WorkScheduleStatus = {
  INITIAL: {
    key: "INITIAL",
    get value() {
      return i18n.t("word_schedule_status_initial");
    },
    bgColor: "bg-gray-400",
    action: "warning",
  },
  DOING: {
    key: "DOING",
    get value() {
      return i18n.t("word_schedule_status_doing");
    },
    bgColor: "bg-yellow-400",
    action: "info",
  },
  COMPLETED: {
    key: "COMPLETED",
    get value() {
      return i18n.t("word_schedule_status_completed");
    },
    bgColor: "bg-green-400",
    action: "success",
  },
  CANCELED: {
    key: "CANCELED",
    get value() {
      return i18n.t("word_schedule_status_canceled");
    },
    bgColor: "bg-red-400",
    action: "error",
  },
};

export const ReturnCode = {
  SUCCESS: 1000,
};

export const LOCAL_STORAGE_JWT_KEY = "jwt";
export const LOCAL_STORAGE_OTP = "storage_otp";
