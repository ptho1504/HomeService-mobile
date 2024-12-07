import { CreateWorkScheduleModel, WorkScheduleModel } from '@/types/postTypes';
import moment from 'moment';
import React from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { WorkScheduleStatus } from '@/constants';
import { normalizeDate } from '@/utils/dateUtil';
import { S } from '@expo/html-elements';

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Thg 1',
    'Thg 2',
    'Thg 3',
    'Thg 4',
    'Thg 5',
    'Thg 6',
    'Thg 7',
    'Thg 8',
    'Thg 9',
    'Thg 10',
    'Thg 11',
    'Thg 12',
  ],
  dayNames: [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};

LocaleConfig.defaultLocale = 'vi';

interface Props {
  workSchedules: WorkScheduleModel[] | CreateWorkScheduleModel[];
}

export function isWorkScheduleModel(
  workSchedule: any,
): workSchedule is WorkScheduleModel {
  return workSchedule && 'status' in workSchedule;
}

const WorkScheduleCalendar = ({ workSchedules }: Props) => {
  const markedDates = workSchedules.reduce((acc, schedule) => {
    const date = normalizeDate(schedule.date, '-', true); // Chuẩn hóa ngày
    let backgroundColor;

    if (
      !isWorkScheduleModel(schedule) ||
      schedule.status === WorkScheduleStatus.INITIAL.key
    ) {
      backgroundColor = 'lightgray';
    } else if (schedule.status === WorkScheduleStatus.COMPLETED.key) {
      backgroundColor = 'lightgreen';
    } else {
      backgroundColor = 'lightcoral';
    }

    acc[date] = {
      customStyles: {
        container: {
          backgroundColor,
        },
        text: {
          color: 'white', // Màu chữ
        },
      },
    };
    return acc;
  }, {} as Record<string, any>);

  return <Calendar markingType={'custom'} markedDates={markedDates} />;
};

export default WorkScheduleCalendar;
