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
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { i18n, Language } from "@/localization";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { EditIcon, Icon, SearchIcon } from "@/components/ui/icon";

// import AddressSearch from "@/components/address/AddressSearch";
import * as Location from "expo-location";
import { useGetPlaceByInputQuery } from "@/services";
i18n.locale = "vn";
// i18n.enableFallback = true;
// i18n.defaultLocale = Language.VIETNAMESE;
const AddAdress = () => {
  const [location, setLocation] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    Location.LocationGeocodedLocation[]
  >([]);
  const { refetch, isFetching, error, data } = useGetPlaceByInputQuery({
    input: location,
  });

  const handleNavigateMap = () => {
    // console.log("Navigate to handle map");
    router.push("/(customer)/(account)/map-address");
  };

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!location) {
        setSuggestions([]);
        return;
      }
      console.log("location ", location);
      try {
        // const results = await Location.geocodeAsync(location);
        // console.log("results ", results);
        // setSuggestions(results);
      } catch (error) {
        console.error("Geocode error:", error);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300); // Debounce

    return () => clearTimeout(delayDebounce);
  }, [location]);

  const renderSuggestion = ({
    item,
  }: {
    item: Location.LocationGeocodedAddress;
  }) => (
    <Pressable className="flex-row items-center py-2 border-b border-gray-100 px-2">
      <Ionicons
        name="location-outline"
        size={20}
        color="gray"
        className="mr-2"
      />
      <Text className="text-gray-800 text-sm">
        {item.name || ""} {item.street || ""}, {item.subregion || ""},{" "}
        {item.region || ""}
      </Text>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {/* Header */}
      <View className="flex-row items-center mb-4 mt-4">
        <Pressable onPress={handleGoBack} className="mr-4">
          <Ionicons name="chevron-back" size={28} color="black" />
        </Pressable>
        <Text className="text-lg font-semibold">Chọn vị trí làm việc</Text>
      </View>

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
        <Pressable onPress={handleNavigateMap}>
          <Ionicons name="map-outline" size={24} color="gray" />
        </Pressable>
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
            renderItem={({ item }) => (
              <View className="p-4 border-b border-gray-200">
                <Text>{`Lat: ${item.latitude}, Lng: ${item.longitude}`}</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default AddAdress;
