// Datos de ejemplo (en un caso real estos vendrían de una API)
const playersData = {
    "premier": [
        { id: 1, name: "Erling Haaland", team: "Manchester City", goals: 28, assists: 6, matches: 30, 
          photo: "img/haaland.jpg", position: "Delantero", nationality: "Noruega", age: 23 },
        { id: 2, name: "Mohamed Salah", team: "Liverpool", goals: 20, assists: 10, matches: 28, 
          photo: "img/salah.jpg", position: "Delantero", nationality: "Egipto", age: 31 }
    ],
    "laliga": [
        { id: 3, name: "Robert Lewandowski", team: "Barcelona", goals: 22, assists: 7, matches: 29, 
          photo: "img/lewa.png", position: "Delantero", nationality: "Polonia", age: 35 },
        { id: 4, name: "Jude Bellingham", team: "Real Madrid", goals: 18, assists: 11, matches: 27, 
          photo: "img/bellingham.jpg", position: "Mediocampista", nationality: "Inglaterra", age: 20 }
    ]
};

const teamsData = {
    "laliga": [
        { name: "Real Madrid", matches: 30, wins: 24, draws: 4, losses: 2, goalsFor: 68, goalsAgainst: 18, points: 76, form: "WWWDW" },
        { name: "Barcelona", matches: 30, wins: 21, draws: 6, losses: 3, goalsFor: 62, goalsAgainst: 24, points: 69, form: "WLWWW" }
    ],
    "premier": [
        { name: "Manchester City", matches: 30, wins: 22, draws: 5, losses: 3, goalsFor: 72, goalsAgainst: 22, points: 71, form: "WWWWW" },
        { name: "Liverpool", matches: 30, wins: 21, draws: 7, losses: 2, goalsFor: 70, goalsAgainst: 28, points: 70, form: "WDWLW" }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tablas
    loadTopScorers();
    loadTopAssists();
    loadTeamsTable();
    
    // Configurar filtros
    setupFilters();
    
    // Inicializar gráficos
    initCharts();
    
    // Configurar comparador de jugadores
    setupPlayerComparator();
});

function loadTopScorers() {
    const tbody = document.getElementById('goalsTableBody');
    tbody.innerHTML = '';
    
    // Combinar jugadores de todas las ligas
    let allPlayers = [];
    for (const league in playersData) {
        allPlayers = allPlayers.concat(playersData[league]);
    }
    
    // Ordenar por goles
    allPlayers.sort((a, b) => b.goals - a.goals);
    
    // Mostrar top 10
    allPlayers.slice(0, 10).forEach((player, index) => {
        const avg = (player.goals / player.matches).toFixed(2);
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <img src="${player.photo}" alt="${player.name}" class="player-thumb">
                    ${player.name}
                </td>
                <td>${player.team}</td>
                <td>${player.goals}</td>
                <td>${player.matches}</td>
                <td>${avg}</td>
                <td>
                    <button class="btn btn-sm btn-info view-details" data-player-id="${player.id}">
                        <i class="fas fa-chart-line"></i> Detalle
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    // Agregar event listeners para los botones de detalle
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const playerId = parseInt(this.getAttribute('data-player-id'));
            showPlayerDetails(playerId);
        });
    });
}

function loadTopAssists() {
    const tbody = document.getElementById('assistsTableBody');
    tbody.innerHTML = '';
    
    // Combinar jugadores de todas las ligas
    let allPlayers = [];
    for (const league in playersData) {
        allPlayers = allPlayers.concat(playersData[league]);
    }
    
    // Ordenar por asistencias
    allPlayers.sort((a, b) => b.assists - a.assists);
    
    // Mostrar top 10
    allPlayers.slice(0, 10).forEach((player, index) => {
        const avg = (player.assists / player.matches).toFixed(2);
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <img src="${player.photo}" alt="${player.name}" class="player-thumb">
                    ${player.name}
                </td>
                <td>${player.team}</td>
                <td>${player.assists}</td>
                <td>${player.matches}</td>
                <td>${avg}</td>
                <td>
                    <button class="btn btn-sm btn-info view-details" data-player-id="${player.id}">
                        <i class="fas fa-chart-line"></i> Detalle
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    // Agregar event listeners para los botones de detalle
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const playerId = parseInt(this.getAttribute('data-player-id'));
            showPlayerDetails(playerId);
        });
    });
}

