import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DEMO_CENTER, URGENCY_COLORS, URGENCY_LABELS } from '../utils/demoZone';
import './MapView.css';

// Fix default marker icon issue with webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Create color-coded marker icons
function createMarkerIcon(urgencyScore) {
  const color = URGENCY_COLORS[urgencyScore] || '#9CA3AF';
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="custom-marker urgency-${urgencyScore}" style="background:${color}">${urgencyScore}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -20]
  });
}

// Map center updater when selectedReport changes
function MapCenterUpdater({ selectedReport }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedReport?.coordinates) {
      map.flyTo(
        [selectedReport.coordinates.lat, selectedReport.coordinates.lng],
        16,
        { duration: 0.8 }
      );
    }
  }, [selectedReport, map]);

  return null;
}

const CATEGORY_EMOJI = {
  'Flooding': '🌊',
  'Building Collapse': '🏚️',
  'Road Damage': '🛣️',
  'Power Outage': '⚡',
  'Water Contamination': '💧',
  'Fallen Tree': '🌳',
  'Gas Leak': '💨',
  'Fire': '🔥',
  'Medical Emergency': '🏥',
  'Other': '📋'
};

export default function MapView({ reports = [], selectedReport, onReportClick, compact = false }) {
  const center = [DEMO_CENTER.lat, DEMO_CENTER.lng];
  
  // Count stats
  const totalActive = reports.filter(r => r.status !== 'failed').length;
  const criticalCount = reports.filter(r => r.urgencyScore >= 4).length;

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={compact ? 14 : 14}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
        zoomControl={!compact}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapCenterUpdater selectedReport={selectedReport} />

        {reports.map((report) => {
          if (!report.coordinates) return null;
          const { lat, lng } = report.coordinates;
          const emoji = CATEGORY_EMOJI[report.category] || '📋';

          return (
            <Marker
              key={report.id}
              position={[lat, lng]}
              icon={createMarkerIcon(report.urgencyScore)}
              eventHandlers={{
                click: () => onReportClick?.(report)
              }}
            >
              <Popup>
                <div className="map-popup">
                  <div className="map-popup-category">
                    <span>{emoji}</span>
                    <strong>{report.category}</strong>
                  </div>
                  <div className="map-popup-summary">
                    {report.summary || report.extractedText?.slice(0, 100) + '...'}
                  </div>
                  <div className="map-popup-meta">
                    <span>
                      Urgency: {report.urgencyScore}/5 ({URGENCY_LABELS[report.urgencyScore]})
                    </span>
                    <span>{report.reportedBy}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Stats overlay */}
      {!compact && (
        <div className="map-stats">
          <div className="map-stat">
            <div className="map-stat-value">{totalActive}</div>
            <div className="map-stat-label">Reports</div>
          </div>
          <div className="map-stat">
            <div className="map-stat-value" style={{ color: 'var(--danger)' }}>{criticalCount}</div>
            <div className="map-stat-label">Critical</div>
          </div>
        </div>
      )}

      {/* Legend */}
      {!compact && (
        <div className="map-legend">
          <h4>Urgency</h4>
          {[5, 4, 3, 2, 1].map(u => (
            <div key={u} className="map-legend-item">
              <div className="map-legend-dot" style={{ background: URGENCY_COLORS[u] }} />
              <span>{u} — {URGENCY_LABELS[u]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
