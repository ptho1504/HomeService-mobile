import { AddressModel, UserModel } from './userTypes';
import { WorkModel } from './workTypes';

export type RootStackParamList = {
  UpcomingWork: { status: string };
  PackageWork: { status: string };
  PastWork: { status: string };
  NewPost: { status: string };
  RequestPost: { status: string };
};

export interface HouseCleaningOption {
  area: number;
  totalFreelancers: number;
  duration: number;
}

export interface Package {
  key: string;
  value: string;
  month: number;
}

export interface CreateTakePostModel {
  id: string;
  freelancerId: string;
  status: string;
}

export interface CreatePostModel {
  customerNote?: string;
  startTime: string; // ISO 8601 date string
  duration: number;
  price: number;
  paymentType: string;
  totalFreelancer: number;
  packageName: string;
  totalWorkDay: number;
  chooseFreelancer: boolean;
  houseCleaning?: HouseCleaningModel;
  babysitting?: BabysittingModel;
  workSchedules: CreateWorkScheduleModel[];
  customerId: string;
  addressId: string;
  workId: string;
  payment: boolean;
}

export interface CreateWorkScheduleModel {
  date: Date;
}

export interface PostModel {
  id: string;
  createdAt: number[]; // [Year, Month, Day, Hour, Minute, Second, Millisecond]
  updatedAt: number[];
  customerNote: string;
  startTime: string; // HH:mm:ss
  duration: number; // Duration in minutes
  price: number;
  status: string; // e.g., "INITIAL"
  paymentType: string; // e.g., "QR"
  totalFreelancer: number;
  numOfFreelancer: number;
  packageName: string; // e.g., "_1MONTH"
  totalWorkDay: number;
  numOfWorkedDay: number;
  chooseFreelancer: boolean;
  customer: UserModel;
  workSchedules: WorkScheduleModel[];
  work: WorkModel;
  houseCleaning: HouseCleaningModel | null;
  babysitting: BabysittingModel | null;
  payment: boolean;
  address: AddressModel;
  freelancerTakePosts: TakePostModel[];
}

export interface TakePostModel {
  id: string;
  status: string;
  freelancer: UserModel;
  createdAt: number[]; // [Year, Month, Day, Hour, Minute, Second, Millisecond]
  updatedAt: number[];
  post: PostModel;
}

export interface WorkScheduleModel {
  id: string;
  date: number[]; // [Year, Month, Day]
  status: string; // e.g., "INITIAL"
}

export interface HouseCleaningModel {
  area: number;
}

export interface BabysittingModel {
  numOfBaby: number;
  babies: BabyModel[];
}

export interface BabyModel {
  age: number;
}
