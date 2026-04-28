# Timezone Picker - Agent Instructions

## Development Server

### Starting the Server

Always start the development server from the `timezone-picker` directory:

```bash
cd {source folder}/timezone-picker && npm run dev
```

The server will run at http://localhost:5173/ (or next available port if 5173 is in use).

### Important: Check Server Status

After completing every task, verify that the development server is still running. If it has stopped, restart it using the command above.

### Building for Production

To build the production version:

```bash
cd {source folder}/timezone-picker && npm run build
```

This outputs files to the `build/` folder which is served on GitHub Pages.

### Committing Changes

**Important:** Always include the `build/` folder in commits. The production build is what gets deployed to GitHub Pages, so it must be committed alongside source changes.

After making changes:
1. Run `npm run build` to generate updated production files
2. Commit both the source files and the `build/` folder

## Project Structure

- `src/App.jsx` - Main application component
- `src/components/TimezoneRow.jsx` - Editable timezone row with dropdown
- `src/components/CurrentTimezoneRow.jsx` - Fixed current timezone row (no dropdown)
- `src/utils/timezones.js` - Timezone utilities and formatting

## Key Features

- Timezones stored in localStorage (`timezonePickerSelection`)
- Work hours stored in localStorage (`timezonePickerWorkHoursStart`, `timezonePickerWorkHoursEnd`)
- URL fragment shows timezone shortcodes for sharing
