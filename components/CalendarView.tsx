import React from 'react';
import { ChevronLeft } from 'lucide-react';

const CalendarView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="h-full flex flex-col pt-6 px-6 pb-24 bg-slate-50">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Calendar</h2>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">October 2023</h3>
              <div className="flex gap-2">
                 <button className="p-1 hover:bg-slate-100 rounded-md"><ChevronLeft size={16}/></button>
                 <button className="p-1 hover:bg-slate-100 rounded-md rotate-180"><ChevronLeft size={16}/></button>
              </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {days.map(d => <span key={d} className="text-xs font-bold text-slate-400 uppercase">{d}</span>)}
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center">
              {dates.map(d => (
                  <div key={d} className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold ${d === 12 ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                      {d}
                  </div>
              ))}
          </div>
      </div>

      <div className="mt-8">
          <h3 className="font-bold text-slate-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
              <div className="bg-white p-4 rounded-2xl border-l-4 border-primary-500 shadow-sm">
                  <p className="font-bold text-slate-800 text-sm">Physics Mock Test</p>
                  <p className="text-xs text-slate-500 mt-1">Oct 15, 10:00 AM</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border-l-4 border-orange-500 shadow-sm">
                  <p className="font-bold text-slate-800 text-sm">Math Assignment Due</p>
                  <p className="text-xs text-slate-500 mt-1">Oct 18, 11:59 PM</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default CalendarView;