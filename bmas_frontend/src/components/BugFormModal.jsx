import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useData } from '../context/DataContext';

export const BugFormModal = ({ isOpen, onClose, onSubmit, bugToEdit = null }) => {
  const { projects, team, sprints } = useData();

  const [projectId, setProjectId] = useState('proj-1');
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState('MAJOR');
  const [priority, setPriority] = useState('MEDIUM');
  const [status, setStatus] = useState('OPEN');
  const [assignee, setAssignee] = useState('');
  const [description, setDescription] = useState('');
  const [reproductionSteps, setReproductionSteps] = useState('');
  const [sprintId, setSprintId] = useState('');

  // Load values when editing
  useEffect(() => {
    if (bugToEdit) {
      setProjectId(bugToEdit.projectId || 'proj-1');
      setTitle(bugToEdit.title || '');
      setSeverity(bugToEdit.severity || 'MAJOR');
      setPriority(bugToEdit.priority || 'MEDIUM');
      setStatus(bugToEdit.status || 'OPEN');
      setAssignee(bugToEdit.assignee || '');
      setDescription(bugToEdit.description || '');
      setReproductionSteps(bugToEdit.reproductionSteps || '');
      setSprintId(bugToEdit.sprintId || '');
    } else {
      // Set defaults for new bug
      setProjectId(projects[0]?.id || 'proj-1');
      setTitle('');
      setSeverity('MAJOR');
      setPriority('MEDIUM');
      setStatus('OPEN');
      setAssignee('');
      setDescription('');
      setReproductionSteps('');
      setSprintId('');
    }
  }, [bugToEdit, isOpen, projects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const data = {
      projectId,
      title,
      severity,
      priority,
      status,
      assignee,
      description,
      reproductionSteps,
      sprintId: sprintId || null
    };

    onSubmit(data);
    onClose();
  };

  const projectSprints = sprints.filter(s => s.projectId === projectId);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={bugToEdit ? `Edit Bug Report: ${bugToEdit.id}` : 'Report New Bug'}
      size="large"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Project Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Project *</label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              disabled={!!bugToEdit}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none font-semibold focus:border-primary disabled:opacity-60"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Sprint Board</label>
            <select
              value={sprintId}
              onChange={(e) => setSprintId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none font-semibold focus:border-primary"
            >
              <option value="">No Active Sprint</option>
              {projectSprints.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.status})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bug Title */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Bug Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Session token is deleted on tab refresh"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none font-semibold focus:border-primary"
          />
        </div>

        {/* Severity, Priority, Status, Assignee */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Severity *</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none font-semibold focus:border-primary"
            >
              <option value="CRITICAL">🚨 Critical</option>
              <option value="MAJOR">⚠️ Major</option>
              <option value="MEDIUM">⚡ Medium</option>
              <option value="MINOR">✨ Minor</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Priority *</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none font-semibold focus:border-primary"
            >
              <option value="CRITICAL">🔴 Critical</option>
              <option value="HIGH">🟠 High</option>
              <option value="MEDIUM">🔵 Medium</option>
              <option value="LOW">⚪ Low</option>
            </select>
          </div>

          {bugToEdit && (
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none font-semibold focus:border-primary"
              >
                <option value="OPEN">Open</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="TESTING">Testing</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Assignee</label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none font-semibold focus:border-primary"
            >
              <option value="">Unassigned</option>
              {team.map(member => (
                <option key={member.id} value={member.name}>👤 {member.name} ({member.role})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bug Description */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Detailed description of the issue..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 outline-none font-medium focus:border-primary"
          />
        </div>

        {/* Reproduction Steps */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Reproduction Steps</label>
          <textarea
            value={reproductionSteps}
            onChange={(e) => setReproductionSteps(e.target.value)}
            rows={3}
            placeholder="1. Navigate to...\n2. Click...\n3. Observe..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-850 outline-none font-mono text-[10px] focus:border-primary"
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-sm hover:shadow transition-all"
          >
            {bugToEdit ? 'Save Changes' : 'Report Bug'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BugFormModal;
