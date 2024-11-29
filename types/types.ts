export interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  image: string | number;
}

export interface BankAccount {
  accountNumber: string;
  bank: {
    logo: string;
    bin: string;
    fiName: string;
  };
}

export interface Address {
  id: string;
  customerName: string;
  phoneNumber: string;
  detail: string;
  ward: {
    code: {
      code: number;
      districtCode: {
        code: number;
        provinceCode: number;
      };
    };
    name: string;
    province: {
      code: number;
      name: string;
    };
  };
  latitude: number;
  longtitude: number;
  delete: boolean;
  default: boolean;
}

export interface User {
  id?: string;
  jwt?: string;
  avatar: string;
  email: string;
  role: string;
  dob: Date;
  name: string;
  gender: string;
  status: string;
  balance: number;
  phoneNumber: string;
  reputationPoint: number;
  googleSub: string;
  addresses: Address[];
  bankAccount: BankAccount;
}

