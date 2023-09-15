import { type Rate, type Room, type Booking } from '@namastay/constants';

type SelectRate = (rateCode: string) => void;

export const sortRatesByPrice = (rates: Rate[]): Rate[] => {
  const sortedRates = rates?.slice()?.sort((a, b) => {
    if (Number(a?.price) < Number(b?.price)) {
      return -1;
    }

    return 1;
  });

  return sortedRates;
};

export const getCheapestRate = (rates: Rate[]): Rate => {
  if (rates.length < 1) {
    throw new Error('rates should not be an empty list.');
  }

  const sortedRates = sortRatesByPrice(rates);

  if (!sortedRates[0]) throw new Error('No rates sorted.');

  return sortedRates[0];
};

const selectDefaultRate = (
  roomBestRates: Rate[],
  selectedRatePlanCode: string,
  selectRate: SelectRate
): Rate | undefined => {
  const selectedRate = roomBestRates?.find(
    (rate) => rate?.ratePlanCode === selectedRatePlanCode
  );
  if (!selectedRate && roomBestRates?.[0]?.ratePlanCode) {
    selectRate(roomBestRates?.[0]?.ratePlanCode);
    return roomBestRates?.[0];
  }
  return selectedRate;
};

const selectReservationRate = (
  reservationRateCode: string,
  roomBestRates: Rate[],
  selectedRatePlanCode: string,
  selectRate: SelectRate
): Rate | undefined => {
  const reservationSelectedRate = roomBestRates?.find(
    (rate) => rate?.ratePlanCode === selectedRatePlanCode
  );
  if (reservationSelectedRate) {
    selectRate(selectedRatePlanCode);
    return reservationSelectedRate;
  }
  return selectDefaultRate(roomBestRates, reservationRateCode, selectRate);
};

export const manageSelectedRate = ({
  selectedReservation,
  roomBestRates,
  selectedRoom,
  selectedRatePlanCode,
  isModifyBooking,
  selectRate,
}: {
  selectedReservation: Booking;
  roomBestRates: Rate[];
  selectedRoom: Room;
  selectedRatePlanCode: string;
  isModifyBooking: boolean;
  selectRate: SelectRate;
}): Rate | undefined => {
  if (isModifyBooking) {
    return selectReservationRate(
      selectedReservation?.room?.ratePlanCode,
      selectedRoom?.bestRates,
      selectedRatePlanCode,
      selectRate
    );
  }
  return selectDefaultRate(roomBestRates, selectedRatePlanCode, selectRate);
};
