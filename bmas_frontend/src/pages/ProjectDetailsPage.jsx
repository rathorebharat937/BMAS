import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import projectService from '../services/projectService';
import { useData } from '../context/DataContext';
import Loader from '../components/Loader';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

export const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bugs, sprints, activities } = useData();

  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProjectDetails = async () => {
    try {
      setLoading(true);
      const projData = await projectService.getProjectById(id);
      setProject(projData);

      const membersData = await projectService.getMembers(id);
      setMembers(membersData);
    } catch (err) {
      console.error('Failed to load project details from backend APIs, using mock configurations:', err);
      // Fallback
      setProject({
        id: Number(id),
        name: id === '1' ? 'BMAS Portal Redesign' : 'Zylker Mobile Client',
        description: 'Implement enterprise telemetry dashboarding modules matching Zoho layout aesthetics.',
        status: 'ACTIVE',
        transparencyEnabled: true,
        createdBy: 1
      });
      setMembers([
        { id: 1, userId: 1, userName: 'Bharat Rathore', roleInProject: 'PROJECT_MANAGER', userEmail: 'bharat@bmas.com' },
        { id: 2, userId: 2, userName: 'Jane Smith', roleInProject: 'DEVELOPER', userEmail: 'jane.smith@bmas.com' },
        { id: 3, userId: 3, userName: 'Alex Johnson', roleInProject: 'TESTER', userEmail: 'alex.johnson@bmas.com' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjectDetails();
  }, [id]);

  if (loading) {
    return <Loader message="Accessing project registry..." />;
  }

  const projBugs = bugs.filter(b => b.projectId === `proj-${id}` || b.projectId === String(id));
  const activeBugs = projBugs.filter(b => b.status !== 'CLOSED' && b.status !== 'RESOLVED');
  const projectSprints = sprints.filter(s => s.projectId === `proj-${id}` || s.projectId === String(id));
  const projectActivities = activities.filter(a => projBugs.some(b => b.id === a.bugId));

  return (
    <AppLayout currentView="projects" onViewChange={(view) => navigate(`/pm/${view}`)}>
      <div className="space-y-6 text-xs text-slate-700">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/pm/projects')}
              className="p-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
              title="Back to list"
            >
              ◀
            </button>
            <div>
              <span className="font-semibold text-slate-400">📁 Project Workspace</span>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{project?.name}</h1>
            </div>
          </div>

          <button
            onClick={() => navigate(`/pm/projects/${id}/team`)}
            className="px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
          >
            Manage Team
          </button>
        </div>

        {/* Info & Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Section 1: Project Information */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Project Information
            </h3>
            
            <div className="space-y-3 font-medium">
              <div>
                <span className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-0.5">Description</span>
                <p className="text-slate-650 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-150">
                  {project?.description || 'No description provided.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-1">Status</span>
                  <span className={`inline-flex px-2 py-0.5 font-bold uppercase rounded text-[10px] ${
                    project?.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-50 text-slate-650 border border-slate-200'
                  }`}>
                    {project?.status}
                  </span>
                </div>
                
                <div>
                  <span className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-1">Transparency Check</span>
                  <span className={`inline-flex px-2 py-0.5 font-bold uppercase rounded text-[10px] ${
                    project?.transparencyEnabled ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-50 text-slate-500 border border-slate-200'
                  }`}>
                    {project?.transparencyEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Team Members List */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2 select-none">
              Project Team ({members.length})
            </h3>
            
            <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-48">
              {members.map(member => (
                <div key={member.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-700">{member.userName}</p>
                    <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{member.userEmail}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-50 border border-slate-150 rounded text-[9px] font-bold text-slate-600">
                    {member.roleInProject.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sprints, Bugs, Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Section 3: Active Bugs */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Active Bugs ({activeBugs.length})
            </h3>
            
            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
              {activeBugs.length > 0 ? (
                activeBugs.slice(0, 5).map(b => (
                  <div key={b.id} className="py-3 space-y-1 hover:bg-slate-50/50 rounded-lg px-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-450">{b.id}</span>
                      <PriorityBadge priority={b.priority} />
                    </div>
                    <p className="font-bold text-slate-700 truncate" title={b.title}>{b.title}</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                      <span>👤 {b.assignee || 'Unassigned'}</span>
                      <StatusBadge status={b.status} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-400 italic py-6 text-center">No active bugs found.</div>
              )}
            </div>
          </div>

          {/* Section 4: Sprint Summary */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2 select-none">
              Sprint Milestones
            </h3>
            
            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
              {projectSprints.length > 0 ? (
                projectSprints.map(s => {
                  const daysRemaining = Math.max(0, Math.ceil((new Date(s.endDate) - new Date()) / (1000 * 60 * 60 * 24)));
                  return (
                    <div key={s.id} className="py-3 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-700">🏃 {s.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          s.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-50 text-slate-500 border border-slate-200'
                        }`}>
                          {s.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>Ends {s.endDate}</span>
                        <span className="font-bold text-slate-750">{daysRemaining} days remaining</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-slate-400 italic py-6 text-center">No active sprints.</div>
              )}
            </div>
          </div>

          {/* Section 5: Activity Timeline */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2 select-none">
              Activity History
            </h3>
            
            <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
              {projectActivities.length > 0 ? (
                projectActivities.map(a => (
                  <div key={a.id} className="text-[11px] leading-relaxed">
                    <span className="font-bold text-slate-800">{a.user}</span>{' '}
                    <span className="text-slate-500">{a.action}</span>{' '}
                    <span className="font-bold text-primary">{a.target}</span>
                  </div>
                ))
              ) : (
                <div className="text-slate-400 italic py-6 text-center">No project activity logged.</div>
              )}
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};

export default ProjectDetailsPage;
