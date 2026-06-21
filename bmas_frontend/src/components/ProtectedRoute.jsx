import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold tracking-wider uppercase animate-pulse">Loading auth...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.activeRole)) {
    const possessesRole = allowedRoles.some(role => user?.roles?.includes(role));
    
    if (possessesRole && user?.activeRole) {
      if (user.activeRole === 'TESTER') {
        return <Navigate to="/tester/dashboard" replace />;
      } else if (user.activeRole === 'DEVELOPER') {
        return <Navigate to="/developer/dashboard" replace />;
      } else if (user.activeRole === 'PROJECT_MANAGER') {
        return <Navigate to="/pm/dashboard" replace />;
      }
    }
    
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default ProtectedRoute;
