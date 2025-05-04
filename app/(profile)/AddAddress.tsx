import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { i18n, Language } from '@/localization';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { EditIcon, Icon, SearchIcon } from '@/components/ui/icon';

// import AddressSearch from "@/components/address/AddressSearch";
import * as Location from 'expo-location';
import {
  useCreateAddressMutation,
  useGetGeocodeQuery,
  useGetPlaceByInputQuery,
} from '@/services';
import { AddressPlaces } from '@/types/addressType';
import { useDispatch } from 'react-redux';
import { AddressModel, CreateAddressModel } from '@/types/userTypes';
import { useSelector } from 'react-redux';
import { selectUser, updateCurrentUserWithAddress } from '@/store/reducers';
import { Spinner } from '@/components/ui/spinner';
i18n.locale = 'vn';
// i18n.enableFallback = true;
// i18n.defaultLocale = Language.VIETNAMESE;
const AddAdress = () => {
  const currentUser = useSelector(selectUser);
  const [location, setLocation] = useState<string>('');
  const [placeId, setPlaceId] = useState<string>('');
  const [suggestions, setSuggestions] = useState<AddressPlaces[]>([]);
  const { refetch, isFetching, error, data } = useGetPlaceByInputQuery({
    input: location,
  });
  const {
    data: geocode,
    isFetching: isFetchingGeocode,
    refetch: refetchGeocode,
  } = useGetGeocodeQuery({
    placeId,
  });
  const dispatch = useDispatch();

  const handleNavigateMap = () => {
    // console.log("Navigate to handle map");
    router.push('/(profile)/MapAddress');
  };

  const [
    createAddress,
    { isLoading, error: ErrorCreateAdd, data: DataCreateAdd },
  ] = useCreateAddressMutation();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!location) {
        setSuggestions([]);
        return;
      }
      console.log('location ', location);
      try {
        const result = await refetch();
        data?.items;
        // console.log("RESULT-----------", result.data?.items);
        if (result.data) {
          setSuggestions(result.data.items);
        }
      } catch (error) {
        console.error('Geocode error:', error);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 500);

    return () => clearTimeout(delayDebounce);
  }, [location]);

  useEffect(() => {
    const fetchGeo = async () => {
      const result = await refetchGeocode();
      if (result?.data) {
        const location = result?.data.items.geometry.location;
        router.push(
          `/(profile)/MapAddress?lat=${location.lat}&lng=${location.lng}`,
        );
      }
    };
    if (placeId != '') {
      fetchGeo();
    }
  }, [placeId]);

  const handleSelectAddress = async (selected: AddressPlaces) => {
    setPlaceId(selected.place_id);

    // console.log("SELECTED ", selected);
    // try {
    //   const customerName = currentUser?.name;
    //   const phoneNumber = currentUser?.phoneNumber || '';
    //   const latitude = '0';
    //   const longitude = '0';
    //   if (customerName && latitude && longitude && selected.description) {
    //     // console.log("test IN");
    //     const data: CreateAddressModel = {
    //       customerName: customerName,
    //       phoneNumber: phoneNumber,
    //       latitude: latitude.toString(),
    //       longitude: longitude.toString(),
    //       detail: selected.description,
    //       // placeId: selected.place_id,
    //       default: true,
    //       userId: currentUser.id,
    //       // id: null,
    //     };
    //     const res = await createAddress(data);
    //     if (res.data?.returnCode && res.data?.returnCode > 0) {
    //       const newAddress = res.data.items;
    //       // console.log("test  in");
    //       dispatch(
    //         updateCurrentUserWithAddress({
    //           user: currentUser,
    //           address: newAddress,
    //         }),
    //       );
    //       router.back();
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error saving address:', error);
    // }
  };

  const renderSuggestion = ({ item }: { item: AddressPlaces }) => (
    <Pressable
      className="flex-row items-center py-2 border-b border-gray-100 px-2"
      onPress={() => handleSelectAddress(item)}
    >
      <Ionicons
        name="location-outline"
        size={20}
        color="gray"
        className="mr-2"
      />
      <Text className="text-gray-800 text-sm">{item.description}</Text>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {/* Header */}

      {/* Search Input */}
      <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
        <Ionicons
          name="search-outline"
          size={20}
          color="gray"
          className="mr-2"
        />
        <TextInput
          placeholder="Chọn địa chỉ"
          value={location}
          onChangeText={setLocation}
          className="flex-1 text-base"
          autoFocus
        />
        {isFetchingGeocode ? (
          <Spinner />
        ) : (
          <Pressable onPress={handleNavigateMap}>
            <Ionicons name="map-outline" size={24} color="gray" />
          </Pressable>
        )}
      </View>
      {isFetching ? (
        <>
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#000" />
            <Text className="mt-4 text-gray-500">Đang xác định vị trí...</Text>
          </View>
        </>
      ) : (
        <>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderSuggestion}
            keyboardShouldPersistTaps="handled"
          />
        </>
      )}
    </View>
  );
};

export default AddAdress;
