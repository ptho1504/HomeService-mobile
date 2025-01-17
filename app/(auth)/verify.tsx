import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Swiper from "react-native-swiper";

import { useEffect, useRef, useState } from 'react';
import { OtpInput } from 'react-native-otp-entry';
import { useLoginMutation, useVerifyOtpMutation } from '@/services';
import { router, useLocalSearchParams } from 'expo-router';
import { i18n, Language } from '@/localization';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { setUser, authenticateUser } from '@/store/reducers/auth';
import * as SecureStore from 'expo-secure-store';
import { LOCAL_STORAGE_JWT_KEY, UserRole } from '@/constants';
import { Keyboard } from 'react-native';
import { Text } from '@/components/ui/text';
import { obfuscateEmail, useDebounce } from '@/utils/helper';
import { Spinner } from '@/components/ui/spinner';
import { registerForPushNotificationsAsync } from '@/utils/firebaseUtil';

// i18n.locale = getLocales()[0].languageCode ?? "vn";
i18n.locale = 'vn';
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

const Verify = () => {
  const { email, role } = useLocalSearchParams<{
    email: string;
    role: 'FREELANCER' | 'CUSTOMER';
  }>();

  const [isLoading, SetIsLoading] = useState(false);
  const [otp, setOtp] = useState<string | undefined>(undefined);
  const [expoPushToken, setExpoPushToken] = useState('');
  const otpRef = useRef<any>(null);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => {
        console.log(token);
        setExpoPushToken(token ?? '');
      })
      .catch((error: any) => setExpoPushToken(`${error}`));
  }, []);

  useEffect(() => {
    const handleLogin = async () => {
      if (otp !== undefined) {
        try {
          if (otp.length == 6) {
            SetIsLoading(true);
            const response = await login({
              email,
              role: role,
              otp: otp,
              firebaseToken: expoPushToken,
            });
            console.log(response);
            if (response.error) {
              if (otpRef.current) {
                otpRef.current.clear(); // Clears the input
              }
              // Set Toast to nofication
              alert(response.error.data.message);

              setOtp(undefined);
            } else if (response.data) {
              dispatch(setUser(response.data.items));
              dispatch(authenticateUser(true));

              // Save to Async storage
              if (!response.data.items.jwt) {
                console.error('JWT is missing!');
                return;
              }
              await SecureStore.setItemAsync(
                LOCAL_STORAGE_JWT_KEY,
                response.data.items.jwt!,
              );

              if (role === UserRole.CUSTOMER) {
                router.replace('/(customer)/(home)');
              } else {
                router.replace('/(freelancer)/(home)');
              }
            }
          }
        } catch (error) {
          console.error('Error during login:', error);
        } finally {
          SetIsLoading(false);
        }
      }
    };
    handleLogin();
  }, [otp]);

  return (
    <TouchableWithoutFeedback
      className="flex h-full items-center justify-between bg-green-200"
      onPress={Keyboard.dismiss}
    >
      <View className="flex h-full bg-white p-4 items-center">
        <Text className="text-3xl font-bold my-3">
          {i18n.t('enter_verify')}
        </Text>
        <Text className="text-xl font-font-normal">
          We are automatically send OTP to {' ' + obfuscateEmail(email)} email.
          Check your email
        </Text>
        {/* OTP */}
        <View className="my-5 w-full">
          <OtpInput
            ref={otpRef}
            numberOfDigits={6}
            onTextChange={text => setOtp(text)}
            focusColor={'#397e52'}
            focusStickBlinkingDuration={400}
            disabled={false}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: 'white',
                width: 58,
                height: 58,
                borderRadius: 12,
              },
            }}
            type="numeric"
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            autoFocus={true}
          />
        </View>
        {isLoading && <Spinner size={'large'} />}
        <View className="my-3 flex items-center flex-row gap-3">
          <Text size="lg">{i18n.t('send_otp_text')}</Text>
          <TouchableOpacity>
            <Text size="lg" className="font-bold color-green-600">
              {i18n.t('resend')}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableWithoutFeedback>
          <Button
            className="w-full self-end mt-2 bg-green-500 rounded-lg"
            size="md"
            onPress={handleSubmit}
            variant="solid"
            action="positive"
            disabled={otp?.length != 6}
          >
            {isLoading && <ButtonSpinner color={"#D1D5DB"} />}
            <ButtonText size="lg" className="text-white">
              {i18n.t("verify")}
            </ButtonText>
          </Button>
        </TouchableWithoutFeedback> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Verify;
