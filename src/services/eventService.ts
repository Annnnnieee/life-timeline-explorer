import calendarEvents from '../data/calendar_events.json';
import type { CalendarEvent } from '../types/event'

export const fetchCalendarEvents = async (startTime: Date, endTime: Date): Promise<CalendarEvent[]> => {
    return new Promise( (resolve, reject) => {
        try {
            const startFilter = new Date(startTime);
            const endFilter = new Date(endTime);

            const filteredCalendarEvents = calendarEvents.filter((event) => {
                // dates are all parsed in local time. 
                const startEvent = new Date(event.startTime);
                const endEvent = new Date(event.endTime);

                // calendar event starts within range
                const startsWithinRange = startEvent >= startFilter && startEvent <= endFilter;
                // calendar event ends within range
                const endsWithinRange = endEvent >= startFilter && endEvent <= endFilter;
                // calendar event spans over the range
                const spansOverRange = startEvent <= startFilter && endEvent >= endFilter;

                return startsWithinRange || endsWithinRange || spansOverRange;
            })
            .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())

            resolve(filteredCalendarEvents)
        } catch {
            reject(`failed to filter calendar events`)
        }
    })
}
