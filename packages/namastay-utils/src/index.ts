import { CurrencyCode } from '@namastay/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parsePayload = (payload: any): any => {
  Object.keys(payload).forEach((key) => {
    if (payload[key] === '') {
      // eslint-disable-next-line no-param-reassign
      payload[key] = null;
    }
  });
  return payload;
};

/** Loops through an object type. */
type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

/** Removes null and undefined values from an object type. */
type RemoveNullish<T> = ExpandRecursively<{
  [K in keyof T]: Exclude<RemoveNullish<T[K]>, null | undefined>;
}>;

/**
 * Removes null and undefined values from an object.
 * @example
 * ```ts
 * const cleanObject = removeNullishValues({ a: 1, b: null, c: undefined, d: { e: 2, f: null } }) // { a: 1, d: { e: 2 } }
 * ```
 */
export const removeNullishValues = <T extends Record<string, unknown>>(
  obj: T
): RemoveNullish<T> =>
  Object.keys(obj)
    .filter((k) => obj[k] != null)
    .reduce((a, k) => ({ ...a, [k]: obj[k] }), {} as RemoveNullish<T>);

export const evenlySplitInteger = (
  integer: number,
  parts: number
): number[] => {
  const remainder = integer % parts;
  const baseValue = (integer - remainder) / parts;

  return Array(parts)
    .fill(baseValue)
    .fill(baseValue + 1, 0, remainder);
};

export const parseURI = (uri: string): string =>
  decodeURIComponent(uri).replace('/&amp;/g', '&');

export const openInNewTab = (url: string): void => {
  if (window) {
    window.open(url, '_blank')?.focus();
  }
};

export const isEmptyString = (value: string): boolean => value === '';

export const isTime = (str: string): boolean => str.length === 9;

export const getCurrencySymbol = (currency: CurrencyCode) =>
  Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: 'narrowSymbol',
    notation: 'compact',
    compactDisplay: 'short',
  })
    .format(0)
    .replace(/\d/g, '')
    .trim();

export { repeatWithTimeout, timeout } from './actions';
export {
  calculateAddonPrice,
  calculateLegacyAddonPrice,
  filterAddonsByInventoryCode,
  getUniqueTimeStamps,
} from './addons';
export {
  initAnalytics,
  trackAddAddon,
  trackAddPaymentInfo,
  trackAddToCart,
  trackCalendar,
  trackCancelBooking,
  trackCheckout,
  trackCheckoutEvents,
  trackDecrementGuests,
  trackExploreDisclaimerClick,
  trackGetRoomsList,
  trackIncrementGuests,
  trackModifyBooking,
  trackNamastayLoads,
  trackOpenNamastay,
  trackOpenNamastayWithParams,
  trackOpenNamastayWithParamsHandler,
  trackPageView,
  trackPressNextButtonOnCalendar,
  trackPurchase,
  trackRemoveAddon,
  trackSelectRate,
  trackSelectRoom,
  registerAnalyticsSessionVariables,
  trackUserManuallyRegistered,
  trackRoomDetailsLoaded,
} from './analytics';

export { isInIframe } from './browser';

export {
  getCalendarIsoDateFormat,
  getConstrainForSpecificDate,
  getDateWithoutTimeFromString,
  getDisabledDays,
  getIsoDateFormat,
  getPriceByDateAndCurrency,
} from './calendar';
export { isDesktop, isMobile } from './devices';
export {
  generateEmptyGuestDetails,
  generateGuestsDetailsFromGuestsCount,
  generateLeadGuest,
  isChildAgeValid,
} from './guests';
export { getDescriptionFormatted } from './html';
export { loadScript } from './loadScript';
export {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from './localStorage';
export { generateRandomUniqueId } from './objects';
export {
  calculateReadyToPayPrice,
  getDefaultPaymentMethod,
  getNormalizedPaymentMethodById,
  normalizePaymentMethods,
} from './payments';
export { getCheapestRate, manageSelectedRate, sortRatesByPrice } from './rates';
export { sendMessageToSdk } from './sdk';
export { createTheme, hexToRgbCssVariable, shouldForwardProp } from './theme';
export {
  convertTimeToDate,
  getDateWithNoTimezoneISO,
  getNightCountFromDates,
  getTimeSpanTimeFormat,
  getDatesInRange,
} from './times';
export { detectEmailOrPhoneFromValue } from './user';
export {
  checkIfRegistrationIsCompleted,
  isValidEmail,
  validateField,
} from './validators';

export { slugToSentence } from './parser';

export { hashObjectValues } from './crypto';

export { type RoomDetailsStatus } from './analytics/types';
