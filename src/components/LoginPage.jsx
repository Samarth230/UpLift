import { useState, useRef, useCallback } from 'react';
import {
  ArrowUpRight, ArrowLeft, Phone, Shield, HandHelping,
  CheckCircle, AlertCircle, Lock
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './LoginPage.css';

const NGO_DOMAINS = [
  'redcross.org', 'uplift.org', 'ngo.org', 'relief.org', 'disaster.org',
  'unicef.org', 'undp.org', 'care.org', 'worldvision.org',
  'staff.uplift.in', 'admin.uplift.in',
];

const DEMO_ORG_CODE = 'UPLIFT2026';

export default function LoginPage({ preselectedRole, onLogin, onBack }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [ngoEmail, setNgoEmail] = useState('');
  const [ngoCode, setNgoCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const otpRefs = useRef([]);

  const isNgo = preselectedRole === 'ngo';

  const handleSendOTP = useCallback(async () => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) { setError(t('login.phoneError')); return; }
    setError(''); setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false); setStep(2);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  }, [phone, t]);

  const handleVerifyOTP = useCallback(async () => {
    if (otp.join('').length !== 6) { setError(t('login.otpError')); return; }
    setError(''); setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false); setStep(3);
  }, [otp, t]);

  const handleOtpChange = useCallback((index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    if (newOtp.every(d => d !== '') && newOtp.join('').length === 6) {
      setTimeout(() => handleVerifyOTP(), 300);
    }
  }, [otp, handleVerifyOTP]);

  const handleOtpKeyDown = useCallback((index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  }, [otp]);

  const handleCompleteLogin = useCallback(async () => {
    if (!name.trim()) { setError(t('login.nameError')); return; }
    if (isNgo) {
      const hasValidEmail = ngoEmail.trim() !== '' && NGO_DOMAINS.some(d => ngoEmail.toLowerCase().endsWith(`@${d}`));
      const hasValidCode = ngoCode.trim().toUpperCase() === DEMO_ORG_CODE;
      if (!hasValidEmail && !hasValidCode) { setError(t('login.ngoError')); return; }
    }
    setError(''); setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setIsLoading(false); setShowSuccess(true);
    setTimeout(() => {
      onLogin({ phone: phone.replace(/\D/g, ''), name: name.trim(), role: preselectedRole, ngoEmail: isNgo ? ngoEmail : null, isNgoVerified: isNgo });
    }, 1500);
  }, [name, isNgo, ngoEmail, ngoCode, phone, preselectedRole, onLogin, t]);

  return (
    <div className="login-page">
      <div className="login-bg-orb" />
      <div className="login-bg-orb" />

      {/* Top-left logo */}
      <div className="login-top-bar">
        <button className="login-top-logo" onClick={onBack}>
          <div className="login-top-logo-icon">
            <ArrowUpRight size={18} color="white" strokeWidth={2.5} />
          </div>
          <span className="login-top-logo-text">{t('appName')}</span>
        </button>
      </div>

      {/* Centered form */}
      <div className="login-center">
        <div className="login-form-card">
          {showSuccess ? (
            <div className="login-success">
              <div className="login-success-icon"><CheckCircle size={36} /></div>
              <h3>{t('login.welcome')} {name}!</h3>
              <p>{t('login.redirecting')} {isNgo ? t('login.dashboard') : t('login.chat')}...</p>
            </div>
          ) : step === 1 ? (
            <>
              <button className="login-back-btn" onClick={onBack}>
                <ArrowLeft size={16} /> {t('login.backToRoles')}
              </button>
              <div className="login-role-badge">
                {isNgo ? <Shield size={14} /> : <HandHelping size={14} />}
                {t('login.signingAs')} <strong>{isNgo ? t('roles.ngo') : t('roles.volunteer')}</strong>
              </div>
              <h2 className="login-form-title">{t('login.signIn')}</h2>
              <p className="login-form-desc">{t('login.enterPhone')}</p>
              <div style={{ color: 'var(--accent)', fontSize: '13px', marginBottom: '12px', textAlign: 'center', fontWeight: '500' }}>
                💡 {t('login.demoPhoneHint')}
              </div>
              {error && <div className="login-error"><AlertCircle size={16} />{error}</div>}
              <div className="login-phone-group">
                <input className="login-country-code" value="+91" readOnly />
                <input className="login-phone-input" type="tel" placeholder={t('login.phonePlaceholder')} value={phone} onChange={(e) => setPhone(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()} maxLength={12} id="phone-input" autoFocus />
              </div>
              <button className="login-submit-btn" onClick={handleSendOTP} disabled={isLoading || phone.replace(/\D/g, '').length < 10}>
                {isLoading ? t('login.sendingOtp') : <><Phone size={18} />{t('login.sendOtp')}</>}
              </button>
              <div className="login-footer"><Lock size={12} />{t('login.secureData')}</div>
            </>
          ) : step === 2 ? (
            <>
              <button className="login-back-btn" onClick={() => { setStep(1); setOtp(['','','','','','']); setError(''); }}>
                <ArrowLeft size={16} /> {t('login.back')}
              </button>
              <h2 className="login-form-title">{t('login.verifyOtp')}</h2>
              <p className="login-form-desc">{t('login.enterOtp')} +91 {phone}</p>
              <div style={{ color: 'var(--accent)', fontSize: '13px', marginBottom: '12px', textAlign: 'center', fontWeight: '500' }}>
                💡 {t('login.demoOtpHint')}
              </div>
              {error && <div className="login-error"><AlertCircle size={16} />{error}</div>}
              <div className="login-otp-group">
                {otp.map((digit, i) => (
                  <input key={i} ref={(el) => (otpRefs.current[i] = el)} className="login-otp-digit" type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)} id={`otp-digit-${i}`} />
                ))}
              </div>
              <button className="login-submit-btn" onClick={handleVerifyOTP} disabled={isLoading || otp.join('').length !== 6}>
                {isLoading ? t('login.verifying') : t('login.verifyContinue')}
              </button>
              <div className="login-otp-footer">
                <span className="login-otp-resend">
                  {t('login.didntReceive')}
                  <button onClick={() => { setOtp(['','','','','','']); setStep(1); }}>{t('login.resend')}</button>
                </span>
              </div>
            </>
          ) : (
            <>
              <button className="login-back-btn" onClick={() => { setStep(2); setError(''); }}>
                <ArrowLeft size={16} /> {t('login.back')}
              </button>
              <h2 className="login-form-title">{isNgo ? t('login.verifyIdentity') : t('login.almostThere')}</h2>
              <p className="login-form-desc">{isNgo ? t('login.enterDetails') : t('login.enterName')}</p>
              <div style={{ color: 'var(--accent)', fontSize: '13px', marginBottom: '12px', textAlign: 'center', fontWeight: '500' }}>
                💡 {t('login.demoNameHint')}
              </div>
              {error && <div className="login-error"><AlertCircle size={16} />{error}</div>}
              <input className="login-name-input" type="text" placeholder={t('login.namePlaceholder')} value={name} onChange={(e) => setName(e.target.value)} id="name-input" autoFocus />
              {isNgo && (
                <div className="login-ngo-section">
                  <div className="login-ngo-label"><Shield size={12} /> {t('login.ngoVerification')}</div>
                  <input className="login-ngo-input" type="email" placeholder={t('login.ngoEmailPlaceholder')} value={ngoEmail} onChange={(e) => setNgoEmail(e.target.value)} id="ngo-email-input" />
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, margin: '10px 0 0' }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 10 }}>{t('login.or')}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: 'var(--accent)', fontSize: '12px', marginBottom: '6px', fontWeight: '500' }}>
                        💡 {t('login.demoNgoHint')}
                      </div>
                      <input className="login-ngo-input" type="text" placeholder={t('login.orgCodePlaceholder')} value={ngoCode} onChange={(e) => setNgoCode(e.target.value)} id="ngo-code-input" />
                    </div>
                  </div>
                  <p className="login-ngo-hint">{t('login.ngoHint')}</p>
                </div>
              )}
              <button className="login-submit-btn" onClick={handleCompleteLogin} disabled={isLoading || !name.trim()}>
                {isLoading ? t('login.settingUp') : <><CheckCircle size={18} />{isNgo ? t('login.accessDashboard') : t('roles.startHelping')}</>}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
