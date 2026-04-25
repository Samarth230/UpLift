import { useLanguage } from '../i18n/LanguageContext';
import './StatusBadge.css';

export function StatusBadge({ status }) {
  const { t } = useLanguage();
  return (
    <span className={`status-badge status-${status}`}>
      {t(`status.${status}`) || status}
    </span>
  );
}

export function UrgencyBadge({ score }) {
  const { t } = useLanguage();
  const label = t(`urgency.${score}`) || score;
  return (
    <span className={`urgency-badge urgency-${score}`}>
      {score}/5 · {label}
    </span>
  );
}
