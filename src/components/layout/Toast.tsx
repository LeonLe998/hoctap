import React from 'react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-on-surface text-surface shadow-xl border border-surface-container-highest/30 font-body-sm text-body-sm">
        <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">info</span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
