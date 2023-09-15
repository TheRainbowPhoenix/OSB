export const PAGES = {
  SERVICE_UNAIVALABLE: 'service_unavailable',
  SELECT_BOOKING_DATES: 'select_booking_dates',
  SELECT_ROOMS: 'select_rooms',
  SELECT_HOTEL: 'select_hotel',
  VIEW_ROOM: 'view_room', // TODO add more pages as things get clearer
  BOOKING_SUCCESSFUL: 'booking_successful',
  ENTER_EMAIL_OR_PHONE: 'enter_email_or_phone',
  ENTER_CONFIRMATION_CODE: 'enter_confirmation_code',
  ENTER_CARD_DETAILS: 'enter_card_details',
  ENTER_NAME_AND_MOBILE_OR_PHONE: 'enter_name_and_mobile_or_phone',
  GUEST_CHECKOUT: 'guest_checkout',
  WALLET: 'wallet',
  TWO_STEP_RESERVATION: 'two_step_reservation',
  PAYMENT_FAILED: 'payment_failed',
  VIEW_BOOKING: 'view_booking',

  // Account Pages
  ACCOUNT: 'account',
  PROFILE: 'profile',
  RESERVATIONS: 'reservations',
  PREFERENCES: 'preferences',
  SETTINGS: 'settings',
  FIND_RESERVATION: 'find_reservation',
  RESERVATIONS_LIST: 'reservations_list',
  RESERVATION_DETAILS: 'reservation_details',
  // Modify Booking FLow
  MODIFY_BOOKING_DATE: 'modify_booking_date',
  BOOKING_MODIFIED_SUCCESSFUL: 'booking_modified_successfully',
  // Cancel Booking
  CANCEL_BOOKING: 'cancel_booking',
  BOOKING_CANCELLED: 'booking_cancelled',

  // Currency and locale selector
  LOCALE_SELECTOR: 'locale_selector',
  CURRENCY_SELECTOR: 'currency_selector',

  // Guest Details on ViewRoomDetailsPage
  GUEST_DETAILS_LIST: 'guest_details_list',
  GUEST_DETAILS_PROFILE: 'guest_details_profile',
} as const;

export const ACCOUNT_MANAGEMENT_ROUTES: Pick<
  typeof PAGES,
  | 'ACCOUNT'
  | 'PROFILE'
  | 'ENTER_EMAIL_OR_PHONE'
  | 'ENTER_CONFIRMATION_CODE'
  | 'ENTER_CARD_DETAILS'
  | 'ENTER_NAME_AND_MOBILE_OR_PHONE'
  | 'WALLET'
  | 'RESERVATIONS'
  | 'PREFERENCES'
  | 'FIND_RESERVATION'
  | 'RESERVATIONS_LIST'
> = {
  ACCOUNT: PAGES.ACCOUNT,
  PROFILE: PAGES.PROFILE,
  ENTER_EMAIL_OR_PHONE: PAGES.ENTER_EMAIL_OR_PHONE,
  ENTER_CONFIRMATION_CODE: PAGES.ENTER_CONFIRMATION_CODE,
  ENTER_CARD_DETAILS: PAGES.ENTER_CARD_DETAILS,
  ENTER_NAME_AND_MOBILE_OR_PHONE: PAGES.ENTER_NAME_AND_MOBILE_OR_PHONE,
  WALLET: PAGES.WALLET,
  RESERVATIONS: PAGES.RESERVATIONS,
  PREFERENCES: PAGES.PREFERENCES,
  FIND_RESERVATION: PAGES.FIND_RESERVATION,
  RESERVATIONS_LIST: PAGES.RESERVATIONS_LIST,
};

export const INITIAL_PAGE = PAGES.SELECT_BOOKING_DATES;
export type PagesType = (typeof PAGES)[keyof typeof PAGES];
export type AccountManagementRoutesType =
  (typeof ACCOUNT_MANAGEMENT_ROUTES)[keyof typeof ACCOUNT_MANAGEMENT_ROUTES];
