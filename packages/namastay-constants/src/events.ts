/**
 * The channels where an event can be sent through.
 */
export const EVENT_CHANNELS = {
  GTM: 'gtm',
  GTAG: 'gtag',
  MIXPANEL: 'mixpanel',
} as const;

/**
 * The types of event that our application sends.
 */
export const EVENT_TYPES = {
  openNamastay: 'open_namastay',
  specialOffer: 'special_offer',
  selectDateRange: 'select_date_range',
  changeGuestNumber: 'change_guest_number',
  viewRoomList: 'view_room_list',
  selectRoom: 'select_room',
  selectRate: 'select_rate',
  addAddon: 'add_addon',
  removeAddon: 'remove_addon',
  beginCheckout: 'begin_checkout',
  purchase: 'namastay_purchase',
  modifyBooking: 'modify_booking',
  pressNextOnCalendar: 'press_next_on_calendar',
  namastayLoads: 'namastay_loads',
  beginCheckoutError: 'begin_checkout_error',
  applePayLaunch: 'apple_pay_launch',
  applePayError: 'apple_pay_error',
  applePayManualClose: 'apple_pay_manual_close',
  googlePayLaunch: 'google_pay_launch',
  googlePayError: 'google_pay_error',
  googlePayManualClose: 'google_pay_manual_close',
  threeDSecureLaunch: '3d_secure_launch',
  threeDSecureError: '3d_secure_error',
  threeDSecureManualClose: '3d_secure_manual_close',
  guestCheckoutLoads: 'guest_checkout_load',
  guestCheckoutLoginRegister: 'guest_checkout_login_register',
  guestCheckoutBeginCheckout: 'guest_checkout_begin_checkout',
  guestCheckoutBeginCheckoutError: 'guest_checkout_begin_checkout_error',
  GA4Purchase: 'purchase',
  viewItemList: 'view_item_list',
  viewItem: 'view_item',
  addPaymentInfo: 'add_payment_info',
  addToCart: 'add_to_cart',
  search: 'search',
  pageView: 'page_view',
  cancel: 'cancel',
  exploreDisclaimerButtonClick: 'explore_disclaimer_button_click',
  openNamastayMETA: 'open_namastay_meta',
  userManuallyRegistered: 'user_manually_registered',
  roomDetailsLoaded: 'room_details_loaded',
} as const;
