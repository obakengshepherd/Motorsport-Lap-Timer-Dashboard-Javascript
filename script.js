// Initialize array to store lap data (car name, lap time)
const lapData = [];

// Handle form submission
document.getElementById('lapForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh
    const carName = document.getElementById('carName').value;
    const lapTime = parseFloat(document.getElementById('lapTime').value);

    // Validate inputs
    if (carName === "" || isNaN(lapTime) || lapTime <= 0) {
        alert("Please enter a valid car name and positive lap time!");
        return;
    }

    // Add lap to array and update UI
    lapData.push({ car: carName, time: lapTime });
    console.log("Lap added:", lapData);
    updateTable();
    calculateStats();
    document.getElementById('lapForm').reset(); // Clear form
    drawChart(); // Update chart
});

// Update table with lap data
function updateTable() {
    let table = '<tr><th>Car</th><th>Lap Time</th></tr>';
    for (let lap of lapData) {
        table += `<tr><td>${lap.car}</td><td>${lap.time.toFixed(2)}</td></tr>`;
    }
    document.getElementById('resultsTable').innerHTML = table;
}

// Calculate and display best/average lap times
function calculateStats() {
    if (lapData.length === 0) {
        document.getElementById('bestTime').innerText = 'N/A';
        document.getElementById('avgTime').innerText = 'N/A';
        drawChart(); // Clear chart
        return;
    }
    const times = lapData.map(lap => lap.time);
    const bestTime = Math.min(...times);
    const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
    document.getElementById('bestTime').innerText = bestTime.toFixed(2);
    document.getElementById('avgTime').innerText = avgTime.toFixed(2);
}

// Draw bar chart of lap times
function drawChart() {
    const canvas = document.getElementById('lapChart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    if (lapData.length === 0) return;

    const barWidth = 30;
    const maxHeight = 150;
    const times = lapData.map(lap => lap.time);
    const maxTime = Math.max(...times) || 1;

    ctx.fillStyle = '#333';
    times.forEach((time, index) => {
        const barHeight = (time / maxTime) * maxHeight;
        ctx.fillRect(index * (barWidth + 10), canvas.height - barHeight, barWidth, barHeight);
        ctx.fillText(lapData[index].car, index * (barWidth + 10), canvas.height - 5);
    });
}