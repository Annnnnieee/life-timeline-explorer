import type { CalendarEvent } from '../types/event';
import EventCard from './EventCard';

const EventList = ({events} : {events: CalendarEvent[]}) => {
  if(!events.length) {
    return (
      <div className="event-list empty">
        <p>no events to show!</p>
      </div>
    )
  }

  const eventCards = events.map(event => {
    return <EventCard key={event.id} event={event}/>
  })

  return (
    <div className="event-list">
      {eventCards} 
    </div>
  )
}

export default EventList