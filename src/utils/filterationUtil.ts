import { IReservationInterface, IFilters } from './types';

const isStatusMatch = (
  reservation: IReservationInterface,
  status: IFilters['status']
): boolean => {
  if (!status.length || !status) return true;
  return (
    !status.length ||
    status.includes(
      reservation.status as
        | 'CONFIRMED'
        | 'SEATED'
        | 'CHECKED OUT'
        | 'NOT CONFIRMED'
    )
  );
};

const isDateMatch = (
  reservation: IReservationInterface,
  date: IFilters['date']
): boolean => {
  if (!date || !date.length) {
    return true;
  }
  const now = new Date('2018-08-10');
  console.log(now, 'now');
  const reservationDate = new Date(
    reservation.businessDate.split('.').reverse().join('-')
  );

  if (date.includes('past')) {
    return reservationDate < now;
  } else if (date.includes('upcoming')) {
    return reservationDate >= now;
  }
  return false;
};

const isShiftMatch = (
  reservation: IReservationInterface,
  shifts: IFilters['shifts']
): boolean => {
  if (!shifts || !shifts.length) return true;
  return (
    !shifts.length ||
    shifts.includes(reservation.shift as 'LUNCH' | 'BREAKFAST' | 'DINNER')
  );
};

const isAreaMatch = (
  reservation: IReservationInterface,
  areas: IFilters['areas']
): boolean => {
  if (!areas || !areas.length) return true;
  const areaList = areas.split(',');
  const reservationArea = reservation.area.toLowerCase();
  return areaList.some((area) =>
    reservationArea.includes(area.trim().toLowerCase())
  );
};

const filterReservations = (
  reservations: IReservationInterface[],
  filters: IFilters
): IReservationInterface[] => {
  return reservations.filter((reservation) => {
    return (
      isStatusMatch(reservation, filters.status) &&
      isDateMatch(reservation, filters.date) &&
      isShiftMatch(reservation, filters.shifts) &&
      isAreaMatch(reservation, filters.areas)
    );
  });
};

export default filterReservations;
