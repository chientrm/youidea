import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export const toNow = (date: Date) => dayjs().to(date),
  formatDate = (date: Date, tz: string, template: string) =>
    dayjs(date).tz(tz).format(template);
