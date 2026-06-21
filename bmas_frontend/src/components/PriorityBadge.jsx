import React from 'react';

const PRIORITY_MAP = {
  CRITICAL: {
    label: 'Critical',
    bg: 'bg-red-50 text-red-700 border-red-200',
    icon: '🔴'
  },
  HIGH: {
    label: 'High',
    bg: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: '🟠'
  },
  MEDIUM: {
    label: 'Medium',
    bg: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: '🔵'
  },
  LOW: {
    label: 'Low',
    bg: 'bg-slate-50 text-slate-650 border-slate-200',
    icon: '⚪'
  }
};

export const PriorityBadge = ({ priority }) => {
  const normalized = priority ? priority.toUpperCase() : 'MEDIUM';
  const config = PRIORITY_MAP[normalized] || PRIORITY_MAP.MEDIUM;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-md border ${config.bg} select-none`}>
      <span className="text-[10px]">{config.icon}</span>
      {config.label}
    </span>
  );
};

export default PriorityBadge;
