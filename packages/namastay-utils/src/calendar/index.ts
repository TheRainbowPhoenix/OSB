import {
  CALENDAR_DAY_STATUSES,
  DATE_FORMATTING_TABLE,
  type CurrencyCode,
  type DayPrice,
  type DayStatus,
  type MonthlyPrice,
} from "@namastay/constants";
import format from "date-fns/format";
import isBefore from "date-fns/isBefore";

export const getPriceByDateAndCurrency = ({
  date,
  prices,
  currencyCode,
}: {
  date: Date;
  prices: MonthlyPrice[];
  currencyCode: CurrencyCode;
}): DayPrice | null => {
  const formattedDate = format(date, DATE_FORMATTING_TABLE["yyyy-MM-dd"]);

  const reducedPrices = prices.reduce<DayPrice[]>((acc, price) => {
    if (price.currencyCode === currencyCode) {
      acc.push(...price.dataSet);
    }

    return acc;
  }, []);

  if (!reducedPrices || !reducedPrices.length) {
    return null;
  }

  const entry = reducedPrices.find((price) => price.date === formattedDate);
  const isEnabledEntry = entry?.status !== CALENDAR_DAY_STATUSES.CLOSED;

  if (entry && isEnabledEntry) {
    return entry;
  }

  return null;
};

export const getIsoDateFormat = (date: Date): string =>
  format(date, "yyyy-MM-dd");

export const getCalendarIsoDateFormat = (dates: {
  startDate: Date;
  endDate: Date;
}): {
  startDate: string;
  endDate: string;
} => ({
  startDate: getIsoDateFormat(dates.startDate),
  endDate: getIsoDateFormat(dates.endDate),
});

export const getDisabledDays = ({
  allPrices,
  isSelectingFirstDay,
  startDate,
  endDate,
}: {
  allPrices: DayPrice[];
  isSelectingFirstDay: (dayPrice: DayPrice) => boolean;
  startDate: Date;
  endDate: Date;
}): Date[] => {
  if (!allPrices || !allPrices.length) {
    return [];
  }

  return allPrices
    .filter((day, index) => {
      const isDayClosed = day.status === CALENDAR_DAY_STATUSES.CLOSED;
      const isPreviousDayClosed =
        allPrices?.[index - 1]?.status === CALENDAR_DAY_STATUSES.CLOSED ?? true;
      const isEndDay =
        endDate && day.date
          ? day.date === format(endDate, "yyyy-MM-dd")
          : false;
      const isPreviousDayThanStartDate = startDate
        ? isBefore(new Date(day.date), startDate)
        : false;

      return isSelectingFirstDay(day)
        ? isDayClosed && !isEndDay
        : isDayClosed && (isPreviousDayClosed || isPreviousDayThanStartDate);
    })
    .map((filteredDay) => new Date(`${filteredDay.date}T00:00`));
};

export const getConstrainForSpecificDate = (
  date: Date,
  prices: MonthlyPrice[]
): {
  status: DayStatus;
  quantity: number;
} | null => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();

  const pricesByMonthAndYear = prices.find(
    (price) => price.year === year && price.month === month
  );

  if (typeof pricesByMonthAndYear === "undefined") {
    return null;
  }

  const calendarDay = pricesByMonthAndYear.dataSet.find(
    (calendarPrices: DayPrice) => {
      const formattedDate = format(date, DATE_FORMATTING_TABLE["yyyy-MM-dd"]);
      return calendarPrices.date === formattedDate;
    }
  );

  if (typeof calendarDay === "undefined") {
    return null;
  }

  return {
    status: calendarDay.status,
    quantity:
      typeof calendarDay.quantity === "string"
        ? parseInt(calendarDay.quantity, 10)
        : 0,
  };
};

/**
 *
 * @param {string} date A string representing the date, usually in YYYY-MM-DD format
 * @returns {Date} Returns a date with a forced time of 00:00 preventing timezone issues
 */
export const getDateWithoutTimeFromString = (date: string) =>
  new Date(`${date}T00:00`);
