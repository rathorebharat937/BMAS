import React from 'react';

export const DashboardCard = ({ title, value, subtext, icon, color = 'neutral', onClick }) => {
  const borderColors = {
    primary: 'border-l-4 border-l-primary',
    secondary: 'border-l-4 border-l-secondary',
    success: 'border-l-4 border-l-success',
    warning: 'border-l-4 border-l-warning',
    danger: 'border-l-4 border-l-danger',
    neutral: 'border-l-4 border-l-slate-300'
  };

  const bgColors = {
    primary: 'bg-green-50/40',
    secondary: 'bg-slate-50/40',
    success: 'bg-green-50/40',
    warning: 'bg-amber-50/40',
    danger: 'bg-red-50/40',
    neutral: 'bg-slate-50/40'
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow transition-all duration-200 select-none flex items-center justify-between ${
        onClick ? 'cursor-pointer hover:border-slate-350 hover:-translate-y-0.5' : ''
      } ${borderColors[color]}`}
    >
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">{title}</span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-slate-800 tracking-tight">{value}</span>
        </div>
        {subtext && <p className="text-[10px] text-slate-500 font-medium">{subtext}</p>}
      </div>

      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${bgColors[color] || 'bg-slate-50'}`}>
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
