import React, { useState } from 'react';
import './Settings.css';
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

export default function SettingsPage({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Settings');

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
            <h2 className="header-title">Settings</h2>
            <p className="header-subtitle">Configure barangay system preferences.</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <Search className="search-icon" />
              <input type="text" placeholder="Search settings" />
            </div>
            <button type="button" className="action-button">
              <Plus className="search-icon" />
              New Setting
            </button>
          </div>
        </header>

        <div className="content-area">
          <div className="hero-card">
            <div>
              <p className="eyebrow">SYSTEM CONFIGURATION</p>
              <h3>Manage account and office preferences</h3>
              <p>Customize the system to fit barangay operations.</p>
            </div>
            <div className="pill">Secure</div>
          </div>

          <div className="stats-row">
            <div className="mini-card info">
              <span className="mini-label">Security</span>
              <strong>High</strong>
            </div>
            <div className="mini-card success">
              <span className="mini-label">Users</span>
              <strong>12</strong>
            </div>
            <div className="mini-card warning">
              <span className="mini-label">Alerts</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="table-card">
            <div className="table-header">
              <h4>Preferences</h4>
              <button type="button" className="secondary-btn">Save</button>
            </div>
            <div className="settings-list">
              <div className="setting-item">
                <strong>Auto-approve low risk requests</strong>
                <span>Enabled</span>
              </div>
              <div className="setting-item">
                <strong>Email notifications</strong>
                <span>Enabled</span>
              </div>
              <div className="setting-item">
                <strong>Two-factor authentication</strong>
                <span>Required</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
