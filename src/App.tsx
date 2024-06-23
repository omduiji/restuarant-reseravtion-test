import React, { useState, useEffect } from 'react';
import './App.css';
import FilterCard from './components/filtersCard';
import Header from './components/header';
import ReservationCard from './components/reservation';
import useViewportWidth from './hooks/useViewportHook';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import {
  fetchReservations,
  selectReservations,
  selectLoading,
  selectError,
  sortReservations,
  searchReservations,
  resetSearch,
  filterReservationsList,
} from './store/reservationSlice';
import { IFilters, SortKey } from './utils/types';
import ErrorComponent from './components/errorComponent';

function App() {
  const isSmallScreen = useViewportWidth(1024);
  const [showFilters, setShowFilters] = useState(true);
  const handleApplyFilters = (filters: IFilters) => {
    dispatch(filterReservationsList(filters));
    if (isSmallScreen) setShowFilters(false);
  };

  const handleDiscardingFilters = (isSmall: boolean) => {
    if (!isSmall) return;
    setShowFilters(false);
  };
  useEffect(() => {
    if (isSmallScreen) {
      setShowFilters(false);
    }

    return () => {
      setShowFilters(true);
    };
  }, [isSmallScreen]);
  const dispatch = useDispatch<AppDispatch>();
  const reservations = useSelector(selectReservations);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleSort = (value: SortKey) => {
    dispatch(sortReservations(value as SortKey));
  };

  const handleSearchChanged = (value: string) => {
    if (value.trim()) {
      dispatch(searchReservations(value));
    } else {
      dispatch(resetSearch());
    }
  };

  return (
    <div className="w-full">
      <main className="w-[80vw] mx-auto grid grid-cols-3 gap-x-4">
        <h1 className="text-5xl font-bold text-main-purple my-8 col-span-3">
          Restaurant Reservation Viewer
          <span className="text-sm font-thin text-main-purple">
            Aug 10, 2018
          </span>
        </h1>

        <section className=" w-full col-span-3">
          <Header
            handleSort={(value) => handleSort(value)}
            handleSearch={(value) => handleSearchChanged(value)}
          />
        </section>
        <section className="lg:my-8 md:my-4 justify-items-start">
          <button
            onClick={() => setShowFilters(true)}
            className="block lg:hidden fixed bottom-4 right-4 bg-main-purple text-white py-2 px-4 rounded-lg"
          >
            Show Filters
          </button>
          {showFilters && (
            <aside
              className={`${
                isSmallScreen
                  ? 'md:fixed md:top-0 md:left-0 md:w-full md:h-full md:bg-gray-800 md:bg-opacity-50 md:flex md:justify-center md:items-center'
                  : 'lg:sticky lg:top-4 lg:items-start lg:justify-between lg:bg-transparent'
              } `}
            >
              <FilterCard
                onApplyFilters={handleApplyFilters}
                onClose={() => handleDiscardingFilters(isSmallScreen)}
              />
            </aside>
          )}
        </section>
        {loading && <p>Loading...</p>}
        {/* {error && <p>Error: {error.type}</p>} */}
        {error && (
          <section className="mx-auto lg:my-8 md:my-4 w-full flex flex-col gap-4 lg:col-span-2 md:col-span-3 ">
            <ErrorComponent message={error.params} />
          </section>
        )}
        {reservations.length > 0 && (
          <section className="mx-auto lg:my-8 md:my-4 w-full flex flex-col gap-4 lg:col-span-2 md:col-span-3 ">
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
