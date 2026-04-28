# Designing with AI

A modern, responsive web application for configuring AI design parameters with real-time scorecard generation.

## Features

- ✨ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern Split-Screen UI** - Form inputs on the left, live scorecard on the right
- 📊 **Real-Time Updates** - Scorecard updates instantly as you fill in each field
- 📝 **Easy Data Updates** - Simple JSON file for managing inputs and dropdown options
- 🖨️ **Print Support** - Print-friendly scorecard layout
- ⚡ **Fast & Lightweight** - No dependencies, pure vanilla JavaScript

## Getting Started

### Quick Start

1. **Navigate to the project directory**
2. **Open in your browser at:** [http://localhost:8000](http://localhost:8000)
   - The server should already be running
   - If not, start it with: `python3 -m http.server 8000`

## Input Fields

The application includes 5 configurable inputs:

1. **Primary JTBD** (Job To Be Done) - Open text field
2. **Desired automation type** - Dropdown with 4 options
   - Acquisition automation
   - Analysis automation
   - Decision automation
   - Action automation
3. **Desired automation level** - Dropdown with levels 1-10
4. **Current user AI maturity** - Dropdown with 4 maturity stages
   - Learning to drive
   - Supervised driving
   - Co-pilot
   - Autonomous driving
5. **Desired AI maturity (business)** - Dropdown with 4 maturity stages
   - Learning to drive
   - Supervised driving
   - Co-pilot
   - Autonomous driving

## Customizing Your Data

### Editing Inputs

To customize the input fields, edit the `data.json` file:

```json
{
  "inputs": [
    {
      "id": "unique_id",
      "name": "Display Name",
      "type": "text",
      "placeholder": "Placeholder text..."
    },
    {
      "id": "another_id",
      "name": "Dropdown Name",
      "type": "dropdown",
      "options": ["Option 1", "Option 2", "Option 3"]
    }
  ]
}
```

### Input Field Types

#### Text Input
```json
{
  "id": "field_id",
  "name": "Field Label",
  "type": "text",
  "placeholder": "Enter text here..."
}
```

#### Dropdown Input
```json
{
  "id": "field_id",
  "name": "Field Label",
  "type": "dropdown",
  "options": ["Option 1", "Option 2", "Option 3"]
}
```

## Project Structure

```
scorecard-app/
├── index.html       # Main HTML file
├── styles.css       # Styling and responsive design
├── app.js          # Application logic
├── data.json       # Data reference file (easily editable)
└── README.md       # This file
```

## How It Works

1. **Fill in inputs**: Enter text or select dropdown options
2. **Live updates**: Scorecard appears and updates in real-time on the right side
3. **Track progress**: See completion percentage at the bottom
4. **Reset**: Clear all inputs with the Reset button
5. **Print**: Use browser print function for a clean printout

## Responsive Behavior

- **Desktop (1024px+)**: Split-screen layout with form and scorecard side-by-side
- **Tablet (768-1024px)**: Stacked layout with form on top, scorecard below
- **Mobile (<768px)**: Optimized single-column layout

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #4f46e5;
    --primary-dark: #4338ca;
    --success-color: #10b981;
    /* ... more variables */
}
```

### Adding New Input Types

Currently supports:
- `text` - Single-line text input
- `dropdown` - Select dropdown with predefined options

To add more input types, edit the `createInputGroup()` function in `app.js`.

## Tips

- All inputs are optional - the scorecard shows only completed fields
- Dropdown options can be any text value
- Text inputs support unlimited length (with word-wrap in scorecard)
- The completion percentage updates automatically
- Changes are immediate - no "submit" button required

## Future Enhancements

Possible additions you could make:

- Export scorecard as PDF
- Save configurations to local storage
- Add textarea for multi-line text inputs
- Include date/time pickers
- Add validation rules
- Multi-step form wizard
- Email scorecard functionality

## License

Free to use and modify for your projects!

---

Made with ❤️ using HTML, CSS, and JavaScript
