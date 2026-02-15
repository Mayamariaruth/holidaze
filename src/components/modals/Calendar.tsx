import { DayPicker } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import type { Booking } from '../../types/booking.types';
import { isDateAvailable } from '../../utils/date';

interface Props {
  bookings: Booking[];
  onClose: () => void;
  onSelectRange: (from: Date, to: Date) => void;
}

/**
 * Calendar component for selecting a date range.
 *
 * This component renders a calendar modal where users can select a check-in and check-out date for their booking.
 * It disables the dates that are already booked and handles the selected date range.
 *
 * @param {Object} props - The component's props.
 * @param {Booking[]} props.bookings - The list of bookings that will be used to determine unavailable dates.
 * @param {() => void} props.onClose - Function to close the calendar modal.
 * @param {(from: Date, to: Date) => void} props.onSelectRange - Function to handle the selection of a date range.
 *
 * @returns {JSX.Element} The Calendar modal component.
 */
export default function Calendar({ bookings, onClose, onSelectRange }: Props) {
  const [selectedRange, setSelectedRange] = useState<DateRange>({ from: undefined, to: undefined });

  // Checks if a specific date is available for booking
  const isDisabled = (date: Date): boolean => {
    return !isDateAvailable(date, bookings);
  };

  // Handles the date range selection by the user
  const handleSelect = (range: DateRange | undefined) => {
    if (!range) return;

    setSelectedRange(range);

    if (range.from && range.to && range.from.getTime() !== range.to.getTime()) {
      onSelectRange(range.from, range.to);
      onClose();
    }
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content calendar rounded-3">
            <div className="modal-header">
              <h4 className="modal-title">Select dates</h4>
              <button className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <DayPicker
                mode="range"
                selected={{ from: selectedRange.from, to: selectedRange.to }}
                onSelect={handleSelect}
                disabled={isDisabled}
                defaultMonth={new Date()}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} />
    </>
  );
}
