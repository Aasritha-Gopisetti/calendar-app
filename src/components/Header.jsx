import React from 'react';
import dayjs from 'dayjs';

const Header = ({ currentMonth, onPrev, onNext }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <button onClick={onPrev} className="bg-white text-indigo-700 px-4 py-2 rounded hover:bg-gray-200">Previous</button>
      <h1 className="text-2xl font-bold">{currentMonth.format('MMMM YYYY')}</h1>
      <button onClick={onNext} className="bg-white text-indigo-700 px-4 py-2 rounded hover:bg-gray-200">Next</button>
    </div>
  );
};

export default Header;
