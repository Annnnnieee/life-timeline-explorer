import { useState, useEffect, useCallback } from 'react';
import './App.css';
import EventFilter from './components/EventFilter';
import EventList from './components/EventList';
import { fetchCalendarEvents } from './services/eventService';
import type { CalendarEvent } from './types/event'

function App() {
  // ideally default time would be today
  const [startTime, setStartTime] = useState(new Date("2023-04-27T19:00:00Z"));
  const [endTime, setEndTime] = useState(new Date("2026-04-27T19:00:00Z"));
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);

  useEffect( () => {
    fetchCalendarEvents(new Date(startTime), new Date(endTime))
      .then((events: CalendarEvent[]) => {
        setFilteredEvents(events)
      })
  }, [startTime, endTime])

  const validateAndSetStartTime = useCallback((startTime: Date) => {
    if(isValidDateInput(startTime, endTime)) {
      setStartTime(startTime)
    }
  }, [endTime])

  const validateAndSetEndTime = useCallback((endTime: Date) => {
    if(isValidDateInput(startTime, endTime)) {
      setEndTime(endTime)
    }
  }, [startTime])

  return (
    <div className="app">
      <header>
        <h1>Life Timeline Explorer</h1>
      </header>
      <main>
        <EventFilter
          startTime={startTime}
          endTime={endTime}
          onStartTimeChange={validateAndSetStartTime}
          onEndTimeChange={validateAndSetEndTime}
        />
        <EventList events={filteredEvents} />
      </main>
    </div>
  );
}

const isValidDateInput = (startTime: Date, endTime: Date) => {
  return startTime <= endTime
}

export default App;
