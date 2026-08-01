import React, { useState } from 'react';
import './Reports.css';
import {
  LayoutDashboard,
  Users,
  FileText,
  Award,
  ShieldAlert,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Plus,
} from 'lucide-react';

const reports = [
  { title: 'Monthly Summary', date: 'Aug 1, 2026', status: 'Prepared' },
  { title: 'Residents Growth Report', date: 'Jul 30, 2026', status: 'Pending Review' },
  { title: 'Document Processing Report', date: 'Jul 28, 2026', status: 'Ready' },
];

const summaryCards = [
  { label: 'Prepared', value: '8', tone: 'success' },
  { label: 'Pending', value: '2', tone: 'warning' },
  { label: 'Exported', value: '14', tone: 'info' },
];

export default function Reports({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Reports');

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, target: 'dashboard' },
    { name: 'Residents', icon: Users, target: 'residents' },
    { name: 'Documents', icon: FileText, target: 'documents' },
    { name: 'Certificates', icon: Award, target: 'certificates' },
    { name: 'Blotter', icon: ShieldAlert, target: 'blotter' },
    { name: 'Announcements', icon: Megaphone, target: 'announcements' },
    { name: 'Reports', icon: BarChart3, target: 'reports' },
    { name: 'Settings', icon: Settings, target: 'settings' },
  ];

  return (
    <div className="page-shell">
      <aside className="sidebar">
        <div>
          <div className="sidebar-logo-container">
            <div className="logo-badge">☀️</div>
            <div>
              <h1 className="brand-title">BIDMS</h1>
              <p className="brand-subtitle">Barangay System</p>
            </div>
          </div>

          <div className="nav-menu">
            <p className="menu-section-title">Main Menu</p>
            <nav className="nav-list">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.name);
                      onNavigateTo?.(item.target);
                    }}
                    className={`nav-button ${isActive ? 'active' : ''}`}
                  >
                    <div className="nav-button-left">
                      <Icon className="nav-icon" />
                      <span>{item.name}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="user-profile">
            <div className="avatar-gold">JC</div>
            <div>
              <p className="user-name">Juan Cruz</p>
              <p className="user-role">Barangay Secretary</p>
            </div>
          </div>
          <button type="button" className="logout-button" onClick={() => onLogout?.()} title="Log Out">
            <LogOut className="nav-icon" />
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div>
            <h2 className="header-title">Reports</h2>
            <p className="header-subtitle">Review summaries and performance insights.</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <Search className="search-icon" />
              <input type="text" placeholder="Search reports" />
            </div>
            <button type="button" className="action-button">
              <Plus className="search-icon" />
              Generate
            </button>
          </div>
        </header>

        <div className="content-area">
          <div className="hero-card">
            <div>
              <p className="eyebrow">REPORT CENTER</p>
              <h3>2 reports available</h3>
              <p>Generate and review essential barangay summaries.</p>
            </div>
            <div className="pill">Fresh data</div>
          </div>

          <div className="stats-row">
            {summaryCards.map((item) => (
              <div key={item.label} className={`mini-card ${item.tone}`}>
                <span className="mini-label">{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="table-card">
            <div className="table-header">
              <h4>Recent Reports</h4>
              <button type="button" className="secondary-btn">Export</button>
            </div>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Report</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
