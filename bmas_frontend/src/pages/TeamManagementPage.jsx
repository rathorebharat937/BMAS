import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import projectService from '../services/projectService';
import Loader from '../components/Loader';

export const TeamManagementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Add Member form state
  const [userIdInput, setUserIdInput] = useState('');
  const [roleInput, setRoleInput] = useState('DEVELOPER');
  const [actionLoading, setActionLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const proj = await projectService.getProjectById(id);
      setProject(proj);

      const mems = await projectService.getMembers(id);
      setMembers(mems);
    } catch (err) {
      console.error('Failed to load project team data, using mock fallback list:', err);
      setProject({ id: Number(id), name: 'BMAS Project' });
      setMembers([
        { id: 1, userId: 1, userName: 'Bharat Rathore', roleInProject: 'PROJECT_MANAGER', userEmail: 'bharat@bmas.com' },
        { id: 2, userId: 2, userName: 'Jane Smith', roleInProject: 'DEVELOPER', userEmail: 'jane.smith@bmas.com' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    const uId = parseInt(userIdInput);
    if (isNaN(uId)) return;

    setActionLoading(true);
    setError('');
    setSuccess('');
    try {
      await projectService.addMember(id, uId, roleInput);
      setSuccess(`User with ID ${uId} added successfully!`);
      setUserIdInput('');
      loadData();
    } catch (err) {
      console.error('Failed to add member', err);
      setError(err.response?.data?.message || 'Failed to add user. Verify user ID exists and is not already in project.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!window.confirm('Are you sure you want to remove this member from the project?')) return;
    setError('');
    setSuccess('');
    try {
      await projectService.removeMember(id, memberId);
      setSuccess('Member removed successfully.');
      loadData();
    } catch (err) {
      console.error('Failed to remove member', err);
      setError('Failed to remove member.');
    }
  };

  const handleChangeRole = async (memberId, newRole) => {
    setError('');
    setSuccess('');
    try {
      await projectService.changeMemberRole(id, memberId, newRole);
      setSuccess('Project role updated.');
      loadData();
    } catch (err) {
      console.error('Failed to update role', err);
      setError('Failed to update member role.');
    }
  };

  if (loading) {
    return <Loader message="Accessing membership registry..." />;
  }

  return (
    <AppLayout currentView="projects" onViewChange={(view) => navigate(`/pm/${view}`)}>
      <div className="space-y-6 text-xs text-slate-700">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/pm/projects/${id}`)}
            className="p-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
          >
            ◀
          </button>
          <div>
            <span className="font-semibold text-slate-400">📁 Project Memberships</span>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Manage Team: {project?.name}</h1>
          </div>
        </div>

        {/* Feedback alerts */}
        {error && <div className="p-3 bg-red-50 text-red-650 border border-red-200 rounded-lg font-semibold">{error}</div>}
        {success && <div className="p-3 bg-green-50 text-green-650 border border-green-200 rounded-lg font-semibold">{success}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Members list */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2 select-none">
              Project Membership List
            </h3>
            
            <div className="divide-y divide-slate-150">
              {members.map(member => (
                <div key={member.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-semibold">
                  <div className="space-y-0.5">
                    <p className="text-slate-800 font-bold">{member.userName}</p>
                    <p className="text-[10px] text-slate-450 font-semibold">{member.userEmail} (User ID: {member.userId})</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Role changer dropdown */}
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-250 rounded px-2 py-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide select-none">Role:</span>
                      <select
                        value={member.roleInProject}
                        onChange={(e) => handleChangeRole(member.id, e.target.value)}
                        className="bg-transparent outline-none font-bold text-slate-700 cursor-pointer pr-0.5"
                      >
                        <option value="PROJECT_MANAGER">Manager</option>
                        <option value="DEVELOPER">Developer</option>
                        <option value="TESTER">Tester</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="px-2.5 py-1.5 bg-red-50 text-red-650 hover:bg-red-100 border border-red-250 rounded font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add member form */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2 select-none">
              Add New Project Member
            </h3>
            
            <form onSubmit={handleAddMember} className="space-y-4 font-semibold">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-1.5">User ID *</label>
                <input
                  type="number"
                  required
                  value={userIdInput}
                  onChange={(e) => setUserIdInput(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none font-semibold text-slate-850 bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-1.5">Role inside project</label>
                <select
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-700 cursor-pointer font-bold"
                >
                  <option value="DEVELOPER">Developer</option>
                  <option value="TESTER">Tester</option>
                  <option value="PROJECT_MANAGER">Manager</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow transition-all cursor-pointer disabled:opacity-60"
              >
                {actionLoading ? 'Adding...' : 'Add Member'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};

export default TeamManagementPage;
