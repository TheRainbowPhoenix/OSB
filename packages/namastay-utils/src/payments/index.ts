import {
  PAYMENT_METHODS,
  PAYMENT_ACTION_TYPE,
  type PaymentMethodId,
  type PaymentMethod,
  type UserSavedPaymentMethod,
  type NormalizedPaymentMethod,
  Rate,
  PaymentActionType,
} from '@namastay/constants';

export const normalizePaymentMethods = ({
  availablePaymentMethods,
  userSavedPaymentMethods,
}: {
  availablePaymentMethods: PaymentMethod[];
  userSavedPaymentMethods: UserSavedPaymentMethod[];
}): NormalizedPaymentMethod[] => {
  const normalizedPaymentMethods: NormalizedPaymentMethod[] = [];

  availablePaymentMethods.forEach(({ id, name }) => {
    // The logic here is that: if the user already has credit / debit card saved, we don't show the
    //  saved credit / debit card related payment method AND the default Pay via Credit / Debit card.
    // We show only the saved payment methods. If the user wants to add new credit / debit payment method,
    // it can press "Manage" and add that payment method inside the wallet

    normalizedPaymentMethods.push({
      id,
      name,
      cardType: null,
      isSavedPayment: false,
      cardNumberMask: null,
    });
  });

  if (!userSavedPaymentMethods.length) {
    return normalizedPaymentMethods;
  }

  userSavedPaymentMethods.forEach((userSavedPaymentMethod) => {
    const { id, token, cardType, lastFourDigits, transactionCount } =
      userSavedPaymentMethod;

    normalizedPaymentMethods.push({
      id,
      token,
      name: cardType,
      cardType,
      isSavedPayment: true,
      cardNumberMask: lastFourDigits,
      transactionCount,
    });
  });

  return normalizedPaymentMethods;
};

export const getDefaultPaymentMethod = ({
  isApplePayAvailable,
  isGooglePayAvailable,
  userSavedPaymentMethods,
}: {
  isApplePayAvailable: boolean;
  isGooglePayAvailable: boolean;
  userSavedPaymentMethods: UserSavedPaymentMethod[];
}): NormalizedPaymentMethod => {
  const { APPLE_PAY, GOOGLE_PAY, CREDIT_CARD } = PAYMENT_METHODS;

  if (isApplePayAvailable) {
    return { id: APPLE_PAY, isSavedPayment: false };
  }

  if (isGooglePayAvailable) {
    return { id: GOOGLE_PAY, isSavedPayment: false };
  }

  if (userSavedPaymentMethods.length && userSavedPaymentMethods[0]) {
    return { id: userSavedPaymentMethods[0].id, isSavedPayment: true };
  }

  return { id: CREDIT_CARD, isSavedPayment: false };
};

export const getNormalizedPaymentMethodById = (
  id: PaymentMethodId,
  availablePaymentMethods: PaymentMethod[],
  userSavedPaymentMethods: UserSavedPaymentMethod[]
): NormalizedPaymentMethod | undefined => {
  const normalizedPaymentMethods = normalizePaymentMethods({
    availablePaymentMethods,
    userSavedPaymentMethods,
  });
  const result = normalizedPaymentMethods.find(
    (paymentMethod) => paymentMethod.id === id
  );

  return result;
};

export const calculateReadyToPayPrice = (
  isFirstNightDeposit: boolean,
  selectedRate: Rate,
  selectedPaymentTimeOption: PaymentActionType,
  totalMultiBookingPrice: number,
  addonsCost: { total: number; payNow: number }
) => {
  if (isFirstNightDeposit && selectedRate.nightlyRates[0]) {
    const amountAfterTax = selectedRate.nightlyRates[0].amountAfterTax || 0;
    const percentageToPayNow = selectedRate.percentageToPayNow || 0;

    return amountAfterTax * percentageToPayNow;
  }

  if (
    selectedPaymentTimeOption === PAYMENT_ACTION_TYPE.CAPTURE ||
    selectedPaymentTimeOption === PAYMENT_ACTION_TYPE.DEFERRED
  ) {
    const totalPrice = totalMultiBookingPrice + addonsCost.payNow;
    const percentageToPayNow = selectedRate.percentageToPayNow || 1;

    return totalPrice * percentageToPayNow;
  }

  return 0;
};
