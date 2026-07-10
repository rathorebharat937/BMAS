import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../context/DataContext';
import RoleSwitcher from './RoleSwitcher';

export const Navbar = ({ onQuickCreateBug, onToggleNotificationsView }) => {
  const { user, logout } = useAuth();
  const { projects, activeProjectId, setActiveProjectId, searchQuery, setSearchQuery, notifications, clearSingleNotification } = useData();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];
  const unreadNotifs = notifications.filter(n => !n.read);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-30 h-14 bg-white border-b border-slate-200/80 px-4 flex items-center justify-between select-none shadow-sm pl-16 md:pl-20 transition-all duration-300">
      {/* Search & Project Switcher Left Side */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        {/* Project Switcher */}
        {projects.length > 0 && (
          <div className="relative">
            <select
              value={activeProjectId}
              onChange={(e) => setActiveProjectId(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-bold text-slate-700 outline-none cursor-pointer focus:border-primary transition-all hover:bg-slate-100 pr-1.5"
            >
              <option value="all">All Projects</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>📂 {p.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Global Search Bar */}
        <div className="relative w-full hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Global search bugs..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-450 text-slate-800"
          />
        </div>
      </div>

      {/* Notifications, Profile, Role Switcher, Quick Create Right Side */}
      <div className="flex items-center gap-3.5">
        {/* Quick Create Bug */}
        <button
          onClick={onQuickCreateBug}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
        >
          <span>➕</span>
          <span className="hidden md:inline">Quick Create</span>
        </button>

        {/* Role Switcher */}
        {user?.roles?.length > 1 && (
          <div className="hidden md:block">
            <RoleSwitcher />
          </div>
        )}

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              setProfileDropdownOpen(false);
            }}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 relative transition-colors cursor-pointer"
          >
            <span className="text-base">🔔</span>
            {unreadNotifs.length > 0 && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-danger ring-2 ring-white"></span>
            )}
          </button>

          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">Notifications ({unreadNotifs.length} unread)</span>
                <button 
                  onClick={() => {
                    setNotifDropdownOpen(false);
                    onToggleNotificationsView();
                  }}
                  className="text-[10px] text-primary hover:underline font-semibold"
                >
                  View all
                </button>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map(n => (
                    <div key={n.id} className={`p-3 text-[11px] hover:bg-slate-50 transition-colors flex items-start gap-2.5 ${!n.read ? 'bg-green-50/20' : ''}`}>
                      <span className="text-xs select-none">📢</span>
                      <div className="flex-1 space-y-0.5">
                        <p className="text-slate-700 font-medium leading-normal">{n.text}</p>
                        <span className="text-[9px] text-slate-400 font-bold block">{n.time}</span>
                      </div>
                      <button 
                        onClick={() => clearSingleNotification(n.id)}
                        className="text-[9px] text-slate-350 hover:text-slate-650"
                        title="Dismiss"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-400 text-xs font-medium">
                    No new notifications.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setNotifDropdownOpen(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center border border-slate-200">
              {getInitials(user?.name)}
            </div>
            <div className="text-left hidden lg:block select-none">
              <span className="text-xs font-bold text-slate-800 block leading-none">{user?.name}</span>
              <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block mt-0.5">{user?.activeRole}</span>
            </div>
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <span className="text-xs font-bold text-slate-800 block truncate">{user?.name}</span>
                <span className="text-[10px] text-slate-500 block truncate font-medium mt-0.5">{user?.email}</span>
                {user?.expertise && (
                  <span className="inline-block mt-2 text-[9px] font-bold text-primary bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                    {user?.expertise}
                  </span>
                )}
              </div>
              <div className="p-1">
                {/* Mobile-only Role Switcher items */}
                {user?.roles?.length > 1 && (
                  <div className="md:hidden border-b border-slate-100 pb-1 mb-1">
                    <span className="px-3 py-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Roles</span>
                    <RoleSwitcher />
                  </div>
                )}
                
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>🚪</span>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
