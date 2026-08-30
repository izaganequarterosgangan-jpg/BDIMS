import React, { useState, useMemo } from 'react';
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

const initialCases = [
  { id: 'BLT-001', title: 'Noise Complaint', resident: 'Roberto Lim', date: 'Aug 2, 2026', status: 'Open' },
  { id: 'BLT-002', title: 'Property Dispute', resident: 'Carmen Villanueva', date: 'Aug 1, 2026', status: 'Under Review' },
  { id: 'BLT-003', title: 'Animal Disturbance', resident: 'Eduardo Flores', date: 'Jul 31, 2026', status: 'Resolved' },
];

export default function Blotter({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Blotter');
  const [searchQuery, setSearchQuery] = useState('');
  const [casesList, setCasesList] = useState(initialCases);
  const [modalOpen, setModalOpen] = useState(false);

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

  // Dynamic status counters based on actual state
  const summaryCards = useMemo(() => {
    const open = casesList.filter((c) => c.status === 'Open').length;
    const review = casesList.filter((c) => c.status === 'Under Review').length;
    const resolved = casesList.filter((c) => c.status === 'Resolved').length;

    return [
      { label: 'Open Cases', value: open, tone: 'warning' },
      { label: 'Pending Review', value: review, tone: 'info' },
      { label: 'Resolved', value: resolved, tone: 'success' },
    ];
  }, [casesList]);

  const handleAddCaseSubmit = (newCaseData) => {
    const newCase = {
      id: `BLT-${Math.floor(100 + Math.random() * 900)}`,
      title: newCaseData.title,
      resident: newCaseData.resident,
      date: 'Just now',
      status: newCaseData.status,
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
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="button" className="action-button" onClick={() => setModalOpen(true)}>
              <Plus className="search-icon" />
              Add Case
            </button>
          </div>
        </header>

        <div className="content-area">
          <div className="hero-card">
            <div>
              <p className="eyebrow">CASE MONITOR</p>
              <h3>{summaryCards[0].value + summaryCards[1].value} cases need attention</h3>
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
                {filteredCases.length > 0 ? (
                  filteredCases.map((item) => (
                    <tr key={item.id}>
                      <td className="case-id">{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.resident}</td>
                      <td>{item.date}</td>
                      <td>
                        <span className={`status-tag status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-state">No cases found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Modal isOpen={modalOpen} title="Add Case" onClose={() => setModalOpen(false)}>
        <AddCaseForm onSubmit={handleAddCaseSubmit} />
      </Modal>
    </div>
  );
}

function AddCaseForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [resident, setResident] = useState('');
  const [status, setStatus] = useState('Open');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !resident) return;
    onSubmit({ title, resident, status });
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <label className="form-field">
        <span>Incident</span>
        <input
          type="text"
          placeholder="e.g. Noise Complaint"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="form-field">
        <span>Resident</span>
        <input
          type="text"
          placeholder="Resident Name"
          value={resident}
          onChange={(e) => setResident(e.target.value)}
          required
        />
      </label>
      <label className="form-field">
        <span>Status</span>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Open">Open</option>
          <option value="Under Review">Under Review</option>
          <option value="Resolved">Resolved</option>
        </select>
      </label>
      <button type="submit" className="submit-btn">Save Case</button>
    </form>
  );
}