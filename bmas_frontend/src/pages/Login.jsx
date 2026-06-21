import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all credentials.');
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      setSuccess('Logged in successfully!');
      
      setTimeout(() => {
        if (loggedUser.activeRole === 'TESTER') {
          navigate('/tester/dashboard');
        } else if (loggedUser.activeRole === 'DEVELOPER') {
          navigate('/developer/dashboard');
        } else if (loggedUser.activeRole === 'PROJECT_MANAGER') {
          navigate('/pm/dashboard');
        } else {
          navigate('/');
        }
      }, 500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center relative overflow-hidden font-sans py-12 px-4">
      {/* Decorative Blobs */}
      <div className="absolute top-0 -left-12 w-[35rem] h-[35rem] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 -right-12 w-[35rem] h-[35rem] bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob [animation-delay:3s]"></div>

      <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col">
        {/* Brand Banner */}
        <div className="text-center pt-8 pb-6 px-8 border-b border-slate-800/80 bg-slate-950">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-primary/20">
            B
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">BMAS BugTracker</h2>
          <p className="text-slate-400 text-xs mt-1.5 font-medium tracking-wide">Enterprise Quality Portal</p>
        </div>

        {/* Feedback Messages */}
        <div className="px-8 pt-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold select-none flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold select-none flex items-center gap-2">
              <span>✅</span>
              <span>{success}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-5">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-2">Corporate Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-xs text-white outline-none transition-all placeholder:text-slate-650"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 mb-2">Security Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-xs text-white outline-none transition-all placeholder:text-slate-650"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Signing in...
              </>
            ) : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
