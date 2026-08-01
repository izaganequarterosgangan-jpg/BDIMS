import React, { useState } from 'react';
import './ResidentDashboard.css'; // Importing the explicit CSS stylesheet
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
  ChevronDown
} from 'lucide-react';

const residentsData = [
  { id: 'RES-001', name: 'Maria Santos', since: 'Jan 12, 2010', initials: 'MS', ageSex: '42 / Female', purok: 'Purok 1', contact: '09171234567', voter: true, status: 'Active', avatarClass: 'bg-purple-avatar' },
  { id: 'RES-002', name: 'Juan dela Cruz', since: 'Mar 5, 2015', initials: 'Jd', ageSex: '35 / Male', purok: 'Purok 2', contact: '09181234567', voter: true, status: 'Active', avatarClass: 'bg-pink-avatar' },
  { id: 'RES-003', name: 'Ana Reyes', since: 'Jun 20, 2019', initials: 'AR', ageSex: '28 / Female', purok: 'Purok 3', contact: '09191234567', voter: false, status: 'Active', avatarClass: 'bg-red-avatar' },
  { id: 'RES-004', name: 'Roberto Lim', since: 'Feb 1, 2005', initials: 'RL', ageSex: '60 / Male', purok: 'Purok 1', contact: '09201234567', voter: true, status: 'Active', avatarClass: 'bg-amber-avatar' },
  { id: 'RES-005', name: 'Carmen Villanueva', since: 'Aug 15, 1998', initials: 'CV', ageSex: '73 / Female', purok: 'Purok 4', contact: '09211234567', voter: true, status: 'Active', avatarClass: 'bg-lime-avatar' },
  { id: 'RES-006', name: 'Eduardo Flores', since: 'Nov 3, 2012', initials: 'EF', ageSex: '50 / Male', purok: 'Purok 2', contact: '09221234567', voter: true, status: 'Inactive', avatarClass: 'bg-emerald-avatar' },
];

export default function ResidentDashboard({ onLogout, onBackToDashboard, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Residents');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="resident-container">
      
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div>
          {/* Logo Header */}
          <div className="sidebar-logo-container">
            <div className="logo-badge">☀️</div>
            <div>
              <h1 className="brand-title">BIDMS</h1>
              <p className="brand-subtitle">Barangay System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="nav-menu">
            <p className="menu-section-title">Main Menu</p>
            <nav className="nav-list">
              {[
                { name: 'Dashboard', icon: LayoutDashboard, target: 'dashboard', onClick: onBackToDashboard },
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
                    onClick={() => {
                      setActiveTab(item.name);
                      if (item.onClick) {
                        item.onClick();
                      }
                      if (item.target && !item.onClick) {
                        onNavigateTo?.(item.target);
                      }
                    }}
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

        {/* User Profile Footer */}
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

      {/* MAIN CONTENT AREA */}
      <main className="main-wrapper">
        
        {/* Top Header */}
        <header className="top-header">
          <div>
            <h2 className="header-title">Residents</h2>
            <p className="header-subtitle">
              Tuesday, July 30, 2024 · Barangay San Isidro, Quezon City
            </p>
          </div>

          <div className="header-actions">
            {/* Search Input */}
            <div className="search-box-header">
              <Search className="search-icon-input" />
              <input
                type="text"
                placeholder="Search residents, docs..."
                className="search-input"
              />
            </div>

            {/* Notification Bell */}
            <button className="notification-button">
              <Bell style={{ width: '16px', height: '16px' }} />
              <span className="dot-notification"></span>
            </button>

            {/* Profile Avatar */}
            <div className="header-avatar">
              JC
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="content-body">
          
          {/* Action Header */}
          <div className="action-header">
            <div>
              <h3 className="registry-title">Resident Registry</h3>
              <p className="registry-subtitle">12 total registered residents</p>
            </div>
            <button className="btn-add-resident">
              <Plus style={{ width: '16px', height: '16px' }} />
              <span>Add Resident</span>
            </button>
          </div>

          {/* Metric Cards */}
          <div className="metrics-grid">
            <div className="metric-card">
              <p className="metric-value text-blue-dark">12</p>
              <p className="metric-label">Total</p>
            </div>
            <div className="metric-card">
              <p className="metric-value text-emerald">10</p>
              <p className="metric-label">Active</p>
            </div>
            <div className="metric-card">
              <p className="metric-value text-purple">9</p>
              <p className="metric-label">Registered Voters</p>
            </div>
            <div className="metric-card">
              <p className="metric-value text-amber">3</p>
              <p className="metric-label">Senior Citizens</p>
            </div>
          </div>

          {/* Table Container */}
          <div className="table-card">
            
            {/* Filter Toolbar */}
            <div className="filter-toolbar">
              <div className="search-table-wrapper">
                <Search className="search-icon-input" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or ID..."
                  className="search-table-input"
                />
              </div>

              <div className="filter-options">
                <div className="select-wrapper">
                  <select className="select-box">
                    <option>All</option>
                  </select>
                  <ChevronDown className="select-arrow" />
                </div>

                <div className="select-wrapper">
                  <select className="select-box">
                    <option>All</option>
                  </select>
                  <ChevronDown className="select-arrow" />
                </div>

                <span>12 results</span>
              </div>
            </div>

            {/* Data Table */}
            <div className="table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Resident ID</th>
                    <th>Full Name</th>
                    <th>Age / Sex</th>
                    <th>Purok</th>
                    <th>Contact</th>
                    <th>Voter</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {residentsData.map((row) => (
                    <tr key={row.id}>
                      <td className="resident-id-col">{row.id}</td>
                      <td>
                        <div className="resident-cell">
                          <div className={`avatar-circle ${row.avatarClass}`}>
                            {row.initials}
                          </div>
                          <div>
                            <p className="resident-name">{row.name}</p>
                            <p className="resident-since">Since {row.since}</p>
                          </div>
                        </div>
                      </td>
                      <td>{row.ageSex}</td>
                      <td>{row.purok}</td>
                      <td>{row.contact}</td>
                      <td>
                        {row.voter ? (
                          <span style={{ color: '#059669', fontWeight: 500 }}>
                            ✓ Registered
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8' }}>—</span>
                        )}
                      </td>
                      <td>
                        <span className={`status-badge ${row.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                          <span className={`status-dot ${row.status === 'Active' ? 'status-dot-active' : 'status-dot-inactive'}`}></span>
                          {row.status}
                        </span>
                      </td>
                      <td className="action-buttons">
                        <button className="btn-action">View</button>
                        <span className="action-divider">·</span>
                        <button className="btn-action">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}