function loadTeamsTable() {
    const tbody = document.getElementById('teamsTableBody');
    tbody.innerHTML = '';
    
    // Combinar equipos de todas las ligas
    let allTeams = [];
    for (const league in teamsData) {
        allTeams = allTeams.concat(teamsData[league]);
    }
    
    // Ordenar por puntos
    allTeams.sort((a, b) => b.points - a.points);
    
    // Mostrar top 10
    allTeams.slice(0, 10).forEach((team, index) => {
        const form = team.form.split('').map(result => {
            if (result === 'W') return '<span class="form-win">W</span>';
            if (result === 'D') return '<span class="form-draw">D</span>';
            return '<span class="form-loss">L</span>';
        }).join('');
        
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${team.name}</td>
                <td>${team.matches}</td>
                <td>${team.wins}</td>
                <td>${team.draws}</td>
                <td>${team.losses}</td>
                <td>${team.goalsFor}</td>
                <td>${team.goalsAgainst}</td>
                <td>${team.goalsFor - team.goalsAgainst}</td>
                <td><strong>${team.points}</strong></td>
                <td class="team-form">${form}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function setupFilters() {
    const leagueFilter = document.getElementById('leagueFilter');
    const applyFiltersBtn = document.getElementById('applyFilters');
    
    applyFiltersBtn.addEventListener('click', function() {
        const selectedLeague = leagueFilter.value;
        
        // Aquí normalmente haríamos una llamada a la API con los filtros
        // Por ahora solo mostramos un mensaje
        console.log(`Filtrando por liga: ${selectedLeague}`);
        
        // Recargar datos con filtros
        loadTopScorers();
        loadTopAssists();
        loadTeamsTable();
    });
}

function initCharts() {
    // Gráfico principal
    const ctx = document.getElementById('mainChart').getContext('2d');
    const mainChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Haaland', 'Salah', 'Lewandowski', 'Bellingham', 'Mbappé'],
            datasets: [{
                label: 'Goles',
                data: [28, 20, 22, 18, 24],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Top 5 Goleadores',
                    font: {
                        size: 18
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Goles'
                    }
                }
            }
        }
    });
    
    // Gráficos secundarios
    const ctx1 = document.getElementById('secondaryChart1').getContext('2d');
    const secondaryChart1 = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Victorias', 'Empates', 'Derrotas'],
            datasets: [{
                data: [24, 4, 2],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(255, 99, 132, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Rendimiento Real Madrid',
                    font: {
                        size: 14
                    }
                }
            }
        }
    });
    
    const ctx2 = document.getElementById('secondaryChart2').getContext('2d');
    const secondaryChart2 = new Chart(ctx2, {
        type: 'radar',
        data: {
            labels: ['Goles', 'Asistencias', 'Pases clave', 'Recuperaciones', 'Disparos'],
            datasets: [
                {
                    label: 'Haaland',
                    data: [28, 6, 12, 45, 98],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
                },
                {
                    label: 'Bellingham',
                    data: [18, 11, 45, 120, 56],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparación de Estadísticas',
                    font: {
                        size: 14
                    }
                }
            }
        }
    });
    
    // Cambiar tipo de gráfico
    document.getElementById('chartType').addEventListener('change', function() {
        const chartType = this.value;
        
        switch(chartType) {
            case 'goals':
                mainChart.data.labels = ['Haaland', 'Salah', 'Lewandowski', 'Bellingham', 'Mbappé'];
                mainChart.data.datasets[0].data = [28, 20, 22, 18, 24];
                mainChart.data.datasets[0].label = 'Goles';
                mainChart.options.plugins.title.text = 'Top 5 Goleadores';
                break;
            case 'assists':
                mainChart.data.labels = ['De Bruyne', 'Messi', 'Fernandes', 'Kroos', 'Bellingham'];
                mainChart.data.datasets[0].data = [16, 15, 14, 12, 11];
                mainChart.data.datasets[0].label = 'Asistencias';
                mainChart.options.plugins.title.text = 'Top 5 Asistentes';
                break;
            case 'team-performance':
                mainChart.data.labels = ['Real Madrid', 'Barcelona', 'Girona', 'Atlético', 'Athletic'];
                mainChart.data.datasets[0].data = [76, 69, 65, 58, 56];
                mainChart.data.datasets[0].label = 'Puntos';
                mainChart.options.plugins.title.text = 'Puntos por Equipo';
                break;
        }
        
        mainChart.update();
    });
}

