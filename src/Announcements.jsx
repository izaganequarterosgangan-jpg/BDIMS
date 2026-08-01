import React, { useState } from 'react';
import './Announcements.css';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(announcements);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState(null);
  const [formData, setFormData] = useState({ title: 'Barangay Cleanup Drive', date: 'Aug 5, 2026', priority: 'High' });

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

  const handleAddPost = (e) => {
    e.preventDefault();
    const newPost = {
      title: formData.title,
      date: formData.date,
      priority: formData.priority,
    };
    setPosts((prev) => [newPost, ...prev]);
    setModalOpen(false);
  };

  const filteredAnnouncements = posts.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.date.toLowerCase().includes(query) ||
      item.priority.toLowerCase().includes(query)
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
            <h2 className="header-title">Announcements</h2>
            <p className="header-subtitle">Post and monitor barangay announcements.</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search announcements"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="button" className="action-button" onClick={() => openModal('New Announcement', <form onSubmit={handleAddPost} style={{ display: 'grid', gap: '10px' }}><label>Title<input value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} style={modalInputStyle} /></label><label>Date<input value={formData.date} onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))} style={modalInputStyle} /></label><label>Priority<select value={formData.priority} onChange={(e) => setFormData((prev) => ({ ...prev, priority: e.target.value }))} style={modalInputStyle}><option>High</option><option>Medium</option><option>Low</option></select></label><button type="submit" style={primaryButtonStyle}>Publish</button></form>)}>
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
                {filteredAnnouncements.map((item, index) => (
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
