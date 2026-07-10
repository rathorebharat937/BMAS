import React from 'react';
import { useAuth } from '../hooks/useAuth';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'projects', label: 'Projects', icon: '📁' },
  { id: 'bugs', label: 'Bugs', icon: '🐛' },
  { id: 'my-bugs', label: 'My Bugs', icon: '🎯' },
  { id: 'sprints', label: 'Sprint Board', icon: '📋' },
  { id: 'team', label: 'Team', icon: '👥' },
  { id: 'reports', label: 'Reports', icon: '📈' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
];

export const Sidebar = ({ isCollapsed, setIsCollapsed, currentView, onViewChange, unreadNotificationsCount = 0 }) => {
  const { user } = useAuth();

  const getRoleLabel = (r) => {
    if (r === 'PROJECT_MANAGER') return 'Manager';
    if (r === 'DEVELOPER') return 'Developer';
    if (r === 'TESTER') return 'Tester';
    return r;
  };

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen border-r border-slate-200/80 bg-slate-900 text-slate-350 transition-all duration-300 flex flex-col justify-between select-none ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center h-14 border-b border-slate-800/60 px-4 gap-3 bg-slate-950 overflow-hidden">
        <div className="min-w-8 h-8 rounded-lg bg-primary hover:bg-primary-hover flex items-center justify-center font-black text-white text-base tracking-wider shadow shadow-primary/20">
          B
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0 transition-opacity duration-200">
            <span className="font-bold text-sm text-white block truncate tracking-tight">BMAS Portal</span>
            <span className="text-[9px] block text-primary font-bold uppercase tracking-widest truncate">
              {getRoleLabel(user?.activeRole)}
            </span>
          </div>
        )}
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {MENU_ITEMS.map(item => {
          const isActive = currentView === item.id;
          const showBadge = item.id === 'notifications' && unreadNotificationsCount > 0;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all group relative cursor-pointer ${
                isActive 
                  ? 'bg-primary text-white font-bold' 
                  : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
              }`}
            >
              <span className={`text-sm ${isCollapsed ? 'mx-auto' : 'mr-3'}`}>{item.icon}</span>
              {!isCollapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}

              {/* Collapsed Tooltip */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-950 text-white text-[10px] font-bold rounded shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}

              {/* Notification Badge */}
              {showBadge && (
                <span className={`flex items-center justify-center font-bold rounded-full ${
                  isCollapsed 
                    ? 'absolute top-1 right-2 w-2.5 h-2.5 bg-danger' 
                    : 'ml-auto px-1.5 py-0.5 text-[8px] bg-danger text-white'
                }`}>
                  {!isCollapsed && unreadNotificationsCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Collapse Toggle Footer */}
      <div className="p-2 border-t border-slate-800/60 bg-slate-950">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            {isCollapsed ? '▶' : '◀ Collapse'}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
