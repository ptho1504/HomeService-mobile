import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Switch, View } from 'react-native';
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
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { Textarea, TextareaInput } from '@/components/ui/textarea';

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

interface Props {
  postForm: CreatePostModel;
}

const Checkout = ({ postForm }: Props) => {
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
  const [paymentType, setPaymentType] = useState<string>('CASH');
  const [customerNote, setCustomerNote] = useState<string>('CASH');

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
                  className="border p-4 rounded-lg border-secondary-50"
                >
                  <HStack space="sm" className="items-center">
                    <Text className="text-red-600 text-lg">
                      <Ionicons name="location" size={24} />
                    </Text>
                    <Text className="font-medium text-lg">
                      Phước Tân, Biên Hòa, Đồng Nai
                    </Text>
                  </HStack>
                  <HStack className="justify-between items-center">
                    <HStack space="sm" className="items-center">
                      <Text className="text-cyan-600 text-lg">
                        <Ionicons name="person" size={24} />
                      </Text>
                      <VStack>
                        <Text className="font-medium text-lg">
                          Nguyễn Đại Tiến
                        </Text>
                        <Text>0346066323</Text>
                      </VStack>
                    </HStack>
                    <Button
                      action="positive"
                      className="rounded-2xl bg-green-600"
                      size="sm"
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
                <VStack
                  space="md"
                  className="border p-4 rounded-lg border-secondary-50"
                >
                  <HStack space="sm" className="items-center">
                    <Text className="font-medium text-lg">
                      Loại công việc:{' '}
                    </Text>
                    <Text className="text-lg">Dọn dẹp nhà</Text>
                  </HStack>
                  <HStack space="sm" className="items-center">
                    <Text className="font-medium text-lg">Diện tích:</Text>
                    <Text className="text-lg">60 m²</Text>
                  </HStack>
                  <HStack space="sm" className="items-center">
                    <Text className="font-medium text-lg">Thời lượng:</Text>
                    <Text className="text-lg">3 người/2 giờ</Text>
                  </HStack>
                  <HStack space="sm" className="items-center">
                    <Text className="font-medium text-lg">Loại gói:</Text>
                    <Text className="text-lg">1 tháng</Text>
                  </HStack>
                  <HStack space="sm" className="items-center">
                    <Text className="font-medium text-lg">
                      Giờ bắt đầu làm:
                    </Text>
                    <Text className="text-lg">02:30</Text>
                  </HStack>
                </VStack>
              </VStack>
            </Card>
            <Card size="md" variant="elevated">
              <VStack space="md">
                <Heading>Hình thức thanh toán</Heading>
                <VStack
                  space="md"
                  className="border p-4 rounded-lg border-secondary-50"
                >
                  <RadioGroup value={paymentType} onChange={setPaymentType}>
                    <VStack space="lg">
                      <Radio
                        value="QR"
                        size="lg"
                        isInvalid={false}
                        isDisabled={false}
                        className="flex flex-row justify-between items-center"
                      >
                        <HStack space="md" className="items-center">
                          <Text className="text-md">
                            <Ionicons name="qr-code-outline" size={20} />
                          </Text>
                          <RadioLabel>Trừ vào số dư</RadioLabel>
                        </HStack>

                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                      </Radio>
                      <Radio
                        value="CASH"
                        size="lg"
                        isInvalid={false}
                        isDisabled={false}
                        className="flex flex-row justify-between items-center"
                      >
                        <HStack space="md" className="items-center">
                          <Text className="text-md text-green-600">
                            <Ionicons name="cash-outline" size={20} />
                          </Text>
                          <RadioLabel>Thanh toán tiền mặt</RadioLabel>
                        </HStack>

                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </VStack>
              </VStack>
            </Card>
            <Card size="md" variant="elevated">
              <VStack space="md">
                <Heading>Ghi chú cho Freelancers</Heading>
                <Text className="text-gray-500">
                  Ghi chú giúp Freelancers làm tốt hơn
                </Text>
                <Textarea
                  size="md"
                  isReadOnly={false}
                  isInvalid={false}
                  isDisabled={false}
                >
                  <TextareaInput
                    value={customerNote}
                    onChangeText={setCustomerNote}
                    placeholder="Ghi chú dành cho Freelancers ở đây..."
                  />
                </Textarea>
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
        <VStack space="md">
          <Box className="flex flex-row justify-between items-center">
            <Text className="text-xl font-semibold">Tổng cộng:</Text>
            <Text className="text-xl font-semibold text-green-600">
              100,000 VND
            </Text>
          </Box>
          <Button
            size="xl"
            className="bg-green-500 flex flex-row items-center justify-center"
            action="positive"
          >
            <ButtonText>Đăng việc</ButtonText>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default Checkout;
