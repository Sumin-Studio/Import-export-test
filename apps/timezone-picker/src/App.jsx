import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { Button, Paper, Container, Title, Group, Stack, Box, ActionIcon, Menu } from '@mantine/core';
import { IconPlus, IconDotsVertical, IconRefresh, IconPlus as IconAddBelow, IconCheck, IconTrash, IconLink } from '@tabler/icons-react';
import TimezoneRow from './components/TimezoneRow';
import CurrentTimezoneRow from './components/CurrentTimezoneRow';
import { getAllTimezones, getTimezoneShorthand } from './utils/timezones';

// Default timezones
const DEFAULT_TIMEZONES = [
  'Pacific/Auckland',      // New Zealand (NZDT)
  'Australia/Sydney',      // Australia (AEDT)
  'Europe/London',         // UK (GMT)
  'America/Los_Angeles',   // North America Pacific (PST)
];

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workHoursStart, setWorkHoursStart] = useState(() => {
    const stored = localStorage.getItem('timezonePickerWorkHoursStart');
    return stored ? parseInt(stored) : 9;
  });
  const [workHoursEnd, setWorkHoursEnd] = useState(() => {
    const stored = localStorage.getItem('timezonePickerWorkHoursEnd');
    return stored ? parseInt(stored) : 17;
  });
  const [pickedHour, setPickedHour] = useState(() => {
    // Check URL fragment for picked hour
    const fragment = window.location.hash.slice(1);
    if (fragment && fragment.includes('@')) {
      const hourPart = fragment.split('@')[1];
      if (hourPart) {
        const hour = parseInt(hourPart);
        if (!isNaN(hour) && hour >= 0 && hour < 24) {
          return hour;
        }
      }
    }
    return null;
  });
  const [timezoneRows, setTimezoneRows] = useState(() => {
    // Check URL fragment first
    const fragment = window.location.hash.slice(1);
    if (fragment) {
      // Remove picked hour part if present
      const timezonePart = fragment.split('@')[0];
      const encodedEntries = timezonePart.split(',').filter(Boolean);
      const allTimezones = getAllTimezones();
      const timezones = encodedEntries.map(entry => {
        // Format: shortcode_city (e.g., NZDT_Auckland or PST_Los%20Angeles)
        const parts = entry.split('_');
        if (parts.length >= 2) {
          const shortcode = parts[0];
          const city = decodeURIComponent(parts.slice(1).join('_'));
          // Find by both shortcode and city for exact match
          const tz = allTimezones.find(t => 
            getTimezoneShorthand(t.tz, new Date()) === shortcode && t.city === city
          );
          if (tz) return tz.tz;
        }
        // Fallback: try just the shortcode for backwards compatibility
        const tz = allTimezones.find(t => getTimezoneShorthand(t.tz, new Date()) === entry);
        return tz ? tz.tz : null;
      }).filter(Boolean);
      
      if (timezones.length > 0) {
        return timezones;
      }
    }
    
    // Check local storage
    const stored = localStorage.getItem('timezonePickerSelection');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // Invalid stored data, use defaults
      }
    }
    
    // Use defaults
    return DEFAULT_TIMEZONES;
  });

  // Update local storage and URL fragment when timezones or picked hour change
  useEffect(() => {
    // Update local storage
    localStorage.setItem('timezonePickerSelection', JSON.stringify(timezoneRows));
    
    // Update URL fragment with shortcode_city format and picked hour
    const allTimezones = getAllTimezones();
    const encodedTimezones = timezoneRows.map(tz => {
      const tzData = allTimezones.find(t => t.tz === tz);
      const shorthand = getTimezoneShorthand(tz, selectedDate);
      const city = tzData ? encodeURIComponent(tzData.city) : '';
      return `${shorthand}_${city}`;
    });
    let hash = encodedTimezones.join(',');
    if (pickedHour !== null) {
      hash += `@${pickedHour}`;
    }
    window.location.hash = hash;
  }, [timezoneRows, selectedDate, pickedHour]);

  // Save work hours to local storage when they change
  useEffect(() => {
    localStorage.setItem('timezonePickerWorkHoursStart', workHoursStart.toString());
  }, [workHoursStart]);

  useEffect(() => {
    localStorage.setItem('timezonePickerWorkHoursEnd', workHoursEnd.toString());
  }, [workHoursEnd]);

  const prevPickedHourRef = useRef(pickedHour);
  useEffect(() => {
    const prev = prevPickedHourRef.current;
    if (prev !== null) {
      document.querySelectorAll(`.tz-hour[data-hour="${prev}"]`).forEach(el => {
        el.classList.remove('tz-hour-picked');
        el.style.outline = 'none';
      });
    }
    if (pickedHour !== null) {
      document.querySelectorAll(`.tz-hour[data-hour="${pickedHour}"]`).forEach(el => {
        el.classList.add('tz-hour-picked');
      });
    }
    prevPickedHourRef.current = pickedHour;
  }, [pickedHour]);

  const handleAddRow = useCallback(() => {
    const allTimezones = getAllTimezones();
    const defaultTimezone = allTimezones.find(
      tz => tz.tz === Intl.DateTimeFormat().resolvedOptions().timeZone
    ) || allTimezones[0];

    setTimezoneRows(prev => [...prev, defaultTimezone.tz]);
  }, []);

  const handleTimezoneChange = useCallback((index, newTimezone) => {
    setTimezoneRows(prev => {
      const newRows = [...prev];
      newRows[index] = newTimezone;
      return newRows;
    });
  }, []);

  const handleRemoveRow = useCallback((index) => {
    setTimezoneRows(prev => {
      if (prev.length > 1) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  }, []);

  const handleReset = useCallback(() => {
    setTimezoneRows([...DEFAULT_TIMEZONES]);
    setPickedHour(null);
  }, []);

  const handleHourClick = useCallback((hour) => {
    setPickedHour(prev => prev === hour ? null : hour);
  }, []);

  const currentTimezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  const pickedHourDisplay = useMemo(() => {
    if (pickedHour === null) return null;

    const baseDate = new Date(selectedDate);
    baseDate.setHours(pickedHour, 0, 0, 0);

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: currentTimezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    return formatter.format(baseDate);
  }, [pickedHour, selectedDate, currentTimezone]);

  const handleAddTimezoneBelow = useCallback((timezone, afterIndex) => {
    setTimezoneRows(prev => {
      const newRows = [...prev];
      newRows.splice(afterIndex + 1, 0, timezone);
      return newRows;
    });
  }, []);

  const isTimezoneInList = useCallback((timezone) => {
    return timezoneRows.includes(timezone);
  }, [timezoneRows]);

  return (
    <Box id="app" className="app-container" style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <Box id="header" className="header" style={{ 
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <Container size="xl" style={{ padding: '16px 24px' }}>
          <Group justify="space-between" align="center">
            <Title id="app-title" className="app-title" order={1} style={{ 
              fontSize: '20px',
              fontWeight: 600,
              color: '#1e293b',
              letterSpacing: '-0.02em'
            }}>
              Timezone Picker
            </Title>
            <Group gap="sm">
              <DatePickerInput
                id="date-picker"
                className="date-picker"
                value={selectedDate}
                onChange={setSelectedDate}
                style={{ width: '180px' }}
                styles={{
                  input: {
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '14px',
                    fontWeight: 500,
                    background: '#fff',
                    height: '40px'
                  }
                }}
              />
              <Button
                id="copy-link"
                className="copy-link"
                leftSection={<IconLink size={16} />}
                size="sm"
                radius="md"
                variant="light"
                color="blue"
                style={{
                  fontWeight: 500,
                  fontSize: '13px',
                  padding: '0 16px',
                  height: '40px',
                  background: '#eff6ff',
                  color: '#0066FF',
                  border: '1px solid #bfdbfe'
                }}
                onClick={() => {
                  const baseUrl = 'https://xero-internal-actions-poc.github.io/design-workbench/timezone-picker/build/';
                  const hash = window.location.hash;
                  navigator.clipboard.writeText(baseUrl + hash);
                }}
              >
                Copy link
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Main Content */}
      <Container id="main-content" className="main-content" size="xl" style={{ padding: '24px' }}>
        {/* Picked Hour Info Box */}
        {pickedHour !== null && (
          <Paper 
            id="picked-hour-info" 
            className="picked-hour-info"
            shadow="sm" 
            radius="lg" 
            style={{ 
              padding: '16px 24px',
              background: '#fff',
              border: '1px solid #e2e8f0',
              marginBottom: '16px'
            }}
          >
            <Group gap="sm">
              <Box style={{ 
                width: '24px', 
                height: '24px', 
                background: '#0066FF',
                borderRadius: '6px',
                border: '2px solid #0052cc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: '#fff',
                fontWeight: '600'
              }}>
                {pickedHour.toString().padStart(2, '0')}
              </Box>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>
                Selected time in your timezone: <strong>{pickedHour.toString().padStart(2, '0')}:00 — {pickedHourDisplay}</strong>
              </span>
            </Group>
          </Paper>
        )}

        <Paper 
          id="timezone-table" 
          className="timezone-table"
          shadow="sm" 
          radius="lg" 
          style={{ 
            padding: '24px',
            background: '#fff',
            border: '1px solid #e2e8f0'
          }}
        >
          {/* Current Timezone Row (Fixed) */}
          <Box
            id="tz-row-current"
            className="tz-row tz-current"
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '12px'
            }}
          >
            <Group align="center" gap="md" wrap="nowrap">
              <CurrentTimezoneRow 
                date={selectedDate} 
                workHoursStart={workHoursStart}
                workHoursEnd={workHoursEnd}
                onHourClick={handleHourClick}
              />
              <Menu position="bottom-end" withArrow>
                <Menu.Target>
                  <ActionIcon
                    id="tz-more-current"
                    className="tz-more"
                    color="gray"
                    variant="subtle"
                    size="md"
                    radius="md"
                    style={{
                      minWidth: '32px',
                      color: '#94a3b8'
                    }}
                  >
                    <IconDotsVertical size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  {isTimezoneInList(currentTimezone) ? (
                    <Menu.Item 
                      leftSection={<IconCheck size={14} />}
                      disabled
                      style={{ color: '#94a3b8' }}
                    >
                      Timezone present below
                    </Menu.Item>
                  ) : (
                    <Menu.Item 
                      leftSection={<IconAddBelow size={14} />}
                      onClick={() => handleAddTimezoneBelow(currentTimezone, -1)}
                    >
                      Add timezone below
                    </Menu.Item>
                  )}
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Box>

          {/* Timezone Rows */}
          <Stack id="timezone-rows" className="timezone-rows" gap="sm">
            {timezoneRows.map((timezone, index) => (
              <Box
                key={index}
                id={`tz-row-${index}`}
                className="tz-row"
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1'
                }}
              >
                <Group align="center" gap="md" wrap="nowrap">
                  <TimezoneRow
                    timezone={timezone}
                    date={selectedDate}
                    rowIndex={index}
                    workHoursStart={workHoursStart}
                    workHoursEnd={workHoursEnd}
                    onHourClick={handleHourClick}
                    onTimezoneChange={handleTimezoneChange}
                  />
                  {timezoneRows.length > 1 && (
                    <ActionIcon
                      id={`tz-remove-${index}`}
                      className="tz-remove"
                      color="gray"
                      variant="subtle"
                      size="md"
                      radius="md"
                      onClick={() => handleRemoveRow(index)}
                      style={{
                        minWidth: '32px',
                        color: '#94a3b8'
                      }}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  )}
                </Group>
              </Box>
            ))}
          </Stack>

          {/* Add Button */}
          <Box id="tz-actions" className="tz-actions" style={{ marginTop: '20px' }}>
            <Group justify="space-between">
              <Button 
                id="tz-add"
                className="tz-add"
                onClick={handleAddRow}
                leftSection={<IconPlus size={16} />}
                size="sm"
                radius="md"
                variant="light"
                color="blue"
                style={{
                  fontWeight: 500,
                  fontSize: '13px',
                  padding: '0 16px',
                  height: '36px',
                  background: '#eff6ff',
                  color: '#0066FF',
                  border: '1px solid #bfdbfe'
                }}
              >
                Add Timezone
              </Button>
              <Button 
                id="tz-reset"
                className="tz-reset"
                onClick={handleReset}
                leftSection={<IconRefresh size={16} />}
                size="sm"
                radius="md"
                variant="subtle"
                color="gray"
                style={{
                  fontWeight: 500,
                  fontSize: '13px',
                  padding: '0 16px',
                  height: '36px',
                  color: '#64748b'
                }}
              >
                Reset to Defaults
              </Button>
            </Group>
          </Box>

          {/* Legend */}
          <Box id="legend" className="legend" style={{ marginTop: '24px' }}>
            <Group gap="lg">
              <Group gap="8px" className="legend-item">
                <Box className="legend-color legend-color-work" style={{ 
                  width: '16px', 
                  height: '16px', 
                  background: '#0066FF',
                  borderRadius: '4px'
                }} />
                <span className="legend-label" style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>
                  Work hours{' '}
                  <Menu position="bottom" withArrow>
                    <Menu.Target>
                      <a 
                        id="work-hours-start-trigger"
                        className="work-hours-trigger"
                        style={{ 
                          color: '#0066FF', 
                          textDecoration: 'underline', 
                          cursor: 'pointer',
                          fontWeight: 500
                        }}
                      >
                        {workHoursStart.toString().padStart(2, '0')}:00
                      </a>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {[6, 7, 8, 9, 10].map((hour) => (
                        <Menu.Item
                          key={hour}
                          onClick={() => setWorkHoursStart(hour)}
                          style={workHoursStart === hour ? { background: '#eff6ff', color: '#0066FF' } : {}}
                        >
                          {hour.toString().padStart(2, '0')}:00
                        </Menu.Item>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
                  {' to '}
                  <Menu position="bottom" withArrow>
                    <Menu.Target>
                      <a 
                        id="work-hours-end-trigger"
                        className="work-hours-trigger"
                        style={{ 
                          color: '#0066FF', 
                          textDecoration: 'underline', 
                          cursor: 'pointer',
                          fontWeight: 500
                        }}
                      >
                        {workHoursEnd.toString().padStart(2, '0')}:00
                      </a>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {[15, 16, 17, 18].map((hour) => (
                        <Menu.Item
                          key={hour}
                          onClick={() => setWorkHoursEnd(hour)}
                          style={workHoursEnd === hour ? { background: '#eff6ff', color: '#0066FF' } : {}}
                        >
                          {hour.toString().padStart(2, '0')}:00
                        </Menu.Item>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
                </span>
              </Group>
              <Group gap="8px" className="legend-item">
                <Box className="legend-color legend-color-off" style={{ 
                  width: '16px', 
                  height: '16px', 
                  background: '#e2e8f0',
                  borderRadius: '4px'
                }} />
                <span className="legend-label" style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>
                  Outside Work Hours
                </span>
              </Group>
            </Group>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;

