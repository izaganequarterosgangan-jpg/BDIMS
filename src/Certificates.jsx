import React, { useState } from 'react';
import './Certificates.css';
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
} from 'lucide-react';

const initialCertificates = [
  {
    id: 'CERT-001',
    title: 'Barangay Clearance',
    resident: 'Maria Santos',
    purpose: 'Employment Application',
    orNumber: 'OR-2026-0891',
    amountPaid: '50.00',
    issued: 'Aug 1, 2026',
    status: 'Ready',
  },
  {
    id: 'CERT-002',
    title: 'Certificate of Residency',
    resident: 'Juan dela Cruz',
    purpose: 'Bank Account Opening',
    orNumber: 'OR-2026-0888',
    amountPaid: '0.00',
    issued: 'Jul 29, 2026',
    status: 'Printed',
  },
  {
    id: 'CERT-003',
    title: 'Certificate of Indigency',
    resident: 'Ana Reyes',
    purpose: 'Medical Assistance',
    orNumber: 'EXEMPT',
    amountPaid: '0.00',
    issued: 'Jul 25, 2026',
    status: 'Ready',
  },
  {
    id: 'CERT-004',
    title: 'Business Clearance',
    resident: 'Roberto Lim',
    purpose: 'Store Permit Renewal',
    orNumber: 'OR-2026-0850',
    amountPaid: '150.00',
    issued: 'Jul 24, 2026',
    status: 'Pending',
  },
];

const summaryCards = [
  { label: 'Issued This Week', value: '3', tone: 'success' },
  { label: 'Awaiting Pickup', value: '2', tone: 'warning' },
  { label: 'Printed', value: '18', tone: 'info' },
];

