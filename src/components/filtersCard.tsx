import React from 'react';
import { useForm } from 'react-hook-form';
import {
  IFilters,
  FilterConfig,
  StatusOption,
  DateOption,
  ShiftOption,
} from '../utils/types';

interface FilterCardProps {
  onApplyFilters: (filters: IFilters) => void;
  onClose: () => void;
}

const FilterCard: React.FC<FilterCardProps> = ({ onApplyFilters, onClose }) => {
  const { register, handleSubmit, setValue } = useForm<IFilters>();

  const onSubmit = (data: IFilters) => {
    onApplyFilters(data);
  };

  const handleDiscard = () => {
    setValue('status', []);
    setValue('shifts', []);
    setValue('date', '' as 'past' | 'upcoming');
    setValue('areas', '');
    onClose();
  };
  const formFilters: (
    | FilterConfig<StatusOption>
    | FilterConfig<DateOption>
    | FilterConfig<ShiftOption>
    | FilterConfig<string>
  )[] = [
    {
      name: 'status',
      type: 'checkbox',
      options: [
        { label: 'Confirmed', value: 'CONFIRMED' },
        { label: 'Seated', value: 'SEATED' },
        { label: 'Checked Out', value: 'CHECKED OUT' },
        { label: 'Not Confirmed', value: 'NOT CONFIRMED' },
      ],
    },
    {
      name: 'shifts',
      type: 'checkbox',
      options: [
        { label: 'Breakfast', value: 'BREAKFAST' },
        { label: 'Lunch', value: 'LUNCH' },
        { label: 'Dinner', value: 'DINNER' },
      ],
    },
    {
      name: 'date',
      type: 'checkbox',
      options: [
        { label: 'Past', value: 'past' },
        { label: 'Upcoming', value: 'upcoming' },
      ],
    },
    {
      name: 'areas',
      type: 'text',
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-main-purple space-y-4">
        <h3 className="text-lg font-bold mb-4">Filter Reservations</h3>
        {formFilters.map((filter) => (
          <div key={filter.name}>
            <label className="block text-gray-700 font-semibold mb-2">
              {filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}
            </label>
            {filter.type === 'checkbox' && filter.options && (
              <div className="flex gap-4 flex-wrap items-center">
                {filter.options.map((option) => (
                  <label
                    key={option.value}
                    className="inline-flex items-center"
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      {...register(filter.name as keyof IFilters)}
                      className="form-checkbox h-5 w-5 text-main-purple accent-current"
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
            {filter.type === 'text' && (
              <input
                type="text"
                {...register(filter.name as keyof IFilters)}
                placeholder={`Enter ${filter.name}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-main-purple h-12"
              />
            )}
          </div>
        ))}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleDiscard}
            className="px-4 py-2 rounded-full bg-white hover:bg-main-pink hover:text-white hover:border-main-pink text-main-purple font-semibold border-2 border-main-purple"
          >
            Discard
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-main-purple hover:bg-purple-700 text-white font-semibold"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterCard;
