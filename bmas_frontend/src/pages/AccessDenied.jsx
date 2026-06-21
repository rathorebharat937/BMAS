import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function AccessDenied() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role === 'TESTER') {
      navigate('/tester/dashboard');
    } else if (user.role === 'DEVELOPER') {
      navigate('/developer/dashboard');
    } else if (user.role === 'PROJECT_MANAGER') {
      navigate('/pm/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute top-0 -left-4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob [animation-delay:2s]"></div>

      <div className="w-full max-w-md p-8 bg-slate-900/60 backdrop-blur-xl border border-red-950/40 rounded-3xl shadow-2xl relative z-10 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-550/10 border border-red-550/30 text-red-400 rounded-full flex items-center justify-center font-bold text-2xl">
          🛑
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Access Denied</h2>
        <p className="text-red-400 text-sm font-semibold tracking-wide uppercase mb-4">Insufficient Permissions</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          You do not have the required role to access this workspace. Please contact the administrator or return to your designated dashboard.
        </p>

        <button
          onClick={handleBack}
          className="w-full py-3.5 px-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-semibold hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default AccessDenied;
