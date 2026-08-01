import React, { useState } from 'react';
import './Dashboard.css';
import logo from './assets/Logo.png';
import Modal from './components/Modal.jsx';
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
  Bell,
  Plus,
} from 'lucide-react';

const tableData = [
  { id: 'REQ-2024-0891', name: 'Maria Santos', avatar: 'MS', type: 'Barangay Clearance', date: 'Jul 28, 2024', status: 'Pending', statusClass: 'status-pending' },
  { id: 'REQ-2024-0890', name: 'Juan dela Cruz', avatar: 'JD', type: 'Certificate of Residency', date: 'Jul 28, 2024', status: 'Processing', statusClass: 'status-processing' },
  { id: 'REQ-2024-0889', name: 'Ana Reyes', avatar: 'AR', type: 'Barangay Indigency', date: 'Jul 27, 2024', status: 'Ready', statusClass: 'status-ready' },
  { id: 'REQ-2024-0888', name: 'Roberto Lim', avatar: 'RL', type: 'Business Clearance', date: 'Jul 27, 2024', status: 'Released', statusClass: 'status-released' },
];

const quickActions = [
  { label: 'Issue Barangay Clearance', target: 'documents', icon: '📄' },
  { label: 'Register New Resident', target: 'residents', icon: '👤' },
  { label: 'File Blotter Report', target: 'blotter', icon: '📝' },
  { label: 'Post Announcement', target: 'announcements', icon: '📢' },
];

