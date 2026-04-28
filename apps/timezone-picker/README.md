# Timezone Visualization Tool

A React application for visualizing and comparing work hours across different timezones.

## Features

- Visualize 24 hours in a day as vertical pill-shaped items
- Color-coded hours: Green for work hours (9:00 AM - 5:00 PM), Grey for outside work hours
- Timezone dropdown with all timezones sorted by UTC offset
- Calendar picker to select different dates
- Add multiple timezone rows for comparison
- Remove timezone rows (minimum of one row required)

## Tech Stack

- **React 18** - UI library
- **React Router v6** - Routing (using modern createBrowserRouter API)
- **Mantine** - Design system and UI components
- **Vite** - Build tool and development server

## Project Structure

```
timezone-picker/
├── src/              # Source code
│   ├── components/   # React components
│   ├── utils/        # Utility functions
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Application entry point
├── build/            # Compiled output (generated)
├── index.html        # HTML template
├── package.json      # Dependencies and scripts
├── vite.config.js    # Vite configuration
└── README.md         # This file
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd timezone-picker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## Building for Production

To compile the code for production:

```bash
npm run build
```

This will create an optimized production build in the `build/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Recompiling Code

After making changes to the source code:

1. **For development**: The dev server (`npm run dev`) automatically recompiles on file changes with hot module replacement.

2. **For production**: Run `npm run build` to create a new production build. The compiled files will be output to the `build/` directory.

## How It Works

- Each row represents a timezone
- The 24 vertical pills represent the 24 hours of the selected day
- Green pills indicate work hours (9:00 AM - 5:00 PM) in that timezone
- Grey pills indicate non-work hours
- All rows are aligned to show the same 24-hour period, making it easy to compare when work hours overlap across timezones

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

