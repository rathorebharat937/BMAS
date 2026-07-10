import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import projectService from '../services/projectService';

const AddMemberModal = ({ isOpen, onClose, projectId, existingMemberIds = [], onMemberAdded }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [addingId, setAddingId] = useState(null);
  const [error, setError] = useState('');
  const debounceRef = useRef(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setError('');
      setAddingId(null);
    }
  }, [isOpen]);

  // Debounced search with unmount guard
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    let cancelled = false;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const data = await projectService.searchUsers(query.trim());
        if (!cancelled) setResults(data);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleAdd = async (userId) => {
    setAddingId(userId);
    setError('');
    try {
      await projectService.addMember(projectId, userId);
      onMemberAdded(userId);
      setResults((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add member.';
      setError(msg);
    } finally {
      setAddingId(null);
    }
  };

  const handleClose = () => {
    setQuery('');
    setResults([]);
    setError('');
    onClose();
  };

  const getRoleLabel = (role) => {
    if (!role) return '';
    if (role === 'PROJECT_MANAGER') return 'PM';
    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Team Member" size="small">
      <div className="space-y-4">
        {error && (
          <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* Search Input */}
        <div className="relative">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Search by name or email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a name or email..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition-all"
              autoFocus
            />
            {searching && (
              <span className="absolute inset-y-0 right-3 flex items-center">
                <span className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              </span>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="min-h-[6rem] max-h-64 overflow-y-auto divide-y divide-slate-100 border border-slate-100 rounded-lg">
          {!query.trim() && (
            <div className="flex items-center justify-center h-24 text-xs text-slate-400 font-medium">
              Start typing to search users
            </div>
          )}

          {query.trim() && !searching && results.length === 0 && (
            <div className="flex items-center justify-center h-24 text-xs text-slate-400 font-medium">
              No users found for "{query}"
            </div>
          )}

          {results.map((user) => {
            const isAlreadyMember = existingMemberIds.includes(user.id);
            const isAdding = addingId === user.id;

            return (
              <div
                key={user.id}
                className="flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {user.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  {user.activeRole && (
                    <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                      {getRoleLabel(user.activeRole)}
                    </span>
                  )}
                  {isAlreadyMember ? (
                    <span className="text-[10px] font-bold text-slate-400 px-2 py-1">Already added</span>
                  ) : (
                    <button
                      onClick={() => handleAdd(user.id)}
                      disabled={isAdding}
                      className="px-2.5 py-1 text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      {isAdding && (
                        <span className="w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                      {isAdding ? 'Adding...' : '+ Add'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddMemberModal;
