/**
 * Export reports to CSV and trigger browser download
 */
export function exportReportsToCSV(reports, filename = 'uplift_reports.csv') {
  if (!reports || reports.length === 0) return false;

  const headers = [
    'ID',
    'Category',
    'Location',
    'Urgency Score',
    'Status',
    'Summary',
    'Reported By',
    'Timestamp',
    'Latitude',
    'Longitude',
    'Extracted Text'
  ];

  const rows = reports.map(r => [
    r.id || '',
    r.category || '',
    r.locationName || '',
    r.urgencyScore || '',
    r.status || '',
    `"${(r.summary || '').replace(/"/g, '""')}"`,
    r.reportedBy || 'Anonymous',
    r.timestamp instanceof Date
      ? r.timestamp.toISOString()
      : r.timestamp || '',
    r.coordinates?.lat || '',
    r.coordinates?.lng || '',
    `"${(r.extractedText || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Add BOM for Excel Unicode support
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return true;
}
