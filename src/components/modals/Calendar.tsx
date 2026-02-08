import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import type { Booking } from '../../types/booking.types';
import { getBookedDates } from '../../utils/date';

interface Props {
  bookings: Booking[];
  onClose: () => void;
}

type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

export default function Calendar({ bookings, onClose }: Props) {
  const bookedDates: Date[] = getBookedDates(bookings).map((d) => new Date(d));
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header">
              <h4 className="modal-title">Select dates</h4>
              <button className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <DayPicker mode="range" selected={range} onSelect={setRange} disabled={bookedDates} />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={!range?.from || !range?.to}
                onClick={() => console.log(range)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" onClick={onClose} />
    </>
  );
}
