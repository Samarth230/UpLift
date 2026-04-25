import { X, Brain, Check, XCircle, MapPin, Clock, User, AlertTriangle } from 'lucide-react';
import { StatusBadge, UrgencyBadge } from './StatusBadge';
import { useLanguage } from '../i18n/LanguageContext';
import './InsightModal.css';

function formatTime(date, lang) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  const locale = lang === 'hi' ? 'hi-IN' : 'en-IN';
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}

export default function InsightModal({ report, onClose, onVerify, onReject }) {
  const { lang, t } = useLanguage();
  if (!report) return null;

  const categoryLabel = t(`categories.${report.category}`) || report.category;

  return (
    <div className="insight-overlay" onClick={onClose}>
      <div className="insight-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="insight-header">
          <h2>
            <Brain size={20} color="var(--accent)" />
            {t('insight.title')}
          </h2>
          <button className="insight-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="insight-body">
          {report.imageUrl && (
            <img src={report.imageUrl} alt="Report" className="insight-image" />
          )}

          <div className="insight-meta-grid" style={{ marginBottom: '24px' }}>
            <div className="insight-meta-item">
              <label>{t('insight.category')}</label>
              <span>{categoryLabel || t('misc.unknown')}</span>
            </div>
            <div className="insight-meta-item">
              <label>{t('insight.urgency')}</label>
              <UrgencyBadge score={report.urgencyScore} />
            </div>
            <div className="insight-meta-item">
              <label>{t('insight.status')}</label>
              <StatusBadge status={report.status} />
            </div>
            <div className="insight-meta-item">
              <label>{t('insight.location')}</label>
              <span style={{ fontSize: 'var(--font-sm)' }}>
                <MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />
                {report.locationName || t('misc.unknown')}
              </span>
            </div>
          </div>

          {report.summary && (
            <div className="insight-section">
              <div className="insight-section-label">
                <AlertTriangle size={12} style={{ display: 'inline', marginRight: 4 }} />
                {t('insight.aiSummary')}
              </div>
              <div className="insight-section-content">{report.summary}</div>
            </div>
          )}

          <div className="insight-section">
            <div className="insight-section-label">
              <Brain size={12} style={{ display: 'inline', marginRight: 4 }} />
              {t('insight.extractedText')}
            </div>
            <div className="insight-extracted-text">
              "{report.extractedText || t('insight.noText')}"
            </div>
          </div>

          <div className="insight-section">
            <div className="insight-section-label">{t('insight.reportDetails')}</div>
            <div className="insight-meta-grid">
              <div className="insight-meta-item">
                <label>{t('insight.reportedBy')}</label>
                <span style={{ fontSize: 'var(--font-sm)' }}>
                  <User size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {report.reportedBy || t('insight.anonymous')}
                </span>
              </div>
              <div className="insight-meta-item">
                <label>{t('insight.timestamp')}</label>
                <span style={{ fontSize: 'var(--font-sm)' }}>
                  <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {formatTime(report.timestamp, lang) || t('insight.na')}
                </span>
              </div>
            </div>
          </div>

          {report.coordinates && (
            <div className="insight-section">
              <div className="insight-section-label">{t('insight.coordinates')}</div>
              <div className="insight-section-content" style={{ fontFamily: 'monospace', fontSize: 'var(--font-sm)' }}>
                {report.coordinates.lat?.toFixed(4)}, {report.coordinates.lng?.toFixed(4)}
              </div>
            </div>
          )}
        </div>

        {report.status === 'pending' && (
          <div className="insight-actions">
            <button className="insight-verify-btn" onClick={() => { onVerify?.(report.id); onClose(); }}>
              <Check size={16} /> {t('insight.verifyReport')}
            </button>
            <button className="insight-reject-btn" onClick={() => { onReject?.(report.id); onClose(); }}>
              <XCircle size={16} /> {t('insight.rejectReport')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
