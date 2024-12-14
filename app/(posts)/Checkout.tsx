import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { CreatePostModel, HouseCleaningOption } from '@/types/postTypes';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScrollPickerModal from '@/components/post/ScrollPickerModal';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostForm, selectPostForm } from '@/store/reducers';
import { router, useLocalSearchParams } from 'expo-router';
import { useCreatePostMutation } from '@/services/post';
import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from '@/components/ui/toast';
import PostInfo from '@/components/post/PostInfo';
import PostAddress from '@/components/post/PostAddress';
import { LinearGradient } from 'expo-linear-gradient';

const options: HouseCleaningOption[] = [
  { area: 60, totalFreelancers: 2, duration: 3 },
  { area: 80, totalFreelancers: 2, duration: 4 },
  { area: 100, totalFreelancers: 3, duration: 3 },
  { area: 150, totalFreelancers: 3, duration: 4 },
  { area: 200, totalFreelancers: 4, duration: 6 },
  { area: 400, totalFreelancers: 4, duration: 8 },
];

const addressId = '9b18beec-a0da-4b40-a377-b8adc0612b2a';

const Checkout = () => {
  const dispatch = useDispatch();
  const [createPost, { isLoading, error, data }] = useCreatePostMutation();
  const { workType } = useLocalSearchParams();
  const [showPickerModal, setShowPickerModal] = useState<boolean>(false);

  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<string>('QR');
  const [customerNote, setCustomerNote] = useState<string>('');

  const toast = useToast();

  const postForm = useSelector(selectPostForm);

  const handlePost = async () => {
    if (postForm != null) {
      const data: CreatePostModel = {
        ...postForm,
        addressId: addressId,
        customerNote: customerNote,
        paymentType: paymentType,
      };
      const res = await createPost(data);
      if (error || res.data?.returnCode != 1000) {
        toast.show({
          placement: 'top',
          duration: 3000,
          render: ({ id }) => {
            const uniqueToastId = 'toast-' + id;
            return (
              <Toast nativeID={uniqueToastId} action="error" variant="outline">
                <ToastTitle>Đăng công việc thất bại</ToastTitle>
                <ToastDescription>{res.error.data.message}</ToastDescription>
              </Toast>
            );
          },
        });
      } else {
        toast.show({
          placement: 'top',
          duration: 3000,
          render: ({ id }) => {
            const uniqueToastId = 'toast-' + id;
            return (
              <Toast
                nativeID={uniqueToastId}
                action="success"
                variant="outline"
              >
                <ToastTitle>Thành công</ToastTitle>
                <ToastDescription>Đăng công việc thành công</ToastDescription>
              </Toast>
            );
          },
        });
        dispatch(clearPostForm());

        router.dismissTo(`/Post?workType=${workType}`);
      }
    }
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
            <PostAddress canChange={true} />
            <PostInfo workType={workType} postForm={postForm} />
            <Card size="md" variant="elevated" className="shadow-2xl">
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
            <Card size="md" variant="elevated" className="shadow-2xl">
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
            <Text className="text-xl font-semibold text-success-400">
              {postForm?.price.toLocaleString()} VND
            </Text>
          </Box>
          <Button
            size="xl"
            className="bg-success-300 flex flex-row items-center justify-center"
            action="positive"
            onPress={handlePost}
          >
            {isLoading && <ButtonSpinner className="text-secondary-50" />}
            <ButtonText>Đăng việc</ButtonText>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default Checkout;
