import { COUNTRY_DETAILS, DEFAULT_COUNTRY } from '@namastay/constants';
import { parsePhoneNumberWithError, type PhoneNumber } from 'libphonenumber-js';

type CountryCode = keyof typeof COUNTRY_DETAILS;

export const checkIfIsPotentiallyAPhoneNumber = (value: string): boolean => {
  const cleanedValue = value.replace(/\D/g, '');
  return /^\+?\d{2,}$/.test(cleanedValue);
};

export const detectEmailOrPhoneFromValue = ({
  emailOrPhone,
  country,
}: {
  emailOrPhone: string;
  country?: CountryCode;
}): { email?: string; phone?: PhoneNumber } => {
  if (emailOrPhone === '') {
    return {};
  }

  const isEmail = /[A-z]/.test(emailOrPhone);
  if (isEmail) {
    return { email: emailOrPhone };
  }

  if (emailOrPhone.length < 3) {
    return {};
  }

  const isPhoneNumber = checkIfIsPotentiallyAPhoneNumber(emailOrPhone);
  if (isPhoneNumber) {
    try {
      const startsWithPlus = emailOrPhone.startsWith('+');

      const phoneNumberInternationalized = startsWithPlus
        ? emailOrPhone
        : `${
            COUNTRY_DETAILS[country || DEFAULT_COUNTRY.code]?.dialCode
          }${emailOrPhone}`;
      const phone = parsePhoneNumberWithError(phoneNumberInternationalized); // This method throws an error if the phone number isn't valid

      return { phone };
    } catch (e) {
      return {};
    }
  }
  return {};
};
