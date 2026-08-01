import React, { useState } from 'react';
import './Blotter.css';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [casesList, setCasesList] = useState(blotterCases);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState(null);
  const [formData, setFormData] = useState({ title: 'Noise Complaint', resident: 'Roberto Lim', status: 'Open' });

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

  const handleAddCase = (e) => {
    e.preventDefault();
    const newCase = {
      id: `BLT-${Date.now().toString().slice(-3)}`,
      title: formData.title,
      resident: formData.resident,
      date: 'Just now',
      status: formData.status,
    };
    setCasesList((prev) => [newCase, ...prev]);
    setModalOpen(false);
  };

  const filteredCases = casesList.filter((item) => {
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
            <h2 className="header-title">Blotter</h2>
            <p className="header-subtitle">Manage blotter incidents and case updates.</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search cases"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="button" className="action-button" onClick={() => openModal('Add Case', <form onSubmit={handleAddCase} style={{ display: 'grid', gap: '10px' }}><label>Incident<input value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} style={modalInputStyle} /></label><label>Resident<input value={formData.resident} onChange={(e) => setFormData((prev) => ({ ...prev, resident: e.target.value }))} style={modalInputStyle} /></label><label>Status<select value={formData.status} onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))} style={modalInputStyle}><option>Open</option><option>Under Review</option><option>Resolved</option></select></label><button type="submit" style={primaryButtonStyle}>Save</button></form>)}>
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
                {filteredCases.map((item) => (
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
