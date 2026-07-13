import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import DataTable from '../components/DataTable';
import projectService from '../services/projectService';
import Loader from '../components/Loader';

export const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects from Spring Boot backend APIs, using mock listings:', err);
      // Fallback
      setProjects([
        { id: 1, name: 'BMAS Portal Redesign', description: 'Redesign BMAS Frontend with Zoho standards.', status: 'ACTIVE', transparencyEnabled: true },
        { id: 2, name: 'Zylker Mobile Client', description: 'React Native mobile application client.', status: 'ACTIVE', transparencyEnabled: true },
        { id: 3, name: 'Zoho Mail Integration', description: 'Email pipeline ticket routing engine.', status: 'PLANNING', transparencyEnabled: false }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleToggleTransparency = async (id, e) => {
    e.stopPropagation();
    try {
      await projectService.toggleTransparency(id);
      fetchProjects();
    } catch (err) {
      console.error('Failed to toggle transparency on backend', err);
      // local update
      setProjects(prev => prev.map(p => p.id === id ? { ...p, transparencyEnabled: !p.transparencyEnabled } : p));
    }
  };

  const handleArchiveProject = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to archive this project?')) return;
    try {
      await projectService.archiveProject(id);
      fetchProjects();
    } catch (err) {
      console.error('Failed to archive project on backend', err);
      setProjects(prev => prev.map(p => p.id === id ? { ...p, status: 'ARCHIVED' } : p));
    }
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      render: (row) => <span className="font-bold text-slate-500">PROJ-{row.id}</span>
    },
    {
      key: 'name',
      label: 'Project Name',
      sortable: true,
      render: (row) => <span className="font-extrabold text-slate-800 hover:underline">{row.name}</span>
    },
    {
      key: 'description',
      label: 'Description',
      className: 'max-w-xs truncate'
    },
    {
      key: 'transparencyEnabled',
      label: 'Transparency',
      render: (row) => (
        <button
          onClick={(e) => handleToggleTransparency(row.id, e)}
          className={`px-2 py-0.5 font-bold uppercase rounded text-[9px] border cursor-pointer transition-colors ${
            row.transparencyEnabled 
              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
              : 'bg-slate-100 text-slate-450 border-slate-200 hover:bg-slate-200'
          }`}
        >
          {row.transparencyEnabled ? 'Enabled' : 'Disabled'}
        </button>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
          row.status === 'ACTIVE' ? 'bg-green-50 text-green-700' :
          row.status === 'ARCHIVED' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/pm/projects/${row.id}`)}
            className="text-[10px] text-primary hover:underline font-bold"
          >
            Details
          </button>
          {row.status !== 'ARCHIVED' && (
            <button
              onClick={(e) => handleArchiveProject(row.id, e)}
              className="text-[10px] text-red-500 hover:underline font-bold"
            >
              Archive
            </button>
          )}
        </div>
      )
    }
  ];

  if (loading) {
    return <Loader message="Accessing project database..." />;
  }

  return (
    <AppLayout currentView="projects" onViewChange={(view) => navigate(`/pm/${view}`)}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Enterprise Projects</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Browse corporate registry and archive structures</p>
          </div>
          <button
            onClick={() => navigate('/pm/projects/new')}
            className="px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
          >
            Create Project
          </button>
        </div>

        <DataTable
          columns={columns}
          data={projects}
          searchPlaceholder="Search projects by name..."
          searchField="name"
          onRowClick={(row) => navigate(`/pm/projects/${row.id}`)}
        />
      </div>
    </AppLayout>
  );
};

export default ProjectListPage;
