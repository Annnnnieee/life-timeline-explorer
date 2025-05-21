interface EventFilterProps {
  startTime: Date;
  endTime: Date;
  onStartTimeChange: (time: Date) => void;
  onEndTimeChange: (time: Date) => void;
}

const EventFilter = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: EventFilterProps) => {
  return (
    <div className="event-filter">
      <div className="filter-inputs">
        <div className="input-group">
          <label htmlFor="start-time">From</label>
          <input
            type="datetime-local"
            id="start-time"
            max={formatDateToLocalISO(endTime)}
            value={formatDateToLocalISO(startTime)}
            onChange={(e) => onStartTimeChange(new Date(e.target.value))}
          />
        </div>
        <div className="input-group">
          <label htmlFor="end-time">To</label>
          <input
            type="datetime-local"
            id="end-time"
            min={formatDateToLocalISO(startTime)}
            value={formatDateToLocalISO(endTime)}
            onChange={(e) => onEndTimeChange(new Date(e.target.value))}
          />
        </div>
      </div>
      <p className="filter-hint">Select a date range to view events</p>
    </div>
  );
};

function formatDateToLocalISO(date: Date) {
  const pad = (num: number) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-indexed
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default EventFilter;
