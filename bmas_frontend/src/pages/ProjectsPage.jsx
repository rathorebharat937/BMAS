import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import projectService from '../services/projectService';
import CreateProjectModal from '../components/CreateProjectModal';
import AppLayout from '../components/AppLayout';
import BugFormModal from '../components/BugFormModal';
import { useData } from '../context/DataContext';

const ProjectsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isPM = user?.activeRole === 'PROJECT_MANAGER';
  const { createBug } = useData();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBugFormOpen, setIsBugFormOpen] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load projects.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  return (
    <AppLayout
      currentView="projects"
      onViewChange={(view) => {
        if (view === 'projects') {
          navigate('/projects');
        } else if (view === 'dashboard') {
          if (user?.activeRole === 'PROJECT_MANAGER') navigate('/pm/dashboard');
          else if (user?.activeRole === 'DEVELOPER') navigate('/developer/dashboard');
          else navigate('/tester/dashboard');
        } else {
          // All other sidebar items (bugs, sprints, team, etc.) go to dashboard
          if (user?.activeRole === 'PROJECT_MANAGER') navigate('/pm/dashboard');
          else if (user?.activeRole === 'DEVELOPER') navigate('/developer/dashboard');
          else navigate('/tester/dashboard');
        }
      }}
      onQuickCreateBug={() => setIsBugFormOpen(true)}
    >
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Projects</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {isPM ? 'Manage your projects and team members' : 'Your assigned projects'}
          </p>
        </div>
        {isPM && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
          >
            + Create Project
          </button>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-600 flex items-center gap-2">
          <span>⚠️</span> {error}
          <button onClick={fetchProjects} className="ml-auto underline hover:no-underline">Retry</button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 animate-pulse">
              <div className="h-3 bg-slate-200 rounded w-1/3" />
              <div className="h-4 bg-slate-200 rounded w-2/3" />
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="h-3 bg-slate-100 rounded w-4/5" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && projects.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
          <p className="text-4xl">📁</p>
          <h3 className="text-sm font-bold text-slate-700">No projects yet</h3>
          <p className="text-xs text-slate-400 font-medium">
            {isPM ? 'Create your first project to get started.' : 'You have not been assigned to any projects yet.'}
          </p>
          {isPM && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              + Create Project
            </button>
          )}
        </div>
      )}

      {/* Project Grid */}
      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
            >
              {/* Card Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded text-[9px] font-bold tracking-widest uppercase">
                    Active
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {project.memberCount} member{project.memberCount !== 1 ? 's' : ''}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-800 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                  {project.name}
                </h3>

                <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 min-h-[2.5rem]">
                  {project.description || 'No description provided.'}
                </p>
              </div>

              {/* Card Footer */}
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                <span>
                  Created by{' '}
                  <span className="text-slate-600 font-bold">{project.createdBy}</span>
                </span>
                <span>
                  {project.createdAt
                    ? new Date(project.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={handleProjectCreated}
      />

      {/* Quick Create Bug Modal */}
      <BugFormModal
        isOpen={isBugFormOpen}
        onClose={() => setIsBugFormOpen(false)}
        onSubmit={createBug}
        bugToEdit={null}
      />
    </div>
    </AppLayout>
  );
};

export default ProjectsPage;
