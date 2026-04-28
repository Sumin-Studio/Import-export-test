import React, { useMemo } from 'react';
import { formatTimezoneLabel, getAllTimezones } from '../utils/timezones';

const currentTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

const CurrentTimezoneRow = React.memo(function CurrentTimezoneRow({ date, workHoursStart = 9, workHoursEnd = 17, onHourClick }) {
  const selectedTimezone = useMemo(() => {
    const allTimezones = getAllTimezones();
    return allTimezones.find(tz => tz.tz === currentTz) || { tz: currentTz, city: currentTz.split('/').pop() };
  }, []);

  const hours = useMemo(() => {
    const result = [];
    const baseDate = new Date(date);
    baseDate.setHours(0, 0, 0, 0);

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: selectedTimezone.tz,
      hour: 'numeric',
      hour12: false,
      day: 'numeric',
    });

    for (let hour = 0; hour < 24; hour++) {
      const hourDate = new Date(baseDate);
      hourDate.setHours(hour);

      const parts = formatter.formatToParts(hourDate);
      const hourInTimezone = parseInt(parts.find(p => p.type === 'hour').value);

      const isWorkHour = hourInTimezone >= workHoursStart &&
                        hourInTimezone < workHoursEnd;

      result.push({ hour, hourInTimezone, isWorkHour });
    }

    return result;
  }, [date, selectedTimezone.tz, workHoursStart, workHoursEnd]);

  const label = useMemo(() => formatTimezoneLabel(selectedTimezone), [selectedTimezone]);

  return (
    <div className="tz-row-content" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
      <div className="tz-label" style={{ 
        width: '300px', 
        minWidth: '300px',
        fontSize: '13px',
        fontWeight: 500,
        color: '#1e293b',
        padding: '0 12px'
      }}>
        {label}
      </div>
      <div className="tz-hours" style={{ display: 'flex', gap: '3px', flex: 1 }}>
        {hours.map(({ hour, isWorkHour }) => (
          <div
            key={hour}
            data-hour={hour}
            className={`tz-hour ${isWorkHour ? 'tz-hour-work' : 'tz-hour-off'}`}
            onClick={() => onHourClick && onHourClick(hour)}
            style={{
              width: '100%',
              height: '40px',
              backgroundColor: isWorkHour ? '#0066FF' : '#e2e8f0',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              color: isWorkHour ? '#fff' : '#64748b',
              fontWeight: '500',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains('tz-hour-picked')) {
                e.currentTarget.style.outline = '2px solid #93c5fd';
                e.currentTarget.style.outlineOffset = '1px';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains('tz-hour-picked')) {
                e.currentTarget.style.outline = 'none';
              }
            }}
            title={`${hour.toString().padStart(2, '0')}:00`}
          >
            {hour.toString().padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  );
});

export default CurrentTimezoneRow;
