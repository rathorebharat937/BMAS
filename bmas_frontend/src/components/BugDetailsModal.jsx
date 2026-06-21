import React, { useState } from 'react';
import Modal from './Modal';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { useData } from '../context/DataContext';
import { useAuth } from '../hooks/useAuth';

export const BugDetailsModal = ({ isOpen, onClose, bugId }) => {
  const { user } = useAuth();
  const { 
    bugs, 
    projects, 
    team, 
    sprints, 
    updateBug, 
    addComment, 
    deleteComment, 
    updateComment,
    activities 
  } = useData();

  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  
  // Attachment upload simulation
  const [newAttachmentName, setNewAttachmentName] = useState('');

  const bug = bugs.find(b => b.id === bugId);
  if (!bug) return null;

  const project = projects.find(p => p.id === bug.projectId) || { name: 'Unknown Project' };
  const bugActivities = activities.filter(a => a.bugId === bug.id);

  // Role permissions checking
  const isPM = user?.activeRole === 'PROJECT_MANAGER';
  const isDev = user?.activeRole === 'DEVELOPER';
  const isTester = user?.activeRole === 'TESTER';

  // State update handlers
  const handleStatusChange = (newStatus) => {
    updateBug(bug.id, { status: newStatus });
  };

  const handleAssigneeChange = (newAssignee) => {
    updateBug(bug.id, { assignee: newAssignee });
  };

  const handlePriorityChange = (newPriority) => {
    updateBug(bug.id, { priority: newPriority });
  };

  const handleSeverityChange = (newSeverity) => {
    updateBug(bug.id, { severity: newSeverity });
  };

  // Comments handlers
  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(bug.id, commentText);
    setCommentText('');
  };

  const handleStartEditComment = (c) => {
    setEditingCommentId(c.id);
    setEditingCommentText(c.text);
  };

  const handleSaveEditComment = () => {
    if (!editingCommentText.trim()) return;
    updateComment(bug.id, editingCommentId, editingCommentText);
    setEditingCommentId(null);
    setEditingCommentText('');
  };

  const handleAddAttachment = (e) => {
    e.preventDefault();
    if (!newAttachmentName.trim()) return;
    const currentAttach = bug.attachments || [];
    updateBug(bug.id, { attachments: [...currentAttach, newAttachmentName.trim()] });
    setNewAttachmentName('');
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Bug Details: ${bug.id}`} size="large">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs text-slate-700">
        
        {/* Left Section (2 columns on large screen): Bug details & Comments */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Title & Core Meta */}
          <div className="space-y-1.5 pb-4 border-b border-slate-150">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-400 select-none">📁 {project.name}</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-450">{bug.id}</span>
            </div>
            <h2 className="text-base font-extrabold text-slate-800 tracking-tight leading-snug">
              {bug.title}
            </h2>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Description</span>
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl leading-relaxed text-slate-700 font-medium">
              {bug.description || <span className="italic text-slate-400">No description provided.</span>}
            </div>
          </div>

          {/* Reproduction Steps */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Reproduction Steps</span>
            <div className="p-4 bg-slate-900 text-slate-200 font-mono text-[10px] rounded-xl leading-relaxed whitespace-pre-wrap">
              {bug.reproductionSteps || <span className="italic text-slate-500">No reproduction steps logged.</span>}
            </div>
          </div>

          {/* Attachments Section */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Attachments</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {bug.attachments && bug.attachments.length > 0 ? (
                bug.attachments.map((file, idx) => (
                  <div key={idx} className="p-2 border border-slate-200 bg-white rounded-lg flex items-center justify-between gap-2 shadow-sm truncate">
                    <span className="truncate font-semibold text-slate-650" title={file}>📎 {file}</span>
                    <button 
                      onClick={() => {
                        const updated = bug.attachments.filter((_, i) => i !== idx);
                        updateBug(bug.id, { attachments: updated });
                      }}
                      className="text-[10px] text-red-500 hover:text-red-700 font-bold px-1"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-slate-450 italic py-1">No attachments loaded.</div>
              )}
            </div>
            {/* Attachment Sim Add Form */}
            <form onSubmit={handleAddAttachment} className="flex gap-2 max-w-xs">
              <input
                type="text"
                value={newAttachmentName}
                onChange={(e) => setNewAttachmentName(e.target.value)}
                placeholder="mock-screenshot.png"
                className="flex-1 px-2 py-1.5 border border-slate-200 rounded-lg text-xs outline-none focus:border-primary placeholder:text-slate-400 bg-white"
              />
              <button 
                type="submit" 
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg font-bold"
              >
                Upload
              </button>
            </form>
          </div>

          {/* Comments Section */}
          <div className="space-y-4 pt-4 border-t border-slate-150">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">
              Discussion ({bug.comments ? bug.comments.length : 0})
            </span>

            {/* Comments Thread */}
            <div className="space-y-4 divide-y divide-slate-100 max-h-80 overflow-y-auto pr-2">
              {bug.comments && bug.comments.length > 0 ? (
                bug.comments.map(c => {
                  const isAuthor = c.author === user?.name;
                  const isEditing = editingCommentId === c.id;

                  return (
                    <div key={c.id} className="pt-4 flex gap-3 group">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center border border-slate-200 shrink-0 select-none">
                        {c.avatar || 'U'}
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">{c.author}</span>
                            <span className="text-[9px] text-slate-400 font-bold">{formatDate(c.timestamp)}</span>
                          </div>
                          
                          {/* Edit / Delete Options */}
                          {isAuthor && !isEditing && (
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleStartEditComment(c)}
                                className="text-[10px] text-primary hover:underline font-bold"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => deleteComment(bug.id, c.id)}
                                className="text-[10px] text-red-500 hover:underline font-bold"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>

                        {isEditing ? (
                          <div className="space-y-2 mt-1">
                            <textarea
                              value={editingCommentText}
                              onChange={(e) => setEditingCommentText(e.target.value)}
                              rows={2}
                              className="w-full p-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-primary bg-white font-medium"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={handleSaveEditComment}
                                className="px-2.5 py-1 bg-primary text-white font-bold rounded"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingCommentId(null)}
                                className="px-2.5 py-1 bg-slate-100 text-slate-650 rounded border border-slate-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-slate-650 font-medium leading-relaxed break-words">{c.text}</p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-slate-400 italic py-2">No comments have been posted yet. Start the discussion!</div>
              )}
            </div>

            {/* Write a comment */}
            <form onSubmit={handlePostComment} className="flex gap-2.5 items-start mt-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-[10px] flex items-center justify-center shrink-0 select-none">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
              </div>
              <div className="flex-1 space-y-2">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Post an update or reply..."
                  rows={2}
                  required
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs outline-none focus:border-primary bg-white font-medium placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-sm hover:shadow"
                >
                  Comment
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right Section (1 column): State values & Timeline */}
        <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-6">
          <h3 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-2 select-none uppercase tracking-wider">
            Ticket Properties
          </h3>

          {/* Status Select */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest">Status</label>
            <select
              value={bug.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:border-primary cursor-pointer shadow-sm"
            >
              <option value="OPEN">Open</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="TESTING">Testing</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* Assignee Select */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest">Assignee</label>
            <select
              value={bug.assignee || ''}
              onChange={(e) => handleAssigneeChange(e.target.value)}
              disabled={isTester}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:border-primary cursor-pointer disabled:opacity-60 shadow-sm"
            >
              <option value="">Unassigned</option>
              {team.map(member => (
                <option key={member.id} value={member.name}>👤 {member.name}</option>
              ))}
            </select>
          </div>

          {/* Priority Select */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest">Priority</label>
            <select
              value={bug.priority}
              onChange={(e) => handlePriorityChange(e.target.value)}
              disabled={isTester || isDev}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:border-primary cursor-pointer disabled:opacity-60 shadow-sm"
            >
              <option value="CRITICAL">🔴 Critical</option>
              <option value="HIGH">🟠 High</option>
              <option value="MEDIUM">🔵 Medium</option>
              <option value="LOW">⚪ Low</option>
            </select>
          </div>

          {/* Severity Select */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest">Severity</label>
            <select
              value={bug.severity}
              onChange={(e) => handleSeverityChange(e.target.value)}
              disabled={isTester || isDev}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:border-primary cursor-pointer disabled:opacity-60 shadow-sm"
            >
              <option value="CRITICAL">🚨 Critical</option>
              <option value="MAJOR">⚠️ Major</option>
              <option value="MEDIUM">⚡ Medium</option>
              <option value="MINOR">✨ Minor</option>
            </select>
          </div>

          {/* Milestone / Sprint Board */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest">Sprint Board</label>
            <div className="p-2 border border-slate-200 bg-white rounded-lg shadow-sm font-semibold text-slate-700">
              {bug.sprintId ? (
                <span>🏃 {sprints.find(s => s.id === bug.sprintId)?.name || 'Sprint Details'}</span>
              ) : (
                <span className="text-slate-400 italic font-medium">Not active in any sprint</span>
              )}
            </div>
          </div>

          {/* Created Date */}
          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest">Reporter</span>
            <span className="block font-bold text-slate-750">🗣️ {bug.reporter}</span>
          </div>

          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest">Created Date</span>
            <span className="block font-bold text-slate-500">{formatDate(bug.createdDate)}</span>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-3 pt-4 border-t border-slate-200/80">
            <span className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest select-none">
              Activity History
            </span>
            <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
              {bugActivities.length > 0 ? (
                bugActivities.map(a => (
                  <div key={a.id} className="text-[10px] leading-relaxed">
                    <span className="font-bold text-slate-800">{a.user}</span>{' '}
                    <span className="text-slate-500">{a.action}</span>{' '}
                    <span className="font-bold text-slate-700">{a.target}</span>
                  </div>
                ))
              ) : (
                <span className="text-slate-400 italic block text-[10px]">No activity history logged.</span>
              )}
            </div>
          </div>

        </div>

      </div>
    </Modal>
  );
};

export default BugDetailsModal;
