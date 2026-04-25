// ============================================
// Demo Zone: Indiranagar, Bangalore
// 25 pre-seeded reports within a 2km radius
// ============================================

// Center of the demo zone
export const DEMO_CENTER = { lat: 12.9784, lng: 77.6408 };
export const DEMO_RADIUS_KM = 2;

// Categories used across the app
export const CATEGORIES = [
  'Flooding',
  'Building Collapse',
  'Road Damage',
  'Power Outage',
  'Water Contamination',
  'Fallen Tree',
  'Gas Leak',
  'Fire',
  'Medical Emergency',
  'Other'
];

// Urgency labels
export const URGENCY_LABELS = {
  5: 'Critical',
  4: 'Severe',
  3: 'Moderate',
  2: 'Minor',
  1: 'Low'
};

export const URGENCY_COLORS = {
  5: '#EF4444',
  4: '#F97316',
  3: '#F59E0B',
  2: '#3B82F6',
  1: '#9CA3AF'
};

// Helper to generate a random point within radius of center
function randomPointInRadius(center, radiusKm) {
  const radiusDeg = radiusKm / 111.32;
  const angle = Math.random() * 2 * Math.PI;
  const r = radiusDeg * Math.sqrt(Math.random());
  return {
    lat: center.lat + r * Math.cos(angle),
    lng: center.lng + r * Math.sin(angle) / Math.cos(center.lat * Math.PI / 180)
  };
}

// Generate back-dated timestamps (spread over 48 hours)
function hoursAgo(hours) {
  return new Date(Date.now() - hours * 60 * 60 * 1000);
}

