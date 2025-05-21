import { describe, it, expect, vi } from 'vitest';
import { fetchCalendarEvents } from '../../services/eventService';

// Mock the calendar_events.json import
vi.mock('../../data/calendar_events.json', () => ({
  default: [
    {
      id: 1,
      title: "Event Before And During",
      startTime: "2024-01-01T09:30:00",
      endTime: "2024-01-01T10:30:00"
    },
    {
      id: 2,
      title: "Event During And After",
      startTime: "2024-01-01T11:30:00",
      endTime: "2024-01-01T12:30:00"
    },
    {
      id: 3,
      title: "Event Fully Before",
      startTime: "2024-01-01T08:00:00",
      endTime: "2024-01-01T09:00:00"
    },
    {
      id: 4,
      title: "Event Fully After",
      startTime: "2024-01-01T13:00:00",
      endTime: "2024-01-01T14:00:00"
    },
    {
      id: 5,
      title: "Event Starting At Range Start",
      startTime: "2024-01-01T10:00:00",
      endTime: "2024-01-01T11:00:00"
    },
    {
      id: 6,
      title: "Event Ending At Range End",
      startTime: "2024-01-01T11:00:00",
      endTime: "2024-01-01T12:00:00"
    },
    {
      id: 7,
      title: "Zero Duration At Start",
      startTime: "2024-01-01T10:00:00",
      endTime: "2024-01-01T10:00:00"
    },
    {
      id: 8,
      title: "Zero Duration Outside",
      startTime: "2024-01-01T09:00:00",
      endTime: "2024-01-01T09:00:00"
    }
  ]
}));

describe('eventService', () => {
  describe('fetchCalendarEvents', () => {
    it('includes event starting before and ending during the range', async () => {
      const startTime = new Date('2024-01-01T10:00:00');
      const endTime = new Date('2024-01-01T12:00:00');
      
      const result = await fetchCalendarEvents(startTime, endTime);
      
      expect(result).toContainEqual(expect.objectContaining({
        id: 1,
        title: "Event Before And During"
      }));
    });

    it('includes event starting during and ending after the range', async () => {
      const startTime = new Date('2024-01-01T10:00:00');
      const endTime = new Date('2024-01-01T12:00:00');
      
      const result = await fetchCalendarEvents(startTime, endTime);
      
      expect(result).toContainEqual(expect.objectContaining({
        id: 2,
        title: "Event During And After"
      }));
    });

    it('excludes event fully before the range', async () => {
      const startTime = new Date('2024-01-01T10:00:00');
      const endTime = new Date('2024-01-01T12:00:00');
      
      const result = await fetchCalendarEvents(startTime, endTime);
      
      expect(result).not.toContainEqual(expect.objectContaining({
        id: 3,
        title: "Event Fully Before"
      }));
    });

    it('excludes event fully after the range', async () => {
      const startTime = new Date('2024-01-01T10:00:00');
      const endTime = new Date('2024-01-01T12:00:00');
      
      const result = await fetchCalendarEvents(startTime, endTime);
      
      expect(result).not.toContainEqual(expect.objectContaining({
        id: 4,
        title: "Event Fully After"
      }));
    });

    it('includes event starting exactly at range start', async () => {
      const startTime = new Date('2024-01-01T10:00:00');
      const endTime = new Date('2024-01-01T12:00:00');
      
      const result = await fetchCalendarEvents(startTime, endTime);
      
      expect(result).toContainEqual(expect.objectContaining({
        id: 5,
        title: "Event Starting At Range Start"
      }));
    });

    it('includes event ending exactly at range end', async () => {
      const startTime = new Date('2024-01-01T10:00:00');
      const endTime = new Date('2024-01-01T12:00:00');
      
      const result = await fetchCalendarEvents(startTime, endTime);
      
      expect(result).toContainEqual(expect.objectContaining({
        id: 6,
        title: "Event Ending At Range End"
      }));
    });

    it('includes zero-duration event exactly on start boundary', async () => {
      const startTime = new Date('2024-01-01T10:00:00');
      const endTime = new Date('2024-01-01T12:00:00');
      
      const result = await fetchCalendarEvents(startTime, endTime);
      
      expect(result).toContainEqual(expect.objectContaining({
        id: 7,
        title: "Zero Duration At Start"
      }));
    });

    it('excludes zero-duration event outside the range', async () => {
      const startTime = new Date('2024-01-01T10:00:00');
      const endTime = new Date('2024-01-01T12:00:00');
      
      const result = await fetchCalendarEvents(startTime, endTime);
      
      expect(result).not.toContainEqual(expect.objectContaining({
        id: 8,
        title: "Zero Duration Outside"
      }));
    });

    it('sorts events by start time in descending order', async () => {
      const startTime = new Date('2024-01-01T09:00:00');
      const endTime = new Date('2024-01-01T14:00:00');
      
      const result = await fetchCalendarEvents(startTime, endTime);
      
      // Verify the first event has a later start time than the second
      expect(new Date(result[0].startTime).getTime())
        .toBeGreaterThan(new Date(result[1].startTime).getTime());
    });
  });
});