function setupPlayerComparator() {
    // Llenar selectores de jugadores
    const player1Select = document.getElementById('player1');
    const player2Select = document.getElementById('player2');
    
    // Combinar jugadores de todas las ligas
    let allPlayers = [];
    for (const league in playersData) {
        allPlayers = allPlayers.concat(playersData[league]);
    }
    
    allPlayers.forEach(player => {
        const option1 = document.createElement('option');
        option1.value = player.id;
        option1.textContent = `${player.name} (${player.team})`;
        
        const option2 = document.createElement('option');
        option2.value = player.id;
        option2.textContent = `${player.name} (${player.team})`;
        
        player1Select.appendChild(option1);
        player2Select.appendChild(option2);
    });
    
    // Actualizar vista previa al seleccionar jugador
    player1Select.addEventListener('change', function() {
        const playerId = parseInt(this.value);
        if (playerId) {
            const player = allPlayers.find(p => p.id === playerId);
            updatePlayerPreview(player, 'player1Preview');
        }
    });
    
    player2Select.addEventListener('change', function() {
        const playerId = parseInt(this.value);
        if (playerId) {
            const player = allPlayers.find(p => p.id === playerId);
            updatePlayerPreview(player, 'player2Preview');
        }
    });
    
    // Configurar botón de comparación
    document.getElementById('comparePlayers').addEventListener('click', function() {
        const player1Id = parseInt(player1Select.value);
        const player2Id = parseInt(player2Select.value);
        
        if (!player1Id || !player2Id) {
            alert('Por favor selecciona dos jugadores para comparar');
            return;
        }
        
        const player1 = allPlayers.find(p => p.id === player1Id);
        const player2 = allPlayers.find(p => p.id === player2Id);
        
        showComparison(player1, player2);
    });
}

function updatePlayerPreview(player, elementId) {
    const preview = document.getElementById(elementId);
    const img = preview.querySelector('.player-img');
    const stats = preview.querySelector('.player-stats');
    
    img.style.backgroundImage = `url(${player.photo})`;
    
    stats.innerHTML = `
        <h5>${player.name}</h5>
        <p><strong>Equipo:</strong> ${player.team}</p>
        <p><strong>Goles:</strong> ${player.goals}</p>
        <p><strong>Asistencias:</strong> ${player.assists}</p>
    `;
}

