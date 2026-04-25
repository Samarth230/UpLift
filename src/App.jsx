import { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { useLanguage } from './i18n/LanguageContext';
import { useToast } from './components/Toast';
import RoleSelection from './components/RoleSelection';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import UploadModal from './components/UploadModal';
import SOSButton from './components/SOSButton';
import NGODashboard from './pages/NGODashboard';
import VolunteerChat from './pages/VolunteerChat';
import { exportReportsToCSV } from './utils/exportCSV';
import { SEED_REPORTS } from './utils/demoZone';
import './App.css';

// Persist user session in localStorage
function getStoredUser() {
  try {
    const stored = localStorage.getItem('uplift_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function storeUser(user) {
  if (user) {
    localStorage.setItem('uplift_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('uplift_user');
  }
}

export default function App() {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [user, setUser] = useState(getStoredUser);
  const [pendingRole, setPendingRole] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const handleSelectRole = useCallback((role) => {
    setPendingRole(role);
  }, []);

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    storeUser(userData);
    setPendingRole(null);
  }, []);

  const handleBackToLanding = useCallback(() => {
    setPendingRole(null);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    storeUser(null);
    setPendingRole(null);
  }, []);

  const handleReportCreated = useCallback((report) => {
    console.log('New report created:', report);
  }, []);

  const handleExportCSV = useCallback(() => {
    const success = exportReportsToCSV(SEED_REPORTS);
    if (success) {
      addToast(t('toast.csvExported'), 'success');
    }
  }, [addToast, t]);

  // Screen 1: Landing
  if (!user && !pendingRole) {
    return <RoleSelection onSelectRole={handleSelectRole} />;
  }

  // Screen 2: Login
  if (!user && pendingRole) {
    return (
      <LoginPage
        preselectedRole={pendingRole}
        onLogin={handleLogin}
        onBack={handleBackToLanding}
      />
    );
  }

  const role = user.role;

  return (
    <div className="app-transition">
      <Header
        role={role}
        userName={user.name}
        onUploadClick={() => setShowUpload(true)}
        onRoleSwitch={handleLogout}
        onExportCSV={handleExportCSV}
      />

      {role === 'ngo' ? (
        <NGODashboard />
      ) : (
        <VolunteerChat userName={user.name} />
      )}

      <UploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onReportCreated={handleReportCreated}
      />

      {/* SOS emergency button */}
      <SOSButton />

      {/* Role switch hint */}
      <div className="app-role-hint" onClick={handleLogout}>
        <RefreshCw size={12} />
        {t('misc.switchHint')}
      </div>
    </div>
  );
}
