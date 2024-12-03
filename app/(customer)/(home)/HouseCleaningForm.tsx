import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Switch } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Heading } from '@/components/ui/heading';
import { Grid, GridItem } from '@/components/ui/grid';
import {
  CreatePostModel,
  HouseCleaningOption,
  Package,
  WorkDay,
} from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import { generateNext7Days } from '@/utils/dateUtil';
import ScrollPickerModal from '@/components/post/ScrollPickerModal';
import { Button, ButtonText } from '@/components/ui/button';
import { router, useNavigation } from 'expo-router';

const options: HouseCleaningOption[] = [
  { area: 60, totalFreelancers: 2, duration: 3 },
  { area: 80, totalFreelancers: 2, duration: 4 },
  { area: 100, totalFreelancers: 3, duration: 3 },
  { area: 150, totalFreelancers: 3, duration: 4 },
  { area: 200, totalFreelancers: 4, duration: 6 },
  { area: 400, totalFreelancers: 4, duration: 8 },
];

const packages: Package[] = [
  {
    key: '_1DAY',
    value: 'Gói lẻ',
  },
  {
    key: '_1MONTH',
    value: '1 tháng',
  },
  {
    key: '_2MONTH',
    value: '2 tháng',
  },
  {
    key: '_3MONTH',
    value: '3 tháng',
  },
];

