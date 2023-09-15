export const CHILDREN_DEFAULT_AGE = 2 as const;

export const MIN_NUMBER_OF_GUESTS = 1 as const;

export const DEFAULT_NUMBER_OF_ADULTS = 2 as const;

export const DEFAULT_MIN_NUMBER_OF_ADULTS = 1 as const;

export const DEFAULT_NUMBER_OF_CHILDREN = 0 as const;

export const DEFAULT_MIN_NUMBER_OF_CHILDREN = 0 as const;

export const GUEST_TYPE = {
  ADULT: 'adult',
  CHILD: 'child',
} as const;
export type GuestType = (typeof GUEST_TYPE)[keyof typeof GUEST_TYPE];

export type GuestSummaryType = {
  type: GuestType;
  count: number;
};

export const LEAD_GUEST = 'leadGuest' as const;

export const DEFAULT_NUMBER_OF_GUESTS = 1 as const;

export const GUESTS_CHILD_MIN_AGE = 2 as const;
export const GUESTS_CHILD_MAX_AGE = 17 as const;

export const DEFAULT_GUEST_NAME = 'Not Provided';

export type GuestDetails = {
  address: string;
  addressAdditional: string;
  age: number | null;
  bookingId: string;
  city: string;
  countryCode: null;
  dateOfBirth: string;
  email: string;
  firstName: string;
  id: string;
  identificationNumber: string;
  lastName: string;
  leadGuest: boolean;
  phone: string;
  postalCode: string;
  type: GuestType;
};
