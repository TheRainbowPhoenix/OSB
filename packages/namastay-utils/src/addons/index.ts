import {
  SERVICE_PRICING_TYPE,
  type Addon,
  type AddonPrice,
  type AddonTimeSpan,
  type ServicePricingType,
  type ServicePrice,
} from '@namastay/constants';
import { AddonModifier } from '@namastay/constants/src/addons';

export const getUniqueTimeStamps = (prices: AddonPrice[]): AddonTimeSpan[] => {
  const uniqueTimeSpans: AddonTimeSpan[] = [];

  // TO KEEP: we will probably need it for the next designs.
  prices?.forEach(({ timeFrom, timeTo }) => {
    if (timeFrom) {
      const index = uniqueTimeSpans.findIndex(
        (uniqueTimeSpan) =>
          uniqueTimeSpan.timeFrom === timeFrom &&
          uniqueTimeSpan.timeTo === timeTo
      );

      if (index === -1) {
        uniqueTimeSpans.push({ timeFrom, timeTo });
      }
    }
  });

  return uniqueTimeSpans;
};

export const calculateAddonPrice = ({
  isBulkType = false,
  prices,
  quantity = 1,
}: {
  isBulkType?: boolean;
  prices?: ServicePrice[];
  quantity?: number;
}): number => {
  if (!prices?.length) return 0;

  const stayPrice = isBulkType
    ? prices.reduce((acc, price) => acc + parseFloat(price.amount), 0)
    : parseFloat(prices[0]?.amount || '0');

  return stayPrice * quantity;
};

export const calculateLegacyAddonPrice = ({
  nightsCount = 1,
  personCount = 1,
  price,
  quantity = 1,
  servicePricingType,
  modifiers = {
    select: false
  }
}: {
  nightsCount?: number;
  personCount?: number;
  price: string | number;
  quantity?: number;
  servicePricingType: ServicePricingType;
  modifiers?: AddonModifier;
}): number => {
  if (!price) return 0;

  switch (servicePricingType) {
    case SERVICE_PRICING_TYPE.PER_NIGHT:
      return modifiers.select ? Number(price) * quantity :
        Number(price) * quantity * nightsCount;

    case SERVICE_PRICING_TYPE.PER_STAY:
      return Number(price) * quantity;

    // Per person (per item really)  // Per person (per item really)
    case SERVICE_PRICING_TYPE.PER_PERSON:
      return Number(price) * quantity * personCount;

    // Per person per night (Per item per night)
    case SERVICE_PRICING_TYPE.PER_PERSON_PER_NIGHT:
      return modifiers.select ? Number(price) * quantity * personCount :
        Number(price) * quantity * nightsCount * personCount;

    default:
      return 0;
  }
};

export const filterAddonsByInventoryCode = (
  addons: Addon[],
  serviceInventoryCode: string
): Addon[] =>
  addons.filter((addon) => addon.serviceInventoryCode === serviceInventoryCode);
