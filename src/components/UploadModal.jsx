import { Upload, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { useUpload } from '../hooks/useUpload';
import { StatusBadge } from './StatusBadge';
import { useLanguage } from '../i18n/LanguageContext';
import './UploadModal.css';

export default function UploadModal({ isOpen, onClose, onReportCreated }) {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [reporterName, setReporterName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [done, setDone] = useState(false);
  const fileInputRef = useRef(null);
  const { uploadState, simulateUpload, resetUpload } = useUpload();

  const handleFileSelect = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files[0]);
  }, [handleFileSelect]);

  const handleSubmit = async () => {
    if (!selectedFile) return;
    const result = await simulateUpload(selectedFile, reporterName || 'Anonymous');
    if (result.success) {
      setDone(true);
      if (onReportCreated && result.report) onReportCreated(result.report);
    }
  };

  const handleClose = () => {
    setSelectedFile(null); setPreviewUrl(null); setReporterName(''); setDone(false); resetUpload(); onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="upload-overlay" onClick={handleClose}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="upload-modal-header">
          <h2>{t('upload.title')}</h2>
          <button className="upload-close-btn" onClick={handleClose}><X size={20} /></button>
        </div>
        <div className="upload-modal-body">
          {done ? (
            <div className="upload-success">
              <div className="upload-success-icon"><CheckCircle size={32} /></div>
              <h3>{t('upload.successTitle')}</h3>
              <p>{t('upload.successDesc')}</p>
              <button className="upload-submit-btn" onClick={handleClose} style={{ marginTop: '24px' }}>{t('upload.done')}</button>
            </div>
          ) : (
            <>
              {uploadState.error && <div className="upload-error"><AlertCircle size={16} />{uploadState.error}</div>}
              {!selectedFile ? (
                <div className={`upload-dropzone ${isDragOver ? 'dragover' : ''}`} onClick={() => fileInputRef.current?.click()} onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }} onDragLeave={() => setIsDragOver(false)}>
                  <div className="upload-dropzone-icon"><Upload size={40} /></div>
                  <h3>{t('upload.dropTitle')}</h3>
                  <p>{t('upload.dropDesc')}</p>
                  <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileSelect(e.target.files[0])} />
                </div>
              ) : (
                <div className="upload-preview">
                  <img src={previewUrl} alt="Report preview" />
                  {!uploadState.isUploading && <button className="upload-preview-remove" onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}><X size={14} /></button>}
                </div>
              )}
              {selectedFile && !uploadState.isUploading && (
                <input className="upload-name-input" type="text" placeholder={t('upload.namePlaceholder')} value={reporterName} onChange={(e) => setReporterName(e.target.value)} />
              )}
              {uploadState.isUploading && (
                <div className="upload-progress">
                  <div className="upload-progress-bar"><div className="upload-progress-fill" style={{ width: `${uploadState.progress}%` }} /></div>
                  <div className="upload-progress-label">
                    <span className="upload-progress-status"><Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /><StatusBadge status={uploadState.status} /></span>
                    <span className="upload-progress-percent">{uploadState.progress}%</span>
                  </div>
                </div>
              )}
              {selectedFile && !uploadState.isUploading && (
                <button className="upload-submit-btn" onClick={handleSubmit} disabled={!selectedFile}><Upload size={18} />{t('upload.submitBtn')}</button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
