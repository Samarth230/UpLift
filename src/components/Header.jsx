import { ArrowUpRight, Camera, LogOut, Shield, HandHelping, Download, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './Header.css';

export default function Header({ role, userName, onUploadClick, onRoleSwitch, onExportCSV }) {
  const { lang, toggleLang, t } = useLanguage();
  const initials = userName
    ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="header-logo">
          <ArrowUpRight size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="header-title">{t('appName')}</h1>
        </div>
      </div>

      <div className="header-actions">
        {/* Language toggle */}
        <button
          className="header-btn header-btn-lang"
          onClick={toggleLang}
          title={lang === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
          id="lang-toggle-btn"
        >
          <Globe size={15} />
          {lang === 'en' ? 'हिन्दी' : 'EN'}
        </button>

        {role === 'ngo' && (
          <>
            <button
              className="header-btn header-btn-ghost"
              onClick={onExportCSV}
              title={t('header.exportCsv')}
              id="export-csv-btn"
            >
              <Download size={15} />
            </button>

            <button
              className="header-btn header-btn-primary"
              onClick={onUploadClick}
              id="upload-report-btn"
            >
              <Camera size={16} />
              {t('header.uploadPhotos')}
            </button>
          </>
        )}

        <div className="header-role-indicator">
          {role === 'ngo' ? <Shield size={13} /> : <HandHelping size={13} />}
          {role === 'ngo' ? t('roles.ngo') : t('roles.volunteer')}
        </div>

        <button
          className="header-btn header-btn-ghost"
          onClick={onRoleSwitch}
          title={t('header.switchRole')}
          id="switch-role-btn"
        >
          <LogOut size={15} />
        </button>

        <div className="header-avatar" title={userName || 'User'}>
          {initials}
        </div>
      </div>
    </header>
  );
}
