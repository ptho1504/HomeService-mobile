import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import {
  BabysittingModel,
  CreatePostModel,
  CreateWorkScheduleModel,
  HouseCleaningModel,
  HouseCleaningOption,
  Package,
} from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import {
  convertToTime,
  generateNext7Days,
  getWorkSchedulesByDaysOfWeek,
} from '@/utils/dateUtil';
import { Button, ButtonText } from '@/components/ui/button';
import { router, useLocalSearchParams } from 'expo-router';
import {
  calculateBabysittingPrice,
  calculateHouseCleaningPrice,
} from '@/utils/priceUtil';
import { PackageName, WorkType } from '@/constants';
import PackageSelect, { packages } from '@/components/post/PackageSelect';
import PostOption from '@/components/post/PostOption';
import WorkSchedule from '@/components/post/WorkSchedule';
import HouseCleaningSelect, {
  houseCleaningOptions,
} from '@/components/post/HouseCleaningSelect';
import BabysittingSelect, {
  ageRange,
  babysittingDurations,
  numsOfBaby,
} from '@/components/post/BabysittingSelect';
import { useDispatch } from 'react-redux';
import { setPostForm } from '@/store/reducers';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/components/ui/toast';
import { LinearGradient } from 'expo-linear-gradient';

const userId = 'USER-1';
const workId = 'WORK-1';

const HouseCleaningForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { workType } = useLocalSearchParams();

  const [selectedHouseCleaningOption, setSelectedHouseCleaningOption] =
    useState<HouseCleaningOption>(houseCleaningOptions[0]);
  const [selectedPackage, setSelectedPackage] = useState<Package>(packages[0]);
  const [days, setDays] = useState<Date[]>([]);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);

  const [chooseFreelancers, setChooseFreelancers] = useState<boolean>(false);
  const [workSchedules, setWorkSchedules] = useState<CreateWorkScheduleModel[]>(
    [],
  );

  const [selectedHour, setSelectedHour] = useState<number>(7);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);

  const [numOfBaby, setNumOfBaby] = useState<number>(numsOfBaby[0]);
  const [ages, setAges] = useState<number[]>([ageRange[0].key]);
  const [duration, setDuration] = useState<number>(babysittingDurations[0]);

  const [price, setPrice] = useState<number>(0);

  const handleSelectNumOfBaby = (option: number) => {
    setNumOfBaby(option);

    // Cập nhật danh sách `ages` dựa trên số lượng trẻ
    if (option > ages.length) {
      setAges(prevAges => [
        ...prevAges,
        ...Array(option - prevAges.length).fill(ageRange[0].key),
      ]);
    } else {
      setAges(prevAges => prevAges.slice(0, option));
    }
  };

  const handleAddBaby = (childIndex: number, newAge: number) => {
    if (childIndex >= 0 && childIndex < ages.length) {
      setAges(prevAges =>
        prevAges.map((age, index) => (index === childIndex ? newAge : age)),
      );
    }
  };

  const handleSelectDuration = (duration: number) => {
    setDuration(duration);
  };

  const checkWorkSchedules = (): boolean => {
    if (workSchedules.length === 0) {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="outline">
              <ToastTitle>Xử lý thất bại</ToastTitle>
              <ToastDescription>Vui lòng chọn lịch làm việc</ToastDescription>
            </Toast>
          );
        },
      });
      return false;
    }
    return true;
  };

  const navigateToCheckout = () => {
    if (!checkWorkSchedules()) {
      return;
    }
    const createPost: CreatePostModel = {
      startTime: convertToTime(selectedHour, selectedMinute, 0),
      duration:
        workType === WorkType.BABYSITTING.key
          ? duration
          : selectedHouseCleaningOption.duration,
      price: price,
      paymentType: '',
      totalFreelancer:
        workType === WorkType.BABYSITTING.key
          ? 1
          : selectedHouseCleaningOption.totalFreelancers,
      packageName: selectedPackage.key,
      totalWorkDay: workSchedules.length,
      chooseFreelancer: chooseFreelancers,
      workSchedules: workSchedules,
      customerId: userId,
      addressId: '',
      workId: workType === WorkType.BABYSITTING.key ? 'WORK-2' : 'WORK-1',
      payment: false,
    };
    if (workType === WorkType.BABYSITTING.key) {
      const babysitting: BabysittingModel = {
        numOfBaby: numOfBaby,
        babies: ages.map(age => ({ age })),
      };
      createPost.babysitting = babysitting;
    } else {
      const houseCleaning: HouseCleaningModel = {
        area: selectedHouseCleaningOption.area,
      };
      createPost.houseCleaning = houseCleaning;
    }
    dispatch(setPostForm(createPost));
    router.push(`/Checkout?workType=${workType}`);
  };

  const toggleSwitch = () => {
    setChooseFreelancers(() => !chooseFreelancers);
  };

  useEffect(() => {
    const days: Date[] = generateNext7Days();
    setDays(days);
    const initWorkSchedule: CreateWorkScheduleModel = { date: days[0] };
    setWorkSchedules(prevWorkSchedules => [
      ...prevWorkSchedules,
      initWorkSchedule,
    ]);
  }, []);

  useEffect(() => {
    let calculatedPrice = 0;
    if (workType === WorkType.BABYSITTING.key) {
      calculatedPrice = calculateBabysittingPrice(
        numOfBaby,
        duration,
        workSchedules.length,
      );
    } else {
      calculatedPrice = calculateHouseCleaningPrice(
        selectedHouseCleaningOption.area,
        selectedHouseCleaningOption.totalFreelancers,
        selectedHouseCleaningOption.duration,
        workSchedules.length,
      );
    }
    setPrice(calculatedPrice);
  }, [numOfBaby, duration, workSchedules, selectedHouseCleaningOption]);

  const handleHouseCleaningOptionSelect = (option: HouseCleaningOption) => {
    setSelectedHouseCleaningOption(option);
  };

  const handlePackageSelect = (pack: Package) => {
    setSelectedPackage(pack);
    setWorkSchedules(
      pack.key === PackageName._1DAY.key ? [{ date: days[0] }] : [],
    );
    setDaysOfWeek([]);
  };

  const handleAddWorkScheduleByDate = (date: Date) => {
    setWorkSchedules([{ date }]);
  };

  const handleAddWorkScheduleByDayOfWeek = (dayOfWeek: string) => {
    let updatedDaysOfWeek: string[];
    if (daysOfWeek.includes(dayOfWeek)) {
      updatedDaysOfWeek = daysOfWeek.filter(day => day !== dayOfWeek);
      setDaysOfWeek(updatedDaysOfWeek);
    } else {
      updatedDaysOfWeek = [...daysOfWeek, dayOfWeek];
      setDaysOfWeek(updatedDaysOfWeek);
    }
    const updatedWorkSchedules: CreateWorkScheduleModel[] =
      getWorkSchedulesByDaysOfWeek(
        updatedDaysOfWeek,
        selectedPackage.month,
      ).map(date => ({ date }));
    setWorkSchedules(updatedWorkSchedules);
  };

  return (
    <SafeAreaView className="flex h-full">
      <LinearGradient
        // Background Linear Gradient
        colors={['#ebf7eb', 'transparent', '#ffffff']}
        className="absolute h-[1000px] left-0 right-0 top-0"
      />
      <ScrollView>
        <Box className="overflow-y-auto m-3">
          <VStack space="md">
            {workType === WorkType.BABYSITTING.key ? (
              <BabysittingSelect
                duration={duration}
                handleSelectDuration={handleSelectDuration}
                numOfBaby={numOfBaby}
                handleSelectNumOfBaby={handleSelectNumOfBaby}
                ages={ages}
                handleAddBaby={handleAddBaby}
              />
            ) : (
              <HouseCleaningSelect
                selectedOption={selectedHouseCleaningOption}
                handleOptionSelect={handleHouseCleaningOptionSelect}
              />
            )}

            <PackageSelect
              selectedPackage={selectedPackage}
              handlePackageSelect={handlePackageSelect}
            />
            <WorkSchedule
              selectedPackage={selectedPackage}
              days={days}
              handleAddWorkScheduleByDate={handleAddWorkScheduleByDate}
              handleAddWorkScheduleByDayOfWeek={
                handleAddWorkScheduleByDayOfWeek
              }
              workSchedules={workSchedules}
              daysOfWeek={daysOfWeek}
              selectedHour={selectedHour}
              selectedMinute={selectedMinute}
              setSelectedHour={setSelectedHour}
              setSelectedMinute={setSelectedMinute}
            />

            <PostOption
              chooseFreelancers={chooseFreelancers}
              toggleSwitch={toggleSwitch}
            />
          </VStack>
        </Box>
      </ScrollView>
      <Box className="sticky bg-white p-4 rounded-t-lg shadow-lg">
        <Button
          onPress={navigateToCheckout}
          size="xl"
          className="bg-success-300 flex flex-row items-center justify-between"
          action="positive"
        >
          <ButtonText>{price.toLocaleString()} VND</ButtonText>
          <ButtonText className="text-md font-normal">Tiếp theo</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default HouseCleaningForm;
