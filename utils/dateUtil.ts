import moment from 'moment';

export const generateNext7Days = (): Date[] => {
  const dates: Date[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);

    // Thêm đối tượng Date vào mảng
    dates.push(nextDay);
  }

  return dates;
};

export const getWorkSchedulesByDaysOfWeek = (
  daysOfWeek: string[],
  monthOffset: number,
): Date[] => {
  const currentDate = new Date();

  // Ngày bắt đầu là ngày mai
  currentDate.setDate(currentDate.getDate() + 1);

  // Ngày kết thúc là ngày cuối cùng của tháng sau
  const endDate = new Date(currentDate);
  endDate.setMonth(endDate.getMonth() + monthOffset);
  endDate.setDate(0); // Ngày cuối cùng của tháng trước tháng tiếp theo

  const schedules: Date[] = [];

  // Mảng các thứ trong tuần
  const weekDays = ['CN', 'TH 2', 'TH 3', 'TH 4', 'TH 5', 'TH 6', 'TH 7'];

  // Lặp qua từng ngày từ ngày bắt đầu đến ngày kết thúc
  for (
    let date = currentDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const dayIndex = date.getDay(); // Lấy chỉ số ngày trong tuần (0 = CN, 1 = TH 2, ..., 6 = TH 7)

    // Kiểm tra xem ngày hiện tại có nằm trong danh sách daysOfWeek không
    if (daysOfWeek.includes(weekDays[dayIndex])) {
      schedules.push(new Date(date)); // Thêm ngày vào mảng
    }
  }

  return schedules;
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

export function normalizeDate(
  date: number[] | Date | undefined,
  pattern: string,
  isCalendar: boolean,
): string {
  if (Array.isArray(date)) {
    return isCalendar
      ? date[0] + pattern + date[1] + pattern + date[2]
      : date[2] + pattern + date[1] + pattern + date[0];
  } else {
    const format = 'DD' + pattern + 'MM' + pattern + 'YYYY';
    return moment(date).format(
      isCalendar ? format.split('').reverse().join('') : format,
    );
  }
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
  const end = new Date(start.getTime() + duration * 3600000);

  // Định dạng thời gian thành HH:mm
  const formatTime = (date: Date): string =>
    date.toISOString().substring(11, 16); // Lấy giờ và phút từ ISO string

  return `${formatTime(start)} đến ${formatTime(end)}`;
}

export function convertToTime(
  hour: number,
  minute: number,
  second: number,
): string {
  return (
    (hour < 10 ? '0' : '') +
    hour +
    ':' +
    (minute < 10 ? '0' : '') +
    minute +
    ':' +
    (second < 10 ? '0' : '') +
    second
  );
}
