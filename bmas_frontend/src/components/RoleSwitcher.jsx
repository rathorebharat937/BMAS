import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function RoleSwitcher() {
  const { user, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [switching, setSwitching] = useState(false);
  const navigate = useNavigate();

  if (!user || !user.roles || user.roles.length <= 1) {
    return null;
  }

  const handleRoleSwitch = async (targetRole) => {
    if (targetRole === user.activeRole) return;
    setIsOpen(false);
    setSwitching(true);
    try {
      const newActiveRole = await switchRole(targetRole);
      
      if (newActiveRole === 'TESTER') {
        navigate('/tester/dashboard');
      } else if (newActiveRole === 'DEVELOPER') {
        navigate('/developer/dashboard');
      } else if (newActiveRole === 'PROJECT_MANAGER') {
        navigate('/pm/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to switch role', err);
    } finally {
      setSwitching(false);
    }
  };

  const getRoleDisplayName = (r) => {
    if (r === 'PROJECT_MANAGER') return 'Project Manager';
    if (r === 'DEVELOPER') return 'Developer';
    if (r === 'TESTER') return 'Tester';
    return r;
  };

  return (
    <div className="relative inline-block text-left z-50">
      <div>
        <button
          type="button"
          disabled={switching}
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between w-48 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white shadow-sm hover:bg-slate-850 hover:border-slate-750 focus:outline-none transition-all duration-150 disabled:opacity-50"
        >
          {switching ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></span>
              Switching...
            </span>
          ) : (
            <>
              <span>{getRoleDisplayName(user.activeRole)}</span>
              <svg className="-mr-1 ml-2 h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
              </svg>
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-slate-800 bg-slate-950 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
          <div className="py-1">
            {user.roles.map((role) => {
              const isActive = role === user.activeRole;
              return (
                <button
                  key={role}
                  onClick={() => handleRoleSwitch(role)}
                  className={`w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-400 cursor-default'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                  disabled={isActive}
                >
                  <div className="flex items-center justify-between">
                    <span>{getRoleDisplayName(role)}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default RoleSwitcher;
