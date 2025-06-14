import React from 'react';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);

const cellStyles = {
  meeting: 'bg-indigo-100 text-indigo-900 border-l-4 border-indigo-500',
  reminder: 'bg-yellow-100 text-yellow-900 border-l-4 border-yellow-500',
  deadline: 'bg-red-100 text-red-900 border-l-4 border-red-500',
  personal: 'bg-green-100 text-green-900 border-l-4 border-green-500',
};

const DayGrid = ({ currentMonth, events, onDateClick, onDeleteEvent, isWeekView }) => {
  const startOfGrid = isWeekView
    ? currentMonth.startOf('week')
    : currentMonth.startOf('month').startOf('week');

  const totalCells = isWeekView ? 7 : 35;
  const days = [];

  for (let i = 0; i < totalCells; i++) {
    days.push(startOfGrid.add(i, 'day'));
  }

  const getEventsForDate = (date) =>
    events.filter(event => event.date === date.format('YYYY-MM-DD'));

  return (
    <>
      <div className="p-4 rounded-2xl bg-slate-100 shadow-inner overflow-hidden">
        <div className="grid grid-cols-7 gap-2 rounded-xl p-5">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="text-center font-semibold text-xl text-gray-600 mb-1 uppercase tracking-wide"
            >
              {day}
            </div>
          ))}

      
          {days.map((day, idx) => {
            const eventsForDay = getEventsForDate(day);
            const event = eventsForDay[0];
            const isCurrentMonth = day.month() === currentMonth.month();
            const isToday = day.isToday();

            const bgClass = event
              ? cellStyles[event.type]
              : isCurrentMonth
              ? 'bg-white text-black'
              : 'bg-white/30 text-gray-400';

            const todayClass = isToday
              ? 'border border-indigo-500 ring-2 ring-indigo-300 shadow-md'
              : '';

            return (
              <div
                key={idx}
                onClick={() => onDateClick(day)}
                className={`rounded-xl p-3 h-[7.5rem] transition-all cursor-pointer flex flex-col justify-between ${bgClass} ${todayClass} hover:scale-[1.01] hover:ring-2 hover:ring-indigo-100`}
              >
                <div className="text-sm font-semibold">{day.date()}</div>

                {event && (
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-xs font-semibold truncate">{event.title}</div>
                    {event.time && (
                      <div className="text-[11px] opacity-80">{event.time}</div>
                    )}
                    <span className="text-xl mt-1">👤</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DayGrid;
