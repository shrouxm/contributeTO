'use client';

import { EventData, fetchEvents } from '@/api/event';
import { EventCard } from '@/components/EventCard';
import { useEffect, useState } from 'react';

const isUpcoming = (event: EventData) => {
  return new Date(event.calEvent.endDateTime).getTime() > new Date().getTime();
};

export function EventList() {
  const [events, setEvents] = useState<EventData[] | null>(null);
  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);
  return (
    <div className="flex-col space-y-4 p-4 bg-slate-200">
      {events?.map(
        (event) =>
          isUpcoming(event) && (
            <EventCard key={event.calEvent.recId} event={event} />
          )
      )}
    </div>
  );
}
