// ===========================
// State Management
// ===========================
let inputsConfig = [];
let formData = {};
let lookupTables = [];
let lookupTableData = {};

// ===========================
// Initialize App
// ===========================
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    await loadLookupTables();
    renderInputs();
    setupEventListeners();
    updateScorecard(); // Show initial empty state
});

// ===========================
// Data Loading
// ===========================
async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to load data');
        }
        const data = await response.json();
        inputsConfig = data.inputs || [];
        lookupTables = data.lookupTables || [];
        
        // Initialize form data
        inputsConfig.forEach(input => {
            formData[input.id] = '';
        });
    } catch (error) {
        console.error('Error loading data:', error);
        // Use demo data if file doesn't load
        inputsConfig = getDemoData();
        inputsConfig.forEach(input => {
            formData[input.id] = '';
        });
    }
}

// ===========================
// CSV Lookup Table Loading
// ===========================
async function loadLookupTables() {
    for (const table of lookupTables) {
        try {
            const response = await fetch(table.csvFile);
            if (!response.ok) {
                throw new Error(`Failed to load ${table.csvFile}`);
            }
            const csvText = await response.text();
            lookupTableData[table.id] = parseCSV(csvText);
        } catch (error) {
            console.error(`Error loading lookup table ${table.id}:`, error);
            lookupTableData[table.id] = null;
        }
    }
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = {};
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const rowKey = values[0]; // First column is the row key
        data[rowKey] = {};
        
        for (let j = 1; j < values.length; j++) {
            const colKey = headers[j];
            data[rowKey][colKey] = values[j];
        }
    }
    
    return data;
}

function lookupValue(tableId, rowValue, columnValue) {
    const table = lookupTableData[tableId];
    if (!table || !rowValue || !columnValue) {
        return null;
    }
    
    if (table[rowValue] && table[rowValue][columnValue]) {
        return table[rowValue][columnValue];
    }
    
    return null;
}

function getColorClass(value) {
    const lowerValue = value.toLowerCase().trim();
    
    if (lowerValue === 'low') {
        return 'color-green';
    } else if (lowerValue === 'medium') {
        return 'color-yellow';
    } else if (lowerValue === 'high') {
        return 'color-orange';
    } else if (lowerValue === 'very high') {
        return 'color-red';
    }
    
    return '';
}

function getDemoData() {
    return [
        {
            id: "primary_jtbd",
            name: "Primary JTBD",
            type: "text",
            placeholder: "Enter the primary Job To Be Done..."
        },
        {
            id: "automation_type",
            name: "Desired automation type",
            type: "dropdown",
            options: [
                "Acquisition automation",
                "Analysis automation",
                "Decision automation",
                "Action automation"
            ]
        },
        {
            id: "automation_level",
            name: "Desired automation level",
            type: "dropdown",
            options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        },
        {
            id: "current_ai_maturity",
            name: "Current user AI maturity",
            type: "dropdown",
            options: [
                "Learning to drive",
                "Supervised driving",
                "Co-pilot",
                "Autonomous driving"
            ]
        },
        {
            id: "desired_ai_maturity",
            name: "Desired AI maturity (business)",
            type: "dropdown",
            options: [
                "Learning to drive",
                "Supervised driving",
                "Co-pilot",
                "Autonomous driving"
            ]
        }
    ];
}

// ===========================
// Rendering Functions
// ===========================
function renderInputs() {
    const container = document.getElementById('inputsContainer');
    container.innerHTML = '';

    inputsConfig.forEach(input => {
        const inputGroup = createInputGroup(input);
        container.appendChild(inputGroup);
    });
}

function createInputGroup(input) {
    const group = document.createElement('div');
    group.className = 'input-group';

    const label = document.createElement('label');
    label.className = 'input-label';
    label.htmlFor = input.id;
    
    // Add info icon button if info exists
    if (input.info) {
        label.innerHTML = `
            ${input.name}
            <button type="button" class="info-icon-btn" data-input-id="${input.id}" aria-label="More information">i</button>
        `;
        
        // Add event listener to info button
        setTimeout(() => {
            const infoBtn = label.querySelector('.info-icon-btn');
            infoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openInfoPanel(input.info);
            });
        }, 0);
    } else {
        label.innerHTML = `${input.name}`;
    }

    let inputElement;

    if (input.type === 'text') {
        inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.id = input.id;
        inputElement.className = 'input-field';
        inputElement.placeholder = input.placeholder || '';
        inputElement.addEventListener('input', (e) => handleInputChange(input.id, e.target.value));
    } else if (input.type === 'dropdown') {
        inputElement = document.createElement('select');
        inputElement.id = input.id;
        inputElement.className = 'select-field';
        
        // Add placeholder option
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = 'Select an option...';
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        inputElement.appendChild(placeholderOption);

        // Add actual options
        input.options.forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            inputElement.appendChild(option);
        });

        inputElement.addEventListener('change', (e) => handleInputChange(input.id, e.target.value));
    }

    group.appendChild(label);
    group.appendChild(inputElement);

    return group;
}

