import type { CurrencyCode } from "./currencies";

export const DEFAULT_QUANTITY = 1;

export const SERVICE_PRICING_TRANSLATION_MAPPING = {
    'Per night': 'GXFBkk',
    'Per stay': 'perStay',
    'Per person': 'perPerson',
    'Per person per night': 'perPersonPerNight',
};

export type ServicePricingString = 'Per night' | 'Per stay' | 'Per person' | 'Per person per night'

export type ServicePrice = {
    amount: string;
    from: string;
    timeFrom: string;
    timeTo: string;
    to: string;
}

export type AddonModifier = {
    select: boolean;
}

export type AddonViewType = {
    currency: CurrencyCode;
    description: string;
    image: string;
    inclusive: boolean;
    isBulkType: boolean;
    policies: any;
    payNow: boolean;
    prices: ServicePrice[];
    serviceInventoryCode: string;
    servicePricingType: ServicePricingString;
    title: string;
    modifiers: AddonModifier;
  }
