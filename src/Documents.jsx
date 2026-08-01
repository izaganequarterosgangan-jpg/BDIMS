import React, { useState } from 'react';
import './Documents.css';
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
  Plus,
} from 'lucide-react';

const documentRequests = [
  { id: 'DOC-101', title: 'Barangay Clearance', resident: 'Maria Santos', date: 'Aug 1, 2026', status: 'Pending' },
  { id: 'DOC-102', title: 'Certificate of Residency', resident: 'Juan dela Cruz', date: 'Aug 1, 2026', status: 'Processing' },
  { id: 'DOC-103', title: 'Business Permit', resident: 'Ana Reyes', date: 'Jul 31, 2026', status: 'Completed' },
  { id: 'DOC-104', title: 'Indigency Certificate', resident: 'Roberto Lim', date: 'Jul 30, 2026', status: 'Pending' },
];

const summaryCards = [
  { label: 'Pending', value: '12', tone: 'warning' },
  { label: 'Processing', value: '8', tone: 'info' },
  { label: 'Completed', value: '24', tone: 'success' },
];

export default function Documents({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState(documentRequests);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState(null);
  const [formData, setFormData] = useState({ resident: 'Maria Santos', title: 'Barangay Clearance', status: 'Pending' });

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

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalBody(content);
    setModalOpen(true);
  };

  const handleAddRequest = (e) => {
    e.preventDefault();
    const newRequest = {
      id: `DOC-${Date.now().toString().slice(-3)}`,
      title: formData.title,
      resident: formData.resident,
      date: 'Just now',
      status: formData.status,
    };
    setRequests((prev) => [newRequest, ...prev]);
    setModalOpen(false);
  };

  const filteredRequests = requests.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.id.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.resident.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query)
    );
  });

  return (
    <div className="page-shell">
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
            <h2 className="header-title">Documents</h2>
            <p className="header-subtitle">Track and process document requests for residents.</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search documents"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="button" className="action-button" onClick={() => openModal('New Request', <form onSubmit={handleAddRequest} style={{ display: 'grid', gap: '10px' }}><label>Resident<input value={formData.resident} onChange={(e) => setFormData((prev) => ({ ...prev, resident: e.target.value }))} style={modalInputStyle} /></label><label>Document Type<input value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} style={modalInputStyle} /></label><label>Status<select value={formData.status} onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))} style={modalInputStyle}><option>Pending</option><option>Processing</option><option>Completed</option></select></label><button type="submit" style={primaryButtonStyle}>Save</button></form>)}>
              <Plus className="search-icon" />
              New Request
            </button>
          </div>
        </header>

        <div className="content-area">
          <div className="hero-card">
            <div>
              <p className="eyebrow">DOCUMENT CENTER</p>
              <h3>24 active document requests</h3>
              <p>Pending, processing, and completed requests are tracked here for fast follow-up.</p>
            </div>
            <div className="pill">Updated today</div>
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
              <h4>Recent Requests</h4>
              <button type="button" className="secondary-btn">View All</button>
            </div>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Document</th>
                  <th>Resident</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.resident}</td>
                    <td>{item.date}</td>
                    <td>
                      <span className={`status-pill ${item.status === 'Completed' ? 'status-complete' : item.status === 'Pending' ? 'status-pending' : 'status-processing'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Modal isOpen={modalOpen} title={modalTitle} onClose={() => setModalOpen(false)}>
        {modalBody}
      </Modal>
    </div>
  );
}

const modalInputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  marginTop: '4px',
};

const primaryButtonStyle = {
  width: '100%',
  padding: '10px 12px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#0b194c',
  color: '#ffffff',
  cursor: 'pointer',
  fontWeight: 600,
};
