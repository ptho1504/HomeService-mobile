import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Switch } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Heading } from '@/components/ui/heading';
import { Grid, GridItem } from '@/components/ui/grid';
import { HouseCleaningOption, Package, WorkDay } from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import { generateNext7Days } from '@/utils/dateUtil';
import ScrollPickerModal from '@/components/post/ScrollPickerModal';
import { Button, ButtonText } from '@/components/ui/button';

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

const Checkout = () => {
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
                <Heading>Địa chỉ làm việc</Heading>
                <VStack
                  space="md"
                  className="border p-2 rounded-lg border-primary-50"
                >
                  <HStack space="sm" className="items-center">
                    <Text className="text-red-600 text-md">
                      <Ionicons name="location" size={24} />
                    </Text>
                    <Text className="font-medium">
                      Phước Tân, Biên Hòa, Đồng Nai
                    </Text>
                  </HStack>
                  <HStack className="justify-between items-center">
                    <HStack space="sm" className="items-center">
                      <Text className="text-cyan-600 text-md">
                        <Ionicons name="person" size={24} />
                      </Text>
                      <VStack>
                        <Text className="font-medium">Nguyễn Đại Tiến</Text>
                        <Text>0346066323</Text>
                      </VStack>
                    </HStack>
                    <Button
                      action="positive"
                      className="rounded-lg bg-green-600"
                    >
                      <ButtonText>Thay đổi</ButtonText>
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </Card>
            <Card size="md" variant="elevated">
              <VStack space="md">
                <Heading>Thông tin công việc</Heading>
              </VStack>
            </Card>
            <Card size="md" variant="elevated">
              <VStack space="md">
                <Heading>Hình thức thanh toán</Heading>
                <Text className="text-gray-500">
                  Chọn ngày làm việc và thời gian phù hợp.
                </Text>
              </VStack>
            </Card>
            <Card size="md" variant="elevated">
              <VStack space="md">
                <Heading>Ghi chú cho Freelancers</Heading>
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
      <Box className="sticky bg-white p-4 rounded-t-lg">
        <Button
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

export default Checkout;
