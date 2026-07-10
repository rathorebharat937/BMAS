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
    
    if (user.activeRole === 'TESTER') {
      navigate('/tester/dashboard');
    } else if (user.activeRole === 'DEVELOPER') {
      navigate('/developer/dashboard');
    } else if (user.activeRole === 'PROJECT_MANAGER') {
      navigate('/pm/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center relative overflow-hidden font-sans p-6">
      {/* Background decoration */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-danger/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob [animation-delay:2.5s]"></div>

      <div className="w-full max-w-md p-8 bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl relative z-10 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center font-bold text-2xl">
          🛑
        </div>
        <h2 className="text-xl font-black text-white mb-1.5 tracking-tight">Access Restricted</h2>
        <p className="text-red-500 text-[10px] font-bold tracking-widest uppercase mb-4">Insufficient Role Permissions</p>
        <p className="text-slate-400 text-xs leading-relaxed mb-6">
          Your account does not possess the specific workspace permissions required to access this path. Please switch roles or return to your dashboard.
        </p>

        <button
          onClick={handleBack}
          className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-150 cursor-pointer"
        >
          Return to Designated Workspace
        </button>
      </div>
    </div>
  );
}

export default AccessDenied;
