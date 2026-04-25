import { useState, useCallback } from 'react';
import { Inbox, Brain, AlertCircle } from 'lucide-react';
import MapView from '../components/MapView';
import ReportCard from '../components/ReportCard';
import InsightModal from '../components/InsightModal';
import { useReports } from '../hooks/useReports';
import { useToast } from '../components/Toast';
import { useLanguage } from '../i18n/LanguageContext';
import './NGODashboard.css';

export default function NGODashboard() {
  const {
    reports, pendingReports, verifiedReports, allActiveReports,
    loading, usingLocal,
    verifyReport, rejectReport
  } = useReports();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState('pending');
  const [selectedReport, setSelectedReport] = useState(null);
  const [insightReport, setInsightReport] = useState(null);

  const handleVerify = useCallback((id) => {
    verifyReport(id);
    addToast(t('toast.reportVerified'), 'success');
  }, [verifyReport, addToast, t]);

  const handleReject = useCallback((id) => {
    rejectReport(id);
    addToast(t('toast.reportRejected'), 'warning');
  }, [rejectReport, addToast, t]);

  const displayReports = activeTab === 'pending' ? pendingReports :
    activeTab === 'verified' ? verifiedReports : allActiveReports;

  return (
    <div className="ngo-dashboard">
      {/* Map Section */}
      <div className="ngo-map-section">
        <MapView
          reports={allActiveReports}
          selectedReport={selectedReport}
          onReportClick={(r) => {
            setSelectedReport(r);
            setInsightReport(r);
          }}
        />
      </div>

      {/* Queue Section */}
      <div className="ngo-queue-section">
        <div className="ngo-queue-header">
          <h2 className="ngo-queue-title">{t('dashboard.verificationQueue')}</h2>
          <div className="ngo-queue-count">
            <AlertCircle size={12} />
            {pendingReports.length} {t('dashboard.pending')}
          </div>
        </div>

        {/* Tabs */}
        <div className="ngo-queue-tabs">
          <button
            className={`ngo-queue-tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            {t('dashboard.pending')} ({pendingReports.length})
          </button>
          <button
            className={`ngo-queue-tab ${activeTab === 'verified' ? 'active' : ''}`}
            onClick={() => setActiveTab('verified')}
          >
            {t('dashboard.verified')} ({verifiedReports.length})
          </button>
          <button
            className={`ngo-queue-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            {t('dashboard.all')} ({allActiveReports.length})
          </button>
        </div>

        {/* Report list */}
        <div className="ngo-queue-list">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="report-skeleton">
                <div className="skeleton-thumb" />
                <div className="skeleton-lines">
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                </div>
              </div>
            ))
          ) : displayReports.length === 0 ? (
            <div className="ngo-queue-empty">
              <div className="ngo-queue-empty-icon">
                <Inbox size={28} />
              </div>
              <h3>{t('dashboard.noReports').replace('{tab}', activeTab === 'pending' ? t('dashboard.pending').toLowerCase() : t('dashboard.verified').toLowerCase())}</h3>
              <p>
                {activeTab === 'pending'
                  ? t('dashboard.allReviewed')
                  : t('dashboard.noCategory')}
              </p>
            </div>
          ) : (
            displayReports.map((report, index) => (
              <ReportCard
                key={report.id}
                report={report}
                index={index}
                onInsightClick={(r) => setInsightReport(r)}
                onVerify={activeTab === 'pending' ? handleVerify : undefined}
                onReject={activeTab === 'pending' ? handleReject : undefined}
              />
            ))
          )}
        </div>

        <div className="ngo-queue-footer">
          <Brain size={12} />
          {usingLocal ? t('dashboard.demoData') : t('dashboard.liveData')}
        </div>
      </div>

      {/* Insight Modal */}
      {insightReport && (
        <InsightModal
          report={insightReport}
          onClose={() => setInsightReport(null)}
          onVerify={handleVerify}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