const HouseCleaningForm = () => {
  const navigation = useNavigation();
  const [postForm, setPostForm] = useState<CreatePostModel>({
    customerNote: '',
    startTime: '',
    duration: 0,
    price: 0,
    paymentType: '',
    totalFreelancer: 0,
    packageName: '',
    totalWorkDay: 0,
    chooseFreelancer: false,
    workSchedules: [],
    customerId: '',
    addressId: '',
    workId: '',
    payment: false,
  });
  const [selectedOption, setSelectedOption] = useState<HouseCleaningOption>(
    options[0],
  );
  const [selectedPackage, setSelectedPackage] = useState<Package>(packages[0]);
  const [daysOfWeek, setDaysOfWeek] = useState<WorkDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [showPickerModal, setShowPickerModal] = useState<boolean>(false);

  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [chooseFreelancers, setChooseFreelancers] = useState<boolean>(false);

  const navigateToCheckout = () => {
    setPostForm({ ...postForm });
    router.push({
      pathname: '/Checkout',
    });
  };

  const toggleSwitch = async () => {
    setChooseFreelancers(() => !chooseFreelancers);
  };

  useEffect(() => {
    const days: WorkDay[] = generateNext7Days();
    setDaysOfWeek(days);
    setSelectedDay(days[0]?.day); // Mặc định chọn ngày đầu tiên
  }, []);

  const handleOptionSelect = (option: HouseCleaningOption) => {
    console.info({ option });
    setSelectedOption(option);
  };

  const handlePackageSelect = (pack: Package) => {
    setSelectedPackage(pack);
  };

  return (
    <SafeAreaView className="flex h-full">
      <ScrollView>
        <Box className="overflow-y-auto m-3">
          <VStack space="md">
            <Card size="md" variant="elevated">
              <VStack space="md">
                <Heading>Thời lượng và diện tích</Heading>
                <Text className="text-gray-500">
                  Vui lòng ước tính chính xác diện tích cần dọn đẹp.
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <VStack space="sm">
                    <HStack space="sm" className="justify-between items-center">
                      {options.slice(0, 3).map((option, index) => (
                        <Pressable
                          key={index}
                          onPress={() => handleOptionSelect(option)}
                          className={`border rounded-lg p-4 ${
                            selectedOption === option
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          <VStack>
                            <Text
                              size="lg"
                              className={`font-semibold ${
                                selectedOption === option
                                  ? 'text-green-600'
                                  : ''
                              }`}
                            >
                              Tối đa {option.area}m²
                            </Text>
                            <Text size="md" className="text-gray-500">
                              {option.totalFreelancers} người /{' '}
                              {option.duration} giờ
                            </Text>
                          </VStack>
                        </Pressable>
                      ))}
                    </HStack>
                    <HStack space="sm" className="justify-between items-center">
                      {options.slice(3).map((option, index) => (
                        <Pressable
                          key={index + 3} // Đảm bảo key là duy nhất
                          onPress={() => handleOptionSelect(option)}
                          className={`border rounded-lg p-4 ${
                            selectedOption === option
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          <VStack>
                            <Text
                              size="lg"
                              className={`font-semibold ${
                                selectedOption === option
                                  ? 'text-green-600'
                                  : ''
                              }`}
                            >
                              Tối đa {option.area}m²
                            </Text>
                            <Text size="md" className="text-gray-500">
                              {option.totalFreelancers} người /{' '}
                              {option.duration} giờ
                            </Text>
                          </VStack>
                        </Pressable>
                      ))}
                    </HStack>
                  </VStack>
                </ScrollView>
              </VStack>
            </Card>
            <Card size="md" variant="elevated">
              <VStack space="md">
                <Heading>Loại gói</Heading>

                <Grid
                  className="gap-4"
                  _extra={{
                    className: 'grid-cols-12',
                  }}
                >
                  {packages.map((pack, index) => (
                    <GridItem
                      key={index}
                      _extra={{
                        className: 'col-span-5',
                      }}
                    >
                      <Pressable
                        onPress={() => handlePackageSelect(pack)}
                        className={`border rounded-lg p-4 ${
                          selectedPackage === pack
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        <VStack className="">
                          <Text
                            size="lg"
                            className={`font-semibold ${
                              selectedPackage === pack ? 'text-green-600' : ''
                            }`}
                          >
                            {pack.value}
                          </Text>
                        </VStack>
                      </Pressable>
                    </GridItem>
                  ))}
                </Grid>
              </VStack>
            </Card>
            <Card size="md" variant="elevated">
              <VStack space="md">
                <Heading>Lịch làm việc</Heading>
                <Text className="text-gray-500">
                  Chọn ngày làm việc và thời gian phù hợp.
                </Text>

                <VStack space="lg">
                  {/* Chọn ngày làm việc */}
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <HStack space="sm" className="justify-between items-center">
                      {daysOfWeek.map(day => (
                        <Pressable
                          key={day.day}
                          onPress={() => setSelectedDay(day.day)}
                          className={`rounded-lg border p-2 w-16 h-16 flex items-center justify-center ${
                            selectedDay === day.day
                              ? 'bg-green-50 border-green-500'
                              : 'bg-white border-gray-300'
                          }`}
                        >
                          <Text
                            className={`text-lg font-semibold ${
                              selectedDay === day.day
                                ? 'text-green-600'
                                : 'text-gray-700'
                            }`}
                          >
                            {day.day}
                          </Text>
                          <Text
                            className={`text-lg ${
                              selectedDay === day.day
                                ? 'text-green-600'
                                : 'text-gray-700'
                            }`}
                          >
                            {day.date}
                          </Text>
                        </Pressable>
                      ))}
                    </HStack>
                  </ScrollView>

                  {/* Chọn giờ làm việc */}
                  <HStack
                    space="sm"
                    className="items-center border border-gray-400 p-2 rounded-lg justify-between"
                  >
                    <HStack space="sm" className="items-center">
                      <Text className="text-cyan-600 text-md">
                        <Ionicons name="time-outline" size={24} />
                      </Text>
                      <Text className="text-lg font-medium">
                        Giờ bắt đầu làm
                      </Text>
                    </HStack>

                    <Pressable onPress={() => setShowPickerModal(true)}>
                      <HStack
                        space="md"
                        className="px-4 py-2 bg-gray-100 rounded-lg"
                      >
                        <Text className="font-medium">{selectedHour}</Text>
                        <Text>:</Text>
                        <Text className="font-medium">{selectedMinute}</Text>
                      </HStack>
                    </Pressable>
                  </HStack>
                </VStack>
              </VStack>
            </Card>
            <Card size="md" variant="elevated">
              <VStack space="md">
                <Heading>Tùy chọn</Heading>

                <VStack space="lg">
                  <HStack space="sm" className="items-center justify-between">
                    <HStack space="sm" className="items-center">
                      <Text className="text-green-600 text-md">
                        <Ionicons name="people-outline" size={24} />
                      </Text>
                      <Text className="text-lg font-medium">
                        Tự chọn freelancers
                      </Text>

                      <Text className="text-green-600 text-md">
                        <Ionicons name="help-circle-outline" size={16} />
                      </Text>
                    </HStack>

                    <Switch
                      trackColor={{ false: '#767577', true: '#D1FAE5' }}
                      thumbColor={chooseFreelancers ? '#22C55E' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={chooseFreelancers}
                    />
                  </HStack>
                </VStack>
              </VStack>
            </Card>
          </VStack>
        </Box>
        <ScrollPickerModal
          showPickerModal={showPickerModal}
          setShowPickerModal={setShowPickerModal}
          setSelectedHour={setSelectedHour}
          setSelectedMinute={setSelectedMinute}
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
        />
      </ScrollView>
      <Box className="sticky bg-white p-4 rounded-t-lg shadow-lg">
        <Button
          onPress={navigateToCheckout}
          size="xl"
          className="bg-green-500 flex flex-row items-center justify-between"
          action="positive"
        >
          <ButtonText>100,000 VND</ButtonText>
          <ButtonText className="text-md font-normal">Tiếp theo</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default HouseCleaningForm;
