const apiBase = "https://swapi.dev/api/planets/";
let currentPage = 1; // Commence à la première page

// Met à jour la liste des planètes et les boutons de navigation
function updatePlanetList(page) {
  fetch(`${apiBase}?page=${page}`)
    .then(response => response.json())
    .then(data => {
      const planetListElement = document.getElementById("planet-list");
      // Nettoie la liste des planètes précédentes
      planetListElement.innerHTML = '';

      // Crée les éléments de la liste pour les nouvelles planètes
      data.results.forEach(planet => {
        const listItem = document.createElement("li");
        listItem.textContent = planet.name;
        listItem.onclick = () => {
          displayPlanetInfo(planet.name); 
          highlightPlanet();
        };
        planetListElement.appendChild(listItem);
      });

      // Active/désactive les boutons de navigation
      document.getElementById("prevPage").disabled = !data.previous;
      document.getElementById("nextPage").disabled = !data.next;
    })
    .catch(error => console.error("Erreur lors de la récupération des planètes: ", error));
}

// Affiche le nom et les informations de la planète sélectionnée à droite
function displayPlanetInfo(name) {
  const planetNameElement = document.getElementById("selected-planet-name");
  planetNameElement.textContent = name;
  highlightPlanet(); // Appelle cette fonction chaque fois qu'une planète est sélectionnée

  // Récupère les informations de la planète depuis l'API
  fetch(`${apiBase}?search=${name}`)
    .then(response => response.json())
    .then(data => {
      const planetInfo = data.results[0];
      // Met à jour les informations affichées
      document.getElementById("population-info").textContent = `Population : ${planetInfo.population}`;
      document.getElementById("diameter-info").textContent = `Diamètre : ${planetInfo.diameter}`;
      document.getElementById("gravity-info").textContent = `Gravité : ${planetInfo.gravity}`;
      document.getElementById("climate-info").textContent = `Climat : ${planetInfo.climate}`;
      document.getElementById("terrain-info").textContent = `Terrain : ${planetInfo.terrain}`;
    })
    .catch(error => console.error("Erreur lors de la récupération des informations de la planète: ", error));
}

// Ajoute un point lumineux sur la demi-sphère pour la planète sélectionnée
function highlightPlanet() {
    const halfSphereElement = document.getElementById('half-sphere');
    // Supprime le point précédent s'il existe
    const existingPoints = halfSphereElement.getElementsByClassName('highlight-point');
    while(existingPoints.length > 0) {
        existingPoints[0].parentNode.removeChild(existingPoints[0]);
    }
    // Crée un nouveau point pour la planète sélectionnée
    const point = document.createElement('div');
    point.className = 'highlight-point';
    
    // Positionne le point de manière aléatoire sur l'arc de la demi-sphère
    const angle = Math.random() * Math.PI; 
    const radius = halfSphereElement.offsetWidth / 2; 
    const x = radius + (radius * Math.cos(angle)) - 5; 
    const y = radius - (radius * Math.sin(angle)) - 5; 
    
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    halfSphereElement.appendChild(point);
}

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updatePlanetList(currentPage);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  updatePlanetList(currentPage);
});

updatePlanetList(currentPage);
