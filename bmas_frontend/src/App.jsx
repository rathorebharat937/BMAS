import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import TesterDashboard from './pages/TesterDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import PmDashboard from './pages/PmDashboard';
import AccessDenied from './pages/AccessDenied';
import { useAuth } from './hooks/useAuth';

const HomeRedirect = () => {
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

  if (user?.activeRole === 'TESTER') {
    return <Navigate to="/tester/dashboard" replace />;
  } else if (user?.activeRole === 'DEVELOPER') {
    return <Navigate to="/developer/dashboard" replace />;
  } else if (user?.activeRole === 'PROJECT_MANAGER') {
    return <Navigate to="/pm/dashboard" replace />;
  }
  
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          
          <Route 
            path="/tester/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['TESTER']}>
                <TesterDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/developer/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['DEVELOPER']}>
                <DeveloperDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/pm/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['PROJECT_MANAGER']}>
                <PmDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/" element={<HomeRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
