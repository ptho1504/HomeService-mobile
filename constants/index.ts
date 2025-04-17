import onboarding1 from '@/assets/images/onboarding1.png';
import onboarding2 from '@/assets/images/onboarding2.png';
import onboarding3 from '@/assets/images/onboarding3.png';
import mk1 from '@/assets/images/mkt/mkt1.jpg';
import mk2 from '@/assets/images/mkt/mkt2.jpg';
import mk3 from '@/assets/images/mkt/mkt3.png';
import mk4 from '@/assets/images/mkt/mkt4.png';
export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  mk1,
  mk2,
  mk3,
  mk4,
};
import { getLocales } from 'expo-localization';
import { i18n, Language } from '@/localization';
import { CarouselItem, OnboardingItem } from '@/types/types';
i18n.locale = getLocales()[0].languageCode ?? "vn";
// i18n.locale = 'vn';
// i18n.enableFallback = true;
// i18n.defaultLocale = Language.VIETNAMESE;

export const onboardings: OnboardingItem[] = [
  {
    id: 1,
    title: i18n.t('onboard_1_title'),
    description: i18n.t('onboard_1_decription'),
    image: images.onboarding1,
  },
  {
    id: 2,
    title: i18n.t('onboard_2_title'),
    description: i18n.t('onboard_2_decription'),
    image: images.onboarding2,
  },
  {
    id: 3,
    title: i18n.t('onboard_3_title'),
    description: i18n.t('onboard_3_decription'),
    image: images.onboarding3,
  },
];

export const carousels: CarouselItem[] = [
  {
    id: 1,
    title: 'Title 1',
    description: i18n.t('onboard_1_decription'),
    poster: images.mk1,
  },
  {
    id: 2,
    title: 'Title 2',
    description: i18n.t('onboard_2_decription'),
    poster: images.mk2,
  },
  {
    id: 3,
    title: 'Title 3',
    description: i18n.t('onboard_3_decription'),
    poster: images.mk3,
  },
  {
    id: 4,
    title: 'Title 4',
    description: i18n.t('onboard_3_decription'),
    poster: images.mk4,
  },
];

export const data = {
  onboardings,
};

export const UserStatus = {
  ACTIVE: {
    key: 'ACTIVE',
    value: i18n.t('word_user_status_active'),
    bgColor: 'bg-green-400',
  },
  PROHIBITIVE: {
    key: 'PROHIBITIVE',
    value: i18n.t('word_user_status_prohibitive'),
    bgColor: 'bg-red-400',
  },
};

export const QuestionType = {
  MULTICHOICE: {
    key: 'MULTICHOICE',
    value: i18n.t("word_multiple_choice"),
    bgColor: 'bg-blue-400', // Màu xám cho trạng thái khởi tạo
  },
  ESSAY: {
    key: 'ESSAY',
    value: i18n.t("word_essay"),
    bgColor: 'bg-yellow-400', // Màu xám cho trạng thái khởi tạo
  },
};

export const UserRole = {
  CUSTOMER: 'CUSTOMER',
  FREELANCER: 'FREELANCER',
};

export const WorkType = {
  BABYSITTING: {
    key: 'BABYSITTING',
    value: i18n.t("job_babysitting"),
    color: 'gray', // Màu xám cho trạng thái khởi tạo
  },
  HOUSECLEANING: {
    key: 'HOUSECLEANING',
    value: i18n.t("job_homecleaning"),
    color: 'gray', // Màu xám cho trạng thái khởi tạo
  },
};

export const PackageName = {
  _1DAY: {
    key: '_1DAY',
    value: i18n.t("word__1day"),
  },
  _1MONTH: {
    key: '_1MONTH',
    value: i18n.t("word__1month"),
  },
  _2MONTH: {
    key: '_2MONTH',
    value: i18n.t("word__2month"),
  },
  _3MONTH: {
    key: '_3MONTH',
    value: i18n.t("word__3month"),
  },
  _4MONTH: {
    key: '_4MONTH',
    value: i18n.t("word__4month"),
  },
};

export const PaymentType = {
  QR: {
    key: 'QR',
    value: i18n.t("word_payment_qr"),
  },
  CASH: {
    key: 'CASH',
    value: i18n.t("word_payment_cash"),
  },
};

