import type { CurrencyCode } from './currencies';

export const DATE_FORMATTING_TABLE = {
  'yyyy-MM-dd': 'yyyy-MM-dd',
  'dd MMM': 'dd MMM',
  'dd MMM yyyy': 'dd MMM yyyy',
} as const;

export const CALENDAR_DAY_STATUSES = {
  OPEN: 'open',
  CLOSED: 'closed',
  MIN_STAY: 'minStay',
  CLOSED_ON_ARRIVAL: 'closedOnArrival',
} as const;

export const BOOKING_DAY_STATUSES = {
  OPEN: 'open',
  CLOSED: 'closed',
  CLOSED_ON_ARRIVAL: 'closedOnArrival',
  MIN_STAY: 'minStay',
  MAX_STAY: 'maxStay',
} as const;

// This constant has been created for Beaumier Group hotels, to show a custom message for openings dates in the calendar
export const HOTEL_CHAIN_DISABLED_CALENDAR_MESSAGES = [
  {
    hotelCode: '35255', // Capelongue
    frMessage: 'Notre établissement est ouvert uniquement de Mars à Novembre.',
    enMessage: 'Our property is only open from March to November.',
  },
  {
    hotelCode: '71986', // L'Alpaga
    frMessage:
      'Notre établissement est ouvert uniquement de Juin à Septembre et de Décembre à Mars.',
    enMessage:
      'Our property is only open from June to September and from December to March.',
  },
  {
    hotelCode: '35507', // Le Fitz Roy
    frMessage: 'Notre établissement est ouvert uniquement de Décembre à Avril.',
    enMessage: 'Our property is only open from December to April.',
  },
  {
    hotelCode: '35166', // Le Galinier
    frMessage:
      "Notre établissement est ouvert uniquement de Novembre à Mars et d' Avril à Octobre.",
    enMessage:
      'Our property is only open from November to March and from April to October.',
  },
  {
    hotelCode: '35276', // Le Moulin
    frMessage:
      'Notre établissement est ouvert uniquement de Février à Janvier.',
    enMessage: 'Our property is only open from February to January.',
  },
  {
    hotelCode: '35505', // Les 3 Vallées
    frMessage: 'Notre établissement est ouvert uniquement de Décembre à Avril.',
    enMessage: 'Our property is only open from December to April.',
  },
  {
    hotelCode: '35178', // Les Roches Rouges
    frMessage: "Notre établissement est ouvert uniquement d'Avril à Novembre.",
    enMessage: 'Our property is only open from April to November.',
  },
  {
    hotelCode: '35504', // Le Val Thorens
    frMessage: 'Notre établissement est ouvert uniquement de Novembre à Avril.',
    enMessage: 'Our property is only open from November to April.',
  },
] as const;

export type HotelMessage =
  (typeof HOTEL_CHAIN_DISABLED_CALENDAR_MESSAGES)[keyof typeof HOTEL_CHAIN_DISABLED_CALENDAR_MESSAGES];

// TODO: Change to global type
export type DayStatus =
  (typeof CALENDAR_DAY_STATUSES)[keyof typeof CALENDAR_DAY_STATUSES];

// TODO: Change to global type
export type DayPrice = {
  date: string;
  status: DayStatus;
  quantity: string | undefined;
  amountAfterTax: string;
  amountBeforeTax: string;
  currencyCode: CurrencyCode;
};

// TODO: Change to global type
export type MonthlyPrice = {
  year: number;
  month: number;
  dataSet: DayPrice[];
  currencyCode: CurrencyCode;
};
