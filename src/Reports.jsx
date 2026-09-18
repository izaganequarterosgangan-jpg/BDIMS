import React, { useState } from 'react';
import './Reports.css';
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
  Download,
  Eye,
  Trash2,
  FileSpreadsheet
} from 'lucide-react';

const initialReports = [
  { id: 1, title: 'Monthly Summary', date: 'Aug 1, 2026', status: 'Prepared' },
  { id: 2, title: 'Residents Growth Report', date: 'Jul 30, 2026', status: 'Pending Review' },
  { id: 3, title: 'Document Processing Report', date: 'Jul 28, 2026', status: 'Ready' },
];

export default function Reports({ onLogout, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('Reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [reportsList, setReportsList] = useState(initialReports);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ 
    title: '', 
    date: new Date().toISOString().split('T')[0], 
    status: 'Prepared' 
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

  // Dynamic calculations for stats
  const preparedCount = reportsList.filter(r => r.status === 'Prepared' || r.status === 'Ready').length;
  const pendingCount = reportsList.filter(r => r.status === 'Pending Review').length;
  const totalCount = reportsList.length;

  const summaryCards = [
    { label: 'Prepared / Ready', value: preparedCount.toString(), tone: 'success' },
    { label: 'Pending Review', value: pendingCount.toString(), tone: 'warning' },
    { label: 'Total Reports', value: totalCount.toString(), tone: 'info' },
  ];

  const handleOpenGenerateModal = () => {
    setFormData({ title: '', date: new Date().toISOString().split('T')[0], status: 'Prepared' });
    setModalTitle('Generate New Report');
    setModalOpen(true);
  };

  const handleAddReport = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newReport = {
      id: Date.now(),
      title: formData.title,
      date: formData.date,
      status: formData.status,
    };

    setReportsList((prev) => [newReport, ...prev]);
    setModalOpen(false);
  };

  const handleDeleteReport = (id) => {
    setReportsList((prev) => prev.filter((report) => report.id !== id));
  };

  const handleViewReport = (report) => {
    setModalTitle(`View Report: ${report.title}`);
    setModalBody(
      <div className="report-view-details">
        <p><strong>Title:</strong> {report.title}</p>
        <p><strong>Date Generated:</strong> {report.date}</p>
        <p><strong>Status:</strong> {report.status}</p>
        <p className="report-placeholder-text">
          This report contains dynamic aggregate data from the BIDMS system databases including resident counts, document processing metrics, and clearance issuances.
        </p>
      </div>
    );
    setModalOpen(true);
  };

  // Export filtered table data to CSV file
  const handleExportCSV = () => {
    if (filteredReports.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = ["Report Title,Date,Status\n"];
    const rows = filteredReports.map(r => `"${r.title}","${r.date}","${r.status}"\n`);
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BIDMS_Reports_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
        <TopHeader
          title="Reports"
          subtitle="Review summaries and performance insights."
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          searchPlaceholder="Search reports..."
          actions={<button type="button" className="action-button" onClick={handleOpenGenerateModal}><Plus className="search-icon" />Generate</button>}
        />

        <div className="content-area">
          <div className="hero-card">
            <div>
              <p className="eyebrow">REPORT CENTER</p>
              <h3>{reportsList.length} report{reportsList.length !== 1 ? 's' : ''} available</h3>
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
              <button type="button" className="secondary-btn" onClick={handleExportCSV}>
                <FileSpreadsheet className="nav-icon" /> Export
              </button>
            </div>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((item) => (
                    <tr key={item.id}>
                      <td className="report-title-cell">{item.title}</td>
                      <td>{item.date}</td>
                      <td>
                        <span className={`status-badge ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="action-buttons-group">
                          <button
                            type="button"
                            className="icon-btn view"
                            title="View Report"
                            onClick={() => handleViewReport(item)}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            className="icon-btn delete"
                            title="Delete Report"
                            onClick={() => handleDeleteReport(item.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-table-msg">
                      No reports found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Modal isOpen={modalOpen} title={modalTitle} onClose={() => setModalOpen(false)}>
        {modalTitle === 'Generate New Report' ? (
          <form onSubmit={handleAddReport} className="modal-form">
            <div className="form-group">
              <label>Report Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Q3 Demographic Summary"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="modal-input"
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                className="modal-input"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                className="modal-input"
              >
                <option value="Prepared">Prepared</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Ready">Ready</option>
              </select>
            </div>
            <button type="submit" className="modal-submit-btn">
              Generate Report
            </button>
          </form>
        ) : (
          modalBody
        )}
      </Modal>
    </div>
  );
}