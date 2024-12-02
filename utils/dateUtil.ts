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

export function normalizeDateTime(dateTime: number[]): number[] {
  // Tạo một bản sao của mảng createdAt
  const normalizedDateTime = [...dateTime];

  // Kiểm tra và thay đổi giá trị nếu cần
  if (normalizedDateTime[6]) {
    normalizedDateTime[1] -= 1;
    normalizedDateTime[6] = 0;
  }

  return normalizedDateTime;
}

export function normalizeDate(date: number[]): string {
  return date[2] + '/' + date[1] + '/' + date[0];
}

export function convertMinuteToHour(duration: number): string {
  if (duration < 60) {
    return `${duration} phút`;
  }

  const hours = Math.floor(duration / 60); // Lấy phần nguyên của giờ
  const minutes = duration % 60; // Lấy số phút còn lại

  if (minutes === 0) {
    return `${hours} tiếng`; // Nếu không có phút, chỉ hiển thị giờ
  }

  return `${hours} tiếng ${minutes} phút`; // Hiển thị cả giờ và phút
}

export function formatTimeRange(startTime: string, duration: number): string {
  // Chuyển startTime thành đối tượng Date
  const start = new Date(`1970-01-01T${startTime}Z`); // Dùng ngày giả định
  // Tính toán endTime bằng cách thêm duration (phút) vào startTime
  const end = new Date(start.getTime() + duration * 60000);

  // Định dạng thời gian thành HH:mm
  const formatTime = (date: Date): string =>
    date.toISOString().substring(11, 16); // Lấy giờ và phút từ ISO string

  return `${formatTime(start)} đến ${formatTime(end)}`;
}

// Ví dụ sử dụng
const startTime = '02:00:00';
const duration = 10;

console.log(formatTimeRange(startTime, duration));
// Kết quả: "từ 02:00 đến 02:10"
