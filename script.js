const lapData = [];

document.getElementById('lapForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const carName = document.getElementById('carName').value;
    const lapTime = parseFloat(document.getElementById('lapTime').value);

    if (carName === "" || isNaN(lapTime) || lapTime <= 0) {
        alert("Please enter a valid car name and positive lap time!");
        return;
    }

    lapData.push({ car: carName, time: lapTime });
    console.log("Lap added:", lapData);
    updateTable();
    calculateStats();
    document.getElementById('lapForm').reset();
});

function updateTable() {
    let table = '<tr><th>Car</th><th>Lap Time</th></tr>';
    for (let lap of lapData) {
        table += `<tr><td>${lap.car}</td><td>${lap.time.toFixed(2)}</td></tr>`;
    }
    document.getElementById('resultsTable').innerHTML = table;
}

function calculateStats() {
    if (lapData.length === 0) {
        document.getElementById('bestTime').innerText = 'N/A';
        document.getElementById('avgTime').innerText = 'N/A';
        return;
    }
    const times = lapData.map(lap => lap.time);
    const bestTime = Math.min(...times);
    const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
    document.getElementById('bestTime').innerText = bestTime.toFixed(2);
    document.getElementById('avgTime').innerText = avgTime.toFixed(2);
}