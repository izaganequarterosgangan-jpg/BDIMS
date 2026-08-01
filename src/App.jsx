import React, { useState } from 'react';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import ResidentDashboard from './ResidentDashboard.jsx';
import Documents from './Documents.jsx';
import Certificates from './Certificates.jsx';
import Blotter from './Blotter.jsx';
import Announcements from './Announcements.jsx';
import Reports from './Reports.jsx';
import SettingsPage from './Settings.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('login');

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleShowDashboard = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'residents') {
    return <ResidentDashboard onBackToDashboard={handleShowDashboard} onNavigateTo={handleNavigate} onLogout={handleLogout} />;
  }

  if (currentView === 'documents') {
    return <Documents onNavigateTo={handleNavigate} onLogout={handleLogout} />;
  }

  if (currentView === 'certificates') {
    return <Certificates onNavigateTo={handleNavigate} onLogout={handleLogout} />;
  }

  if (currentView === 'blotter') {
    return <Blotter onNavigateTo={handleNavigate} onLogout={handleLogout} />;
  }

  if (currentView === 'announcements') {
    return <Announcements onNavigateTo={handleNavigate} onLogout={handleLogout} />;
  }

  if (currentView === 'reports') {
    return <Reports onNavigateTo={handleNavigate} onLogout={handleLogout} />;
  }

  if (currentView === 'settings') {
    return <SettingsPage onNavigateTo={handleNavigate} onLogout={handleLogout} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard onNavigateResidents={() => handleNavigate('residents')} onNavigateTo={handleNavigate} onLogout={handleLogout} />;
  }

  return <Login onLogin={handleLogin} />;
}