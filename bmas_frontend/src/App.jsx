import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import TesterDashboard from './pages/TesterDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import PMDashboardPage from './pages/PMDashboardPage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import CreateProjectPage from './pages/CreateProjectPage';
import TeamManagementPage from './pages/TeamManagementPage';
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
      <DataProvider>
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
            
            {/* PM Operations Module Routes */}
            <Route 
              path="/pm/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['PROJECT_MANAGER']}>
                  <PMDashboardPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/pm/projects" 
              element={
                <ProtectedRoute allowedRoles={['PROJECT_MANAGER']}>
                  <ProjectListPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/pm/projects/new" 
              element={
                <ProtectedRoute allowedRoles={['PROJECT_MANAGER']}>
                  <CreateProjectPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/pm/projects/:id" 
              element={
                <ProtectedRoute allowedRoles={['PROJECT_MANAGER']}>
                  <ProjectDetailsPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/pm/projects/:id/team" 
              element={
                <ProtectedRoute allowedRoles={['PROJECT_MANAGER']}>
                  <TeamManagementPage />
                </ProtectedRoute>
              } 
            />
            
            <Route path="/" element={<HomeRedirect />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
