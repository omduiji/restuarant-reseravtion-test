import React from 'react';
import { IReservationInterface, IStatusPillsColors } from './../utils/types';
import {
  convertStartAndEndDate,
  convertBusinessDate,
} from '../utils/dateFormatter';

interface ReservationCardProps {
  reservation: IReservationInterface;
}

const statusPillsColors = {
  confirmed: 'bg-green-500',
  seated: 'bg-teal-500',
  checkedout: 'bg-violet-500',
  notconfirmed: 'bg-red-500',
};

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  const {
    id,
    businessDate,
    status,
    shift,
    start,
    end,
    quantity,
    customer,
    area,
    guestNotes,
  } = reservation;

  const displayStatusPills = (
    status: string,
    dictionary: IStatusPillsColors
  ): string => {
    const normalizedStatus = status
      .toLowerCase()
      .replace(/\s/g, '') as keyof IStatusPillsColors;
    if (normalizedStatus in dictionary) {
      return dictionary[normalizedStatus];
    }
    return '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-main-purple">
      <details className="group overflow-hidden">
        <summary className="flex justify-between items-center cursor-pointer">
          <div>
            <h2 className="text-lg font-bold">Reservation #{id}</h2>
            <span className="text-gray-500 font-semibold">
              {customer.firstName} {customer.lastName}
            </span>
          </div>
          <div className="flex items-center">
            <span
              className={`text-white px-4 py-2 rounded-full ${displayStatusPills(
                status,
                statusPillsColors
              )}`}
            >
              {status}
            </span>
            <span className="ml-4 text-gray-500 font-semibold">
              Qty: {quantity}
            </span>
          </div>
        </summary>
        <div className="group-open:scale-y-100 transform scale-y-0 transition-transform duration-700 origin-top">
          <div className="mt-4 space-y-2 divide-y">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-semibold">
                Business Date:
              </span>
              <span>{convertBusinessDate(businessDate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-semibold">Shift:</span>
              <span>{shift}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-semibold">Start:</span>
              <span>{convertStartAndEndDate(start)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-semibold">End:</span>
              <span>{convertStartAndEndDate(end)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-semibold">Quantity:</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-semibold">Customer:</span>
              <span>
                {customer.firstName} {customer.lastName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-semibold">Area:</span>
              <span>{area}</span>
            </div>
            {guestNotes && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-semibold">
                  Guest Notes:
                </span>
                <span>{guestNotes}</span>
              </div>
            )}
          </div>
        </div>
      </details>
    </div>
  );
};

export default ReservationCard;
