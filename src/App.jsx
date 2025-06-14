import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DayGrid from './components/DayGrid';
import EventModal from './components/EventModal';
import events from './data/events.json';
import './index.css';

function App() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [eventList, setEventList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isWeekView, setIsWeekView] = useState(false);

  useEffect(() => {
    setEventList(events);
  }, []);

  const handlePrev = () => {
    setCurrentMonth(currentMonth.subtract(1, isWeekView ? 'week' : 'month'));
  };

  const handleNext = () => {
    setCurrentMonth(currentMonth.add(1, isWeekView ? 'week' : 'month'));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleAddEvent = (newEvent) => {
    setEventList(prev => [...prev, newEvent]);
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEventList(prev => prev.filter(event => event.id !== eventId));
  };

  const today = dayjs().format('MMMM D, YYYY');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3efff] via-[#f8faff] to-[#e9f2ff] text-gray-800">
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-4">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-1200">Calendar</h1>
            <p className="text-m text-black-900">Full Event Schedule<br /><span className="font-medium">{today}</span></p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => setIsWeekView(false)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow transition ${
                  !isWeekView ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 border border-indigo-200'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setIsWeekView(true)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow transition ${
                  isWeekView ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 border border-indigo-200'
                }`}
              >
                Week
              </button>
              <button
                className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm px-4 py-1.5 rounded-full shadow hover:from-indigo-700 transition"
                onClick={() => {
                  setSelectedDate(dayjs());
                  setIsModalOpen(true);
                }}
              >
                + Add Event
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="text-indigo-600 hover:text-indigo-800 font-bold text-xl"
                title="Previous"
              >
                &lt;
              </button>
              <h2 className="text-base font-medium text-gray-800">{currentMonth.format('MMMM YYYY')}</h2>
              <button
                onClick={handleNext}
                className="text-indigo-600 hover:text-indigo-800 font-bold text-xl"
                title="Next"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-m text-black-900">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-indigo-400"></span> Meeting
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Reminder
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-400"></span> Deadline
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-400"></span> Personal
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <DayGrid
          currentMonth={currentMonth}
          events={eventList}
          onDateClick={handleDateClick}
          onDeleteEvent={handleDeleteEvent}
          isWeekView={isWeekView}
        />
      </div>

      {isModalOpen && (
        <EventModal
          date={selectedDate}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddEvent}
        />
      )}
    </div>
  );
}

export default App;