export default function Dashboard({ onLogout, onNavigateResidents, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchValue, setSearchValue] = useState('');
  const [requests, setRequests] = useState(tableData);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState(null);
  const [requestForm, setRequestForm] = useState({ residentName: 'Maria Santos', documentType: 'Barangay Clearance', purpose: 'For school requirement' });

  const handleNavigate = (name, target) => {
    setActiveTab(name);
    if (name === 'Residents') {
      onNavigateResidents?.();
    } else if (target) {
      onNavigateTo?.(target);
    }
  };

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalBody(content);
    setModalOpen(true);
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const newRequest = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      name: requestForm.residentName || 'New Resident',
      avatar: requestForm.residentName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
      type: requestForm.documentType || 'Barangay Clearance',
      date: 'Just now',
      status: 'Pending',
      statusClass: 'status-pending',
    };
    setRequests((prev) => [newRequest, ...prev]);
    setModalOpen(false);
  };

  const handleQuickAction = (action) => {
    if (action.target === 'residents') {
      onNavigateResidents?.();
      return;
    }

    if (action.label === 'Issue Barangay Clearance') {
      openModal('New Document Request', <form onSubmit={handleCreateRequest} style={{ display: 'grid', gap: '10px' }}><label>Resident Name<input value={requestForm.residentName} onChange={(e) => setRequestForm((prev) => ({ ...prev, residentName: e.target.value }))} style={modalInputStyle} /></label><label>Document Type<input value={requestForm.documentType} onChange={(e) => setRequestForm((prev) => ({ ...prev, documentType: e.target.value }))} style={modalInputStyle} /></label><label>Purpose<input value={requestForm.purpose} onChange={(e) => setRequestForm((prev) => ({ ...prev, purpose: e.target.value }))} style={modalInputStyle} /></label><button type="submit" style={primaryButtonStyle}>Save Request</button></form>);
      return;
    }

    if (action.label === 'Post Announcement') {
      openModal('Create Announcement', <div style={{ display: 'grid', gap: '10px' }}><label>Title<input placeholder="Barangay cleanup drive" style={modalInputStyle} /></label><label>Message<textarea placeholder="Share the announcement details here" style={{ ...modalInputStyle, minHeight: '90px' }} /></label><button type="button" onClick={() => setModalOpen(false)} style={primaryButtonStyle}>Publish</button></div>);
      return;
    }

    if (action.target) {
      onNavigateTo?.(action.target);
    }
  };

  const filteredRequests = requests.filter((item) => {
    const query = searchValue.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );
  });

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div>
          <div className="sidebar-logo-container">
            <div className="logo-badge">
              <img src={logo} alt="BIDMS logo" />
            </div>
            <div>
              <h1 className="brand-title">BIDMS</h1>
              <p className="brand-subtitle">Barangay Governor Boyles Ubay, Bohol System</p>
            </div>
          </div>

          <div className="nav-menu">
            <p className="menu-section-title">Main Menu</p>
            <nav className="nav-list">
              {[
                { name: 'Dashboard', icon: LayoutDashboard },
                { name: 'Residents', icon: Users, target: 'residents' },
                { name: 'Documents', icon: FileText, badge: '34', target: 'documents' },
                { name: 'Certificates', icon: Award, target: 'certificates' },
                { name: 'Blotter', icon: ShieldAlert, badge: '7', target: 'blotter' },
                { name: 'Announcements', icon: Megaphone, target: 'announcements' },
                { name: 'Reports', icon: BarChart3, target: 'reports' },
                { name: 'Settings', icon: Settings, target: 'settings' },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleNavigate(item.name, item.target)}
                    className={`nav-button ${isActive ? 'active' : ''}`}
                  >
                    <div className="nav-button-left">
                      <Icon className="nav-icon" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`badge-pill ${item.name === 'Blotter' ? 'badge-amber-dark' : 'badge-gold'}`}>
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
          <button className="logout-button" onClick={() => onLogout?.()} title="Log Out">
            <LogOut className="nav-icon" />
          </button>
        </div>
      </aside>

      <main className="main-wrapper">
        <header className="top-header">
          <div>
            <h2 className="header-title">Dashboard</h2>
            <p className="header-subtitle">Tuesday, July 30, 2024 · Barangay San Isidro, Quezon City</p>
          </div>

          <div className="header-actions">
            <div className="search-box-header">
              <Search className="search-icon-input" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search residents, docs..."
                className="search-input"
              />
            </div>

            <div className="header-user-actions">
              <button className="notification-button" type="button" title="Notifications">
                <Bell style={{ width: '16px', height: '16px' }} />
                <span className="dot-notification"></span>
              </button>

              <div className="header-avatar" title="Juan Cruz">JC</div>
            </div>
          </div>
        </header>

        <div className="content-area">
          <section className="hero-card">
            <div>
              <p className="hero-eyebrow">GOOD MORNING</p>
              <h3>Juan Cruz, Barangay Secretary</h3>
              <p>34 document requests need your attention today.</p>
            </div>
            <div className="hero-actions">
              <button className="primary-btn" type="button" onClick={() => openModal('New Document Request', <form onSubmit={handleCreateRequest} style={{ display: 'grid', gap: '10px' }}><label>Resident Name<input value={requestForm.residentName} onChange={(e) => setRequestForm((prev) => ({ ...prev, residentName: e.target.value }))} style={modalInputStyle} /></label><label>Document Type<input value={requestForm.documentType} onChange={(e) => setRequestForm((prev) => ({ ...prev, documentType: e.target.value }))} style={modalInputStyle} /></label><label>Purpose<input value={requestForm.purpose} onChange={(e) => setRequestForm((prev) => ({ ...prev, purpose: e.target.value }))} style={modalInputStyle} /></label><button type="submit" style={primaryButtonStyle}>Save Request</button></form>)}>
                <Plus size={16} />
                New Request
              </button>
              <button className="secondary-btn" type="button" onClick={() => openModal('Pending Requests', <div style={{ display: 'grid', gap: '8px' }}>{requests.filter((item) => item.status === 'Pending').map((item) => <div key={item.id} style={{ padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}><strong>{item.type}</strong><div>{item.name}</div></div>)}</div>)}>View Pending</button>
            </div>
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">👥</div>
              <div className="stat-value">12,847</div>
              <div className="stat-label">Total Residents</div>
              <div className="stat-trend positive">+14 this month</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon amber">📄</div>
              <div className="stat-value">34</div>
              <div className="stat-label">Pending Requests</div>
              <div className="stat-trend warning">6 urgent</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon teal">✅</div>
              <div className="stat-value">218</div>
              <div className="stat-label">Certificates Issued</div>
              <div className="stat-trend positive">+23% vs last month</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon purple">⚠️</div>
              <div className="stat-value">7</div>
              <div className="stat-label">Blotter Cases</div>
              <div className="stat-trend purple">2 active, 5 resolved</div>
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="panel-card">
              <div className="panel-header">
                <div>
                  <h3>Recent Document Requests</h3>
                  <p>Showing latest requests from the queue.</p>
                </div>
                <button className="text-btn" type="button">View All</button>
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
                    {filteredRequests.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>
                          <div className="resident-cell">
                            <span className="table-avatar">{row.avatar}</span>
                            <span>{row.name}</span>
                          </div>
                        </td>
                        <td>{row.type}</td>
                        <td>{row.date}</td>
                        <td>
                          <span className={`status-pill ${row.statusClass}`}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel-card actions-panel">
              <div className="panel-header">
                <div>
                  <h3>Quick Actions</h3>
                  <p>Common tasks for daily operations.</p>
                </div>
              </div>
              <div className="action-list">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className="action-btn"
                    type="button"
                    onClick={() => handleQuickAction(action)}
                  >
                    <span className="action-icon">{action.icon}</span>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Modal isOpen={modalOpen} title={modalTitle} onClose={() => setModalOpen(false)}>
        {modalBody}
      </Modal>
    </div>
  );
}