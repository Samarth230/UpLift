import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { SEED_REPORTS } from '../utils/demoZone';

/**
 * Real-time Firestore listener for reports collection.
 * Falls back to seed data if Firebase is not configured or fails.
 */
export function useReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingLocal, setUsingLocal] = useState(false);

  useEffect(() => {
    // Check if Firebase is configured (not placeholder)
    const isConfigured = db && !db._databaseId?.projectId?.includes('YOUR_PROJECT_ID');

    if (!isConfigured) {
      // Use local seed data
      console.info('Firebase not configured. Using local seed data.');
      setReports(SEED_REPORTS);
      setLoading(false);
      setUsingLocal(true);
      return;
    }

    // Real Firestore listener
    try {
      const q = query(
        collection(db, 'reports'),
        orderBy('timestamp', 'desc')
      );

      const unsubscribe = onSnapshot(q,
        (snapshot) => {
          const docs = snapshot.docs.map(d => ({
            id: d.id,
            ...d.data(),
            timestamp: d.data().timestamp?.toDate?.() || new Date(d.data().timestamp)
          }));
          
          // Merge Firestore docs with seed data (seed data as fallback if Firestore is empty)
          if (docs.length === 0) {
            setReports(SEED_REPORTS);
            setUsingLocal(true);
          } else {
            setReports(docs);
            setUsingLocal(false);
          }
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Firestore listener error:', err);
          setError(err.message);
          setReports(SEED_REPORTS);
          setUsingLocal(true);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Failed to set up Firestore listener:', err);
      setReports(SEED_REPORTS);
      setUsingLocal(true);
      setLoading(false);
    }
  }, []);

  // Verify a report
  const verifyReport = async (reportId) => {
    if (usingLocal) {
      setReports(prev => prev.map(r =>
        r.id === reportId ? { ...r, status: 'verified', verifiedAt: new Date() } : r
      ));
      return;
    }
    try {
      await updateDoc(doc(db, 'reports', reportId), {
        status: 'verified',
        verifiedAt: new Date()
      });
    } catch (err) {
      console.error('Failed to verify report:', err);
    }
  };

  // Reject a report
  const rejectReport = async (reportId, reason = '') => {
    if (usingLocal) {
      setReports(prev => prev.map(r =>
        r.id === reportId ? { ...r, status: 'failed', errorMessage: reason } : r
      ));
      return;
    }
    try {
      await updateDoc(doc(db, 'reports', reportId), {
        status: 'failed',
        errorMessage: reason
      });
    } catch (err) {
      console.error('Failed to reject report:', err);
    }
  };

  // Update a report's fields
  const updateReport = async (reportId, updates) => {
    if (usingLocal) {
      setReports(prev => prev.map(r =>
        r.id === reportId ? { ...r, ...updates } : r
      ));
      return;
    }
    try {
      await updateDoc(doc(db, 'reports', reportId), updates);
    } catch (err) {
      console.error('Failed to update report:', err);
    }
  };

  // Filter helpers
  const pendingReports = reports.filter(r => r.status === 'pending');
  const verifiedReports = reports.filter(r => r.status === 'verified');
  const allActiveReports = reports.filter(r => r.status !== 'failed');

  return {
    reports,
    pendingReports,
    verifiedReports,
    allActiveReports,
    loading,
    error,
    usingLocal,
    verifyReport,
    rejectReport,
    updateReport
  };
}
