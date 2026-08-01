import React, { useState } from 'react';
import './Reports.css';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [reportsList, setReportsList] = useState(reports);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState(null);
  const [formData, setFormData] = useState({ title: 'Monthly Summary', date: 'Aug 1, 2026', status: 'Prepared' });

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

  const handleAddReport = (e) => {
    e.preventDefault();
    const newReport = {
      title: formData.title,
      date: formData.date,
      status: formData.status,
    };
    setReportsList((prev) => [newReport, ...prev]);
    setModalOpen(false);
  };

  const filteredReports = reportsList.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.date.toLowerCase().includes(query) ||
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
            <h2 className="header-title">Reports</h2>
            <p className="header-subtitle">Review summaries and performance insights.</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search reports"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="button" className="action-button" onClick={() => openModal('Generate Report', <form onSubmit={handleAddReport} style={{ display: 'grid', gap: '10px' }}><label>Report Name<input value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} style={modalInputStyle} /></label><label>Date<input value={formData.date} onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))} style={modalInputStyle} /></label><label>Status<select value={formData.status} onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))} style={modalInputStyle}><option>Prepared</option><option>Pending Review</option><option>Ready</option></select></label><button type="submit" style={primaryButtonStyle}>Generate</button></form>)}>
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
                {filteredReports.map((item, index) => (
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
