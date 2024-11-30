import { Button, ButtonText } from '@/components/ui/button';
import { WorkType } from '@/constants';
import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home Page</Text>
      <View className="flex">
        <View>
          <TouchableWithoutFeedback>
            <Button
              className="w-fit self-end mt-4"
              size="md"
              onPress={() => {
                router.push(`/Post?workType=${WorkType.HOUSECLEANING.key}`);
              }}
            >
              <ButtonText>Đăng việc {WorkType.HOUSECLEANING.value}</ButtonText>
            </Button>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback>
            <Button
              className="w-fit self-end mt-4"
              size="md"
              onPress={() => {
                router.push(`/Post?name=${WorkType.BABYSITTING.key}`);
              }}
            >
              <ButtonText>Đăng việc {WorkType.BABYSITTING.value}</ButtonText>
            </Button>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
