import React, { useState } from 'react';
import logoImage from './assets/Logo.png';

// 1. UPDATED HERE: Added { onLogin } prop
export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    keepSigned: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = formData.username.trim();
    const password = formData.password.trim();

    if (!username || !password) {
      setLoginError('Please enter both your username and password.');
      return;
    }

    setLoginError('');
    console.log('Logging in BIDMS user:', { username, password });

    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Left Banner Section */}
      <div style={styles.leftBanner}>
        <div style={styles.bannerContent}>
          {/* Header Seal / Logo */}
          <div style={styles.sealHeader}>
            <div style={styles.sealCircle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </div>
            <div>
              <div style={styles.republicText}>REPUBLIC OF THE PHILIPPINES</div>
              <div style={styles.lguText}>Local Government Unit</div>
            </div>
          </div>

          {/* Main Title */}
          <h1 style={styles.mainHeading}>
            Barangay <br />
            <span style={styles.goldText}>Information</span> <br />
            &amp; Document <br />
            <span style={styles.regularText}>Management System</span>
          </h1>

          {/* Subtitle */}
          <p style={styles.subText}>
            A unified digital platform for efficient barangay governance, resident record management, and document processing.
          </p>

          {/* Feature Badges */}
          <div style={styles.badgeGroup}>
            <span style={styles.badge}>Resident Records</span>
            <span style={styles.badge}>Document Requests</span>
            <span style={styles.badge}>Blotter Reports</span>
            <span style={styles.badge}>Certificates</span>
          </div>

          {/* Footer Metadata */}
          <div style={styles.leftFooter}>
            DILG-compliant • Secure &amp; Encrypted • Version 2.4.1
          </div>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div style={styles.rightSection}>
        <div style={styles.formContainer}>
          <img src={logoImage} alt="BIDMS Logo" style={styles.logoImage} />
          <p style={styles.welcomeSub}>
            Sign in to your official BIDMS account to continue.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Username Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>USERNAME / EMPLOYEE ID</label>
              <div style={styles.inputWrapper}>
                <span style={styles.icon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </span>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username or Employee ID"
                  value={formData.username}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div style={styles.inputGroup}>
              <div style={styles.passwordHeader}>
                <label style={styles.label}>PASSWORD</label>
                <a href="#forgot" style={styles.forgotLink}>Forgot password?</a>
              </div>
              <div style={styles.inputWrapper}>
                <span style={styles.icon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                </span>
              </div>
            </div>

            {/* Checkbox */}
            <div style={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="keepSigned"
                name="keepSigned"
                checked={formData.keepSigned}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <label htmlFor="keepSigned" style={styles.checkboxLabel}>Keep me signed in</label>
            </div>

            {/* Primary Sign In Button */}
            {loginError && <p style={styles.errorText}>{loginError}</p>}
            <button type="submit" style={styles.signInBtn}>
              Sign In to BIDMS &rarr;
            </button>
          </form>

          {/* Divider */}
          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>or</span>
            <span style={styles.dividerLine}></span>
          </div>

          {/* Secondary QR / PIN Button */}
          <button style={styles.qrBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" style={{ marginRight: '8px' }}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
            Sign in with QR Code / PIN
          </button>

          {/* Access Note */}
          <p style={styles.legalText}>
            Access restricted to authorized barangay personnel only.<br />
            Unauthorized access is a violation of <strong>RA 10173 (Data Privacy Act)</strong>.
          </p>
        </div>

        {/* Bottom Bar */}
        <div style={styles.rightFooter}>
          <span>© 2024 Barangay LGU - BIDMS</span>
          <span style={styles.statusDot}>
            <span style={styles.greenDot}></span> Systems Operational
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '100dvh',
    width: '100%',
    overflowX: 'hidden',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#ffffff',
  },

  /* Left Side Styling */
  leftBanner: {
    flex: '1 1 320px',
    minHeight: '320px',
    backgroundColor: '#0F2C59',
    backgroundImage: 'linear-gradient(135deg, #0A1E3F 0%, #153B75 100%)',
    color: '#ffffff',
    padding: '2.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  bannerContent: {
    maxWidth: '520px',
  },
  sealHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '3rem',
  },
  sealCircle: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: '1.5px solid #D4AF37',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  republicText: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '1.5px',
    color: '#D4AF37',
  },
  lguText: {
    fontSize: '0.85rem',
    color: '#94a3b8',
  },
  mainHeading: {
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
    lineHeight: '1.2',
    fontWeight: '700',
    marginBottom: '1.5rem',
  },
  goldText: {
    color: '#E0BA44',
  },
  regularText: {
    color: '#ffffff',
  },
  subText: {
    color: '#94a3b8',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    marginBottom: '2.5rem',
  },
  badgeGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '3rem',
  },
  badge: {
    border: '1px solid #29497A',
    borderRadius: '20px',
    padding: '6px 16px',
    fontSize: '0.8rem',
    color: '#cbd5e1',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  leftFooter: {
    borderTop: '1px solid #1e3a66',
    paddingTop: '1.5rem',
    fontSize: '0.75rem',
    color: '#64748b',
  },

  /* Right Side Styling */
  rightSection: {
    flex: '1 1 360px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2rem 1.5rem',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    minWidth: '280px',
  },
  formContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    width: '100%',
  },
  logoImage: {
    width: '150px',
    maxWidth: '100%',
    height: 'auto',
    margin: '0 auto 1rem auto',
    display: 'block',
  },
  welcomeSub: {
    color: '#64748b',
    fontSize: '0.875rem',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '1.25rem',
  },
  label: {
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
    color: '#475569',
    marginBottom: '0.5rem',
    display: 'block',
  },
  passwordHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotLink: {
    fontSize: '0.75rem',
    color: '#d97706',
    textDecoration: 'none',
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: '12px',
    display: 'flex',
  },
  eyeIcon: {
    position: 'absolute',
    right: '12px',
    cursor: 'pointer',
    display: 'flex',
  },
  input: {
    width: '100%',
    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '0.875rem',
    outline: 'none',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    boxSizing: 'border-box',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  checkbox: {
    marginRight: '8px',
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '0.85rem',
    color: '#475569',
    cursor: 'pointer',
  },
  errorText: {
    color: '#dc2626',
    fontSize: '0.8rem',
    marginBottom: '0.75rem',
  },
  signInBtn: {
    backgroundColor: '#0F2C59',
    color: '#ffffff',
    border: 'none',
    padding: '0.85rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(15, 44, 89, 0.2)',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem 0 1.5rem 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#f1f5f9',
  },
  dividerText: {
    padding: '0 10px',
    fontSize: '0.75rem',
    color: '#94a3b8',
  },
  qrBtn: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    color: '#1e293b',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2.5rem',
  },
  legalText: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: '1.5',
  },
  rightFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
    marginTop: '1.5rem',
    fontSize: '0.75rem',
    color: '#94a3b8',
  },
  statusDot: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  greenDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#22c55e',
  },
};