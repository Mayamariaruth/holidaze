import { DayPicker } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import type { Booking } from '../../types/booking.types';
import { getBookedDates } from '../../utils/date';

interface Props {
  bookings: Booking[];
  onClose: () => void;
  onSelectRange: (from: Date, to: Date) => void;
}

export default function Calendar({ bookings, onClose, onSelectRange }: Props) {
  const bookedDates = getBookedDates(bookings).map((d) => new Date(d));

  const [range, setRange] = useState<DateRange | undefined>();

  const handleSelect = (range: DateRange | undefined) => {
    setRange(range);

    if (range?.from && range?.to) {
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
                selected={range}
                onSelect={handleSelect}
                disabled={bookedDates}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" onClick={onClose} />
    </>
  );
}
