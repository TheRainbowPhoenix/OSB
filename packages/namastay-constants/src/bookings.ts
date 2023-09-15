import { AddonModifier } from './addons';
import { type CurrencyCode } from './currencies';
import { type GuestDetails } from './guests';

// https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
export const AMENITIES_MAX_SHOW_LIMIT = 2 as const;

export const CANCELLATION_POLICY_MAX_LINES_COUNT = 5 as const; // TODO Change to 1 if you want to test

export const ROOM_DESCRIPTION_MAX_LINES_COUNT = 5 as const; // TODO Change to 1 if you want to test

export const BOOKING_STATUS = {
  COMMITTED: 'Committed',
  MODIFIED: 'Modified',
  PENDING: 'Pending',
  CANCELLED: 'Cancelled',
  IGNORED: 'Ignored',
  ON_HOLD: 'On Hold',
} as const;

export type BookingStatus =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export const SERVICE_PRICING_TYPE = {
  PER_NIGHT: 'Per night',
  PER_STAY: 'Per stay',
  PER_PERSON: 'Per person',
  PER_PERSON_PER_NIGHT: 'Per person per night',
} as const;

export type ServicePricingType =
  (typeof SERVICE_PRICING_TYPE)[keyof typeof SERVICE_PRICING_TYPE];

export type TimeSpan = {
  start: string;
  end: string;
};

export type AddonTimeSpan = {
  timeFrom?: string;
  timeTo?: string;
};

export type AddonPrice = {
  amount: string;
  from: string;
  to: string;
} & AddonTimeSpan;

// TODO: Change to global type
export type Addon = {
  isBulkType?: boolean;
  prices: AddonPrice[];
  price?: string | number;
  quantity: number;
  serviceInventoryCode: string;
  servicePricingType: ServicePricingType;
  title: string;
  modifiers?: AddonModifier;
};

type NightlyRates = {
  date: string;
  amountBeforeTax: number;
  amountAfterTax: number;
  currencyCode: string;
};
// TODO: Change to global type
export type Rate = {
  ratePlanCode: string;
  price: string;
  currencyCode: CurrencyCode;
  total: {
    amountAfterTax: string;
    amountBeforeTax: string;
    currencyCode: CurrencyCode;
  };
  percentageToPayNow: number;
  nightlyRates: NightlyRates[];
};

// TODO: Change to global type
export type Room = {
  id: string;
  title: string;
  ratePlanCode: string;
  startDate: string;
  endDate: string;
  bestRates: Rate[];
  ratePlan: Rate;
  roomTypeCode: string;
  ratePlanBasePrice: number;
};

// TODO: Change to global type
export type Booking = {
  id: string;
  timeSpan: TimeSpan;
  client: {
    email: string;
    country: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  addons: Addon[];
  startDate: string;
  endDate: string;
  status: BookingStatus;
  guests: GuestDetails[];
  bookingCode: string;
  promoCode: string;
  comments: string[];
  room: Room;
  rooms: Room[];
  totals: {
    amountAfterTax: number;
    amountBeforeTax: number;
    currency: CurrencyCode;
  };
};

export const D_EDGE_FIRST_NIGHT_DEPOSIT_CODE = 'FirstNightWithoutExtras';
