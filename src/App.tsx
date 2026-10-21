/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Toast } from './components/layout/Toast';
import { OverviewView } from './components/views/OverviewView';
import { TaskManagementView } from './components/views/TaskManagementView';
import { HcnsRoadmapView } from './components/views/HcnsRoadmapView';
import { EnglishRoadmapView } from './components/views/EnglishRoadmapView';
import { BusyModeView } from './components/views/BusyModeView';
import { ChineseRoadmapView } from './components/views/ChineseRoadmapView';
import { JournalReviewView } from './components/views/JournalReviewView';
import { SettingsBackupView } from './components/views/SettingsBackupView';
import { AddTaskModal } from './components/modals/AddTaskModal';
import { ReflectionModal } from './components/modals/ReflectionModal';
import { ArtifactPreviewModal } from './components/modals/ArtifactPreviewModal';
import { SubmitAssignmentModal } from './components/modals/SubmitAssignmentModal';
import { MentorDrawer } from './components/modals/MentorDrawer';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-on-surface antialiased">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Workspace with offset for left-64 rail */}
      <div className="pl-64 flex flex-col min-h-screen bg-surface">
        {/* Fixed Top Command Header */}
        <Header />

        {/* Content Viewport with strict pt-16 buffer */}
        <main className="relative pt-16 bg-surface flex-1 w-full px-space-lg py-space-lg">
          <div className="max-w-[1520px] mx-auto w-full">
            {currentView === 'overview' && <OverviewView />}
            {currentView === 'tasks' && <TaskManagementView />}
            {currentView === 'hcns' && <HcnsRoadmapView />}
            {currentView === 'english' && <EnglishRoadmapView />}
            {currentView === 'busy' && <BusyModeView />}
            {currentView === 'chinese' && <ChineseRoadmapView />}
            {currentView === 'journal' && <JournalReviewView />}
            {currentView === 'settings' && <SettingsBackupView />}
          </div>
        </main>
      </div>

      {/* Modals & Overlays */}
      <AddTaskModal />
      <ReflectionModal />
      <ArtifactPreviewModal />
      <SubmitAssignmentModal />
      <MentorDrawer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
