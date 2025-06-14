import React, { useState } from 'react';
import dayjs from 'dayjs';

const EventModal = ({ date, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('meeting');

  const handleSave = () => {
    if (!title.trim()) return alert("Please enter an event title.");
    const newEvent = {
      id: Date.now(),
      title,
      time,
      duration,
      date: date.format('YYYY-MM-DD'),
      type
    };
    onSave(newEvent);
    setTitle('');
    setTime('');
    setDuration('');
    setType('meeting');
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 sm:px-0">
      <div className="bg-white/90 backdrop-blur-md text-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-center">
          Add Event for <span className="text-indigo-600">{date.format('MMM D, YYYY')}</span>
        </h2>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div>
            <label className="block text-sm font-semibold mb-1">Event Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Team Meeting"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Time</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g., 10:00 AM"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Duration</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 1h"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Event Type</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="meeting">Meeting</option>
              <option value="reminder">Reminder</option>
              <option value="deadline">Deadline</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
