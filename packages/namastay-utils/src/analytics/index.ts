import {
  BEAUMIER_HOTEL_CODES,
  Booking,
  EVENT_CHANNELS,
  EVENT_TYPES,
  type Addon,
  type Rate,
  type Room,
} from '@namastay/constants';
import { differenceInDays, format } from 'date-fns';
import mixpanel from 'mixpanel-browser';
import { customEventsByHotel, trackByChannel } from './custom';
import type {
  ActionField,
  AddPaymentInfoType,
  AddToCartPayload,
  DateRange,
  Event,
  EventType,
  ProductsAddon,
  RoomDetailsStatus,
} from './types';

import { hashObjectValues } from '../crypto';
import { getDatesInRange } from '../times';

import { slugToSentence } from '../parser';

export const initAnalytics = async (mixpanelProjectId?: string) => {
  if (mixpanelProjectId && typeof mixpanel !== undefined) {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve(undefined);
      }, 5000);

      mixpanel?.init?.(mixpanelProjectId, {
        loaded: (mixpanelInstance) => {
          clearTimeout(timeout);
          resolve(mixpanelInstance.get_distinct_id());
        },
      });
    });
  }
  return undefined;
};

export const registerAnalyticsSessionVariables = (
  sessionProperties: Record<string, unknown>
) => {
  mixpanel?.register?.(sessionProperties);
};

