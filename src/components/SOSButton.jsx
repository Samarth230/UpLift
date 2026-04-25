import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, MapPin, CheckCircle, Loader } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useToast } from './Toast';
import { DEMO_CENTER } from '../utils/demoZone';
import './SOSButton.css';

export default function SOSButton() {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [locationStatus, setLocationStatus] = useState('idle'); // idle | detecting | found | failed
  const [coords, setCoords] = useState(null);
  const [description, setDescription] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Detect location on modal open
  useEffect(() => {
    if (!isOpen) return;
    setLocationStatus('detecting');
    setSent(false);
    setDescription('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationStatus('found');
        },
        () => {
          setCoords({ lat: DEMO_CENTER.lat, lng: DEMO_CENTER.lng });
          setLocationStatus('failed');
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      setCoords({ lat: DEMO_CENTER.lat, lng: DEMO_CENTER.lng });
      setLocationStatus('failed');
    }
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    setIsSending(true);
    // Simulate sending SOS
    await new Promise(r => setTimeout(r, 1500));
    setIsSending(false);
    setSent(true);
    addToast(t('toast.sosAlert'), 'error', 5000);

    // Auto-close after success
    setTimeout(() => {
      setIsOpen(false);
      setSent(false);
    }, 3000);
  }, [addToast, t]);

  const handleClose = () => {
    setIsOpen(false);
    setSent(false);
  };

  return (
    <>
      {/* Floating SOS button */}
      <button
        className="sos-float-btn"
        onClick={() => setIsOpen(true)}
        title="Emergency SOS"
        id="sos-btn"
      >
        {t('sos.btnLabel')}
      </button>

      {/* SOS Modal */}
      {isOpen && (
        <div className="sos-overlay" onClick={handleClose}>
          <div className="sos-modal" onClick={(e) => e.stopPropagation()}>
            {sent ? (
              <div className="sos-modal-body">
                <div className="sos-success">
                  <div className="sos-success-icon">
                    <CheckCircle size={32} />
                  </div>
                  <h3>{t('sos.sent')}</h3>
                  <p>
                    {coords && `📍 ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="sos-modal-header">
                  <h2>{t('sos.title')}</h2>
                  <p>{t('sos.desc')}</p>
                </div>

                <div className="sos-modal-body">
                  {/* Location status */}
                  <div className={`sos-location-status ${locationStatus}`}>
                    {locationStatus === 'detecting' && (
                      <>
                        <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                        {t('sos.detecting')}
                      </>
                    )}
                    {locationStatus === 'found' && (
                      <>
                        <MapPin size={16} />
                        {t('sos.locationFound')} — {coords?.lat.toFixed(4)}, {coords?.lng.toFixed(4)}
                      </>
                    )}
                    {locationStatus === 'failed' && (
                      <>
                        <AlertTriangle size={16} />
                        {t('sos.locationFailed')}
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <textarea
                    className="sos-desc-input"
                    placeholder={t('sos.descPlaceholder')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  {/* Actions */}
                  <div className="sos-actions">
                    <button
                      className="sos-send-btn"
                      onClick={handleSend}
                      disabled={isSending || locationStatus === 'detecting'}
                    >
                      {isSending ? (
                        <>
                          <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                          {t('sos.sending')}
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={16} />
                          {t('sos.sendAlert')}
                        </>
                      )}
                    </button>
                    <button className="sos-cancel-btn" onClick={handleClose}>
                      {t('sos.cancel')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
