export const ALERT_SEVERITY = {
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
} as const;

export const LE_VENDOME_HOTEL_CODE = '10861';

export const LILY_OF_THE_VALLEY_HOTEL_CODE = '7214';

export const ROYAL_CHAMPAGNE_HOTEL_CODE = '9713';

export const EXPERIMENTAL_CHALET_HOTEL_CODE = '5061';
export const GRANDS_BOULEVARDS_HOTEL_CODE = '79574';
export const HENRIETTA_HOTEL_CODE = '77140';
export const IL_PALAZZO_HOTEL_CODE = '8173';
export const MENORCA_HOTEL_CODE = '8467';
export const REGINA_EXPERIMENTAL_HOTEL_CODE = '41456';
export const GRAND_PIGALLE_HOTEL_CODE = '64400';
export const COWLEY_MANOR_EXPÉRIMENTAL_HOTEL_CODE = '78199';
const LE_VOLTAIRE_HOTEL_CODE = '34713';
const DOMAINE_DE_SAINT_GERY_HOTEL_CODE = '7784';
export const NOVA_HOTEL_CODE = '35936';

export const BEAUMIER_CHAIN_UUID = '0d109b2e-b185-49d0-91ba-2d90db426eab';

export const BEAUMIER_DEFAULT_CHILD_MAX_AGE = 12;

export const HOTELS_WITH_HIDDEN_CALENDAR_PRICES = [
  LE_VOLTAIRE_HOTEL_CODE,
  DOMAINE_DE_SAINT_GERY_HOTEL_CODE,
] as const;

export const BEAUMIER_HOTEL_CODES = [
  '35276',
  '35166',
  '35505',
  '35507',
  '35504',
  '35255',
  '71986',
  '35178',
];

export type AlertSeverity =
  (typeof ALERT_SEVERITY)[keyof typeof ALERT_SEVERITY];

// Added this as more statuses should be added (for example)
export const AUTH_STATUS = {
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
} as const;

export const LOCAL_STORAGE_KEYS = {
  AUTHORIZATION_TOKEN: 'token',
} as const;

export const HIDDEN_CLASS = 'hidden' as const;
export const DEVICE_FINGERPRINT_ID = 'device-fingerprint' as const;
export const CHALLENGE_MODAL_ID = 'challenge-modal' as const;
export const CHALLENGE_ID = 'challenge' as const;
export const TEMP_SPREEDLY_IFRAME_ID = 'temp-spreedly-iframe' as const;

export const REQUEST_STATUS = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
} as const;

export const ONE_SECOND_IN_MS = 1000 as const;

export const PRIVACY_URL =
  'https://www.namastay.io/privacy?utm_source=hotel_website&utm_medium=booking_engine&utm_campaign=privacy&utm_id=privacy' as const;

export const TERMS_AND_CONDITIONS_URL =
  'https://www.namastay.io/terms-and-conditions?utm_source=hotel_website&utm_medium=booking_engine&utm_campaign=terms_and_conditions&utm_id=terms_and_conditions' as const;

export const NAMASTAY_WEBSITE_URL =
  'https://www.namastay.io/?utm_source=hotel_website&utm_medium=booking_engine&utm_campaign=clickable_logo&utm_id=clickable_logo' as const;

export const REQUEST_TRIES = 3 as const;
export const REQUEST_TIMEOUT = 1000 as const;
export const CONTINUE_CONFIRM_STATUS = 404 as const;

export const REQUEST_HEADERS = {
  LANGUAGE: 'X-App-Lang',
  CURRENCY: 'X-App-Currency',
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'Authorization',
} as const;

export const HOTJAR_VERSION = 6;