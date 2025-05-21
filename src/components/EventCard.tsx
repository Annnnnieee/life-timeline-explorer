import type { CalendarEvent } from '../types/event';

const EventCard = ({ event } : {event: CalendarEvent}) => {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <div className="event-time">
        <div>
          <strong>Start:</strong> {formatDate(event.startTime)}
        </div>
        <div>
          <strong>End:</strong> {formatDate(event.endTime)}
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
};


export default EventCard;
