import { parseISO } from 'date-fns';

export const convertTimeToDate = (time: string): string => {
  const hours = Number(time.slice(0, 2));
  const minutes = Number(time.slice(2, 4));

  const now = new Date();
  now.setHours(hours);
  now.setMinutes(minutes);

  return now.toISOString();
};

export const getNightCountFromDates = (
  startDate: string,
  endDate: string
): number => {
  const d1 = new Date(startDate).getTime();
  const d2 = new Date(endDate).getTime();
  return Math.floor((d2 - d1) / 1000 / 60 / 60 / 24);
};

// This function truncate an ISO date after the 10 first characters to avoid discrepancy wiyhin dates from differents timezones
export const getDateWithNoTimezoneISO = (dateISO: string) =>
  parseISO(dateISO.slice(0, 10));

export const getTimeSpanTimeFormat = (date: string, dateWithtime: string) => {
  // In case of an incomplete dateWithTime like T01:00:00, add the date to it
  if (dateWithtime?.startsWith('T') && date) return `${date}${dateWithtime}`;

  return dateWithtime?.trim() || `${date}T00:00:00`;
};

export function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const date = new Date(startDate.getTime());
  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
