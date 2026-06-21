import React from 'react';
import Modal from './Modal';

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title = 'Confirm Action', message = 'Are you sure you want to perform this action? This cannot be undone.', confirmText = 'Confirm', type = 'danger' }) => {
  const btnColor = type === 'danger' 
    ? 'bg-danger hover:bg-red-600 focus:ring-red-500' 
    : 'bg-primary hover:bg-primary-hover focus:ring-green-500';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
      <div className="space-y-4">
        <p className="text-sm text-slate-500 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-650 text-xs font-semibold rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white text-xs font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${btnColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
