import React, { useState } from 'react';
import './Settings.css';
import logo from './assets/Logo.png';
import TopHeader from './components/TopHeader.jsx';
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
  Building,
  FileCheck,
  ShieldCheck,
  Save,
  CheckCircle2,
} from 'lucide-react';

export default function SettingsPage({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Settings');
  const [activeSubTab, setActiveSubTab] = useState('general');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // General Barangay Info State
  const [barangayInfo, setBarangayInfo] = useState({
    name: 'Governor Boyles',
    municipality: 'Ubay',
    province: 'Bohol',
    contactEmail: 'contact@govboyles-ubay.gov.ph',
    contactPhone: '+63 912 345 6789',
    officeHours: '8:00 AM - 5:00 PM (Mon-Fri)',
    signatoryName: 'Hon. Juan Dela Cruz',
    signatoryRole: 'Barangay Captain',
  });

  // Certificate / Document Pricing & Rules State
  const [certRules, setCertRules] = useState([
    { id: 1, type: 'Barangay Clearance', fee: 50, reqResidency: true, status: 'Active' },
    { id: 2, type: 'Certificate of Indigency', fee: 0, reqResidency: true, status: 'Active' },
    { id: 3, type: 'Certificate of Residency', fee: 30, reqResidency: true, status: 'Active' },
    { id: 4, type: 'Business Permit Clearance', fee: 150, reqResidency: false, status: 'Active' },
  ]);

  // System Preferences & Security State
  const [preferences, setPreferences] = useState({
    autoApproveLowRisk: true,
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: 'Required',
    sessionTimeout: '30',
  });

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

  const handleBarangayChange = (e) => {
    setBarangayInfo({ ...barangayInfo, [e.target.name]: e.target.value });
  };

  const handlePreferenceToggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCertFeeChange = (id, newFee) => {
    setCertRules((prev) =>
      prev.map((item) => (item.id === id ? { ...item, fee: Number(newFee) } : item))
    );
  };

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

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
          title="Settings"
          subtitle="Configure barangay operational preferences and rules."
          searchPlaceholder="Search settings..."
          actions={<button type="button" className="action-button" onClick={handleSaveSettings}><Save size={16} />Save Changes</button>}
        />

        {saveSuccess && (
          <div className="toast-success">
            <CheckCircle2 size={18} /> Settings saved successfully!
          </div>
        )}

        <div className="content-area">
          {/* Active Navigation Tabs for Settings Sections */}
          <div className="settings-nav-tabs">
            <button
              className={`tab-btn ${activeSubTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('general')}
            >
              <Building size={16} /> Barangay Info
            </button>
            <button
              className={`tab-btn ${activeSubTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('documents')}
            >
              <FileCheck size={16} /> Certificates & Fees
            </button>
            <button
              className={`tab-btn ${activeSubTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('security')}
            >
              <ShieldCheck size={16} /> System & Security
            </button>
          </div>

          {/* TAB 1: GENERAL BARANGAY INFORMATION */}
          {activeSubTab === 'general' && (
            <div className="table-card">
              <div className="section-header">
                <h4>Barangay Profile & Operations</h4>
                <p>Manage public details displayed on printed clearances and receipts.</p>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Barangay Name</label>
                  <input
                    type="text"
                    name="name"
                    value={barangayInfo.name}
                    onChange={handleBarangayChange}
                  />
                </div>
                <div className="form-group">
                  <label>Municipality / City</label>
                  <input
                    type="text"
                    name="municipality"
                    value={barangayInfo.municipality}
                    onChange={handleBarangayChange}
                  />
                </div>
                <div className="form-group">
                  <label>Province</label>
                  <input
                    type="text"
                    name="province"
                    value={barangayInfo.province}
                    onChange={handleBarangayChange}
                  />
                </div>
                <div className="form-group">
                  <label>Official Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={barangayInfo.contactEmail}
                    onChange={handleBarangayChange}
                  />
                </div>
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input
                    type="text"
                    name="contactPhone"
                    value={barangayInfo.contactPhone}
                    onChange={handleBarangayChange}
                  />
                </div>
                <div className="form-group">
                  <label>Office Operating Hours</label>
                  <input
                    type="text"
                    name="officeHours"
                    value={barangayInfo.officeHours}
                    onChange={handleBarangayChange}
                  />
                </div>
                <div className="form-group">
                  <label>Official Document Signatory</label>
                  <input
                    type="text"
                    name="signatoryName"
                    value={barangayInfo.signatoryName}
                    onChange={handleBarangayChange}
                  />
                </div>
                <div className="form-group">
                  <label>Signatory Title</label>
                  <input
                    type="text"
                    name="signatoryRole"
                    value={barangayInfo.signatoryRole}
                    onChange={handleBarangayChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CERTIFICATES & FEES */}
          {activeSubTab === 'documents' && (
            <div className="table-card">
              <div className="section-header">
                <h4>Document Fee Configuration</h4>
                <p>Set issuance fees and validation rules for official certificates.</p>
              </div>
              <table className="settings-table">
                <thead>
                  <tr>
                    <th>Document Type</th>
                    <th>Fee (PHP ₱)</th>
                    <th>Requires Resident Verification</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {certRules.map((cert) => (
                    <tr key={cert.id}>
                      <td><strong>{cert.type}</strong></td>
                      <td>
                        <input
                          type="number"
                          className="table-number-input"
                          value={cert.fee}
                          onChange={(e) => handleCertFeeChange(cert.id, e.target.value)}
                        />
                      </td>
                      <td>{cert.reqResidency ? 'Yes' : 'No'}</td>
                      <td>
                        <span className="badge badge-success">{cert.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: SYSTEM & SECURITY PREFERENCES */}
          {activeSubTab === 'security' && (
            <div className="table-card">
              <div className="section-header">
                <h4>System & Security Controls</h4>
                <p>Configure automated operations, user authentication, and system policies.</p>
              </div>
              <div className="settings-list">
                <div className="setting-item">
                  <div>
                    <strong>Auto-approve Low-Risk Requests</strong>
                    <p className="setting-desc">Automatically process requests with complete background checks.</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences.autoApproveLowRisk}
                      onChange={() => handlePreferenceToggle('autoApproveLowRisk')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div>
                    <strong>Email Notifications</strong>
                    <p className="setting-desc">Send automated email updates for pending resident requests.</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences.emailNotifications}
                      onChange={() => handlePreferenceToggle('emailNotifications')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div>
                    <strong>SMS Alerts for Urgencies</strong>
                    <p className="setting-desc">Notify officers via SMS when emergency blotter reports are logged.</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences.smsNotifications}
                      onChange={() => handlePreferenceToggle('smsNotifications')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div>
                    <strong>Two-Factor Authentication (2FA)</strong>
                    <p className="setting-desc">Require OTP verification for administrative accounts upon login.</p>
                  </div>
                  <select
                    className="settings-select"
                    value={preferences.twoFactorAuth}
                    onChange={(e) => setPreferences({ ...preferences, twoFactorAuth: e.target.value })}
                  >
                    <option value="Required">Required for All</option>
                    <option value="Optional">Optional</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div>
                    <strong>Inactivity Session Timeout</strong>
                    <p className="setting-desc">Automatically log out inactive accounts after a designated duration.</p>
                  </div>
                  <select
                    className="settings-select"
                    value={preferences.sessionTimeout}
                    onChange={(e) => setPreferences({ ...preferences, sessionTimeout: e.target.value })}
                  >
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                    <option value="60">1 Hour</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Modal isOpen={modalOpen} title={modalTitle} onClose={() => setModalOpen(false)}>
        {modalBody}
      </Modal>
    </div>
  );
}