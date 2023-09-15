export const PAYMENT_ACTION_TYPE = {
  VERIFY: 'verify',
  CAPTURE: 'capture',
  DEFERRED: 'deferred',
  DEFERRED_WITH_LINK: 'deferred_with_link',
  DEFERRED_BEFORE_ARRIVAL: 'deferred_before_arrival',
} as const;

export type PaymentActionType =
  (typeof PAYMENT_ACTION_TYPE)[keyof typeof PAYMENT_ACTION_TYPE];

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  GOOGLE_PAY: 'google_pay',
  APPLE_PAY: 'apple_pay',
} as const;

export type PaymentMethodId =
  (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

export const PAYMENT_METHODS_CONFIG = {
  CREDIT_CARD: {
    id: PAYMENT_METHODS.CREDIT_CARD,
    name: 'Credit card',
  },
  APPLE_PAY: {
    id: PAYMENT_METHODS.APPLE_PAY,
    name: 'Apple Pay',
  },
  GOOGLE_PAY: {
    id: PAYMENT_METHODS.GOOGLE_PAY,
    name: 'Google Pay',
  },
} as const;

export const ALLOWED_CARD_NETWORKS = {
  VISA: 'visa',
  MASTERCARD: 'master',
  AMERICAN_EXPRESS: 'american_express',
  JCB: 'jcb',
} as const;

export type AllowedCardNetwork =
  (typeof ALLOWED_CARD_NETWORKS)[keyof typeof ALLOWED_CARD_NETWORKS];

export const DEFAULT_PAYMENT_ACTION_TYPE = PAYMENT_ACTION_TYPE.CAPTURE;

export const SYNXIS_SUPPORTED_PAYMENT_TYPES = {
  AX: 'American Express ',
  CB: 'Carte Blanche ',
  CU: 'China Union Pay', // (for Expedia only)
  UP: 'China Union Pay', // (for all other channels)
  DN: 'Diners Club ',
  DS: 'Discover Card ',
  EC: 'Euro card ',
  FB: 'Forbrugsforeningskort ',
  JC: 'Japanese Credit Bureau Credit Card ',
  SW: 'Maestro ',
  MC: 'Master Card ',
  VI: 'Visa ',
} as const;

export const SPREEDLY_SUPPORTED_PAYMENT_TYPES = {
  alelo: 'Alelo',
  alia: 'Alia',
  american_express: 'American Express',
  cabal: 'Cabal',
  carnet: 'Carnet',
  confiable: 'Confiable',
  dankort: 'Dankort',
  diners_club: 'Diners Club',
  discover: 'Discover',
  elo: 'Elo',
  jcb: 'JCB',
  maestro: 'Maestro',
  master: 'MasterCard',
  naranja: 'Naranja',
  olimpica: 'Olimpica',
  sodexo: 'Sodexo',
  visa: 'Visa',
  vr: 'VR',
} as const;

// TODO: Change to global type
export type PaymentMethod = { id: PaymentMethodId; name: string };

// TODO: Change to global type
export type UserSavedPaymentMethod = {
  id: PaymentMethodId;
  name: string;
  cardType: string;
  lastFourDigits: string;
  cardNumberMask: string;
  token: string;
  isSavedPayment: boolean;
  transactionCount: number;
};

export type NormalizedPaymentMethod = {
  id: PaymentMethodId;
  name?: string;
  cardType?: string | null;
  token?: string;
  lastFourDigits?: string;
  cardNumberMask?: string | null;
  transactionCount?: number;
  isSavedPayment: boolean;
};
