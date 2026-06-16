import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = false,
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="card-base w-full max-w-md flex flex-col overflow-hidden shadow-2xl border border-border/80 bg-[#0c1017] rounded-xl my-8 transform transition-all animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header & Content */}
        <div className="flex items-start gap-4 p-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
            isDanger ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
          }`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-[#141923] border-t border-border/40">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-border/80 bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-xs font-bold rounded-lg text-white flex items-center gap-1.5 transition-all shadow-lg shadow-red-950/20 disabled:opacity-50 ${
              isDanger
                ? 'bg-red-600 hover:bg-red-500 active:bg-red-700'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