export const PostStatus = {
  INITIAL: {
    key: 'INITIAL',
    value: i18n.t("word_poststatus_initial"),
    bgColor: 'bg-gray-400', // Màu xám cho trạng thái khởi tạo
    action: 'muted',
  },
  SCHEDULED: {
    key: 'SCHEDULED',
    value: i18n.t("word_poststatus_scheduled"),
    bgColor: 'bg-blue-400', // Màu xanh dương cho trạng thái đã lên lịch
    action: 'info',
  },
  CANCELED: {
    key: 'CANCELED',
    value: i18n.t("word_poststatus_canceled"),
    bgColor: 'bg-red-400', // Màu đỏ cho trạng thái bị hủy
    action: 'warning',
  },
  DOING: {
    key: 'DOING',
    value: i18n.t("word_poststatus_doing"),
    bgColor: 'bg-yellow-400', // Màu vàng cho trạng thái đang làm
    action: 'info',
  },
  COMPLETED: {
    key: 'COMPLETED',
    value: i18n.t("word_poststatus_completed"),
    bgColor: 'bg-green-400', // Màu xanh lá cho trạng thái hoàn thành
    action: 'success',
  },
  FAILED: {
    key: 'FAILED',
    value: i18n.t("word_poststatus_failed"),
    bgColor: 'bg-orange-400', // Màu cam cho trạng thái thất bại
    action: 'error',
  },
};

export const FreelancerWorkStatus = {
  INITIAL: {
    key: 'INITIAL',
    value: i18n.t("word_freelancer_work_initial"),
    bgColor: 'blue-400', // Màu xám cho trạng thái khởi tạo
  },
  PROHIBITIVE: {
    key: 'PROHIBITIVE',
    value: i18n.t("word_freelancer_work_prohibitive"),
    bgColor: 'red-400', // Màu đỏ cho trạng thái bị hủy
  },
  WORK: {
    key: 'WORK',
    value: i18n.t("word_freelancer_work_work"),
    bgColor: 'green-400', // Màu xanh lá cho trạng thái hoàn thành
  },
  DISABLE: {
    key: 'DISABLE',
    value: i18n.t("word_freelancer_work_disable"),
    bgColor: 'gray-400', // Màu cam cho trạng thái thất bại
  },
};

export const TakePostStatus = {
  PENDING: {
    key: 'PENDING',
    value: i18n.t("word_poststatus_pending"),
    bgColor: 'bg-gray-400', // Màu xám cho trạng thái khởi tạo
    priority: 1,
  },
  ACCEPTED: {
    key: 'ACCEPTED',
    value: i18n.t("word_poststatus_accepted"),
    bgColor: 'bg-green-400', // Màu xanh dương cho trạng thái đã lên lịch
    priority: 2,
  },
  REJECTED: {
    key: 'REJECTED',
    value: i18n.t("word_poststatus_rejected"),
    bgColor: 'bg-red-400', // Màu đỏ cho trạng thái bị hủy
    priority: 0,
  },
};

export const WorkScheduleStatus = {
  INITIAL: {
    key: 'INITIAL',
    value: i18n.t("word_schedule_status_initial"),
    bgColor: 'bg-gray-400', // Màu xám cho trạng thái khởi tạo
    action: 'warning',
  },
  DOING: {
    key: 'DOING',
    value: i18n.t("word_schedule_status_doing"),
    bgColor: 'bg-yellow-400', // Màu xanh dương cho trạng thái đã lên lịch
    action: 'info',
  },
  COMPLETED: {
    key: 'COMPLETED',
    value: i18n.t("word_schedule_status_completed"),
    bgColor: 'bg-green-400', // Màu xanh dương cho trạng thái đã lên lịch
    action: 'success',
  },
  CANCELED: {
    key: 'CANCELED',
    value: i18n.t("word_schedule_status_canceled"),
    bgColor: 'bg-red-400', // Màu đỏ cho trạng thái bị hủy
    action: 'error',
  },
};

export const ReturnCode = {
  SUCCESS: 1000,
};

export const LOCAL_STORAGE_JWT_KEY = 'jwt';
export const LOCAL_STORAGE_OTP = 'storage_otp';
