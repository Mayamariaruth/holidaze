import { DayPicker } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import type { Booking } from '../../types/booking.types';
import { getBookedDates } from '../../utils/date';
import { isSameDay } from 'date-fns';

interface Props {
  bookings: Booking[];
  onClose: () => void;
  onSelectRange: (from: Date, to: Date) => void;
}

export default function Calendar({ bookings, onClose, onSelectRange }: Props) {
  const bookedDates = getBookedDates(bookings).map((d) => new Date(d));
  const [selectedRange, setSelectedRange] = useState<DateRange>({ from: undefined, to: undefined });

  const isBooked = (date: Date) => bookedDates.some((d) => isSameDay(d, date));

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) return;
    setSelectedRange({ ...range });

    if (range.from && range.to && !isSameDay(range.from, range.to)) {
      onSelectRange(range.from, range.to);
      onClose();
    }
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-3">
            <div className="modal-header">
              <h4 className="modal-title">Select dates</h4>
              <button className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <DayPicker
                mode="range"
                selected={{ from: selectedRange.from, to: selectedRange.to }}
                onSelect={handleSelect}
                disabled={isBooked}
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
