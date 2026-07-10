import React from 'react';

export const Loader = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}></div>
      {message && <p className="text-xs text-slate-400 font-medium tracking-wide animate-pulse">{message}</p>}
    </div>
  );
};

export const PageLoader = ({ message = 'Initializing BMAS Workspace...' }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-100">
      <div className="flex flex-col items-center gap-4 max-w-sm px-6 text-center">
        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        <h3 className="font-bold text-lg text-white mt-2">BMAS Enterprise</h3>
        <p className="text-xs text-slate-400 font-medium tracking-wider uppercase animate-pulse">{message}</p>
      </div>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-6 bg-slate-100 rounded-full w-16"></div>
      </div>
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      <div className="h-4 bg-slate-150 rounded w-1/2"></div>
      <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-250"></div>
          <div className="h-3 bg-slate-200 rounded w-16"></div>
        </div>
        <div className="h-3 bg-slate-200 rounded w-12"></div>
      </div>
    </div>
  );
};

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden animate-pulse">
      <div className="bg-slate-50 h-11 border-b border-slate-200 flex items-center px-6">
        <div className="h-3.5 bg-slate-200 rounded w-full"></div>
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="h-16 flex items-center px-6 gap-4">
            <div className="h-4 bg-slate-200 rounded w-1/12"></div>
            <div className="h-4 bg-slate-200 rounded w-4/12"></div>
            <div className="h-4 bg-slate-200 rounded w-2/12"></div>
            <div className="h-4 bg-slate-250 rounded w-1/12"></div>
            <div className="h-4 bg-slate-200 rounded w-2/12"></div>
            <div className="h-4 bg-slate-150 rounded w-2/12"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
