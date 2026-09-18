import React, { useState, useMemo } from 'react';
import './Announcements.css';
import logo from './assets/Logo.png';
import Modal from './components/Modal.jsx';
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
} from 'lucide-react';

const initialAnnouncements = [
  {
    id: '1',
    title: 'Barangay Cleanup Drive',
    purpose: 'Community sanitation and clearing of drainage waterways ahead of rainy season.',
    targetAudience: 'All Barangay Residents',
    date: 'Aug 5, 2026',
    priority: 'High',
  },
  {
    id: '2',
    title: 'Senior Citizen Benefits Seminar',
    purpose: 'Orientation on new healthcare subsidies and monthly pension distribution guidelines.',
    targetAudience: 'Senior Citizens & Caregivers',
    date: 'Aug 8, 2026',
    priority: 'Medium',
  },
  {
    id: '3',
    title: 'Health Check Day',
    purpose: 'Free blood pressure monitoring, dental checkups, and basic vitamins allocation.',
    targetAudience: 'General Public',
    date: 'Aug 12, 2026',
    priority: 'Low',
  },
];

export default function Announcements({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Announcements');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(initialAnnouncements);
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

  // Recalculate indicators dynamically
  const summaryCards = useMemo(() => {
    const scheduled = posts.length;
    const highPriority = posts.filter((p) => p.priority === 'High').length;

    return [
      { label: 'SCHEDULED', value: scheduled, tone: 'info' },
      { label: 'HIGH PRIORITY', value: highPriority, tone: 'warning' },
      { label: 'RESIDENTS REACH', value: '1.2K', tone: 'success' },
    ];
  }, [posts]);

  const handleAddAnnouncement = (newPost) => {
    const postWithId = { id: Date.now().toString(), ...newPost };
    setPosts((prev) => [postWithId, ...prev]);
    setModalOpen(false);
  };

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.purpose.toLowerCase().includes(query) ||
      post.targetAudience.toLowerCase().includes(query) ||
      post.priority.toLowerCase().includes(query) ||
      post.date.toLowerCase().includes(query)
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
        <TopHeader
          title="Announcements"
          subtitle="Post and monitor barangay announcements."
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          searchPlaceholder="Search announcements..."
          actions={<button type="button" className="action-button" onClick={() => setModalOpen(true)}><Plus className="search-icon" />New Post</button>}
        />

        <div className="content-area">
          <div className="hero-card">
            <div>
              <p className="eyebrow">PUBLIC NOTICE</p>
              <h3>{posts.length} announcements scheduled</h3>
              <p>Keep residents informed about upcoming activities and advisories.</p>
            </div>
            <div className="pill-live">Live updates</div>
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
                  <th>ANNOUNCEMENT TITLE</th>
                  <th>PURPOSE & DETAILS</th>
                  <th>TARGET AUDIENCE</th>
                  <th>DATE</th>
                  <th>PRIORITY</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <tr key={post.id}>
                      <td className="post-title">{post.title}</td>
                      <td className="post-purpose">{post.purpose}</td>
                      <td>
                        <span className="audience-badge">{post.targetAudience}</span>
                      </td>
                      <td className="post-date">{post.date}</td>
                      <td>
                        <span className={`priority-tag priority-${post.priority.toLowerCase()}`}>
                          {post.priority}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-state">No announcements found matching your filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Modal isOpen={modalOpen} title="New Announcement" onClose={() => setModalOpen(false)}>
        <NewAnnouncementForm onSubmit={handleAddAnnouncement} />
      </Modal>
    </div>
  );
}

function NewAnnouncementForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [targetAudience, setTargetAudience] = useState('All Barangay Residents');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('High');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !purpose || !date) return;
    onSubmit({ title, purpose, targetAudience, date, priority });
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <label className="form-field">
        <span>Announcement Title *</span>
        <input
          type="text"
          placeholder="e.g. Barangay Vaccination Drive"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="form-field">
        <span>Purpose & Details *</span>
        <textarea
          rows="3"
          placeholder="Describe the main goal, required documents, or instructions for residents..."
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
        />
      </label>

      <label className="form-field">
        <span>Target Audience</span>
        <select value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}>
          <option value="All Barangay Residents">All Barangay Residents</option>
          <option value="Senior Citizens & Caregivers">Senior Citizens & Caregivers</option>
          <option value="Youth & Students">Youth & Students</option>
          <option value="Household Heads">Household Heads</option>
          <option value="Business Owners">Business Owners</option>
        </select>
      </label>

      <div className="form-row">
        <label className="form-field">
          <span>Schedule Date *</span>
          <input
            type="text"
            placeholder="e.g. Aug 20, 2026"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label className="form-field">
          <span>Priority Level</span>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
      </div>

      <button type="submit" className="submit-btn">Publish Announcement</button>
    </form>
  );
}636+69