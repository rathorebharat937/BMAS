import React from 'react';
import { useAuth } from '../hooks/useAuth';
import RoleSwitcher from '../components/RoleSwitcher';

function DeveloperDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob [animation-delay:2s]"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/60 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center font-black text-xl tracking-wider shadow-lg">
              D
            </div>
            <div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                BMAS Portal
              </span>
              <span className="text-xs block text-indigo-400 font-medium uppercase tracking-wider">
                Developer Workspace
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user?.roles?.length > 1 && <RoleSwitcher />}
            <button
              onClick={logout}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-slate-800 rounded-xl bg-slate-900/60 hover:bg-red-950/20 hover:border-red-900/40 text-slate-300 hover:text-red-400 transition-all duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-4xl mx-auto px-6 py-16 flex-1 flex flex-col justify-center relative z-10 w-full">
        <div className="bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-3xl shadow-xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
            ✔ Authorization Authenticated
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{user?.name}</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed">
            Welcome to the Bug Management & Assignment System. As a <strong className="text-white">Developer</strong>, you can resolve assigned tickets, publish clean pull requests, and review active code revisions.
          </p>

          {/* User Meta Panel */}
          <div className="border-t border-slate-800/80 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">Email Account</span>
              <span className="text-sm font-semibold text-slate-200">{user?.email}</span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">Security Role</span>
              <span className="text-sm font-semibold text-indigo-400">{user?.role || user?.activeRole}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 py-6 text-center text-slate-650 text-xs bg-slate-950">
        BMAS Portal &copy; {new Date().getFullYear()} - Dedicated Developer Workspace
      </footer>
    </div>
  );
}

export default DeveloperDashboard;
