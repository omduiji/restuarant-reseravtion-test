import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
  createTrieNode,
  insertName,
  searchTrie,
  TrieNode,
} from '../utils/trieUtils';
import {
  IFilters,
  IReservationInterface,
  SortKey,
  IError,
} from '../utils/types';
import filterReservations from '../utils/filterationUtil';

interface ReservationState {
  reservations: IReservationInterface[];
  baseReservations: IReservationInterface[];
  loading: boolean;
  error: IError | null;
  trie: TrieNode;
}

const initialState: ReservationState = {
  reservations: [],
  baseReservations: [],
  loading: false,
  error: null,
  trie: createTrieNode(),
};

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async () => {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.reservations as IReservationInterface[];
  }
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    sortReservations(state, action: PayloadAction<SortKey>) {
      state.loading = true;
      if (action.payload === 'guestName') {
        state.reservations.sort((a, b) => {
          const nameA =
            `${a.customer.firstName} ${a.customer.lastName}`.toLowerCase();
          const nameB =
            `${b.customer.firstName} ${b.customer.lastName}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
      } else if (action.payload === 'guestNumber') {
        state.reservations.sort((a, b) => a.quantity - b.quantity);
      } else if (action.payload === 'default') {
        state.reservations = state.baseReservations;
      }
      state.loading = false;
    },
    buildTrie(state, action: PayloadAction<IReservationInterface[]>) {
      state.trie = createTrieNode();
      action.payload.forEach((reservation) => {
        insertName(
          state.trie,
          reservation.customer.firstName.trim(),
          reservation.id
        );
        insertName(
          state.trie,
          reservation.customer.lastName.trim(),
          reservation.id
        );
      });
    },
    searchReservations(state, action: PayloadAction<string>) {
      const searchResultIds = searchTrie(state.trie, action.payload);
      const matchedReservations = searchResultIds.map((id) =>
        state.baseReservations.find((res) => res.id === id)
      );
      const results = JSON.parse(JSON.stringify(matchedReservations));
      state.reservations = results;
      state.error = results.length
        ? null
        : {
            type: 'NOT Found',
            params: `No results found for ${action.payload}`,
          };
    },
    resetSearch(state) {
      state.reservations = state.baseReservations;
      state.error = null;
    },
    filterReservationsList(state, action: PayloadAction<IFilters>) {
      const results = JSON.parse(
        JSON.stringify(
          filterReservations(state.baseReservations, action.payload)
        )
      );
      state.reservations = results;
      state.error = results.length
        ? null
        : {
            type: 'NOT Found',
            params: 'No Data Matches The Filters You Entered',
          };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchReservations.fulfilled,
        (state, action: PayloadAction<IReservationInterface[]>) => {
          state.reservations = action.payload;
          state.baseReservations = action.payload;
          state.loading = false;
          reservationSlice.caseReducers.buildTrie(state, {
            payload: action.payload,
            type: 'buildTrie',
          });
        }
      )
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          type: 'Failed To FETCH',
          params: action.error.message || 'Failed to fetch data',
        };
      });
  },
});
export const {
  sortReservations,
  buildTrie,
  searchReservations,
  resetSearch,
  filterReservationsList,
} = reservationSlice.actions;
export default reservationSlice.reducer;

export const selectReservations = (state: RootState) =>
  state.reservations.reservations;
export const selectLoading = (state: RootState) => state.reservations.loading;
export const selectError = (state: RootState) => state.reservations.error;
