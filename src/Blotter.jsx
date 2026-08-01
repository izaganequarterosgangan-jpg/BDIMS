import React, { useState } from 'react';
import './Blotter.css';
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

const blotterCases = [
  { id: 'BLT-001', title: 'Noise Complaint', resident: 'Roberto Lim', date: 'Aug 2, 2026', status: 'Open' },
  { id: 'BLT-002', title: 'Property Dispute', resident: 'Carmen Villanueva', date: 'Aug 1, 2026', status: 'Under Review' },
  { id: 'BLT-003', title: 'Animal Disturbance', resident: 'Eduardo Flores', date: 'Jul 31, 2026', status: 'Resolved' },
];

const summaryCards = [
  { label: 'Open Cases', value: '3', tone: 'warning' },
  { label: 'Resolved', value: '5', tone: 'success' },
  { label: 'Pending Review', value: '2', tone: 'info' },
];

export default function Blotter({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Blotter');

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
            <h2 className="header-title">Blotter</h2>
            <p className="header-subtitle">Manage blotter incidents and case updates.</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <Search className="search-icon" />
              <input type="text" placeholder="Search cases" />
            </div>
            <button type="button" className="action-button">
              <Plus className="search-icon" />
              Add Case
            </button>
          </div>
        </header>

        <div className="content-area">
          <div className="hero-card">
            <div>
              <p className="eyebrow">CASE MONITOR</p>
              <h3>2 cases need attention</h3>
              <p>Keep track of open incidents and recent updates.</p>
            </div>
            <div className="pill">High priority</div>
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
              <h4>Recent Blotter Cases</h4>
              <button type="button" className="secondary-btn">Review</button>
            </div>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Incident</th>
                  <th>Resident</th>
                  <th>Date Filed</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {blotterCases.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.resident}</td>
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
