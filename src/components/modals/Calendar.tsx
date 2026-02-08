import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import { getBookedDates } from '../../utils/date';

interface Props {
  venue: any;
  onClose: () => void;
}

export default function Calendar({ venue, onClose }: Props) {
  const bookedDates = getBookedDates(venue.bookings);

  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header">
              <h5 className="modal-title">Select dates</h5>
            </div>

            <div className="modal-body">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={bookedDates.map((date: string) => new Date(date))}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <button className="btn-cancel" onClick={onClose} />
        <button className="btn btn-primary">Apply</button>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} />
    </>
  );
}
