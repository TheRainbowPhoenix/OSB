import { differenceInDays, format } from 'date-fns';
import { EVENT_TYPES } from '@namastay/constants';
import type {
  PurchasePayload,
  BeginCheckoutPayload,
  ViewItemListPayload,
  SelectRoomPayload,
  GA4EventsMapperType,
  EventType,
  SearchPayload,
  AddAddonEventPayload,
} from './types';
import { camelCaseToSnakeCase } from '../parser';

const parseGA4PurchaseEvent = (payload: PurchasePayload) => {
  const { actionField } = payload?.ecommerce?.purchase || {};
  const formattedStartDate = format(
    new Date(actionField?.startDate),
    'yyyy-MM-dd'
  );
  const formattedEndDate = format(new Date(actionField?.endDate), 'yyyy-MM-dd');
  const userDataObj: { [key: string]: unknown } = {};

  if (actionField?.user_data) {
    const userData: Record<string, unknown> = actionField.user_data;
    Object.keys(userData).forEach((key) => {
      userDataObj[camelCaseToSnakeCase(key)] = userData[key];
    });
  }

  return {
    event: EVENT_TYPES.GA4Purchase,
    ecommerce: {
      transaction_id: actionField?.id,
      value: Number(actionField?.revenue),
      currency: actionField?.currency,
      tax: Number(actionField?.tax),
      coupon: actionField?.coupon,
      rooms: actionField?.rooms,
      rooms_nights: actionField?.roomsNights,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      affiliation: actionField?.affiliation,
      shipping: Number(actionField?.shipping),
      payment_type: actionField?.payment_type,
      hotelCode: payload.hotelCode,
      guests_number: actionField.guestsNumber,
      ...(Object.keys(userDataObj).length > 0 && {
        user_data: { ...userDataObj },
      }),
      items: payload?.ecommerce?.purchase?.products?.map((product) => ({
        item_id: product.id,
        item_name: product.name,
        item_brand: '',
        item_category: product.category ?? 'room',
        price: Number(product.price),
        quantity: product.quantity,
        coupon: actionField?.coupon,
        affiliation: actionField?.affiliation,
      })),
    },
  };
};
const parseGA4BeginCheckoutEvent = (payload: BeginCheckoutPayload) => {
  const { items, paymentMethod } = payload?.ecommerce || {};
  const formattedStartDate = format(new Date(payload?.ecommerce?.items?.startDate), 'yyyy-MM-dd');
  const formattedEndDate = format(new Date(payload?.ecommerce?.items?.endDate), 'yyyy-MM-dd');
  return {
    event: EVENT_TYPES.beginCheckout,
    ecommerce: {
      currency: items.rate.currencyCode,
      value: items.rate.amount,
      coupon: items.promoCode,
      affiliation: 'Namastay',
      payment_method: paymentMethod,
      hotelCode: payload.hotelCode,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      rooms: payload?.ecommerce?.rooms,
      roomsNights: payload?.ecommerce?.roomsNights,
      guestsNumber: payload.ecommerce?.guestsNumber,
      items: [
        {
          item_id: items.key,
          item_name: items.rooms[0]?.title,
          index: 0,
          item_category: 'room',
          price: items.rate.amount,
          quantity: 1,
        },
      ],
    },
  };
};
const parseGA4ViewItemListEvent = (payload: ViewItemListPayload) => {
  const { items } = payload?.ecommerce || {};
  return {
    event: EVENT_TYPES.viewItemList,
    ecommerce: {
      item_list_name: 'Rooms',
      item_list_id: 'rooms',
      hotelCode: payload.hotelCode,
      startDate: payload?.ecommerce?.startDate,
      endDate: payload?.ecommerce?.endDate,
      rooms: payload?.ecommerce?.rooms,
      roomsNights: payload?.ecommerce?.roomsNights,
      guestsNumber: payload.ecommerce?.guestsNumber,
      items: items?.map((item, index) => ({
        item_id: item.roomTypeCode,
        item_name: item.title,
        index,
        price: Number(item.bestRates[0]?.price || '0'),
        quantity: 1,
        affiliation: 'Namastay',
        item_category: 'room',
        item_list_name: 'Rooms',
        item_list_id: 'rooms',
      })),
    },
  };
};
const parseGA4AddToCartEvent = (payload: SelectRoomPayload) => {
  const { items } = payload?.ecommerce || {};
  return {
    event: EVENT_TYPES.addToCart,
    ecommerce: {
      currency: items?.[0]?.currency,
      value: Number(items?.[0]?.price || '0'),
      hotelCode: payload.hotelCode,
      startDate: payload?.ecommerce?.startDate,
      endDate: payload?.ecommerce?.endDate,
      rooms: payload?.ecommerce?.rooms,
      roomsNights: payload?.ecommerce?.roomsNights,
      guestsNumber: payload.ecommerce?.guestsNumber,
      items: [
        {
          item_id: items?.[0]?.roomId,
          item_name: items?.[0]?.roomName,
          index: 0,
          item_category: 'room',
          price: Number(items?.[0]?.price || '0'),
          quantity: 1,
          affiliation: 'Namastay',
          item_list_name: 'Rooms',
          item_list_id: 'rooms',
        },
      ],
    },
  };
};

const parseGA4PressNextOnCalendarEvent = (payload: SearchPayload) => {
  const formattedStartDate = new Date(payload?.ecommerce?.startDate);
  const formattedEndDate = new Date(payload?.ecommerce?.endDate);
  const roomsNights = differenceInDays(formattedEndDate, formattedStartDate);

  return {
    event: EVENT_TYPES.search,
    ecommerce: {
      startDate: format(formattedStartDate, 'yyyy-MM-dd'),
      endDate: format(formattedEndDate, 'yyyy-MM-dd'),
      rooms: payload?.ecommerce?.rooms,
      roomsNights,
      adults: payload?.ecommerce?.adults,
      children: payload?.ecommerce?.children,
      guests_number: payload.ecommerce.adults + payload.ecommerce.children,
      hotelCode: payload.hotelCode,
    },
  };
};

const parseGA4AddAddonEvent = (payload: AddAddonEventPayload) => {
  const { addon } = payload?.ecommerce || {};
  return {
    event: EVENT_TYPES.addToCart,
    ecommerce: {
      currency: addon.currency,
      value: Number(addon?.prices?.[0]?.amount || '0') * addon.quantity,
      hotelCode: payload.hotelCode,
      items: [
        {
          item_id: addon.serviceInventoryCode,
          item_name: addon.title,
          index: 0,
          item_category: 'addon',
          price: Number(addon?.prices?.[0]?.amount || '0'),
          quantity: addon.quantity,
          affiliation: 'Namastay',
          item_list_name: 'Addons',
          item_list_id: 'addons',
        },
      ],
    },
  };
};

const GA4EventsMapper: GA4EventsMapperType = {
  namastay_purchase: parseGA4PurchaseEvent,
  begin_checkout: parseGA4BeginCheckoutEvent,
  view_room_list: parseGA4ViewItemListEvent,
  select_room: parseGA4AddToCartEvent,
  press_next_on_calendar: parseGA4PressNextOnCalendarEvent,
  add_addon: parseGA4AddAddonEvent,
};

export const parseGA4Event = (eventName: EventType, payload: any) => {
  if (!GA4EventsMapper[eventName]) {
    return {
      event: eventName,
      ...payload,
    };
  }

  return GA4EventsMapper[eventName]?.(payload);
};