const track = (hotelCode: string, event: Event): void => {
  try {
    // Check if the hotel has a custom implementation for Analytics

    const customEvents = customEventsByHotel?.[hotelCode];
    const customEvent = customEvents ? customEvents[event.type] : null; // CustomHotelEvents
    const eventName: EventType = event.type;

    if (!eventName || !event.channels) {
      throw new Error(
        `Event ${event.type} or channels ${event.channels} are not valid.`
      );
    }
    event.channels.forEach((channel) => {
      const trackMethod = trackByChannel[channel];
      if (trackMethod) {
        if (!event.payload) {
          trackMethod(eventName, { hotelCode });
        } else {
          const payload = customEvent
            ? customEvent.eventPayloadParser(event.payload)
            : event.payload;
          trackMethod(eventName, { ...payload, hotelCode });
        }
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn({ error });
  }
  return undefined;
};

export const trackOpenNamastay = (hotelCode: string): void => {
  track(hotelCode, {
    type: EVENT_TYPES.openNamastay,
    channels: [EVENT_CHANNELS.MIXPANEL, EVENT_CHANNELS.GTM],
  });
};

export const trackNamastayLoads = (hotelCode: string): void => {
  track(hotelCode, {
    type: EVENT_TYPES.namastayLoads,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
  });
};

export const trackOpenNamastayWithParams = (
  hotelCode: string,
  type: EventType,
  {
    startDate,
    endDate,
    adult,
    child,
    ratePlanCode,
    promoCode,
    rooms,
    ratePlanCodeFilter,
  }: {
    startDate: string | null;
    endDate: string | null;
    adult: string | null;
    child: string | null;
    ratePlanCode: string | null;
    promoCode: string | null;
    rooms: string | null;
    ratePlanCodeFilter: string | null;
  }
): void => {
  const allowedEventTypes: EventType[] = [
    EVENT_TYPES.specialOffer,
    EVENT_TYPES.openNamastayMETA,
  ];

  if (!allowedEventTypes.includes(type)) return;

  track(hotelCode, {
    type,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: {
      startDate,
      endDate,
      adult,
      child,
      ratePlanCode,
      promoCode,
      rooms,
      ratePlanCodeFilter,
    },
  });
};
export const trackCheckout = (
  hotelCode: string,
  {
    selectedPaymentMethodId,
    bookingDetails,
    selectedRange,
    numberOfAdults,
    numberOfChildren,
    selectedRoomAmount,
  }: {
    selectedPaymentMethodId: number;
    bookingDetails: unknown;
    selectedRange: DateRange;
    numberOfAdults: number;
    numberOfChildren: number;
    selectedRoomAmount: number;
  }
): void => {
  track(hotelCode, {
    type: EVENT_TYPES.beginCheckout,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: {
      ecommerce: {
        paymentMethod: selectedPaymentMethodId,
        items: bookingDetails,
        rooms: selectedRoomAmount,
        roomsNights: differenceInDays(
          new Date(selectedRange.endDate),
          new Date(selectedRange.startDate)
        ),
        guestsNumber: numberOfAdults + numberOfChildren,
      },
    },
  });
};

export const trackIncrementGuests = (
  hotelCode: string,
  {
    numberOfAdults,
    numberOfChildren,
  }: { numberOfAdults: number; numberOfChildren: number }
): void => {
  track(hotelCode, {
    type: EVENT_TYPES.changeGuestNumber,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: {
      ecommerce: {
        adult: numberOfAdults,
        child: numberOfChildren,
      },
    },
  });
};

export const trackDecrementGuests = (
  hotelCode: string,
  {
    numberOfAdults,
    numberOfChildren,
  }: { numberOfAdults: number; numberOfChildren: number }
): void => {
  track(hotelCode, {
    type: EVENT_TYPES.changeGuestNumber,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: {
      ecommerce: {
        adult: numberOfAdults,
        child: numberOfChildren,
      },
    },
  });
};

export const trackAddAddon = (
  hotelCode: string,
  { updatedAddon }: { updatedAddon: Addon }
): void => {
  track(hotelCode, {
    type: EVENT_TYPES.addAddon,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: {
      ecommerce: {
        addon: updatedAddon,
      },
    },
  });
};

export const trackRemoveAddon = (
  hotelCode: string,
  { updatedAddons }: { updatedAddons: Addon[] }
): void => {
  track(hotelCode, {
    type: EVENT_TYPES.removeAddon,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: {
      ecommerce: {
        addons: updatedAddons,
      },
    },
  });
};

export const trackGetRoomsList = (
  hotelCode: string,
  {
    selectedRange,
    numberOfAdults,
    numberOfChildren,
    rooms,
    selectedRoomAmount,
  }: {
    selectedRange: DateRange;
    numberOfAdults: number;
    numberOfChildren: number;
    rooms: unknown[];
    selectedRoomAmount: number;
  }
): void => {
  track(hotelCode, {
    type: EVENT_TYPES.viewRoomList,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: {
      ecommerce: {
        startDate: format(selectedRange.startDate.getTime(), 'yyyy-MM-dd'),
        endDate: format(selectedRange.endDate.getTime(), 'yyyy-MM-dd'),
        adults: numberOfAdults,
        children: numberOfChildren,
        items: rooms,
        rooms: selectedRoomAmount,
        roomsNights: differenceInDays(
          new Date(selectedRange.endDate),
          new Date(selectedRange.startDate)
        ),
        guestsNumber: numberOfAdults + numberOfChildren,
      },
    },
  });
};

export const trackSelectRoom = (
  hotelCode: string,
  {
    selectedRange,
    numberOfAdults,
    numberOfChildren,
    selectedRoom,
    selectedRate,
    selectedRoomAmount,
  }: {
    selectedRange: DateRange;
    numberOfAdults: number;
    numberOfChildren: number;
    selectedRoom: Room;
    selectedRate: Rate;
    selectedRoomAmount: number;
  }
): void => {
  track(hotelCode, {
    type: EVENT_TYPES.selectRoom,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: {
      ecommerce: {
        startDate: format(selectedRange.startDate.getTime(), 'yyyy-MM-dd'),
        endDate: format(selectedRange.endDate.getTime(), 'yyyy-MM-dd'),
        adults: numberOfAdults,
        children: numberOfChildren,
        rooms: selectedRoomAmount,
        roomsNights: differenceInDays(
          new Date(selectedRange.endDate),
          new Date(selectedRange.startDate)
        ),
        guestsNumber: numberOfAdults + numberOfChildren,
        items: [
          {
            roomId: selectedRoom.roomTypeCode,
            roomName: selectedRoom.title,
            currency: selectedRoom.bestRates?.[0]?.currencyCode,
            price: selectedRoom.bestRates?.[0]?.price,
            selectedRate,
          },
        ],
      },
    },
  });
};

export const trackSelectRate = (
  hotelCode: string,
  {
    selectedRange,
    numberOfAdults,
    numberOfChildren,
    rate,
    selectedRoomAmount: numberOfRooms,
  }: {
    selectedRange: DateRange;
    numberOfAdults: number;
    numberOfChildren: number;
    rate: unknown;
    selectedRoomAmount: number;
  }
): void => {
  track(hotelCode, {
    type: EVENT_TYPES.selectRate,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: {
      ecommerce: {
        startDate: selectedRange.startDate
          ? format(selectedRange.startDate.getTime(), 'yyyy-MM-dd')
          : null,
        endDate: selectedRange.endDate
          ? format(selectedRange.endDate.getTime(), 'yyyy-MM-dd')
          : null,
        adults: numberOfAdults,
        children: numberOfChildren,
        rooms: numberOfRooms,
        roomsNights: differenceInDays(
          new Date(selectedRange.endDate),
          new Date(selectedRange.startDate)
        ),
        guestsNumber: numberOfAdults + numberOfChildren,
        items: [rate],
      },
    },
  });
};

export const trackCalendar = (
  hotelCode: string,
  { dateRange }: { dateRange: DateRange }
): void => {
  const range = getDatesInRange(dateRange.startDate, dateRange.endDate);
  const formattedRanges = range.map((date) => format(date, 'dd/MM/yyyy'));
  track(hotelCode, {
    type: EVENT_TYPES.selectDateRange,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: {
      ecommerce: {
        startDate: format(dateRange.startDate.getTime(), 'yyyy-MM-dd'),
        endDate: format(dateRange.endDate.getTime(), 'yyyy-MM-dd'),
        ranges: formattedRanges,
      },
    },
  });
};

export const trackPurchase = (
  hotelCode: string,
  { bookings, paymentMethod }: { bookings: Booking[]; paymentMethod: string }
): void => {
  const actionField = bookings.reduce<ActionField>((acc, booking) => {
    const { start: startDate, end: endDate } = booking.timeSpan;
    const revenue = Number(booking.totals.amountAfterTax ?? 0);
    const gross = Number(booking.totals.amountBeforeTax ?? 0);
    const tax = revenue - gross;
    const { currency } = booking.totals;
    const rooms = 1;
    const roomsNights = differenceInDays(
      new Date(endDate),
      new Date(startDate)
    );
    const shouldSendUserData = BEAUMIER_HOTEL_CODES.includes(hotelCode);
    const guestsNumber = booking.guests.length;
    const hashedUser = hashObjectValues(booking.client);
    const addons = booking?.addons?.reduce<ProductsAddon>((addonAcc, addon) => {
      const existingAddon = addonAcc.find(
        (a) => a.id === addon.serviceInventoryCode
      );

      if (existingAddon) {
        existingAddon.quantity += 1;
      } else {
        addonAcc.push({
          name: addon.title,
          id: addon.serviceInventoryCode,
          quantity: 1,
          category: 'addon',
          price: Number(addon.price) || 0,
        });
      }

      return addonAcc;
    }, []);

    if (acc && Object.keys(acc).length) {
      if (booking.bookingCode) acc.id += `-${booking.bookingCode}`;
      acc.revenue = acc.revenue ? acc.revenue + revenue : revenue;
      acc.gross = acc.gross ? acc.gross + gross : gross;
      acc.tax = acc.tax ? acc.tax + tax : tax;
      if (booking.promoCode) acc.coupon += `-${booking.promoCode}`;

      return acc;
    }

    return {
      id: booking.bookingCode,
      startDate,
      endDate,
      affiliation: 'Namastay',
      revenue,
      gross,
      tax,
      currency,
      shipping: '0.00',
      coupon: booking.promoCode,
      rooms,
      roomsNights,
      payment_type: paymentMethod,
      addons,
      guestsNumber,
      ...(shouldSendUserData ? { user_data: hashedUser } : {}),
    };
  }, {});

  const rooms = bookings.map((booking) => ({
    name: booking?.room?.title ?? '',
    id: booking?.room?.roomTypeCode ?? '',
    price: booking.totals.amountAfterTax,
    quantity: 1,
    coupon: booking.promoCode,
  }));

  const products = actionField.addons
    ? [...rooms, ...actionField.addons]
    : [...rooms];

  const payload = {
    ecommerce: {
      purchase: {
        actionField: {
          ...actionField,
          gross: Number(actionField.gross)?.toFixed(2) ?? '0.00',
          revenue: Number(actionField.revenue)?.toFixed(2) ?? '0.00',
          tax: Number(actionField.tax)?.toFixed(2) ?? '0.00',
        },
        products,
      },
    },
  };

  track(hotelCode, {
    type: EVENT_TYPES.purchase,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload,
  });
};

export const trackModifyBooking = (
  hotelCode: string,
  bookingDetails: unknown
): void => {
  track(hotelCode, {
    type: EVENT_TYPES.modifyBooking,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: {
      ecommerce: {
        items: bookingDetails,
      },
    },
  });
};

export const trackPressNextButtonOnCalendar = (
  hotelCode: string,
  {
    selectedRange,
    numberOfAdults,
    numberOfChildren,
    selectedRoomAmount,
  }: {
    selectedRange: DateRange;
    numberOfAdults: number;
    numberOfChildren: number;
    selectedRoomAmount: number;
  }
): void => {
  track(hotelCode, {
    type: EVENT_TYPES.pressNextOnCalendar,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: {
      ecommerce: {
        startDate: format(selectedRange.startDate.getTime(), 'yyyy-MM-dd'),
        endDate: format(selectedRange.endDate.getTime(), 'yyyy-MM-dd'),
        adults: numberOfAdults,
        children: numberOfChildren,
        rooms: selectedRoomAmount,
      },
    },
  });
};

export const trackUserManuallyRegistered = (
  hotelCode: string,
  userId: string | undefined
): void => {
  track(hotelCode, {
    type: EVENT_TYPES.userManuallyRegistered,
    channels: [EVENT_CHANNELS.MIXPANEL],
    payload: {
      hotelCode,
      userId,
    },
  });
};

export const trackCheckoutEvents = (
  hotelCode: string,
  eventName: Event['type'],
  payload?: Record<string, unknown>
): void => {
  track(hotelCode, {
    type: eventName,
    channels: [EVENT_CHANNELS.MIXPANEL],
    payload,
  });
};

export const trackAddPaymentInfo = (
  hotelCode: string,
  payload?: AddPaymentInfoType
): void => {
  const parsedPayload = {
    ecommerce: {
      currency: payload?.selectedRate?.currencyCode,
      payment_type: payload?.paymentMethod,
      value: Number(payload?.selectedRate?.totalCost || '0.00'),
      coupon: payload?.promoCode,
      items: [
        {
          item_id: payload?.selectedRoom?.roomTypeCode,
          item_name: payload?.selectedRoom?.title,
          affiliation: 'Namastay',
          index: 0,
          quantity: 1,
          price: Number(payload?.selectedRate?.totalCost || '0.00'),
          item_list_name: 'Room',
          item_list_id: 'room',
          item_category: 'Room',
          coupon: payload?.promoCode,
        },
      ],
    },
  };

  track(hotelCode, {
    type: EVENT_TYPES.addPaymentInfo,
    channels: [EVENT_CHANNELS.GTM],
    payload: parsedPayload,
  });
};

export const trackAddToCart = (
  hotelCode: string,
  payload?: AddToCartPayload
): void => {
  const { bookingDetails, selectedPaymentMethodId } = payload || {};

  const parsedPayload = {
    ecommerce: {
      currency: bookingDetails?.rate.currencyCode,
      value: bookingDetails?.rate.amount,
      coupon: bookingDetails?.promoCode,
      affiliation: 'Namastay',
      payment_method: selectedPaymentMethodId,
      items: [
        {
          item_id: bookingDetails?.key,
          item_name: bookingDetails?.rooms[0]?.title,
          index: 0,
          item_category: 'room',
          price: bookingDetails?.rate.amount,
          quantity: 1,
        },
      ],
    },
  };

  track(hotelCode, {
    type: EVENT_TYPES.addToCart,
    channels: [EVENT_CHANNELS.GTM],
    payload: parsedPayload,
  });
};

export const trackPageView = (
  hotelCode: string,
  payload: string,
  currentRoute: string
): void => {
  const parsedPayload = {
    page_title: slugToSentence(currentRoute),
    page_location: `${payload}`,
  };

  track(hotelCode, {
    type: EVENT_TYPES.pageView,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: parsedPayload,
  });
};

export const trackCancelBooking = (
  hotelCode: string,
  payload: string
): void => {
  const parsedPayload = {
    ecommerce: {
      transaction_id: payload,
    },
  };

  track(hotelCode, {
    type: EVENT_TYPES.cancel,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
    payload: parsedPayload,
  });
};

export const trackExploreDisclaimerClick = (hotelCode: string): void => {
  track(hotelCode, {
    type: EVENT_TYPES.exploreDisclaimerButtonClick,
    channels: [EVENT_CHANNELS.GTM, EVENT_CHANNELS.MIXPANEL],
  });
};

export const trackOpenNamastayWithParamsHandler = (
  url: string,
  hotelCode: string
): void => {
  const currentUrl = new URL(url);
  const queryParameters = currentUrl.searchParams;

  const startDate = queryParameters.get('startDate');
  const endDate = queryParameters.get('endDate');
  const ratePlanCode = queryParameters.get('ratePlanCode');
  const ratePlanCodeFilter = queryParameters.get('filter');
  const promoCode = queryParameters.get('promoCode');
  const adult = queryParameters.get('adult');
  const child = queryParameters.get('child');
  const rooms = queryParameters.get('rooms');

  const namastay =
    startDate ||
    endDate ||
    ratePlanCode ||
    ratePlanCodeFilter ||
    promoCode ||
    adult ||
    child ||
    rooms ||
    queryParameters.get('namastay');

  if (!namastay) return;

  const openNamastayTrackingPayload = {
    startDate,
    endDate,
    adult,
    child,
    ratePlanCode,
    promoCode,
    rooms,
    ratePlanCodeFilter,
  };

  const eventType =
    promoCode || ratePlanCode
      ? EVENT_TYPES.specialOffer
      : EVENT_TYPES.openNamastayMETA;

  trackOpenNamastayWithParams(
    hotelCode,
    eventType,
    openNamastayTrackingPayload
  );
};

export const trackRoomDetailsLoaded = (
  hotelCode: string,
  payload: {
    load_status: RoomDetailsStatus;
    load_time?: number;
    error_message?: string;
  }
) => {
  track(hotelCode, {
    type: EVENT_TYPES.roomDetailsLoaded,
    channels: [EVENT_CHANNELS.MIXPANEL],
    payload,
  });
};
