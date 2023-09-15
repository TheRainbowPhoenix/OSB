import {
  GUESTS_CHILD_MAX_AGE,
  GUESTS_CHILD_MIN_AGE,
  GUEST_TYPE,
  type GuestType,
  type GuestDetails,
} from '@namastay/constants';

export const isChildAgeValid = (age: number): boolean =>
  age >= GUESTS_CHILD_MIN_AGE && age <= GUESTS_CHILD_MAX_AGE;

export const generateEmptyGuestDetails = ({
  type,
  age = 18,
  leadGuest = false,
  id = '',
  bookingId = '',
}: {
  type: GuestType;
  age?: number | null;
  leadGuest?: boolean;
  id?: string;
  bookingId?: string;
}): GuestDetails => ({
  address: '',
  addressAdditional: '',
  age,
  city: '',
  countryCode: null,
  dateOfBirth: '',
  email: '',
  firstName: '',
  id,
  identificationNumber: '',
  lastName: '',
  leadGuest,
  phone: '',
  postalCode: '',
  type,
  bookingId,
});

export const generateLeadGuest = ({
  id,
}: {
  id?: string;
  user?: unknown;
}): GuestDetails => {
  const generatedLeadGuest = {
    ...generateEmptyGuestDetails({
      age: 18,
      type: GUEST_TYPE.ADULT,
      leadGuest: true,
      id,
    }),
  };
  return generatedLeadGuest;
};

export const generateGuestsDetailsFromGuestsCount = ({
  leadGuest: isLeadGuest,
  user,
  numberOfAdults,
  numberOfChildren,
  childrenAge,
}: {
  leadGuest: boolean;
  user: { id: string };
  numberOfAdults: number;
  numberOfChildren: number;
  childrenAge: number;
}): GuestDetails[] => {
  const guestsDetails = [];

  if (numberOfAdults > 0) {
    for (let i = 0; i < numberOfAdults; i += 1) {
      if (i === 0 && !isLeadGuest) {
        const leadGuest = generateLeadGuest({ id: user?.id });
        guestsDetails.push(leadGuest);
      } else {
        const guestDetails = generateEmptyGuestDetails({
          type: GUEST_TYPE.ADULT,
        });
        guestsDetails.push(guestDetails);
      }
    }
  }

  if (numberOfChildren > 0) {
    for (let i = 0; i < numberOfChildren; i += 1) {
      const guestDetails = generateEmptyGuestDetails({
        type: GUEST_TYPE.CHILD,
        age: childrenAge,
      });
      guestsDetails.push(guestDetails);
    }
  }

  return guestsDetails;
};