function handleInputChange(inputId, value) {
    formData[inputId] = value;
    
    // Update visual feedback
    const inputElement = document.getElementById(inputId);
    if (value && value.trim() !== '') {
        inputElement.classList.add('input-filled');
    } else {
        inputElement.classList.remove('input-filled');
    }
    
    // Update scorecard immediately
    updateScorecard();
}

// ===========================
// Scorecard Generation
// ===========================
function updateScorecard() {
    const container = document.getElementById('scorecardContent');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Check if any fields are filled
    const filledFields = Object.values(formData).filter(value => value && value.trim() !== '');
    
    if (filledFields.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Complete the inputs to see your scorecard</p>
            </div>
        `;
        downloadBtn.style.display = 'none';
        return;
    }
    
    // Show download button when scorecard has content
    downloadBtn.style.display = 'block';

    // Calculate completion percentage
    const totalFields = inputsConfig.length;
    const completionPercentage = Math.round((filledFields.length / totalFields) * 100);

    let scorecardHTML = '';

    // Add each filled input to scorecard
    inputsConfig.forEach(input => {
        const value = formData[input.id];
        if (value && value.trim() !== '') {
            scorecardHTML += `
                <div class="scorecard-item">
                    <div class="scorecard-item-label">${input.name}</div>
                    <div class="scorecard-item-value">${value}</div>
                </div>
            `;
        }
    });

    // Add lookup table results
    lookupTables.forEach(table => {
        const rowValue = formData[table.rowInput];
        const colValue = formData[table.columnInput];
        const lookupResult = lookupValue(table.id, rowValue, colValue);
        
        if (lookupResult) {
            const colorClass = getColorClass(lookupResult);
            scorecardHTML += `
                <div class="scorecard-item lookup-result ${colorClass}">
                    <div class="scorecard-item-label">${table.name}</div>
                    <div class="scorecard-item-value highlight">${lookupResult}</div>
                    <div class="scorecard-item-subtext">Some more information here about what actions to take</div>
                </div>
            `;
        }
    });

    container.innerHTML = scorecardHTML;
}

// ===========================
// Info Panel Functions
// ===========================
function openInfoPanel(infoData) {
    const panel = document.getElementById('infoPanel');
    const overlay = document.getElementById('panelOverlay');
    const title = document.getElementById('infoPanelTitle');
    const content = document.getElementById('infoPanelContent');
    
    // Set content
    title.textContent = infoData.title;
    content.innerHTML = infoData.content;
    
    // Show panel and overlay
    panel.classList.add('active');
    overlay.classList.add('active');
    
    // Prevent body scroll when panel is open
    document.body.style.overflow = 'hidden';
}

function closeInfoPanel() {
    const panel = document.getElementById('infoPanel');
    const overlay = document.getElementById('panelOverlay');
    
    panel.classList.remove('active');
    overlay.classList.remove('active');
    
    // Re-enable body scroll
    document.body.style.overflow = '';
}

// ===========================
// Event Listeners
// ===========================
function setupEventListeners() {
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', () => {
        resetForm();
    });
    
    // Download button
    document.getElementById('downloadBtn').addEventListener('click', () => {
        downloadScorecard();
    });
    
    // Info panel close button
    document.getElementById('closePanelBtn').addEventListener('click', () => {
        closeInfoPanel();
    });
    
    // Close panel when clicking overlay
    document.getElementById('panelOverlay').addEventListener('click', () => {
        closeInfoPanel();
    });
    
    // Close panel with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeInfoPanel();
        }
    });
}

// ===========================
// Utility Functions
// ===========================
function resetForm() {
    // Clear form data
    inputsConfig.forEach(input => {
        formData[input.id] = '';
        const element = document.getElementById(input.id);
        if (element) {
            element.value = '';
            element.classList.remove('input-filled');
        }
    });

    // Update scorecard to show empty state
    updateScorecard();
}

async function downloadScorecard() {
    const scorecardContent = document.getElementById('scorecardContent');
    const downloadBtn = document.getElementById('downloadBtn');
    
    try {
        // Temporarily hide the download button during capture
        downloadBtn.style.display = 'none';
        
        // Use html2canvas to capture the scorecard
        const canvas = await html2canvas(scorecardContent, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: true, // Enable logging to debug
            useCORS: true
        });
        
        // Show the button again
        downloadBtn.style.display = 'block';
        
        // Create a new canvas with proper color rendering
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = canvas.width;
        finalCanvas.height = canvas.height;
        const ctx = finalCanvas.getContext('2d', { alpha: false });
        
        // Fill with white background first
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
        
        // Draw the captured image on top
        ctx.drawImage(canvas, 0, 0);
        
        // Convert to blob and download
        finalCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            link.download = `scorecard-${timestamp}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        }, 'image/png');
    } catch (error) {
        console.error('Error downloading scorecard:', error);
        alert('Failed to download scorecard. Please try again.');
        downloadBtn.style.display = 'block';
    }
}