function showComparison(player1, player2) {
    const resultsDiv = document.getElementById('comparisonResults');
    
    // Calcular promedios
    const avgGoals1 = (player1.goals / player1.matches).toFixed(2);
    const avgGoals2 = (player2.goals / player2.matches).toFixed(2);
    const avgAssists1 = (player1.assists / player1.matches).toFixed(2);
    const avgAssists2 = (player2.assists / player2.matches).toFixed(2);
    
    resultsDiv.innerHTML = `
        <div class="comparison-header">
            <h3>Comparación: ${player1.name} vs ${player2.name}</h3>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="player-card">
                    <div class="player-photo" style="background-image: url(${player1.photo})"></div>
                    <div class="player-info">
                        <h4>${player1.name}</h4>
                        <p><strong>Edad:</strong> ${player1.age} años</p>
                        <p><strong>Nacionalidad:</strong> ${player1.nationality}</p>
                        <p><strong>Posición:</strong> ${player1.position}</p>
                        <p><strong>Equipo:</strong> ${player1.team}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="player-card">
                    <div class="player-photo" style="background-image: url(${player2.photo})"></div>
                    <div class="player-info">
                        <h4>${player2.name}</h4>
                        <p><strong>Edad:</strong> ${player2.age} años</p>
                        <p><strong>Nacionalidad:</strong> ${player2.nationality}</p>
                        <p><strong>Posición:</strong> ${player2.position}</p>
                        <p><strong>Equipo:</strong> ${player2.team}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="stats-comparison">
            <table class="table">
                <thead>
                    <tr>
                        <th>Estadística</th>
                        <th>${player1.name}</th>
                        <th>${player2.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Goles</td>
                        <td>${player1.goals} <small>(${avgGoals1} por partido)</small></td>
                        <td>${player2.goals} <small>(${avgGoals2} por partido)</small></td>
                    </tr>
                    <tr>
                        <td>Asistencias</td>
                        <td>${player1.assists} <small>(${avgAssists1} por partido)</small></td>
                        <td>${player2.assists} <small>(${avgAssists2} por partido)</small></td>
                    </tr>
                    <tr>
                        <td>Partidos jugados</td>
                        <td>${player1.matches}</td>
                        <td>${player2.matches}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function showPlayerDetails(playerId) {
    // Encontrar jugador
    let player = null;
    for (const league in playersData) {
        const found = playersData[league].find(p => p.id === playerId);
        if (found) {
            player = found;
            break;
        }
    }
    
    if (!player) return;
    
    // Calcular promedios
    const avgGoals = (player.goals / player.matches).toFixed(2);
    const avgAssists = (player.assists / player.matches).toFixed(2);
    
    // Configurar modal
    const modalTitle = document.getElementById('playerModalTitle');
    const modalBody = document.getElementById('playerModalBody');
    
    modalTitle.textContent = player.name;
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <div class="player-photo-large" style="background-image: url(${player.photo})"></div>
            </div>
            <div class="col-md-8">
                <div class="player-info">
                    <p><strong>Edad:</strong> ${player.age} años</p>
                    <p><strong>Nacionalidad:</strong> ${player.nationality}</p>
                    <p><strong>Posición:</strong> ${player.position}</p>
                    <p><strong>Equipo:</strong> ${player.team}</p>
                    <p><strong>Partidos jugados:</strong> ${player.matches}</p>
                </div>
                
                <div class="player-stats">
                    <h5>Estadísticas esta temporada</h5>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-value">${player.goals}</div>
                            <div class="stat-label">Goles</div>
                            <div class="stat-avg">${avgGoals} por partido</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${player.assists}</div>
                            <div class="stat-label">Asistencias</div>
                            <div class="stat-avg">${avgAssists} por partido</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="player-chart mt-4">
            <canvas id="playerStatsChart"></canvas>
        </div>
    `;
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('playerModal'));
    modal.show();
    
    // Inicializar gráfico en el modal
    setTimeout(() => {
        const ctx = document.getElementById('playerStatsChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Goles', 'Asistencias', 'Pases clave', 'Regates', 'Disparos', 'Recuperaciones'],
                datasets: [{
                    label: player.name,
                    data: [
                        player.goals * 3, 
                        player.assists * 4, 
                        Math.floor(Math.random() * 50) + 30, 
                        Math.floor(Math.random() * 40) + 20,
                        Math.floor(Math.random() * 60) + 40,
                        Math.floor(Math.random() * 80) + 50
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }, 500);
}