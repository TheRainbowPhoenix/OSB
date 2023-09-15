import { EVENT_CHANNELS, EVENT_TYPES } from '@namastay/constants';
import mixpanel from 'mixpanel-browser';
import { sendMessageToSdk } from '../sdk';
import { parseGA4Event } from './parser';
import type { CustomHotelEvents, EventType } from './types';

declare global {
  interface Window {
    dataLayer: any[]; // You can specify a more specific type if needed
  }
}

export const testEvents: Partial<CustomHotelEvents> = {
  [EVENT_TYPES.purchase]: {
    eventName: 'namastay_purchase',
    eventPayloadParser: <T>(payload: T): T => payload,
  },
};

export const grandPigalleEvents: Partial<CustomHotelEvents> = {
  [EVENT_TYPES.purchase]: {
    eventName: 'namastay_purchase',
    eventPayloadParser: <T>(payload: T): T => payload,
  },
};

type CustomEventsByHotel = {
  [hotelCode: string]: Partial<CustomHotelEvents>;
};

export const customEventsByHotel: CustomEventsByHotel = {
  '64400': grandPigalleEvents,
  '11113': testEvents,
};

type EventTracker = (
  eventName: EventType,
  payload?: Record<string, unknown>
) => void;

const trackGTM: EventTracker = (eventName, payload) => {
  // Check if GTM exists.
  const event = parseGA4Event(eventName, payload);
  window.dataLayer?.push({ ecommerce: null });
  window.dataLayer?.push(event);
  sendMessageToSdk({ type: 'namastayAnalyticsEvent', payload: { event } });
};

const trackMixpanel: EventTracker = (eventName, payload) => {
  mixpanel.track(eventName, payload);
};
export type EventChannel = (typeof EVENT_CHANNELS)[keyof typeof EVENT_CHANNELS];
type TrackByChannel = Record<EventChannel, EventTracker>;

export const trackByChannel: Partial<TrackByChannel> = {
  [EVENT_CHANNELS.GTM]: trackGTM,
  [EVENT_CHANNELS.MIXPANEL]: trackMixpanel,
};
