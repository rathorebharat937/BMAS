import React from 'react';

const STATUS_MAP = {
  OPEN: {
    label: 'Open',
    bg: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500'
  },
  ASSIGNED: {
    label: 'Assigned',
    bg: 'bg-purple-50 text-purple-700 border-purple-200',
    dot: 'bg-purple-500'
  },
  IN_PROGRESS: {
    label: 'In Progress',
    bg: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500'
  },
  TESTING: {
    label: 'Testing',
    bg: 'bg-pink-50 text-pink-700 border-pink-200',
    dot: 'bg-pink-500'
  },
  RESOLVED: {
    label: 'Resolved',
    bg: 'bg-green-50 text-green-700 border-green-200',
    dot: 'bg-green-500'
  },
  CLOSED: {
    label: 'Closed',
    bg: 'bg-slate-100 text-slate-650 border-slate-200',
    dot: 'bg-slate-400'
  }
};

export const StatusBadge = ({ status }) => {
  const normalized = status ? status.toUpperCase().replace(' ', '_') : 'OPEN';
  const config = STATUS_MAP[normalized] || STATUS_MAP.OPEN;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${config.bg} select-none`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </span>
  );
};

export default StatusBadge;
