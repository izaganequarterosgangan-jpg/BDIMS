import React, { useState } from 'react';
import './Dashboard.css';
import logo from './assets/Logo.png';
import TopHeader from './components/TopHeader.jsx';
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
  Plus,
  FileCheck,
  UserPlus,
  FileSpreadsheet,
  Volume2
} from 'lucide-react';

const initialRequests = [
  { id: 'REQ-2024-0891', resident: 'Maria Santos', avatar: 'MS', type: 'Barangay Clearance', date: 'Jul 28, 2024', status: 'Pending' },
  { id: 'REQ-2024-0890', resident: 'Juan dela Cruz', avatar: 'JD', type: 'Certificate of Residency', date: 'Jul 28, 2024', status: 'Processing' },
  { id: 'REQ-2024-0889', resident: 'Ana Reyes', avatar: 'AR', type: 'Barangay Indigency', date: 'Jul 27, 2024', status: 'Ready' },
  { id: 'REQ-2024-0888', resident: 'Roberto Lim', avatar: 'RL', type: 'Business Clearance', date: 'Jul 27, 2024', status: 'Released' },
];

export default function Dashboard({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [requests] = useState(initialRequests);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, target: 'dashboard' },
    { name: 'Residents', icon: Users, target: 'residents' },
    { name: 'Documents', icon: FileText, target: 'documents', badge: 34 },
    { name: 'Certificates', icon: Award, target: 'certificates' },
    { name: 'Blotter', icon: ShieldAlert, target: 'blotter', badge: 7 },
    { name: 'Announcements', icon: Megaphone, target: 'announcements' },
    { name: 'Reports', icon: BarChart3, target: 'reports' },
    { name: 'Settings', icon: Settings, target: 'settings' },
  ];

  const filteredRequests = requests.filter(
    (req) =>
      req.resident.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-logo-container">
            <div className="logo-badge">
              <img src={logo} alt="BIDMS logo" onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
            <div>
              <h1 className="brand-title">BIDMS</h1>
              <p className="brand-subtitle">Barangay Governor Boyles<br />Ubay, Bohol System</p>
            </div>
          </div>

          <div className="nav-menu">
            <p className="menu-section-title">MAIN MENU</p>
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
                    {item.badge && (
                      <span className={`badge-pill ${item.name === 'Documents' ? 'badge-gold' : 'badge-amber-dark'}`}>
                        {item.badge}
                      </span>
                    )}
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

      {/* MAIN WRAPPER */}
      <div className="main-wrapper">
        {/* TOP HEADER */}
        <TopHeader
          title="Dashboard"
          subtitle="Tuesday, July 30, 2024 · Barangay San Isidro, Quezon City"
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* CONTENT AREA */}
        <main className="content-area">
          {/* HERO GREETING CARD */}
          <div className="hero-card">
            <div>
              <p className="hero-eyebrow">GOOD MORNING</p>
              <h3>34 document requests need your attention today.</h3>
            </div>
            <div className="hero-actions">
              <button type="button" className="primary-btn" onClick={() => onNavigateTo?.('documents')}>
                <Plus size={16} /> New Request
              </button>
              <button type="button" className="secondary-btn" onClick={() => onNavigateTo?.('documents')}>
                View Pending
              </button>
            </div>
          </div>

          {/* STATS GRID */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon blue"><Users size={20} color="#2563eb" /></div>
              </div>
              <div className="stat-value">12,847</div>
              <div className="stat-label">Total Residents</div>
              <div className="stat-trend positive">+14 this month</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon amber"><FileText size={20} color="#d97706" /></div>
              </div>
              <div className="stat-value">34</div>
              <div className="stat-label">Pending Requests</div>
              <div className="stat-trend warning">6 urgent</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon teal"><Award size={20} color="#0d9488" /></div>
              </div>
              <div className="stat-value">218</div>
              <div className="stat-label">Certificates Issued</div>
              <div className="stat-trend positive">+23% vs last month</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon purple"><ShieldAlert size={20} color="#9333ea" /></div>
              </div>
              <div className="stat-value">7</div>
              <div className="stat-label">Blotter Cases</div>
              <div className="stat-trend purple">2 active, 5 resolved</div>
            </div>
          </div>

          {/* MAIN DASHBOARD GRID */}
          <div className="dashboard-grid">
            {/* RECENT REQUESTS TABLE */}
            <div className="panel-card">
              <div className="panel-header">
                <div>
                  <h3>Recent Document Requests</h3>
                  <p>Showing latest requests from the queue.</p>
                </div>
                <button type="button" className="text-btn" onClick={() => onNavigateTo?.('documents')}>
                  View All
                </button>
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Resident</th>
                      <th>Document Type</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((req) => (
                      <tr key={req.id}>
                        <td className="req-id">{req.id}</td>
                        <td>
                          <div className="resident-cell">
                            <span className="table-avatar">{req.avatar}</span>
                            <span>{req.resident}</span>
                          </div>
                        </td>
                        <td>{req.type}</td>
                        <td>{req.date}</td>
                        <td>
                          <span
                            className={`status-pill status-${req.status.toLowerCase()}`}
                          >
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* QUICK ACTIONS SIDE PANEL */}
            <div className="panel-card actions-panel">
              <div className="panel-header">
                <div>
                  <h3>Quick Actions</h3>
                  <p>Common tasks for daily operations.</p>
                </div>
              </div>

              <div className="action-list">
                <button type="button" className="action-btn" onClick={() => onNavigateTo?.('certificates')}>
                  <div className="action-icon"><FileCheck size={18} color="#2563eb" /></div>
                  <span>Issue Barangay Clearance</span>
                </button>

                <button type="button" className="action-btn" onClick={() => onNavigateTo?.('residents')}>
                  <div className="action-icon"><UserPlus size={18} color="#2563eb" /></div>
                  <span>Register New Resident</span>
                </button>

                <button type="button" className="action-btn" onClick={() => onNavigateTo?.('blotter')}>
                  <div className="action-icon"><FileSpreadsheet size={18} color="#2563eb" /></div>
                  <span>File Blotter Report</span>
                </button>

                <button type="button" className="action-btn" onClick={() => onNavigateTo?.('announcements')}>
                  <div className="action-icon"><Volume2 size={18} color="#2563eb" /></div>
                  <span>Post Announcement</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}