// The 25 pre-seeded reports
export const SEED_REPORTS = [
  {
    id: 'seed-001',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Severe flooding on 10th Main Road. Water level has risen to 3 feet. Multiple vehicles submerged. Residents stuck on upper floors.',
    urgencyScore: 5,
    category: 'Flooding',
    locationName: '10th Main Road, Indiranagar',
    coordinates: { lat: 12.9812, lng: 77.6394 },
    timestamp: hoursAgo(2),
    reportedBy: 'Riya Sharma',
    summary: 'Severe flooding with 3ft water level, residents trapped on upper floors'
  },
  {
    id: 'seed-002',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Building wall partially collapsed near HAL 2nd Stage bus stop. Debris blocking the road. No injuries reported so far.',
    urgencyScore: 4,
    category: 'Building Collapse',
    locationName: 'HAL 2nd Stage, Indiranagar',
    coordinates: { lat: 12.9758, lng: 77.6450 },
    timestamp: hoursAgo(4),
    reportedBy: 'Amit Kumar',
    summary: 'Partial wall collapse blocking road, no injuries yet'
  },
  {
    id: 'seed-003',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Large pothole has opened up on CMH Road near the junction. Very dangerous for two-wheelers. Nearly caused two accidents today.',
    urgencyScore: 3,
    category: 'Road Damage',
    locationName: 'CMH Road, Indiranagar',
    coordinates: { lat: 12.9815, lng: 77.6400 },
    timestamp: hoursAgo(6),
    reportedBy: 'Suresh Yadav',
    summary: 'Dangerous pothole on CMH Road causing near-accidents'
  },
  {
    id: 'seed-004',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Complete power outage in Defence Colony area. Been 8 hours now. Elderly residents need help with medical equipment that requires electricity.',
    urgencyScore: 4,
    category: 'Power Outage',
    locationName: 'Defence Colony, Indiranagar',
    coordinates: { lat: 12.9770, lng: 77.6380 },
    timestamp: hoursAgo(8),
    reportedBy: 'Neha Singh',
    summary: 'Power outage for 8 hours, elderly need help with medical equipment'
  },
  {
    id: 'seed-005',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Water supply has turned brown in HAL 2nd Stage apartments. Multiple families affected. Children showing signs of stomach illness.',
    urgencyScore: 5,
    category: 'Water Contamination',
    locationName: 'HAL 2nd Stage Apartments, Indiranagar',
    coordinates: { lat: 12.9745, lng: 77.6442 },
    timestamp: hoursAgo(1),
    reportedBy: 'Priya Menon',
    summary: 'Contaminated water supply affecting children with stomach illness'
  },
  {
    id: 'seed-006',
    status: 'pending',
    imageUrl: '',
    extractedText: 'Large tree fallen across 100 Feet Road near Indiranagar Metro. Blocking both lanes. Power lines entangled.',
    urgencyScore: 4,
    category: 'Fallen Tree',
    locationName: '100 Feet Road, Indiranagar',
    coordinates: { lat: 12.9716, lng: 77.6412 },
    timestamp: hoursAgo(3),
    reportedBy: 'Rahul Verma',
    summary: 'Large tree blocking both lanes with entangled power lines'
  },
  {
    id: 'seed-007',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Gas leak detected in basement of commercial building on 12th Main. Strong smell. Area being evacuated.',
    urgencyScore: 5,
    category: 'Gas Leak',
    locationName: '12th Main, Indiranagar',
    coordinates: { lat: 12.9798, lng: 77.6388 },
    timestamp: hoursAgo(0.5),
    reportedBy: 'Vikram Joshi',
    summary: 'Gas leak in commercial basement, area being evacuated'
  },
  {
    id: 'seed-008',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Waterlogging in underpass near Domlur flyover. Water almost 2 feet deep. Cars getting stuck.',
    urgencyScore: 3,
    category: 'Flooding',
    locationName: 'Domlur Flyover Underpass',
    coordinates: { lat: 12.9690, lng: 77.6380 },
    timestamp: hoursAgo(5),
    reportedBy: 'Kavitha R',
    summary: 'Waterlogging in underpass, vehicles getting stuck'
  },
  {
    id: 'seed-009',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Old building on 6th Main showing severe cracks after last night rain. Residents have self-evacuated. Needs structural assessment.',
    urgencyScore: 4,
    category: 'Building Collapse',
    locationName: '6th Main, Indiranagar',
    coordinates: { lat: 12.9825, lng: 77.6415 },
    timestamp: hoursAgo(10),
    reportedBy: 'Mohamed Ashraf',
    summary: 'Building with severe cracks, residents self-evacuated'
  },
  {
    id: 'seed-010',
    status: 'pending',
    imageUrl: '',
    extractedText: 'Road surface caved in near ESI Hospital. Small sinkhole forming. Barricades needed urgently.',
    urgencyScore: 3,
    category: 'Road Damage',
    locationName: 'Near ESI Hospital, Indiranagar',
    coordinates: { lat: 12.9800, lng: 77.6435 },
    timestamp: hoursAgo(7),
    reportedBy: 'Deepa Nair',
    summary: 'Sinkhole forming near hospital, barricades needed'
  },
  {
    id: 'seed-011',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Transformer exploded on Old Airport Road. Sparks flying. Fire brigade called. Keep distance.',
    urgencyScore: 5,
    category: 'Fire',
    locationName: 'Old Airport Road, Indiranagar',
    coordinates: { lat: 12.9730, lng: 77.6365 },
    timestamp: hoursAgo(1.5),
    reportedBy: 'Arjun Prasad',
    summary: 'Transformer explosion with sparks, fire brigade en route'
  },
  {
    id: 'seed-012',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Elderly person found collapsed near Indiranagar Club. Seems dehydrated. Needs medical attention.',
    urgencyScore: 5,
    category: 'Medical Emergency',
    locationName: 'Indiranagar Club',
    coordinates: { lat: 12.9795, lng: 77.6420 },
    timestamp: hoursAgo(0.3),
    reportedBy: 'Sneha Reddy',
    summary: 'Elderly person collapsed, needs immediate medical attention'
  },
  {
    id: 'seed-013',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Multiple trees uprooted in BDA Complex park area. One tree fell on parked car. No one inside.',
    urgencyScore: 2,
    category: 'Fallen Tree',
    locationName: 'BDA Complex, Indiranagar',
    coordinates: { lat: 12.9755, lng: 77.6395 },
    timestamp: hoursAgo(12),
    reportedBy: 'Ganesh Kumar',
    summary: 'Trees uprooted in park, one fell on parked car — no injuries'
  },
  {
    id: 'seed-014',
    status: 'pending',
    imageUrl: '',
    extractedText: 'Drainage overflow on 3rd Cross, Defence Colony. Sewage water entering ground floor houses.',
    urgencyScore: 3,
    category: 'Flooding',
    locationName: '3rd Cross, Defence Colony, Indiranagar',
    coordinates: { lat: 12.9778, lng: 77.6370 },
    timestamp: hoursAgo(9),
    reportedBy: 'Rajesh Iyer',
    summary: 'Sewage water entering houses due to drainage overflow'
  },
  {
    id: 'seed-015',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Minor cracks on compound wall of school on 80 Feet Road. Children are safe, school closed as precaution.',
    urgencyScore: 2,
    category: 'Building Collapse',
    locationName: '80 Feet Road, Indiranagar',
    coordinates: { lat: 12.9735, lng: 77.6425 },
    timestamp: hoursAgo(14),
    reportedBy: 'Lakshmi Devi',
    summary: 'School wall cracked, school closed as safety precaution'
  },
  {
    id: 'seed-016',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Street lights out on entire stretch of 100 Feet Road from Sony Signal to BDA Junction. Very dark, unsafe for pedestrians.',
    urgencyScore: 2,
    category: 'Power Outage',
    locationName: '100 Feet Road, Sony Signal to BDA Junction',
    coordinates: { lat: 12.9720, lng: 77.6400 },
    timestamp: hoursAgo(16),
    reportedBy: 'Anil Hegde',
    summary: 'Street lights out on 100 Feet Road, unsafe for pedestrians'
  },
  {
    id: 'seed-017',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Manhole cover missing on 5th Main near park. Very dangerous. A child almost fell in. Temporary cover placed by residents.',
    urgencyScore: 4,
    category: 'Road Damage',
    locationName: '5th Main, Indiranagar',
    coordinates: { lat: 12.9835, lng: 77.6405 },
    timestamp: hoursAgo(11),
    reportedBy: 'Pooja Shetti',
    summary: 'Missing manhole cover near park, child nearly fell in'
  },
  {
    id: 'seed-018',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Stagnant water breeding mosquitoes in empty plot near Domlur bus stand. Dengue cases reported in area.',
    urgencyScore: 3,
    category: 'Water Contamination',
    locationName: 'Domlur Bus Stand',
    coordinates: { lat: 12.9680, lng: 77.6390 },
    timestamp: hoursAgo(20),
    reportedBy: 'Sanjay Murthy',
    summary: 'Stagnant water breeding mosquitoes, dengue cases reported'
  },
  {
    id: 'seed-019',
    status: 'pending',
    imageUrl: '',
    extractedText: 'Small fire in garbage dump near 8th Main. Smoke spreading to residential area. Causes breathing difficulty.',
    urgencyScore: 3,
    category: 'Fire',
    locationName: '8th Main, Indiranagar',
    coordinates: { lat: 12.9805, lng: 77.6392 },
    timestamp: hoursAgo(4),
    reportedBy: 'Meena Gupta',
    summary: 'Garbage fire spreading smoke to homes, breathing difficulties'
  },
  {
    id: 'seed-020',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Pregnant woman in labor stuck in waterlogged area on 1st Cross. Ambulance unable to reach. Needs boat or wade-through assistance.',
    urgencyScore: 5,
    category: 'Medical Emergency',
    locationName: '1st Cross, Indiranagar',
    coordinates: { lat: 12.9840, lng: 77.6410 },
    timestamp: hoursAgo(0.2),
    reportedBy: 'Fathima Bee',
    summary: 'Pregnant woman in labor stuck in flood, ambulance blocked'
  },
  {
    id: 'seed-021',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Fallen electric pole on Ring Road near Domlur. Live wires on the ground. Extremely dangerous.',
    urgencyScore: 5,
    category: 'Power Outage',
    locationName: 'Ring Road, Domlur',
    coordinates: { lat: 12.9695, lng: 77.6415 },
    timestamp: hoursAgo(2.5),
    reportedBy: 'Karthik Narayan',
    summary: 'Fallen electric pole with live wires on the ground'
  },
  {
    id: 'seed-022',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Construction debris dumped blocking service road near Chinmaya Mission Hospital. Emergency vehicles cannot pass.',
    urgencyScore: 3,
    category: 'Road Damage',
    locationName: 'Chinmaya Mission Hospital Road, Indiranagar',
    coordinates: { lat: 12.9762, lng: 77.6430 },
    timestamp: hoursAgo(18),
    reportedBy: 'Vinod Rao',
    summary: 'Construction debris blocking emergency vehicle access'
  },
  {
    id: 'seed-023',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Retaining wall shows signs of bulging near lake overflow area. Could collapse with more rain.',
    urgencyScore: 2,
    category: 'Building Collapse',
    locationName: 'Binnamangala Lake Area, Indiranagar',
    coordinates: { lat: 12.9748, lng: 77.6355 },
    timestamp: hoursAgo(24),
    reportedBy: 'Anand Krishnan',
    summary: 'Retaining wall bulging near lake, collapse risk with rain'
  },
  {
    id: 'seed-024',
    status: 'pending',
    imageUrl: '',
    extractedText: 'Suspected gas cylinder leak in 2nd floor apartment, 4th Cross Domlur. Neighbors can smell gas.',
    urgencyScore: 4,
    category: 'Gas Leak',
    locationName: '4th Cross, Domlur',
    coordinates: { lat: 12.9705, lng: 77.6375 },
    timestamp: hoursAgo(1),
    reportedBy: 'Revathi S',
    summary: 'Gas leak in apartment, neighbors reporting gas smell'
  },
  {
    id: 'seed-025',
    status: 'verified',
    imageUrl: '',
    extractedText: 'Minor crack on overhead water tank in apartment complex. Slow leak observed. Tank serves 40 families.',
    urgencyScore: 1,
    category: 'Other',
    locationName: '7th Main, HAL 2nd Stage',
    coordinates: { lat: 12.9752, lng: 77.6460 },
    timestamp: hoursAgo(36),
    reportedBy: 'Sunita Bhat',
    summary: 'Overhead tank crack with slow leak, serves 40 families'
  }
];

