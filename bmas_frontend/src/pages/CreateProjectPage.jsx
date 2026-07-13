import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import projectService from '../services/projectService';

export const CreateProjectPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError('');
    try {
      await projectService.createProject(name, description);
      navigate('/pm/projects');
    } catch (err) {
      console.error('Failed to create project', err);
      setError('Failed to create project. Please verify backend API connectivity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout currentView="projects" onViewChange={(view) => navigate(`/pm/${view}`)}>
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Create New Project</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">Initialize a corporate workspace in the system</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-650 border border-red-200 rounded-lg text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-1.5">Project Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Zylker CRM Pipelines"
                className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-primary font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Detailed summary of the goals, milestones, and scope..."
                className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-primary font-medium"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate('/pm/projects')}
                className="px-4 py-2 border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-60 cursor-pointer"
              >
                {loading ? 'Registering...' : 'Register Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateProjectPage;
