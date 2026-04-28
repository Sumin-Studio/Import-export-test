import React, { useRef, useMemo } from 'react';
import { Select } from '@mantine/core';
import { getAllTimezones, formatTimezoneLabel } from '../utils/timezones';

const TimezoneRow = React.memo(function TimezoneRow({ timezone, date, onTimezoneChange, workHoursStart = 9, workHoursEnd = 17, rowIndex = 0, onHourClick }) {
  const selectRef = useRef(null);

  const timezoneOptions = useMemo(() => {
    const allTimezones = getAllTimezones();
    return allTimezones.map(tz => ({
      value: tz.tz,
      label: formatTimezoneLabel(tz),
    }));
  }, []);

  const selectedTimezone = useMemo(() => {
    const allTimezones = getAllTimezones();
    return allTimezones.find(tz => tz.tz === timezone) || allTimezones[0];
  }, [timezone]);

  const handleChange = useMemo(() => {
    return (newTimezone) => onTimezoneChange(rowIndex, newTimezone);
  }, [onTimezoneChange, rowIndex]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      // Reset and blur
      e.target.blur();
      // The Select will reset to current value on blur
    }
  };

  const handleFocus = (e) => {
    // Select all text when focused
    setTimeout(() => {
      e.target.select();
    }, 0);
  };

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

  return (
    <div className="tz-row-content" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
      <div className="tz-selector" style={{ width: '300px', minWidth: '300px' }}>
        <Select
          ref={selectRef}
          id={`tz-select-${rowIndex}`}
          className="tz-select"
          value={timezone}
          onChange={handleChange}
          data={timezoneOptions}
          searchable
          placeholder="Select timezone"
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          styles={{
            input: {
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '13px',
              fontWeight: 500,
              background: '#fff',
              height: '40px'
            },
            dropdown: {
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
            }
          }}
        />
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

export default TimezoneRow;

