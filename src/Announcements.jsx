import React, { useState } from 'react';
import './Announcements.css';
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

const announcements = [
  { title: 'Barangay Cleanup Drive', date: 'Aug 5, 2026', priority: 'High' },
  { title: 'Senior Citizen Benefits Seminar', date: 'Aug 8, 2026', priority: 'Medium' },
  { title: 'Health Check Day', date: 'Aug 12, 2026', priority: 'Low' },
];

const summaryCards = [
  { label: 'Scheduled', value: '3', tone: 'info' },
  { label: 'High Priority', value: '1', tone: 'warning' },
  { label: 'Residents Reach', value: '1.2K', tone: 'success' },
];

export default function Announcements({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Announcements');

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
            <h2 className="header-title">Announcements</h2>
            <p className="header-subtitle">Post and monitor barangay announcements.</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <Search className="search-icon" />
              <input type="text" placeholder="Search announcements" />
            </div>
            <button type="button" className="action-button">
              <Plus className="search-icon" />
              New Post
            </button>
          </div>
        </header>

        <div className="content-area">
          <div className="hero-card">
            <div>
              <p className="eyebrow">PUBLIC NOTICE</p>
              <h3>2 announcements scheduled</h3>
              <p>Keep residents informed about upcoming activities and advisories.</p>
            </div>
            <div className="pill">Live updates</div>
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
              <h4>Upcoming Posts</h4>
              <button type="button" className="secondary-btn">Manage</button>
            </div>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>{item.priority}</td>
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
