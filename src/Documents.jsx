import React, { useState, useEffect } from 'react';
import './Documents.css';
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
  Printer,
  Eye,
  Edit,
} from 'lucide-react';

const initialRequests = [
  { id: 'DOC-101', title: 'Barangay Clearance', resident: 'Maria Santos', date: 'Aug 1, 2026', status: 'Pending' },
  { id: 'DOC-102', title: 'Certificate of Residency', resident: 'Juan dela Cruz', date: 'Aug 1, 2026', status: 'Processing' },
  { id: 'DOC-103', title: 'Business Permit', resident: 'Ana Reyes', date: 'Jul 31, 2026', status: 'Completed' },
  { id: 'DOC-104', title: 'Indigency Certificate', resident: 'Roberto Lim', date: 'Jul 30, 2026', status: 'Pending' },
];

export default function Documents({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Documents');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Persistent State Sync via LocalStorage (Shares data seamlessly with Certificates page)
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('bidms_document_requests');
    return saved ? JSON.parse(saved) : initialRequests;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState(null);

  // Dynamic Form State
  const [formData, setFormData] = useState({
    resident: '',
    title: 'Barangay Clearance',
    status: 'Pending',
  });

  // Sync to LocalStorage on state change
  useEffect(() => {
    localStorage.setItem('bidms_document_requests', JSON.stringify(requests));
  }, [requests]);

  // Calculated Real-Time Summary Counters
  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const processingCount = requests.filter((r) => r.status === 'Processing').length;
  const completedCount = requests.filter((r) => r.status === 'Completed').length;

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

  const handleAddRequestSubmit = (e) => {
    e.preventDefault();
    if (!formData.resident.trim()) return;

    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newRequest = {
      id: `DOC-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      resident: formData.resident,
      date: today,
      status: formData.status,
    };

    setRequests((prev) => [newRequest, ...prev]);
    setFormData({ resident: '', title: 'Barangay Clearance', status: 'Pending' });
    setModalOpen(false);
  };

  const handleStatusChange = (requestId, newStatus) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: newStatus } : req))
    );
    setModalOpen(false);
  };

  const openNewRequestModal = () => {
    setModalTitle('Create New Document Request');
    setModalBody(
      <form onSubmit={handleAddRequestSubmit} className="modal-form">
        <div className="form-group">
          <label>Resident Full Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Maria Santos"
            value={formData.resident}
            onChange={(e) => setFormData((prev) => ({ ...prev, resident: e.target.value }))}
            className="modal-input"
          />
        </div>
        <div className="form-group">
          <label>Document Type</label>
          <select
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="modal-input"
          >
            <option value="Barangay Clearance">Barangay Clearance</option>
            <option value="Certificate of Residency">Certificate of Residency</option>
            <option value="Business Permit">Business Permit</option>
            <option value="Indigency Certificate">Indigency Certificate</option>
          </select>
        </div>
        <div className="form-group">
          <label>Initial Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
            className="modal-input"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="primary-modal-btn">
          Add Request
        </button>
      </form>
    );
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalTitle(`Update Request: ${item.id}`);
    setModalBody(
      <div className="modal-form">
        <p><strong>Resident:</strong> {item.resident}</p>
        <p><strong>Document:</strong> {item.title}</p>
        <div className="form-group">
          <label>Update Status</label>
          <select
            defaultValue={item.status}
            onChange={(e) => handleStatusChange(item.id, e.target.value)}
            className="modal-input"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    );
    setModalOpen(true);
  };

  const openPreviewModal = (item) => {
    setModalTitle(`Document Preview - ${item.id}`);
    setModalBody(
      <div className="certificate-preview-box">
        <div className="cert-header">
          <h3>REPUBLIC OF THE PHILIPPINES</h3>
          <p>Province of Bohol | Municipality of Ubay</p>
          <h4>BARANGAY GOVERNOR BOYLES</h4>
        </div>
        <hr className="cert-divider" />
        <div className="cert-body">
          <h5>OFFICIAL CERTIFICATION</h5>
          <p>
            This is to certify that <strong>{item.resident}</strong> is a bonafide resident of 
            Barangay Governor Boyles, Ubay, Bohol.
          </p>
          <p>Issued for purpose of: <strong>{item.title}</strong>.</p>
          <p className="cert-date">Date Issued: {item.date}</p>
        </div>
        <div className="cert-footer">
          <p><strong>HON. JUAN CRUZ</strong></p>
          <span>Barangay Captain / Secretary</span>
        </div>
        <button type="button" className="primary-modal-btn print-btn" onClick={() => window.print()}>
          <Printer className="btn-icon" /> Print / Export Document
        </button>
      </div>
    );
    setModalOpen(true);
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
        <TopHeader
          title="Documents"
          subtitle="Track and process document requests for residents."
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          searchPlaceholder="Search documents..."
          actions={<button type="button" className="action-button" onClick={openNewRequestModal}><Plus className="btn-icon" />New Request</button>}
        />

        <div className="content-area">
          <div className="hero-card">
            <div>
              <p className="eyebrow">DOCUMENT CENTER</p>
              <h3>{requests.length} total document requests</h3>
              <p>Pending, processing, and completed requests are tracked here for fast follow-up.</p>
            </div>
            <div className="pill">Updated today</div>
          </div>

          <div className="stats-row">
            <div className="mini-card warning">
              <span className="mini-label">PENDING</span>
              <strong>{pendingCount}</strong>
            </div>
            <div className="mini-card info">
              <span className="mini-label">PROCESSING</span>
              <strong>{processingCount}</strong>
            </div>
            <div className="mini-card success">
              <span className="mini-label">COMPLETED</span>
              <strong>{completedCount}</strong>
            </div>
          </div>

          <div className="table-card">
            <div className="table-header">
              <h4>Recent Requests</h4>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => onNavigateTo?.('certificates')}
              >
                View Certificates
              </button>
            </div>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Document</th>
                  <th>Resident</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.id}</strong></td>
                    <td>{item.title}</td>
                    <td>{item.resident}</td>
                    <td>{item.date}</td>
                    <td>
                      <span
                        className={`status-pill ${
                          item.status === 'Completed'
                            ? 'status-complete'
                            : item.status === 'Pending'
                            ? 'status-pending'
                            : 'status-processing'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-cell">
                        <button
                          type="button"
                          className="icon-btn edit"
                          onClick={() => openEditModal(item)}
                          title="Edit Status"
                        >
                          <Edit className="action-icon" />
                        </button>
                        <button
                          type="button"
                          className="icon-btn preview"
                          onClick={() => openPreviewModal(item)}
                          title="Preview & Print"
                        >
                          <Eye className="action-icon" />
                        </button>
                      </div>
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