// Utility: Get reports by status
export function getReportsByStatus(status) {
  return SEED_REPORTS.filter(r => r.status === status);
}

// Utility: Get reports count by urgency
export function getUrgencyCounts() {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  SEED_REPORTS.forEach(r => { counts[r.urgencyScore]++; });
  return counts;
}

// Utility: Calculate distance between two points (Haversine)
export function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Utility: Find reports within radius of a point
export function findNearbyReports(lat, lng, radiusKm, options = {}) {
  const { status = 'verified', minUrgency = 1, skills = [] } = options;
  
  return SEED_REPORTS
    .filter(r => {
      if (r.status !== status) return false;
      if (r.urgencyScore < minUrgency) return false;
      const dist = getDistanceKm(lat, lng, r.coordinates.lat, r.coordinates.lng);
      if (dist > radiusKm) return false;
      if (skills.length > 0) {
        const categorySkillMap = {
          'Flooding': ['rescue', 'cleanup', 'logistics'],
          'Building Collapse': ['rescue', 'construction', 'medical'],
          'Road Damage': ['construction', 'traffic', 'cleanup'],
          'Power Outage': ['electrical', 'logistics'],
          'Water Contamination': ['medical', 'water', 'logistics'],
          'Fallen Tree': ['cleanup', 'chainsaw', 'logistics'],
          'Gas Leak': ['hazmat', 'evacuation', 'fire'],
          'Fire': ['fire', 'rescue', 'medical'],
          'Medical Emergency': ['medical', 'first-aid', 'transport'],
          'Other': ['general', 'logistics']
        };
        const requiredSkills = categorySkillMap[r.category] || ['general'];
        const hasMatch = skills.some(s => requiredSkills.includes(s.toLowerCase()));
        if (!hasMatch) return false;
      }
      return true;
    })
    .map(r => ({
      ...r,
      distance: getDistanceKm(lat, lng, r.coordinates.lat, r.coordinates.lng)
    }))
    .sort((a, b) => b.urgencyScore - a.urgencyScore || a.distance - b.distance);
}
