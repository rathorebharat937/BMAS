import React, { useState } from 'react';
<<<<<<< HEAD
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> v1_bharat
import { useAuth } from '../hooks/useAuth';
import { useData } from '../context/DataContext';
import AppLayout from './AppLayout';
import DashboardCard from './DashboardCard';
import DataTable from './DataTable';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import EmptyState from './EmptyState';
import ConfirmDialog from './ConfirmDialog';
import BugFormModal from './BugFormModal';
import BugDetailsModal from './BugDetailsModal';

export const DashboardContainer = ({ role }) => {
  const { user } = useAuth();
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> v1_bharat
  const { 
    projects, 
    sprints, 
    team, 
    bugs, 
    notifications, 
    activities, 
    activeProjectId, 
    createBug, 
    updateBug, 
    deleteBug, 
    clearNotifications,
    clearSingleNotification 
  } = useData();

  // Navigation states
  const [currentView, setCurrentView] = useState('dashboard');
<<<<<<< HEAD
=======

  // When user clicks "Projects" in sidebar, navigate to the real /projects page
  const handleViewChange = (view) => {
    if (view === 'projects') {
      navigate('/projects');
    } else {
      setCurrentView(view);
    }
  };
>>>>>>> v1_bharat
  
  // Modals visibility states
  const [isBugFormOpen, setIsBugFormOpen] = useState(false);
  const [bugToEdit, setBugToEdit] = useState(null);
  const [isBugDetailsOpen, setIsBugDetailsOpen] = useState(false);
  const [selectedBugId, setSelectedBugId] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [bugToDeleteId, setBugToDeleteId] = useState(null);

  // New Project Creation state (only for PM)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProjName, setNewProjName] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjKey, setNewProjKey] = useState('');

  // Kanban selected sprint board state
  const [selectedSprintId, setSelectedSprintId] = useState(() => {
    const defaultSprint = sprints.find(s => s.projectId === activeProjectId) || sprints[0];
    return defaultSprint ? defaultSprint.id : '';
  });

  // Role details
  const isPM = role === 'PROJECT_MANAGER';
  const isDev = role === 'DEVELOPER';
  const isTester = role === 'TESTER';

  // Filter bugs by selected project
  const filteredBugs = bugs.filter(b => {
    if (activeProjectId === 'all') return true;
    return b.projectId === activeProjectId;
  });

  // Calculate project metrics
  const stats = React.useMemo(() => {
    const total = filteredBugs.length;
    const open = filteredBugs.filter(b => b.status === 'OPEN').length;
    const assigned = filteredBugs.filter(b => b.status === 'ASSIGNED').length;
    const inProgress = filteredBugs.filter(b => b.status === 'IN_PROGRESS').length;
    const testing = filteredBugs.filter(b => b.status === 'TESTING').length;
    const resolved = filteredBugs.filter(b => b.status === 'RESOLVED').length;
    const closed = filteredBugs.filter(b => b.status === 'CLOSED').length;
    const critical = filteredBugs.filter(b => b.severity === 'CRITICAL' || b.priority === 'CRITICAL').length;
    
    return { total, open, assigned, inProgress, testing, resolved, closed, critical };
  }, [filteredBugs]);

  // Open Details panel
  const handleOpenDetails = (bugId) => {
    setSelectedBugId(bugId);
    setIsBugDetailsOpen(true);
  };

  // Open Create/Edit form
  const handleOpenBugForm = (bug = null) => {
    setBugToEdit(bug);
    setIsBugFormOpen(true);
  };

  // Handle Bug Submit (Create / Edit)
  const handleBugSubmit = (data) => {
    if (bugToEdit) {
      updateBug(bugToEdit.id, data);
    } else {
      createBug(data);
    }
  };

  // Handle delete
  const handleTriggerDelete = (bugId) => {
    setBugToDeleteId(bugId);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (bugToDeleteId) {
      deleteBug(bugToDeleteId);
      setBugToDeleteId(null);
    }
  };

  // Kanban Native HTML5 Drag and Drop Handlers
  const handleDragStart = (e, bugId) => {
    e.dataTransfer.setData('text/plain', bugId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const bugId = e.dataTransfer.getData('text/plain');
    if (bugId) {
      // Role status transition rules
      const currentBug = bugs.find(b => b.id === bugId);
      if (!currentBug) return;
      
      // Enforce status transitions
      if (isTester && !['OPEN', 'TESTING', 'RESOLVED', 'CLOSED'].includes(targetStatus)) {
        alert('As a Tester, you can only move issues to Open/Reopened, Testing, Resolved, or Closed states.');
        return;
      }
      if (isDev && ['CLOSED'].includes(targetStatus)) {
        alert('Only Project Managers or Testers can Close issues.');
        return;
      }
      
      updateBug(bugId, { status: targetStatus });
    }
  };

  // Switch status via buttons for accessibility
  const handleMoveStatus = (bugId, nextStatus) => {
    updateBug(bugId, { status: nextStatus });
  };

  // Create Project handler
  const handleCreateProjectSubmit = (e) => {
    e.preventDefault();
    if (!newProjName.trim() || !newProjKey.trim()) return;
    const newProj = {
      id: `proj-${Date.now()}`,
      name: newProjName.trim(),
      key: newProjKey.trim().toUpperCase(),
      description: newProjDesc.trim(),
      status: 'Active',
      progress: 0
    };
    projects.push(newProj); // direct updates since context projects is stateful array
    setNewProjName('');
    setNewProjDesc('');
    setNewProjKey('');
    setIsProjectModalOpen(false);
  };

  // Columns layout for bugs DataTable
  const bugColumns = [
    {
      key: 'id',
      label: 'Bug ID',
      sortable: true,
      render: (row) => <span className="font-bold text-primary hover:underline">{row.id}</span>
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      className: 'max-w-xs truncate',
      render: (row) => (
        <div className="space-y-0.5">
          <p className="font-bold text-slate-800 truncate" title={row.title}>{row.title}</p>
          <p className="text-[10px] text-slate-450 truncate">{row.description}</p>
        </div>
      )
    },
    {
      key: 'projectId',
      label: 'Project',
      sortable: true,
      render: (row) => {
        const p = projects.find(proj => proj.id === row.projectId);
        return <span className="font-semibold text-slate-500">{p ? p.name : 'Unknown'}</span>;
      }
    },
    {
      key: 'severity',
      label: 'Severity',
      sortable: true,
      render: (row) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
          row.severity === 'CRITICAL' ? 'bg-red-50 text-red-700' :
          row.severity === 'MAJOR' ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-650'
        }`}>
          {row.severity}
        </span>
      )
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (row) => <PriorityBadge priority={row.priority} />
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      key: 'assignee',
      label: 'Assignee',
      sortable: true,
      render: (row) => <span className="font-bold text-slate-650">👤 {row.assignee || 'Unassigned'}</span>
    },
    {
      key: 'reporter',
      label: 'Reporter',
      sortable: true,
      render: (row) => <span className="text-slate-450 font-medium">{row.reporter}</span>
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => handleOpenBugForm(row)}
            className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-800 transition-colors"
            title="Edit"
          >
            ✏️
          </button>
          {isPM && (
            <button
              onClick={() => handleTriggerDelete(row.id)}
              className="p-1 hover:bg-red-50 rounded text-red-400 hover:text-red-600 transition-colors"
              title="Delete"
            >
              🗑️
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <AppLayout 
      currentView={currentView} 
<<<<<<< HEAD
      onViewChange={setCurrentView}
=======
      onViewChange={handleViewChange}
>>>>>>> v1_bharat
      onQuickCreateBug={() => handleOpenBugForm()}
    >
      
      {/* 1. DASHBOARD VIEW */}
      {currentView === 'dashboard' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Workspace Overview</h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Zoho BugTracker enterprise telemetry dashboard</p>
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
              📅 {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          {/* Metric Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <DashboardCard 
              title="Total Bugs" 
              value={stats.total} 
              subtext="Accumulated bug reports" 
              icon="🐛" 
              color="secondary"
              onClick={() => setCurrentView('bugs')}
            />
            <DashboardCard 
              title="Open Bugs" 
              value={stats.open} 
              subtext="Unassigned tickets" 
              icon="📥" 
              color="primary"
              onClick={() => setCurrentView('bugs')}
            />
            <DashboardCard 
              title="In Progress" 
              value={stats.inProgress + stats.assigned} 
              subtext="Active workloads" 
              icon="⚙️" 
              color="warning"
              onClick={() => setCurrentView('sprints')}
            />
            <DashboardCard 
              title="Resolved" 
              value={stats.resolved + stats.closed} 
              subtext="Verified fixes" 
              icon="✅" 
              color="success"
              onClick={() => setCurrentView('bugs')}
            />
            <DashboardCard 
              title="Critical Issues" 
              value={stats.critical} 
              subtext="Requires hotfix" 
              icon="🚨" 
              color="danger"
              onClick={() => setCurrentView('bugs')}
            />
          </div>

          {/* Charts & Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Bug status distribution charts */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Distributions Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 select-none">
                  Telemetry distribution
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
                  {/* Status distribution bar chart */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">By Ticket Status</span>
                    <div className="space-y-2.5">
                      {[
                        { label: 'Open', count: stats.open, color: 'bg-blue-500' },
                        { label: 'In Progress', count: stats.inProgress + stats.assigned, color: 'bg-amber-500' },
                        { label: 'Testing', count: stats.testing, color: 'bg-pink-500' },
                        { label: 'Resolved', count: stats.resolved, color: 'bg-green-500' },
                        { label: 'Closed', count: stats.closed, color: 'bg-slate-400' }
                      ].map(item => {
                        const pct = stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;
                        return (
                          <div key={item.label} className="space-y-1">
                            <div className="flex justify-between text-slate-650">
                              <span>{item.label}</span>
                              <span>{item.count} ({pct}%)</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className={`${item.color} h-full transition-all duration-500`} style={{ width: `${pct}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Priority & Severity Distribution */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">By Priority Levels</span>
                    <div className="space-y-2.5">
                      {[
                        { label: '🚨 Critical', count: filteredBugs.filter(b => b.priority === 'CRITICAL').length, color: 'bg-danger' },
                        { label: '🟠 High', count: filteredBugs.filter(b => b.priority === 'HIGH').length, color: 'bg-amber-500' },
                        { label: '🔵 Medium', count: filteredBugs.filter(b => b.priority === 'MEDIUM').length, color: 'bg-blue-500' },
                        { label: '⚪ Low', count: filteredBugs.filter(b => b.priority === 'LOW').length, color: 'bg-slate-400' }
                      ].map(item => {
                        const pct = stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;
                        return (
                          <div key={item.label} className="space-y-1">
                            <div className="flex justify-between text-slate-650">
                              <span>{item.label}</span>
                              <span>{item.count} ({pct}%)</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className={`${item.color} h-full transition-all duration-500`} style={{ width: `${pct}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* My Assigned bugs widgets */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 select-none">
                    Assigned To Me
                  </h3>
                  <button onClick={() => setCurrentView('my-bugs')} className="text-[10px] text-primary hover:underline font-bold">
                    View My Bugs
                  </button>
                </div>
                
                <div className="divide-y divide-slate-100">
                  {bugs.filter(b => b.assignee === user?.name && b.status !== 'CLOSED').slice(0, 3).length > 0 ? (
                    bugs.filter(b => b.assignee === user?.name && b.status !== 'CLOSED').slice(0, 3).map(b => (
                      <div 
                        key={b.id} 
                        onClick={() => handleOpenDetails(b.id)}
                        className="py-3 flex items-center justify-between hover:bg-slate-50/55 rounded-lg px-2 transition-all cursor-pointer"
                      >
                        <div className="space-y-0.5 truncate flex-1 pr-4">
                          <p className="font-bold text-slate-700 truncate">{b.title}</p>
                          <span className="text-[9px] text-slate-450 font-semibold">{b.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PriorityBadge priority={b.priority} />
                          <StatusBadge status={b.status} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400 italic py-3 text-center text-xs font-medium">
                      All caught up! No active bugs assigned to you.
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right: Activity Log feed & Milestones */}
            <div className="space-y-6">
              
              {/* Active Sprint Deadlines */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 select-none">
                  Upcoming Sprints
                </h3>
                <div className="space-y-3.5">
                  {sprints.filter(s => s.status === 'Active').map(s => {
                    const daysRemaining = Math.max(0, Math.ceil((new Date(s.endDate) - new Date()) / (1000 * 60 * 60 * 24)));
                    return (
                      <div key={s.id} className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">🏃 {s.name}</span>
                          <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full font-bold">Active</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500 font-medium">
                          <span>Ends {s.endDate}</span>
                          <span className="font-bold text-slate-750">{daysRemaining} days left</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent activity feeds */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 select-none">
                  Recent Activities
                </h3>
                
                <div className="space-y-4 max-h-[22rem] overflow-y-auto pr-1">
                  {activities.slice(0, 5).map(act => (
                    <div key={act.id} className="flex gap-2.5 items-start text-[11px] leading-relaxed">
                      <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[9px] flex items-center justify-center border border-slate-200 shrink-0 select-none">
                        {act.avatar}
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-slate-800">{act.user}</span>{' '}
                        <span className="text-slate-500">{act.action}</span>{' '}
                        <span className="font-bold text-primary">{act.target}</span>
                        <span className="text-[9px] text-slate-400 block font-semibold mt-0.5">
                          {new Date(act.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 2. PROJECTS VIEW */}
      {currentView === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Active Projects</h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Manage project groups and monitor progress metrics</p>
            </div>
            {isPM && (
              <button 
                onClick={() => setIsProjectModalOpen(true)}
                className="px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
              >
                Create Project
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => {
              const projBugs = bugs.filter(b => b.projectId === p.id);
              const closedCount = projBugs.filter(b => b.status === 'CLOSED' || b.status === 'RESOLVED').length;
              const openCount = projBugs.length - closedCount;
              const progressPct = projBugs.length > 0 ? Math.round((closedCount / projBugs.length) * 100) : 0;

              return (
                <div key={p.id} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-650 rounded text-[9px] font-bold tracking-wider uppercase border border-slate-200">
                        {p.key}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        p.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-800 tracking-tight leading-snug">{p.name}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed truncate-3-lines h-12 overflow-hidden">
                      {p.description || 'No description provided.'}
                    </p>
                  </div>

                  <div className="space-y-3.5 border-t border-slate-100 pt-4">
                    {/* Progress Bar */}
                    <div className="space-y-1.5 text-xs font-semibold text-slate-600">
                      <div className="flex justify-between">
                        <span>Resolution Progress</span>
                        <span>{progressPct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full transition-all duration-350" style={{ width: `${progressPct}%` }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 text-[10px] font-bold text-slate-500 uppercase tracking-wide gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                      <div>
                        <span className="block text-slate-400 mb-0.5">Open Bugs</span>
                        <span className="text-slate-800 text-xs font-extrabold">{openCount}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 mb-0.5">Total Bugs</span>
                        <span className="text-slate-800 text-xs font-extrabold">{projBugs.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* New Project Modal (PM ONLY) */}
          {isProjectModalOpen && (
            <ConfirmDialog
              isOpen={isProjectModalOpen}
              onClose={() => setIsProjectModalOpen(false)}
              onConfirm={() => {}} // custom handled via form below
              title="Create New Project"
              type="primary"
            >
              <form onSubmit={handleCreateProjectSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                    placeholder="e.g. Zylker CRM Integration"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none font-semibold text-slate-800"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Project Key *</label>
                    <input
                      type="text"
                      required
                      maxLength="5"
                      value={newProjKey}
                      onChange={(e) => setNewProjKey(e.target.value)}
                      placeholder="e.g. ZCRM"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Status</label>
                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700">
                      <option>Active</option>
                      <option>Planning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Description</label>
                  <textarea
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none font-medium text-slate-850"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </ConfirmDialog>
          )}
        </div>
      )}

      {/* 3. BUGS VIEW */}
      {currentView === 'bugs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Telemetry Defect Repository</h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">All logged bugs for the selected project workspace</p>
            </div>
            {/* Quick Create Bug is available on Navbar, but let's duplicate it here for convenience */}
            <button
              onClick={() => handleOpenBugForm()}
              className="px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Report Bug
            </button>
          </div>

          <DataTable
            columns={bugColumns}
            data={filteredBugs}
            searchPlaceholder="Search by ID, title, or description..."
            searchField="title"
            onRowClick={(row) => handleOpenDetails(row.id)}
            filterOptions={[
              {
                key: 'status',
                label: 'Status',
                options: [
                  { value: 'OPEN', label: 'Open' },
                  { value: 'ASSIGNED', label: 'Assigned' },
                  { value: 'IN_PROGRESS', label: 'In Progress' },
                  { value: 'TESTING', label: 'Testing' },
                  { value: 'RESOLVED', label: 'Resolved' },
                  { value: 'CLOSED', label: 'Closed' }
                ]
              },
              {
                key: 'priority',
                label: 'Priority',
                options: [
                  { value: 'CRITICAL', label: 'Critical' },
                  { value: 'HIGH', label: 'High' },
                  { value: 'MEDIUM', label: 'Medium' },
                  { value: 'LOW', label: 'Low' }
                ]
              },
              {
                key: 'severity',
                label: 'Severity',
                options: [
                  { value: 'CRITICAL', label: 'Critical' },
                  { value: 'MAJOR', label: 'Major' },
                  { value: 'MEDIUM', label: 'Medium' },
                  { value: 'MINOR', label: 'Minor' }
                ]
              }
            ]}
          />
        </div>
      )}

      {/* 4. MY BUGS VIEW */}
      {currentView === 'my-bugs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">My Active Bugs</h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Bugs currently assigned to your account</p>
            </div>
          </div>

          <DataTable
            columns={bugColumns}
            data={bugs.filter(b => b.assignee === user?.name)}
            searchPlaceholder="Search my bugs..."
            searchField="title"
            onRowClick={(row) => handleOpenDetails(row.id)}
            filterOptions={[
              {
                key: 'status',
                label: 'Status',
                options: [
                  { value: 'OPEN', label: 'Open' },
                  { value: 'ASSIGNED', label: 'Assigned' },
                  { value: 'IN_PROGRESS', label: 'In Progress' },
                  { value: 'TESTING', label: 'Testing' },
                  { value: 'RESOLVED', label: 'Resolved' },
                  { value: 'CLOSED', label: 'Closed' }
                ]
              },
              {
                key: 'priority',
                label: 'Priority',
                options: [
                  { value: 'CRITICAL', label: 'Critical' },
                  { value: 'HIGH', label: 'High' },
                  { value: 'MEDIUM', label: 'Medium' },
                  { value: 'LOW', label: 'Low' }
                ]
              }
            ]}
          />
        </div>
      )}

      {/* 5. SPRINT BOARD (KANBAN BOARD) */}
      {currentView === 'sprints' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 pb-2">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Interactive Sprint Board</h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Drag-and-drop bug cards to change ticket status in the active sprint</p>
            </div>

            {/* Sprint Selector */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Sprint:</span>
              <select
                value={selectedSprintId}
                onChange={(e) => setSelectedSprintId(e.target.value)}
                className="text-xs bg-transparent border-none outline-none font-bold text-slate-700 cursor-pointer pr-1"
              >
                <option value="">Select Board</option>
                {sprints.filter(s => activeProjectId === 'all' || s.projectId === activeProjectId).map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.status})</option>
                ))}
              </select>
            </div>
          </div>

          {selectedSprintId ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 items-start overflow-x-auto pb-4 select-none">
              {['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'TESTING', 'RESOLVED', 'CLOSED'].map(colStatus => {
                const columnBugs = bugs.filter(b => b.sprintId === selectedSprintId && b.status === colStatus);
                const colTitle = colStatus.replace('_', ' ');

                return (
                  <div 
                    key={colStatus}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, colStatus)}
                    className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-3 min-h-[30rem] flex flex-col justify-start"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <span className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">{colTitle}</span>
                      <span className="w-5 h-5 bg-white border border-slate-200 rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                        {columnBugs.length}
                      </span>
                    </div>

                    {/* Column Body Cards */}
                    <div className="space-y-2.5 flex-1 overflow-y-auto">
                      {columnBugs.map(b => (
                        <div
                          key={b.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, b.id)}
                          onClick={() => handleOpenDetails(b.id)}
                          className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-sm hover:shadow hover:border-slate-350 hover:-translate-y-0.5 cursor-grab active:cursor-grabbing transition-all space-y-3"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-slate-400">{b.id}</span>
                            <PriorityBadge priority={b.priority} />
                          </div>
                          
                          <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-relaxed" title={b.title}>
                            {b.title}
                          </p>

                          <div className="flex justify-between items-center pt-2 border-t border-slate-100/60 text-[9px] text-slate-450 font-bold">
                            <span className="truncate max-w-[80px]">👤 {b.assignee || 'Unassigned'}</span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-50 border border-slate-150">{b.severity}</span>
                          </div>
                        </div>
                      ))}

                      {columnBugs.length === 0 && (
                        <div className="text-[10px] text-slate-400 italic text-center py-10">
                          Drop tickets here
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState 
              title="No Active Sprint Board Selected" 
              description="Please select a sprint board from the selector at the top-right to display the Kanban lanes."
            />
          )}
        </div>
      )}

      {/* 6. TEAM VIEW */}
      {currentView === 'team' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Active Project Team</h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Monitor active workloads, member credentials and balance assignments</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => {
              const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
              
              // Determine workload indicators
              let workloadColor = 'bg-green-500';
              let workloadText = 'Low workload';
              if (member.workload >= 4) {
                workloadColor = 'bg-red-500';
                workloadText = 'Overloaded';
              } else if (member.workload >= 2) {
                workloadColor = 'bg-amber-500';
                workloadText = 'Balanced';
              }

              return (
                <div key={member.id} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                      {initials}
                    </div>
                    <div className="truncate">
                      <h3 className="font-extrabold text-xs text-slate-800 truncate leading-snug">{member.name}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">{member.role.replace('_', ' ')}</p>
                      <p className="text-[10px] text-slate-500 block truncate mt-0.5 font-medium">{member.email}</p>
                    </div>
                  </div>

                  <div className="space-y-3.5 border-t border-slate-100 pt-4 text-xs font-semibold">
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 select-none">Expertise</span>
                      <span className="text-slate-700 font-bold">{member.expertise || 'General Tech'}</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest select-none">Active Workload</span>
                        <span className="text-slate-700 font-extrabold">{member.workload} bugs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${workloadColor}`}></span>
                        <span className="text-[10px] text-slate-500 font-semibold">{workloadText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. REPORTS VIEW */}
      {currentView === 'reports' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Quality Assurance Reports</h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Analytical reports and resolution speed metrics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Resolution Efficiency summary */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 select-none">
                Resolution Efficiency
              </h3>
              
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="relative w-28 h-28 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-full shadow-inner mb-3">
                  <span className="text-2xl font-black text-primary">
                    {stats.total > 0 ? Math.round(((stats.resolved + stats.closed) / stats.total) * 100) : 0}%
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-700">Total Fix Rate</h4>
                <p className="text-[10px] text-slate-450 mt-1 max-w-[200px] leading-relaxed">Percentage of all bugs moved into resolved or closed categories</p>
              </div>
            </div>

            {/* Severity breakout report */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 select-none">
                Severity Breakouts
              </h3>
              
              <div className="space-y-3 font-semibold text-xs text-slate-650">
                {[
                  { label: 'Critical', count: filteredBugs.filter(b => b.severity === 'CRITICAL').length, color: 'bg-red-500' },
                  { label: 'Major', count: filteredBugs.filter(b => b.severity === 'MAJOR').length, color: 'bg-amber-500' },
                  { label: 'Medium', count: filteredBugs.filter(b => b.severity === 'MEDIUM').length, color: 'bg-blue-500' },
                  { label: 'Minor', count: filteredBugs.filter(b => b.severity === 'MINOR').length, color: 'bg-green-500' }
                ].map(s => {
                  const pct = stats.total > 0 ? Math.round((s.count / stats.total) * 100) : 0;
                  return (
                    <div key={s.label} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{s.label}</span>
                        <span>{s.count} issues ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className={`${s.color} h-full`} style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* General QA benchmarks */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 select-none">
                Quality Benchmarks
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-lg">
                  <span className="font-semibold text-slate-500">Average fix speed</span>
                  <span className="font-bold text-slate-800">1.8 Days</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-lg">
                  <span className="font-semibold text-slate-500">Reopen Rate</span>
                  <span className="font-bold text-slate-800">4.2%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-lg">
                  <span className="font-semibold text-slate-500">Total reported this week</span>
                  <span className="font-bold text-slate-800">18 Issues</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. NOTIFICATIONS VIEW */}
      {currentView === 'notifications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">System Notification Center</h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Read audit notifications and track workspace updates</p>
            </div>
            <button 
              onClick={clearNotifications}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 shadow-sm"
            >
              Clear All Notifications
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden divide-y divide-slate-150">
            {notifications.length > 0 ? (
              notifications.map(n => (
                <div key={n.id} className={`p-4 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${!n.read ? 'bg-green-50/20' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-base select-none">📢</span>
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-700 leading-normal">{n.text}</p>
                      <span className="text-[9px] text-slate-400 font-bold block">{n.time}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => clearSingleNotification(n.id)}
                    className="text-xs text-slate-350 hover:text-slate-650 px-2 py-1 font-bold"
                    title="Dismiss"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <div className="p-12">
                <EmptyState 
                  title="Your Inbox is Empty" 
                  description="You have no notifications or audit flags at this time."
                  icon="📭"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. SETTINGS VIEW */}
      {currentView === 'settings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Manage user credentials and role options</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6 max-w-2xl text-xs text-slate-700">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-150 pb-2 select-none uppercase tracking-wide">
              Corporate Credentials
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  disabled
                  value={user?.name || ''} 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Corporate Email</label>
                <input 
                  type="email" 
                  disabled
                  value={user?.email || ''} 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Authorized Active Role</label>
                <span className="inline-block px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg font-bold">
                  {user?.activeRole}
                </span>
              </div>
              {user?.expertise && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Account Expertise</label>
                  <span className="inline-block px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-bold">
                    {user.expertise}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-150 space-y-2 leading-relaxed text-slate-500 font-medium">
              <h4 className="font-bold text-slate-700">Role Authority Framework</h4>
              <p>Your current session token is configured for role: <strong>{user?.activeRole}</strong>. Use the avatar role-switcher dropdown in the top-right header toolbar to request authentication token swaps for other roles.</p>
            </div>
          </div>
        </div>
      )}

      {/* MODALS INJECTIONS */}
      {isBugFormOpen && (
        <BugFormModal
          isOpen={isBugFormOpen}
          onClose={() => { setIsBugFormOpen(false); setBugToEdit(null); }}
          onSubmit={handleBugSubmit}
          bugToEdit={bugToEdit}
        />
      )}

      {isBugDetailsOpen && selectedBugId && (
        <BugDetailsModal
          isOpen={isBugDetailsOpen}
          onClose={() => { setIsBugDetailsOpen(false); setSelectedBugId(null); }}
          bugId={selectedBugId}
        />
      )}

      {isDeleteConfirmOpen && bugToDeleteId && (
        <ConfirmDialog
          isOpen={isDeleteConfirmOpen}
          onClose={() => { setIsDeleteConfirmOpen(false); setBugToDeleteId(null); }}
          onConfirm={handleConfirmDelete}
          title="Delete Ticket"
          message={`Are you sure you want to delete defect report ${bugToDeleteId}? This action will wipe all associated timeline data and threaded discussion records.`}
          confirmText="Delete Ticket"
        />
      )}

    </AppLayout>
  );
};

export default DashboardContainer;
