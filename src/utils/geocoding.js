// Geocoding utility using Nominatim (OpenStreetMap) — 100% free, no API key
// Fallback: local lookup table for Demo Zone locations

// Local fallback lookup table for Indiranagar, Bangalore locations
const LOCATION_LOOKUP = {
  '10th main': { lat: 12.9812, lng: 77.6394 },
  '10th main road': { lat: 12.9812, lng: 77.6394 },
  '100 feet road': { lat: 12.9716, lng: 77.6412 },
  '100ft road': { lat: 12.9716, lng: 77.6412 },
  'cmh road': { lat: 12.9815, lng: 77.6400 },
  'defence colony': { lat: 12.9770, lng: 77.6380 },
  'defense colony': { lat: 12.9770, lng: 77.6380 },
  'hal 2nd stage': { lat: 12.9758, lng: 77.6450 },
  'hal second stage': { lat: 12.9758, lng: 77.6450 },
  'domlur': { lat: 12.9690, lng: 77.6380 },
  'domlur flyover': { lat: 12.9690, lng: 77.6380 },
  'old airport road': { lat: 12.9730, lng: 77.6365 },
  'esi hospital': { lat: 12.9800, lng: 77.6435 },
  'indiranagar': { lat: 12.9784, lng: 77.6408 },
  'indiranagar metro': { lat: 12.9784, lng: 77.6408 },
  'bda complex': { lat: 12.9755, lng: 77.6395 },
  '80 feet road': { lat: 12.9735, lng: 77.6425 },
  'binnamangala': { lat: 12.9748, lng: 77.6355 },
  'chinmaya mission hospital': { lat: 12.9762, lng: 77.6430 },
  '12th main': { lat: 12.9798, lng: 77.6388 },
  '8th main': { lat: 12.9805, lng: 77.6392 },
  '6th main': { lat: 12.9825, lng: 77.6415 },
  '5th main': { lat: 12.9835, lng: 77.6405 },
  '3rd cross': { lat: 12.9778, lng: 77.6370 },
  '1st cross': { lat: 12.9840, lng: 77.6410 },
  '4th cross domlur': { lat: 12.9705, lng: 77.6375 },
  '7th main': { lat: 12.9752, lng: 77.6460 },
  'ring road domlur': { lat: 12.9695, lng: 77.6415 },
  'indiranagar club': { lat: 12.9795, lng: 77.6420 },
  'sony signal': { lat: 12.9720, lng: 77.6400 },
};

// Default fallback: center of Demo Zone
const DEFAULT_LOCATION = { lat: 12.9784, lng: 77.6408 };

/**
 * Geocode a location name to lat/lng coordinates
 * Strategy: Nominatim API → Local Lookup → Default Center
 * 
 * @param {string} locationName - Human-readable location name
 * @returns {Promise<{lat: number, lng: number}>}
 */
export async function geocode(locationName) {
  if (!locationName || locationName.trim() === '') {
    return DEFAULT_LOCATION;
  }

  // Step 1: Try Nominatim API (free, no key)
  try {
    const query = `${locationName}, Bangalore, India`;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'UpLift-DisasterApp/1.0'  // Nominatim requires a User-Agent
        }
      }
    );
    
    if (res.ok) {
      const data = await res.json();
      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }
    }
  } catch (err) {
    console.warn('Nominatim geocoding failed, falling back to local lookup:', err.message);
  }

  // Step 2: Try local fallback table
  const normalized = locationName.toLowerCase().trim();
  for (const [key, coords] of Object.entries(LOCATION_LOOKUP)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return coords;
    }
  }

  // Step 3: Default to demo zone center
  console.warn(`Location "${locationName}" not found. Defaulting to demo zone center.`);
  return DEFAULT_LOCATION;
}

/**
 * Reverse geocode coordinates to a location name
 * @param {number} lat 
 * @param {number} lng 
 * @returns {Promise<string>}
 */
export async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      {
        headers: {
          'User-Agent': 'UpLift-DisasterApp/1.0'
        }
      }
    );
    if (res.ok) {
      const data = await res.json();
      return data.display_name || 'Unknown Location';
    }
  } catch (err) {
    console.warn('Reverse geocoding failed:', err.message);
  }
  return 'Indiranagar, Bangalore';
}
