import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useData } from '../context/DataContext';

export const AppLayout = ({ children, currentView, onViewChange, onQuickCreateBug }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { notifications } = useData();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex">
      {/* Sidebar Nav Shell */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
        currentView={currentView}
        onViewChange={onViewChange}
        unreadNotificationsCount={unreadCount}
      />

      {/* Main Container Shell */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'pl-16' : 'pl-64'
        }`}
      >
        {/* Navbar */}
        <Navbar 
          onQuickCreateBug={onQuickCreateBug}
          onToggleNotificationsView={() => onViewChange('notifications')}
        />

        {/* Scrollable Content Container */}
        <main className="flex-1 mt-14 p-6 overflow-y-auto bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
