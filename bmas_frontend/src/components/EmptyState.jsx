import React from 'react';

export const EmptyState = ({ title = 'No results found', description = 'Try adjusting your filters or query to find what you are looking for.', icon = '🔍', action }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white border border-slate-200/80 rounded-2xl shadow-sm max-w-lg mx-auto my-8">
      <span className="text-4xl mb-4 select-none">{icon}</span>
      <h3 className="text-base font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-150"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
