import { CurrencyCode, SupportedCurrency } from "@namastay/constants";
import { EventChannel } from "./custom";

export interface CustomHotelEvent {
  eventName: string; // EVENT_TYPES
  eventPayloadParser: <T>(payload: T) => T;
}

export type CustomHotelEvents = Record<string, CustomHotelEvent>;

export interface RoomDetailsStatus {}

export type EventType = "my-event" | string;

export interface ActionField {
  id?: string;
  revenue?: number;
  gross?: number;
  tax?: number;
  coupon?: string;
  addons?: any[];
}
export interface AddPaymentInfoType {
    selectedRate?: {
        currencyCode: CurrencyCode,
        totalCost: string,
    };
    paymentMethod?: any;
    promoCode?: string;
    selectedRoom?: {
        roomTypeCode: string;
        title: string;
    };
}

interface BookingDetails {
    rate: {
        currencyCode: CurrencyCode,
        amount: string,
    };
    promoCode?: string;
    key?: string;
    rooms: {
        title: string
    }[];
    startDate: string;
    endDate: string;
}

export interface AddToCartPayload {
    bookingDetails?: BookingDetails;
    selectedPaymentMethodId: number;
}
export interface DateRange {
  endDate: Date;
  startDate: Date;
}
export interface Event {
  type: EventType;
  channels?: EventChannel[];
  payload?: Record<string, unknown> | undefined;
}
export type ProductsAddon = {
  id: string | number;
  name?: string;
  price: number;
  quantity: number;
  category: string;
  variant?: string;
  brand?: string;
  charge_type?: any;
}[];

export interface PurchasePayload {
    ecommerce: {
        purchase: {
            products: {
                id: number
                name: string
                category: string
                price: string
                quantity: string
            }[],
            actionField: {
                startDate: string;
                endDate: string;
                user_data: Record<string, any>;
                revenue: number;
                tax: number;
                shipping: number;
                id: string;
                currency: string;
                coupon: string;
                rooms: string;
                roomsNights: string;
                affiliation: string;
                payment_type: string;
                guestsNumber: string;
            }
        };
    };
    hotelCode: string;

};

export interface BeginCheckoutPayload {
    ecommerce: {
        paymentMethod: number,
        items: BookingDetails,
        rooms: number,
        roomsNights: number,
        guestsNumber: number,
    }
    hotelCode: string;
}
export interface ViewItemListPayload {
    ecommerce?: {
        items: any[];
        startDate: string;
        endDate: string;
        rooms: any;
        roomsNights: number;
        guestsNumber: number;
    }
    hotelCode: string;
}
export interface SelectRoomPayload {
    ecommerce?: {
        items: any[];
        startDate: string;
        endDate: string;
        rooms: any;
        roomsNights: number;
        guestsNumber: number;
    }
    hotelCode: string;
}
export type GA4EventsMapperType  = Record<string, any>;

export interface SearchPayload {
    ecommerce: {
        startDate: string;
        endDate: string;
        rooms: any;
        adults: number;
        children: number;
    }
    hotelCode: string;
}
export interface AddAddonEventPayload {
    ecommerce: {
        addon?: any
    }
    hotelCode: string;
}