export default function Certificates({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Certificates');
  const [searchQuery, setSearchQuery] = useState('');
  const [certificatesList, setCertificatesList] = useState(initialCertificates);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState(null);

  // Walk-in Issue Form State
  const [formData, setFormData] = useState({
    resident: 'Maria Santos',
    title: 'Barangay Clearance',
    purpose: 'Employment Application',
    orNumber: 'OR-2026-0900',
    amountPaid: '50.00',
    status: 'Ready',
  });

  // Print & Dynamic Preview Active Item State
  const [selectedCert, setSelectedCert] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newCertificate = {
      id: `CERT-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      resident: formData.resident,
      purpose: formData.purpose,
      orNumber: formData.orNumber,
      amountPaid: formData.amountPaid,
      issued: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: formData.status,
    };
    setCertificatesList((prev) => [newCertificate, ...prev]);
    setModalOpen(false);
  };

  const triggerPrint = (cert) => {
    setSelectedCert(cert);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const openIssueModal = () => {
    setModalTitle('Issue Walk-in Certificate');
    setModalBody('issueForm');
    setModalOpen(true);
  };

  const openPreviewModal = (cert) => {
    setSelectedCert(cert);
    setModalTitle(`Preview - ${cert.title}`);
    setModalBody('preview');
    setModalOpen(true);
  };

  const filteredCertificates = certificatesList.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.id.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.resident.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query)
    );
  });

  // Certificate Render Component for Modal Preview & Printable Engine
  const renderCertificateTemplate = (data) => (
    <div className="certificate-paper" id="printable-certificate">
      <div className="cert-header">
        <img src={logo} alt="Barangay Logo" className="cert-seal" />
        <div className="cert-header-text">
          <p className="cert-rep">Republic of the Philippines</p>
          <p className="cert-prov">Province of Bohol | Municipality of Ubay</p>
          <h2 className="cert-brgy">BARANGAY GOVERNOR BOYLES</h2>
          <p className="cert-office">OFFICE OF THE BARANGAY CAPTAIN</p>
        </div>
      </div>

      <div className="cert-divider"></div>

      <h1 className="cert-doc-title">{data.title.toUpperCase()}</h1>

      <div className="cert-body">
        <p><strong>TO WHOM IT MAY CONCERN:</strong></p>
        <p className="cert-paragraph">
          This is to certify that <strong>{data.resident || '[ Resident Name ]'}</strong>, of legal age, 
          is a bona fide resident of Barangay Governor Boyles, Ubay, Bohol, and is known to be of good moral 
          character and a law-abiding citizen in the community.
        </p>
        <p className="cert-paragraph">
          This certification is issued upon the request of the above-named individual for the purpose of: 
          <strong> {data.purpose || '[ Specified Purpose ]'}</strong>.
        </p>
        <p className="cert-paragraph">
          Given this <strong>{data.issued || '27th day of August, 2026'}</strong> at Barangay Governor Boyles, Ubay, Bohol.
        </p>
      </div>

      <div className="cert-signatures">
        <div className="sig-block">
          <p className="sig-line">_______________________</p>
          <p className="sig-name">JUAN CRUZ</p>
          <p className="sig-title">Barangay Secretary</p>
        </div>
        <div className="sig-block">
          <p className="sig-line">_______________________</p>
          <p className="sig-name">HON. BARANGAY CAPTAIN</p>
          <p className="sig-title">Punong Barangay</p>
        </div>
      </div>

      <div className="cert-footer">
        <p>O.R. No.: <strong>{data.orNumber || 'N/A'}</strong></p>
        <p>Amount Paid: <strong>₱{data.amountPaid || '0.00'}</strong></p>
        <p>Control No.: <strong>{data.id || 'CERT-PREVIEW'}</strong></p>
      </div>
    </div>
  );

  return (
    <div className="page-shell">
      <aside className="sidebar print-hide">
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
          title="Certificates"
          subtitle="Manage issued barangay certificates and records."
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          searchPlaceholder="Search certificates"
          actions={<button type="button" className="action-button" onClick={openIssueModal}><Plus className="search-icon" />Issue Walk-in Certificate</button>}
          printHide
        />

        <div className="content-area print-hide">
          <div className="hero-card">
            <div>
              <p className="eyebrow">CERTIFICATE TRACKER</p>
              <h3>3 certificates issued this week</h3>
              <p>Review recent records and verify document completeness.</p>
            </div>
            <div className="pill">Ready to print</div>
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
              <h4>Recent Certificates</h4>
              <button type="button" className="secondary-btn">Export</button>
            </div>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Certificate ID</th>
                  <th>Type</th>
                  <th>Resident</th>
                  <th>Purpose</th>
                  <th>Date Issued</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.resident}</td>
                    <td>{item.purpose}</td>
                    <td>{item.issued}</td>
                    <td>
                      <span className={`status-pill ${item.status === 'Pending' ? 'status-pending' : item.status === 'Printed' ? 'status-complete' : 'status-ready'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-cell">
                        <button
                          type="button"
                          className="icon-btn"
                          title="Preview"
                          onClick={() => openPreviewModal(item)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          className="icon-btn print-icon-btn"
                          title="Print"
                          onClick={() => triggerPrint(item)}
                        >
                          <Printer size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Print Container (Only visible during print window) */}
        <div className="print-only">
          {selectedCert && renderCertificateTemplate(selectedCert)}
        </div>
      </main>

      {/* Interactive Modal */}
      <Modal isOpen={modalOpen} title={modalTitle} onClose={() => setModalOpen(false)}>
        {modalBody === 'issueForm' && (
          <div className="issuance-split-container">
            <form onSubmit={handleFormSubmit} className="modal-form">
              <label className="form-label">
                Resident Name
                <input
                  type="text"
                  name="resident"
                  value={formData.resident}
                  onChange={handleInputChange}
                  className="modal-input"
                  required
                />
              </label>

              <label className="form-label">
                Certificate Type
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="modal-input"
                >
                  <option>Barangay Clearance</option>
                  <option>Certificate of Residency</option>
                  <option>Certificate of Indigency</option>
                  <option>Business Clearance</option>
                </select>
              </label>

              <label className="form-label">
                Purpose
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="modal-input"
                  required
                />
              </label>

              <div className="form-row">
                <label className="form-label">
                  O.R. Number
                  <input
                    type="text"
                    name="orNumber"
                    value={formData.orNumber}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                </label>
                <label className="form-label">
                  Amount Paid (₱)
                  <input
                    type="text"
                    name="amountPaid"
                    value={formData.amountPaid}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                </label>
              </div>

              <label className="form-label">
                Status
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="modal-input"
                >
                  <option>Ready</option>
                  <option>Printed</option>
                  <option>Pending</option>
                </select>
              </label>

              <button type="submit" className="primary-form-button">
                Save & Issue Certificate
              </button>
            </form>

            <div className="modal-live-preview">
              <p className="preview-heading">Dynamic Live Preview</p>
              {renderCertificateTemplate({ ...formData, id: 'CERT-NEW', issued: 'Today' })}
            </div>
          </div>
        )}

        {modalBody === 'preview' && selectedCert && (
          <div className="modal-preview-wrapper">
            {renderCertificateTemplate(selectedCert)}
            <button
              type="button"
              className="primary-form-button print-modal-btn"
              onClick={() => triggerPrint(selectedCert)}
            >
              <Printer size={18} /> Print Document
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}