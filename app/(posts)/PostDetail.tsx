import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import Ionicons from '@expo/vector-icons/Ionicons';

import { PaymentType } from '@/constants';

import PostInfo from '@/components/post/PostInfo';
import PostAddress from '@/components/post/PostAddress';
import PaymentStatusBadge from '@/components/badge/PaymentStatusBadge';
import { useSelector } from 'react-redux';
import { selectPost } from '@/store/reducers';

const PostDetail = () => {
  const post = useSelector(selectPost);

  return (
    <SafeAreaView className="flex h-full">
      {post === null ? (
        <Box>
          <Text>Công việc không tồn tại</Text>
        </Box>
      ) : (
        <ScrollView>
          <Box className="overflow-y-auto m-3">
            <VStack space="md">
              <PostInfo
                workType={post.work.name}
                postForm={post}
                showStatus={true}
              />
              <PostAddress canChange={false} />

              <Card size="md" variant="elevated">
                <VStack space="md">
                  <Heading>Thanh toán</Heading>
                  <VStack
                    space="md"
                    className="border p-4 rounded-lg border-secondary-50"
                  >
                    <HStack space="md" className="items-center">
                      <Text className="font-medium text-lg">
                        Tổng thanh toán :
                      </Text>
                      <Text className="font-medium text-lg text-green-600">
                        {post.price.toLocaleString()} VND
                      </Text>
                    </HStack>
                    <HStack space="md" className="items-center">
                      <Text className="font-medium text-lg">Hình thức :</Text>
                      <HStack space="md" className="items-center">
                        <Text className="text-md">
                          <Ionicons
                            name={
                              post.paymentType === PaymentType.CASH.key
                                ? 'cash-outline'
                                : 'qr-code-outline'
                            }
                            size={20}
                          />
                        </Text>
                        <Text className="font-medium text-lg">
                          {
                            PaymentType[
                              post.paymentType as keyof typeof PaymentType
                            ].value
                          }
                        </Text>
                      </HStack>
                    </HStack>
                    <HStack space="md" className="items-center">
                      <Text className="font-medium text-lg">Trạng thái :</Text>
                      <PaymentStatusBadge status={post.payment} />
                    </HStack>
                  </VStack>
                </VStack>
              </Card>
              {post.customerNote && (
                <Card size="md" variant="elevated">
                  <VStack space="md">
                    <Heading>Ghi chú cho Freelancers</Heading>
                    <Text>{post.customerNote}</Text>
                  </VStack>
                </Card>
              )}
            </VStack>
          </Box>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default PostDetail;
