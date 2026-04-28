const TIMEZONE_MAP = {
  'Pacific/Midway': 'Midway',
  'Pacific/Honolulu': 'Honolulu',
  'America/Anchorage': 'Anchorage',
  'America/Los_Angeles': 'Los Angeles',
  'America/Denver': 'Denver',
  'America/Chicago': 'Chicago',
  'America/New_York': 'New York',
  'America/Caracas': 'Caracas',
  'America/Santiago': 'Santiago',
  'America/Sao_Paulo': 'São Paulo',
  'Atlantic/South_Georgia': 'South Georgia',
  'Atlantic/Azores': 'Azores',
  'Europe/London': 'London',
  'Europe/Paris': 'Paris',
  'Europe/Berlin': 'Berlin',
  'Europe/Rome': 'Rome',
  'Europe/Moscow': 'Moscow',
  'Africa/Cairo': 'Cairo',
  'Africa/Johannesburg': 'Johannesburg',
  'Asia/Dubai': 'Dubai',
  'Asia/Karachi': 'Karachi',
  'Asia/Kolkata': 'Mumbai',
  'Asia/Dhaka': 'Dhaka',
  'Asia/Bangkok': 'Bangkok',
  'Asia/Singapore': 'Singapore',
  'Asia/Hong_Kong': 'Hong Kong',
  'Asia/Tokyo': 'Tokyo',
  'Australia/Sydney': 'Sydney',
  'Pacific/Auckland': 'Auckland',
};

let _cachedTimezones = null;

export function getAllTimezones() {
  if (_cachedTimezones) return _cachedTimezones;

  const now = new Date();
  const allTimezones = Intl.supportedValuesOf('timeZone');
  const timezoneData = new Map();

  Object.entries(TIMEZONE_MAP).forEach(([tz, city]) => {
    if (allTimezones.includes(tz)) {
      const offset = getTimezoneOffset(now, tz);
      timezoneData.set(tz, { tz, city, offset });
    }
  });

  allTimezones.forEach(tz => {
    if (!timezoneData.has(tz)) {
      const offset = getTimezoneOffset(now, tz);
      const city = tz.split('/').pop().replace(/_/g, ' ');
      timezoneData.set(tz, { tz, city, offset });
    }
  });

  _cachedTimezones = Array.from(timezoneData.values()).sort((a, b) => {
    if (a.offset !== b.offset) {
      return a.offset - b.offset;
    }
    return a.city.localeCompare(b.city);
  });

  return _cachedTimezones;
}

function getTimezoneOffset(date, timezone) {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  return (tzDate - utcDate) / (1000 * 60 * 60); // Offset in hours
}

const _labelCache = new Map();

export function formatTimezoneLabel(timezone) {
  const cached = _labelCache.get(timezone.tz);
  if (cached) return cached;

  const offset = getTimezoneOffset(new Date(), timezone.tz);
  const sign = offset >= 0 ? '+' : '-';
  const hours = Math.floor(Math.abs(offset));
  const minutes = Math.abs(offset % 1) * 60;
  const offsetStr = `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  const shorthand = getTimezoneShorthand(timezone.tz);
  const label = `UTC${offsetStr} - ${timezone.city} (${shorthand})`;
  _labelCache.set(timezone.tz, label);
  return label;
}

// Get timezone shorthand (e.g., NZDT, AEDT, GMT, PST)
export function getTimezoneShorthand(timezone, date = new Date()) {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'short',
    });
    const parts = formatter.formatToParts(date);
    const timeZonePart = parts.find(part => part.type === 'timeZoneName');
    return timeZonePart ? timeZonePart.value : timezone.split('/').pop();
  } catch (e) {
    return timezone.split('/').pop();
  }
}

