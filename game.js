// DOM Elements
const commandInput = document.querySelector('#command-input textarea');
const logElement = document.getElementById('log');
const asciiElement = document.getElementById('ascii');
const mapElement = document.getElementById('map');

async function sendCommand() {
    const command = commandInput.value.trim();
    if (!command) {
        return;
    }

    try {
        const response = await fetch('https://exodus-backend-bgvq.onrender.com/command', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command }),
            credentials: 'omit'
        });

        const data = await response.json();
        updateUI(data);
        commandInput.value = ''; // Clear input
    } catch (error) {
        addToLog(`Error: ${error.message}`);
    }
}

function updateUI(gameState) {
    // Update main log
    addToLog(gameState.message);

    // Update ASCII art
    asciiElement.textContent = gameState.asciiArt;

    // Update map
    mapElement.textContent = gameState.map;

    // Update status bars
    document.querySelector('.health-fill').style.width =
        `${gameState.health}%`;
}

function addToLog(text) {
    const entry = document.createElement('div');
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
    logElement.appendChild(entry);
    logElement.scrollTop = logElement.scrollHeight;
}

commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendCommand();
    }
});




