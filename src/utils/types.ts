export type StatusOption =
  | 'CONFIRMED'
  | 'SEATED'
  | 'CHECKED OUT'
  | 'NOT CONFIRMED';
export type DateOption = 'past' | 'upcoming';
export type ShiftOption = 'LUNCH' | 'BREAKFAST' | 'DINNER';

export interface IFilters {
  status: StatusOption[];
  date: DateOption;
  shifts: ShiftOption[];
  areas: string;
}
export interface IReservationInterface {
  id: number;
  businessDate: string;
  status: string;
  shift: string;
  start: string;
  end: string;
  quantity: number;
  customer: ICustomer;
  area: string;
  guestNotes: string;
}
export interface ICustomer {
  firstName: string;
  lastName: string;
}

export interface IStatusPillsColors {
  confirmed: string;
  seated: string;
  checkedout: string;
  notconfirmed: string;
}

interface FilterOption<T> {
  label: string;
  value: T;
}

export interface FilterConfig<T> {
  name: keyof IFilters;
  type: 'checkbox' | 'text';
  options?: FilterOption<T>[];
}
export type SortKey = 'guestName' | 'guestNumber' | 'default';
type ErrorType = 'NOT Found' | 'Failed To FETCH';
export interface IError {
  type: ErrorType;
  params: string;
}
