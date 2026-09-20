'use client';

import { useMemo, useState } from 'react';

interface StayCalendarProps {
  initialMonth?: Date;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(date);
}

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function startDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export function StayCalendar({ initialMonth = new Date(2026, 9, 1) }: StayCalendarProps) {
  const [month, setMonth] = useState(new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1));
  const [checkIn, setCheckIn] = useState<number | null>(18);
  const [checkout, setCheckout] = useState<number | null>(23);

  const cells = useMemo(() => {
    const leading = startDay(month);
    return Array.from({ length: leading + daysInMonth(month) }, (_, index) =>
      index < leading ? null : index - leading + 1,
    );
  }, [month]);

  const selectDay = (day: number) => {
    if (!checkIn || checkout) {
      setCheckIn(day);
      setCheckout(null);
      return;
    }
    if (day > checkIn) setCheckout(day);
    else setCheckIn(day);
  };

  return (
    <div className="calendar" aria-label="Choose dates">
      <div className="calendar__header">
        <button type="button" className="icon-button" aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>‹</button>
        <strong>{monthLabel(month)}</strong>
        <button type="button" className="icon-button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>›</button>
      </div>
      <div className="calendar__weekdays" aria-hidden="true">
        {WEEKDAYS.map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="calendar__grid">
        {cells.map((day, index) => day ? (
          <button
            key={day}
            type="button"
            className={day === checkIn ? 'calendar__day is-start' : day === checkout ? 'calendar__day is-end' : 'calendar__day'}
            aria-pressed={day === checkIn || day === checkout}
            onClick={() => selectDay(day)}
          >
            {day}
          </button>
        ) : <span key={`empty-${index}`} />)}
      </div>
    </div>
  );
}
