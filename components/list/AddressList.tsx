import {
  View,
  Text,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  ListRenderItemInfo,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { AddressModel } from '@/types/userTypes';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useDeleteAddressByIdMutation } from '@/services';
import { useDispatch } from 'react-redux';
import { deleteAddressById } from '@/store/reducers';
import { VStack } from '../ui/vstack';
import { Box } from '../ui/box';
import { data } from '@/constants';
import { i18n } from '@/localization';
import { Divider } from '../ui/divider';
import { HStack } from '../ui/hstack';

interface Props {
  addresses: AddressModel[];
}

const ListAddress = ({ addresses }: Props) => {
  const dispatch = useDispatch();
  const [deleteAddById, { isLoading, error, data }] =
    useDeleteAddressByIdMutation();
  const [refreshing, setRefreshing] = useState(false);

  const refetch = () => {};

  const handleDelete = async (address: AddressModel) => {
    try {
      const res = await deleteAddById(address.id);
      dispatch(deleteAddressById(address.id));
    } catch (err) {
      console.error('Failed to delete address:', err);
    }
  };

  const sortedAddress = [...addresses].sort((a, b) =>
    b.default ? 1 : a.default ? -1 : 0,
  );

  const handleSetDefault = async (address: AddressModel) => {};

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch(); // Gọi lại hàm refetch để lấy dữ liệu mới
    setRefreshing(false); // Đặt lại trạng thái refreshing sau khi hoàn tất
  }, [refetch]);

  const renderItem = ({ item: address }: ListRenderItemInfo<AddressModel>) => {
    return (
      <VStack space="md" className="mt-3">
        <Box className="flex flex-row justify-between items-center">
          <VStack space="sm" className="w-1/2">
            <HStack space="sm" className="items-center">
              <Ionicons size={20} name="location-outline" color={'red'} />
              <Text className="text-lg font-semibold">{address.detail}</Text>
            </HStack>

            <HStack space="sm" className="items-center">
              <Ionicons size={20} name="person-outline" color={'green'} />
              <Text className="text-lg ">{address.customerName}</Text>
            </HStack>

            <HStack space="sm" className="items-center">
              <Text className="text-info-600">
                <Ionicons size={20} name="call-outline" />
              </Text>

              <Text className="text-lg">
                {address.phoneNumber || 'Chưa có'}
              </Text>
            </HStack>
          </VStack>

          <HStack space="md">
            {address.default ? (
              <Text className="text-success-400">
                <Ionicons name="checkmark-circle-outline" size={30} />
              </Text>
            ) : (
              <Pressable onPress={() => handleDelete(address)}>
                {({ pressed }) => (
                  <Ionicons
                    className={pressed ? 'opacity-75' : ''}
                    name="create-outline"
                    size={30}
                  />
                )}
              </Pressable>
            )}

            <Pressable onPress={() => handleSetDefault(address)}>
              {({ pressed }) => (
                <Ionicons
                  className={pressed ? 'opacity-75' : ''}
                  name="trash-outline"
                  size={30}
                  color="red"
                />
              )}
            </Pressable>
          </HStack>
        </Box>
        <Divider></Divider>
      </VStack>
    );
  };

  if (!addresses || addresses.length <= 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="h-full"
      >
        <Box className="flex flex-1 justify-center items-center">
          <Text className="text-lg text-center mt-10">
            {i18n.t('no_addresses')}
          </Text>
        </Box>
      </ScrollView>
    );
  }

  return (
    <Box style={{ height: '75%' }}>
      <FlatList
        data={sortedAddress}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="bg-none"
      />
    </Box>
  );
};

export default ListAddress;
