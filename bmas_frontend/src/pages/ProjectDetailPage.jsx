import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import projectService from '../services/projectService';
import AddMemberModal from '../components/AddMemberModal';
import ConfirmDialog from '../components/ConfirmDialog';
import AppLayout from '../components/AppLayout';
import BugFormModal from '../components/BugFormModal';
import { useData } from '../context/DataContext';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isPM = user?.activeRole === 'PROJECT_MANAGER';

  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [error, setError] = useState('');

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [removingMemberId, setRemovingMemberId] = useState(null);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
  const [isBugFormOpen, setIsBugFormOpen] = useState(false);
  const { createBug } = useData();

  const fetchProject = useCallback(async () => {
    setLoadingProject(true);
    try {
      const data = await projectService.getProject(id);
      setProject(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Project not found.');
    } finally {
      setLoadingProject(false);
    }
  }, [id]);

  const fetchMembers = useCallback(async () => {
    setLoadingMembers(true);
    try {
      const data = await projectService.getMembers(id);
      setMembers(data);
    } catch {
      setMembers([]);
    } finally {
      setLoadingMembers(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
    fetchMembers();
  }, [fetchProject, fetchMembers]);

  const handleMemberAdded = (_userId) => {
    // Re-fetch members to get the accurate list from the server
    fetchMembers();
  };

  const handleRemoveTrigger = (member) => {
    setMemberToRemove(member);
    setIsRemoveConfirmOpen(true);
  };

  const handleRemoveConfirm = async () => {
    if (!memberToRemove) return;
    const target = memberToRemove;
    setRemovingMemberId(target.userId);
    setMemberToRemove(null);
    try {
      await projectService.removeMember(id, target.userId);
      setMembers((prev) => prev.filter((m) => m.userId !== target.userId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove member.');
    } finally {
      setRemovingMemberId(null);
    }
  };

  const existingMemberIds = members.map((m) => m.userId);

  const navigateToDashboard = () => {
    if (user?.activeRole === 'PROJECT_MANAGER') navigate('/pm/dashboard');
    else if (user?.activeRole === 'DEVELOPER') navigate('/developer/dashboard');
    else navigate('/tester/dashboard');
  };

  const onLayoutViewChange = (view) => {
    if (view === 'projects') navigate('/projects');
    else navigateToDashboard();
  };

  if (loadingProject) {
    return (
      <AppLayout currentView="projects" onViewChange={onLayoutViewChange} onQuickCreateBug={() => setIsBugFormOpen(true)}>
        <div className="space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-slate-200 rounded w-48" />
            <div className="h-4 bg-slate-100 rounded w-72" />
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error && !project) {
    return (
      <AppLayout currentView="projects" onViewChange={onLayoutViewChange} onQuickCreateBug={() => setIsBugFormOpen(true)}>
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
          <p className="text-4xl">⚠️</p>
          <h3 className="text-sm font-bold text-slate-700">{error}</h3>
          <button
            onClick={() => navigate('/projects')}
            className="mt-2 px-4 py-2 text-xs font-bold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            ← Back to Projects
          </button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout currentView="projects" onViewChange={onLayoutViewChange} onQuickCreateBug={() => setIsBugFormOpen(true)}>
      <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
        <button
          onClick={() => navigate('/projects')}
          className="hover:text-indigo-600 transition-colors"
        >
          Projects
        </button>
        <span>/</span>
        <span className="text-slate-700">{project?.name}</span>
      </div>

      {/* Project Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded text-[9px] font-bold tracking-widest uppercase">
                Active
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {loadingMembers ? project?.memberCount : members.length} member{(loadingMembers ? project?.memberCount : members.length) !== 1 ? 's' : ''}
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight truncate">{project?.name}</h1>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              {project?.description || 'No description provided.'}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-6 text-xs font-semibold text-slate-500">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Created By</span>
            <span className="text-slate-700">{project?.createdBy}</span>
          </div>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Created At</span>
            <span className="text-slate-700">
              {project?.createdAt
                ? new Date(project.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-600 flex items-center gap-2">
          <span>⚠️</span> {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      {/* Team Members Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">Team Members</h2>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
              {members.length} member{members.length !== 1 ? 's' : ''} in this project
            </p>
          </div>
          {isPM && (
            <button
              onClick={() => setIsAddMemberOpen(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>+</span> Add Member
            </button>
          )}
        </div>

        {/* Members List */}
        <div className="divide-y divide-slate-100">
          {loadingMembers && (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-9 h-9 rounded-full bg-slate-200" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-slate-200 rounded w-32" />
                    <div className="h-2.5 bg-slate-100 rounded w-48" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingMembers && members.length === 0 && (
            <div className="p-10 text-center text-xs text-slate-400 font-medium">
              No members yet. {isPM && 'Add your first team member above.'}
            </div>
          )}

          {!loadingMembers &&
            members.map((member) => {
              const isRemoving = removingMemberId === member.userId;
              const initials = member.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center border border-slate-200 shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs font-bold text-slate-800 truncate">{member.name}</p>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium truncate">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 ml-2">
                    <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
                      Joined{' '}
                      {member.joinedAt
                        ? new Date(member.joinedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })
                        : ''}
                    </span>
                    {isPM && (
                      <button
                        onClick={() => handleRemoveTrigger(member)}
                        disabled={isRemoving}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Remove member"
                      >
                        {isRemoving ? (
                          <span className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin inline-block" />
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        projectId={id}
        existingMemberIds={existingMemberIds}
        onMemberAdded={handleMemberAdded}
      />

      {/* Remove Member Confirm Dialog */}
      <ConfirmDialog
        isOpen={isRemoveConfirmOpen}
        onClose={() => {
          setIsRemoveConfirmOpen(false);
          setMemberToRemove(null);
        }}
        onConfirm={handleRemoveConfirm}
        title="Remove Team Member"
        message={`Are you sure you want to remove ${memberToRemove?.name} from this project?`}
        confirmText="Remove"
        type="danger"
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

export default ProjectDetailPage;
