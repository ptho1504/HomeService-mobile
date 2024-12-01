import { WorkDay } from '@/types/postTypes';

export const generateNext7Days = () => {
  const days: WorkDay[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);

    const dayOfWeek = nextDay.toLocaleDateString('vi-VN', { weekday: 'short' }); // T2, T3, ...
    const date = nextDay.getDate(); // Ngày (1-31)

    const newWorkDay: WorkDay = { day: dayOfWeek, date: date.toString() };

    days.push(newWorkDay);
  }

  return days;
};
