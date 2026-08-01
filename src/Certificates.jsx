import React, { useState } from 'react';
import './Certificates.css';
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

const certificates = [
  { id: 'CERT-001', title: 'Barangay Clearance', resident: 'Maria Santos', issued: 'Aug 1, 2026', status: 'Ready' },
  { id: 'CERT-002', title: 'Certificate of Residency', resident: 'Juan dela Cruz', issued: 'Jul 29, 2026', status: 'Printed' },
  { id: 'CERT-003', title: 'Indigency Certificate', resident: 'Ana Reyes', issued: 'Jul 25, 2026', status: 'Ready' },
  { id: 'CERT-004', title: 'Business Clearance', resident: 'Roberto Lim', issued: 'Jul 24, 2026', status: 'Pending' },
];

const summaryCards = [
  { label: 'Issued This Week', value: '3', tone: 'success' },
  { label: 'Awaiting Pickup', value: '2', tone: 'warning' },
  { label: 'Printed', value: '18', tone: 'info' },
];

export default function Certificates({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Certificates');

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
            <h2 className="header-title">Certificates</h2>
            <p className="header-subtitle">Manage issued barangay certificates and records.</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <Search className="search-icon" />
              <input type="text" placeholder="Search certificates" />
            </div>
            <button type="button" className="action-button">
              <Plus className="search-icon" />
              Issue Certificate
            </button>
          </div>
        </header>

        <div className="content-area">
          <div className="hero-card">
            <div>
              <p className="eyebrow">CERTIFICATE TRACKER</p>
              <h3>3 certificates issued this week</h3>
              <p>Review recent records and verify document completeness.</p>
            </div>
            <div className="pill">Ready to print</div>
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
              <h4>Recent Certificates</h4>
              <button type="button" className="secondary-btn">Export</button>
            </div>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Certificate ID</th>
                  <th>Type</th>
                  <th>Resident</th>
                  <th>Date Issued</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.resident}</td>
                    <td>{item.issued}</td>
                    <td><span className={`status-pill ${item.status === 'Pending' ? 'status-pending' : item.status === 'Printed' ? 'status-complete' : 'status-ready'}`}>{item.status}</span></td>
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
