import { Check, XCircle, Brain, User, Clock } from 'lucide-react';
import { StatusBadge, UrgencyBadge } from './StatusBadge';
import { useLanguage } from '../i18n/LanguageContext';
import './ReportCard.css';

const CATEGORY_EMOJI = {
  'Flooding': '🌊', 'Building Collapse': '🏚️', 'Road Damage': '🛣️',
  'Power Outage': '⚡', 'Water Contamination': '💧', 'Fallen Tree': '🌳',
  'Gas Leak': '💨', 'Fire': '🔥', 'Medical Emergency': '🏥', 'Other': '📋',
};

const CATEGORY_COLORS = {
  'Flooding': '#3B82F6', 'Building Collapse': '#EF4444', 'Road Damage': '#F97316',
  'Power Outage': '#8B5CF6', 'Water Contamination': '#06B6D4', 'Fallen Tree': '#10B981',
  'Gas Leak': '#F59E0B', 'Fire': '#EF4444', 'Medical Emergency': '#EC4899', 'Other': '#6B7280',
};

function timeAgo(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 60) return `${diffMinutes}m`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h`;
  return `${Math.floor(diffHours / 24)}d`;
}

export default function ReportCard({ report, index = 0, onInsightClick, onVerify, onReject }) {
  const { t } = useLanguage();
  const emoji = CATEGORY_EMOJI[report.category] || '📋';
  const bgColor = CATEGORY_COLORS[report.category] || '#6B7280';
  const categoryLabel = t(`categories.${report.category}`) || report.category;

  return (
    <div
      className="report-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Thumbnail */}
      {report.imageUrl ? (
        <div className="report-card-thumb">
          <img src={report.imageUrl} alt={categoryLabel} />
        </div>
      ) : (
        <div className="report-card-thumb report-card-thumb-placeholder" style={{ background: `${bgColor}15` }}>
          <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
        </div>
      )}

      {/* Content */}
      <div className="report-card-body">
        <div className="report-card-header">
          <h3 className="report-card-title">{categoryLabel} {t('insight.location') !== 'Location' ? 'में' : 'in'} {report.locationName}</h3>
          <UrgencyBadge score={report.urgencyScore} />
        </div>

        <div className="report-card-meta">
          <span><User size={11} /> {report.reportedBy || t('insight.anonymous')}</span>
          <span><Clock size={11} /> {timeAgo(report.timestamp)} {t('report.ago')}</span>
        </div>

        {/* Actions */}
        <div className="report-card-footer">
          <div className="report-card-actions">
            {onVerify && (
              <button className="btn-verify" onClick={(e) => { e.stopPropagation(); onVerify(report.id); }}>
                <Check size={14} /> {t('report.verify')}
              </button>
            )}
            {onReject && (
              <button className="btn-reject" onClick={(e) => { e.stopPropagation(); onReject(report.id); }}>
                <XCircle size={14} /> {t('report.reject')}
              </button>
            )}
          </div>
          <button className="report-card-insight-btn" onClick={(e) => { e.stopPropagation(); onInsightClick?.(report); }}>
            <Brain size={14} /> {t('report.insightTrace')}
          </button>
        </div>
      </div>
    </div>
  );
}
