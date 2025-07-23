const lapData = [];

document.getElementById('lapForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const carName = document.getElementById('carName').value;
    const lapTime = parseFloat(document.getElementById('lapTime').value);
    lapData.push({ car: carName, time: lapTime });
    console.log("Lap added:", lapData);
    updateTable();
});

function updateTable() {
    let table = '<tr><th>Car</th><th>Lap Time</th></tr>';
    for (let lap of lapData) {
        table += `<tr><td>${lap.car}</td><td>${lap.time.toFixed(2)}</td></tr>`;
    }
    document.getElementById('resultsTable').innerHTML = table;
}