import { Bell, Search } from 'lucide-react';
import './TopHeader.css';

export default function TopHeader({
  title,
  subtitle,
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search residents, docs...',
  actions,
  printHide = false,
}) {
  return (
    <header className={`app-top-header ${printHide ? 'print-hide' : ''}`}>
      <div className="app-header-copy">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="app-header-actions">
        {actions}
        <div className="app-header-search">
          <Search aria-hidden="true" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery ?? ''}
            onChange={onSearchChange}
            aria-label={searchPlaceholder}
          />
        </div>
        <button type="button" className="app-notification-button" title="Notifications" aria-label="Notifications">
          <Bell aria-hidden="true" />
          <span className="app-notification-dot" />
        </button>
        <div className="app-header-avatar" title="Juan Cruz" aria-label="Juan Cruz">
          JC
        </div>
      </div>
    </header>
  );
}
