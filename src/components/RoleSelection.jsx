import { useState, useEffect } from 'react';
import { Shield, HandHelping, ArrowRight, ArrowUpRight, Lock, MapPin, Brain, Zap, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './RoleSelection.css';

function useCounter(target, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export default function RoleSelection({ onSelectRole }) {
  const { t } = useLanguage();
  const reportsCount = useCounter(2847);
  const volunteersCount = useCounter(512);
  const resolvedCount = useCounter(1923);

  return (
    <div className="role-selection">
      <div className="role-bg-orb" />
      <div className="role-bg-orb" />
      <div className="role-bg-orb" />

      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }} />
        ))}
      </div>

      <div className="role-selection-inner">
        <div className="role-logo">
          <ArrowUpRight size={30} color="white" strokeWidth={2.5} />
        </div>
        <h1 className="role-heading">{t('appName')}</h1>
        <p className="role-subheading">{t('tagline')}</p>

        <div className="role-stats-bar">
          <div className="role-stat">
            <AlertTriangle size={14} />
            <span className="role-stat-value">{reportsCount.toLocaleString()}</span>
            <span className="role-stat-label">{t('landing.reportsFiled')}</span>
          </div>
          <div className="role-stat-divider" />
          <div className="role-stat">
            <Users size={14} />
            <span className="role-stat-value">{volunteersCount.toLocaleString()}</span>
            <span className="role-stat-label">{t('landing.volunteersActive')}</span>
          </div>
          <div className="role-stat-divider" />
          <div className="role-stat">
            <CheckCircle2 size={14} />
            <span className="role-stat-value">{resolvedCount.toLocaleString()}</span>
            <span className="role-stat-label">{t('landing.issuesResolved')}</span>
          </div>
        </div>

        <div className="role-cards">
          <button className="role-card ngo" onClick={() => onSelectRole('ngo')} id="role-ngo-btn">
            <div className="role-card-icon"><Shield size={26} /></div>
            <h2 className="role-card-title">{t('roles.ngo')}</h2>
            <p className="role-card-desc">{t('roles.ngoDesc')}</p>
            <div className="role-card-features">
              <span><MapPin size={12} /> {t('roles.ngoFeature1')}</span>
              <span><Brain size={12} /> {t('roles.ngoFeature2')}</span>
              <span><Zap size={12} /> {t('roles.ngoFeature3')}</span>
            </div>
            <span className="role-card-action">
              {t('roles.openDashboard')} <ArrowRight size={16} />
            </span>
          </button>

          <button className="role-card volunteer" onClick={() => onSelectRole('volunteer')} id="role-volunteer-btn">
            <div className="role-card-icon"><HandHelping size={26} /></div>
            <h2 className="role-card-title">{t('roles.volunteer')}</h2>
            <p className="role-card-desc">{t('roles.volunteerDesc')}</p>
            <div className="role-card-features">
              <span><Brain size={12} /> {t('roles.volFeature1')}</span>
              <span><MapPin size={12} /> {t('roles.volFeature2')}</span>
              <span><Users size={12} /> {t('roles.volFeature3')}</span>
            </div>
            <span className="role-card-action">
              {t('roles.startHelping')} <ArrowRight size={16} />
            </span>
          </button>
        </div>

        <div className="role-footer">
          <Lock size={14} />
          {t('landing.secureFooter')}
        </div>
      </div>
    </div>
  );
}
