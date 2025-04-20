import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { selectUser, updateCurrentUserWithAddress } from "@/store/reducers";
import { useCreateAddressMutation } from "@/services";
import { AddressType } from "@/types/addressType";
import { useDispatch } from "react-redux";
import { AddressModel } from "@/types/userTypes";

const MapAddress = () => {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(false);
  const [region, setRegion] = useState<Region | null>(null);
  const [address, setAddress] = useState<string>("");
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [createAddress, { isLoading, error, data }] =
    useCreateAddressMutation();

  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      setHasPermission(true);

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setRegion(coords);

      const [addr] = await Location.reverseGeocodeAsync(coords);
      if (addr && addr.formattedAddress) {
        // console.log(addr.formattedAddress);

        const parts = addr.formattedAddress.split(", "); // Split the address string into parts
        const shortAddress = parts.slice(0, 3).join(", "); // Take the first 3 parts and join them
        const formatted =
          `${shortAddress[0]}, ${shortAddress[1]}, ${shortAddress[2]}`.trim();

        setAddress(shortAddress);
      }
    };

    requestLocation();
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const handleSelectLocation = async () => {
    // console.log("Selected location:", region);
    // console.log("Address:", address);
    // router.back(); // You can replace this with logic to pass back data
    const customerName = currentUser?.name;
    const phoneNumber = currentUser?.phoneNumber || "";
    const latitude = region?.latitude;
    const longitude = region?.longitude;
    const detail = address;
    

    if (customerName && latitude && longitude && detail) {
      // console.log("test IN");
      const data: AddressModel = {
        customerName: customerName,
        phoneNumber: phoneNumber,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        detail: address,
        // placeId: "",
        default: true,
        userId: currentUser.id,
        // id: null,
      };
      const res = await createAddress(data);

      if (res.data?.returnCode && res.data?.returnCode > 0) {
        const newAddress = res.data.items;
        // console.log("test  in");
        dispatch(
          updateCurrentUserWithAddress({
            user: currentUser,
            address: newAddress,
          })
        );
        router.back();
      }
    }
    // console.log("test OUT");
  };

  const handleRegionChange = async (newRegion: Region) => {
    setRegion(newRegion);
    const [addr] = await Location.reverseGeocodeAsync({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });
    // console.log(addr.formattedAddress);

    if (addr && addr.formattedAddress) {
      // console.log(addr.formattedAddress);

      const parts = addr.formattedAddress.split(", "); // Split the address string into parts
      const shortAddress = parts.slice(0, 3).join(", "); // Take the first 3 parts and join them
      const formatted =
        `${shortAddress[0]}, ${shortAddress[1]}, ${shortAddress[2]}`.trim();

      setAddress(shortAddress);
    } else {
      const formatted =
        `${addr.name}, ${addr.street}, ${addr.subregion}`.trim();

      setAddress(formatted);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {region ? (
        <View className="flex-1">
          {/* Header */}
          <View className="px-4 pt-12">
            <View className="flex-row items-center mb-4 mt-4">
              <Pressable onPress={handleGoBack} className="mr-4">
                <Ionicons name="chevron-back" size={28} color="black" />
              </Pressable>
              <Text className="text-lg font-semibold">
                Chọn vị trí làm việc
              </Text>
            </View>
          </View>

          {/* Search bar */}
          <View className="absolute top-[160px] left-4 right-4 z-10 bg-white border border-emerald-500 px-4 py-2 rounded-2xl shadow-md flex-row items-center">
            <Ionicons name="location-outline" size={20} color="gray" />
            <TextInput
              placeholder="Bấm hoặc kéo bản đồ để chọn địa chỉ"
              className="ml-2 flex-1 text-sm text-gray-700"
              value={address}
              editable={false}
            />
          </View>

          {/* Map */}
          <View className="flex-1">
            <MapView
              className="flex-1"
              initialRegion={region}
              onRegionChangeComplete={handleRegionChange}
              style={{ width: "100%", height: "100%", borderRadius: 16 }}
              tintColor="black"
              showsPointsOfInterest={false}
              showsUserLocation={true}
              userInterfaceStyle="light"
              showsMyLocationButton
              provider={PROVIDER_DEFAULT}
            />
            <View className="absolute z-10 left-1/2 top-1/2 -ml-4 -mt-8">
              <MaterialIcons name="location-pin" size={32} color="orange" />
            </View>
          </View>

          {/* Bottom button */}
          <View className="absolute bottom-8 w-full items-center px-6">
            <Pressable
              className="py-3 px-4 w-full rounded-xl items-center bg-black"
              onPress={handleSelectLocation}
            >
              <Text className="text-white font-semibold">Chọn vị trí này</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#000" />
          <Text className="mt-4 text-gray-500">Đang xác định vị trí...</Text>
        </View>
      )}
    </View>
  );
};

export default MapAddress;
