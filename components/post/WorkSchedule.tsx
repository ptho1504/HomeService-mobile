import React, { useState } from 'react';

import { Heading } from '@/components/ui/heading';
import { Text } from '../ui/text';
import { Pressable, ScrollView, Switch } from 'react-native';
import { Card } from '../ui/card';
import { Grid, GridItem } from '../ui/grid';
import { VStack } from '../ui/vstack';
import {
  CreateWorkScheduleModel,
  Package,
  WorkScheduleModel,
} from '@/types/postTypes';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HStack } from '../ui/hstack';
import { PackageName } from '@/constants';
import ScrollPickerModal from './ScrollPickerModal';
import { Box } from '../ui/box';

const initDaysOfWeek: string[] = [
  'CN',
  'TH 2',
  'TH 3',
  'TH 4',
  'TH 5',
  'TH 6',
  'TH 7',
];

interface Props {
  selectedPackage: Package;
  selectedHour: number;
  selectedMinute: number;
  setSelectedHour: (value: number) => void;
  setSelectedMinute: (value: number) => void;
  days: Date[];
  handleAddWorkScheduleByDate: (value: Date) => void;
  handleAddWorkScheduleByDayOfWeek: (value: string) => void;
  workSchedules: CreateWorkScheduleModel[];
  daysOfWeek: string[];
}

const WorkSchedule = ({
  selectedPackage,
  days,
  selectedHour,
  selectedMinute,
  setSelectedHour,
  setSelectedMinute,
  handleAddWorkScheduleByDate,
  handleAddWorkScheduleByDayOfWeek,
  workSchedules,
  daysOfWeek,
}: Props) => {
  const [showPickerModal, setShowPickerModal] = useState<boolean>(false);
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false);

  return (
    <>
      <Card size="md" variant="elevated">
        <VStack space="md">
          <Heading>Lịch làm việc</Heading>
          <Text className="text-secondary-400">
            Chọn ngày làm việc và thời gian phù hợp.
          </Text>

          <VStack space="lg">
            {/* Chọn ngày làm việc */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack space="sm" className="justify-between items-center">
                {selectedPackage.key === PackageName._1DAY.key
                  ? days.map(day => (
                      <Pressable
                        key={day.getDate()}
                        onPress={() => handleAddWorkScheduleByDate(day)}
                        className={`rounded-lg border p-2 w-16 h-16 flex items-center justify-center ${
                          workSchedules.some(schedule => {
                            return schedule.date.getTime() === day.getTime();
                          })
                            ? 'bg-success-0 border-success-400'
                            : 'bg-white border-secondary-300'
                        }`}
                      >
                        <Text
                          className={`text-lg font-semibold ${
                            workSchedules.some(schedule => {
                              return schedule.date.getTime() === day.getTime();
                            })
                              ? 'text-success-500'
                              : 'text-secondary-600'
                          }`}
                        >
                          {day.toLocaleDateString('vi-VN', {
                            weekday: 'short',
                          })}
                        </Text>
                        <Text
                          className={`text-lg ${
                            workSchedules.some(schedule => {
                              return schedule.date.getTime() === day.getTime();
                            })
                              ? 'text-success-600'
                              : 'text-secondary-700'
                          }`}
                        >
                          {day.getDate()}
                        </Text>
                      </Pressable>
                    ))
                  : initDaysOfWeek.map(day => (
                      <Pressable
                        key={day}
                        onPress={() => handleAddWorkScheduleByDayOfWeek(day)}
                        className={`rounded-lg border p-2 w-16 h-16 flex items-center justify-center ${
                          daysOfWeek.some(dayOfWeek => {
                            return dayOfWeek === day;
                          })
                            ? 'bg-success-0 border-success-400'
                            : 'bg-white border-secondary-300'
                        }`}
                      >
                        <Text
                          className={`text-lg font-semibold ${
                            daysOfWeek.some(dayOfWeek => {
                              return dayOfWeek === day;
                            })
                              ? 'text-success-600'
                              : 'text-secondary-700'
                          }`}
                        >
                          {day}
                        </Text>
                      </Pressable>
                    ))}
              </HStack>
            </ScrollView>

            {selectedPackage.key !== PackageName._1DAY.key && (
              <Pressable onPress={() => setShowCalendarModal(true)}>
                {({ pressed }) => (
                  <Box
                    className={`flex flex-row justify-between items-center p-2 border border-secondary-400 rounded-lg ${
                      pressed && 'opacity-0'
                    }`}
                  >
                    <HStack space="md" className="items-center">
                      <Text className="text-cyan-600">
                        <Ionicons size={20} name="calendar-outline" />
                      </Text>
                      <Text className="font-medium text-lg">
                        Chọn lịch làm việc ({workSchedules.length} ngày làm)
                      </Text>
                    </HStack>
                    <Text className="">
                      <Ionicons size={20} name="chevron-forward-outline" />
                    </Text>
                  </Box>
                )}
              </Pressable>
            )}

            {/* Chọn giờ làm việc */}
            <HStack
              space="sm"
              className="items-center border border-secondary-400 p-2 rounded-lg justify-between"
            >
              <HStack space="sm" className="items-center">
                <Text className="text-cyan-600 text-md">
                  <Ionicons name="time-outline" size={24} />
                </Text>
                <Text className="text-lg font-medium">Giờ bắt đầu làm</Text>
              </HStack>

              <Pressable onPress={() => setShowPickerModal(true)}>
                <HStack
                  space="md"
                  className="px-4 py-2 bg-secondary-100 rounded-lg"
                >
                  <Text className="font-medium">
                    {selectedHour < 10 ? '0' + selectedHour : selectedHour}
                  </Text>
                  <Text>:</Text>
                  <Text className="font-medium">
                    {selectedMinute < 10
                      ? '0' + selectedMinute
                      : selectedMinute}
                  </Text>
                </HStack>
              </Pressable>
            </HStack>
          </VStack>
        </VStack>
      </Card>
      <ScrollPickerModal
        showPickerModal={showPickerModal}
        setShowPickerModal={setShowPickerModal}
        setSelectedHour={setSelectedHour}
        setSelectedMinute={setSelectedMinute}
        selectedHour={selectedHour}
        selectedMinute={selectedMinute}
      />
    </>
  );
};

export default WorkSchedule;
