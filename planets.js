document.addEventListener("DOMContentLoaded", function () {
  loadAllPlanets(); // toutes les planètes au chargement de la page
});

const apiBase = "https://swapi.dev/api/planets/";
let allPlanets = []; // Stocke toutes les planètes pour le filtrage et l'affichage

// Charge toutes les planètes
function loadAllPlanets(url = apiBase) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allPlanets = allPlanets.concat(data.results);
      if (data.next) {
        loadAllPlanets(data.next); // Charge la page suivante
      } else {
        console.log("Toutes les planètes ont été chargées.");
        displayPlanets(allPlanets); // Affiche initialement toutes les planètes
      }
    })
    .catch((error) =>
      console.error("Erreur lors du chargement des planètes: ", error)
    );
}

// Affichage des planètes selon le filtre
function displayPlanets(planets) {
  const planetListElement = document.getElementById("planet-list");
  planetListElement.innerHTML = ""; // Nettoie la liste des planètes précédentes

  planets.forEach((planet) => {
    const listItem = document.createElement("li");
    listItem.textContent = planet.name;
    listItem.onclick = () => {
      displayPlanetInfo(planet); // Mise à jour pour passer l'objet planète directement
      highlightPlanet(); // Met en évidence la planète sélectionnée
    };
    planetListElement.appendChild(listItem);
  });

  // Mise à jour du nombre de résultats
  document.getElementById(
    "filter-result-count"
  ).textContent = `Nombre de résultats : ${planets.length}`;
}

// Gestion du filtre par population
document
  .getElementById("population-filter")
  .addEventListener("change", function () {
    const filterValue = this.value;
    filterPlanetsByPopulation(filterValue);
  });

function filterPlanetsByPopulation(value) {
  let filteredPlanets = allPlanets.filter((planet) => {
    const population = parseInt(planet.population, 10);
    switch (value) {
      case "1":
        return population > 0 && population <= 100000;
      case "2":
        return population > 100000 && population <= 100000000;
      case "3":
        return population > 100000000;
      default:
        return true; // Aucun filtre sélectionné ou "Toutes les populations"
    }
  });

  displayPlanets(filteredPlanets); // Affiche les planètes filtrées
}

// Affichage des informations détaillées d'une planète
function displayPlanetInfo(planet) {
  document.getElementById("selected-planet-name").textContent = planet.name;
  document.getElementById(
    "population-info"
  ).textContent = `Population : ${planet.population}`;
  document.getElementById(
    "diameter-info"
  ).textContent = `Diamètre : ${planet.diameter}`;
  document.getElementById(
    "gravity-info"
  ).textContent = `Gravité : ${planet.gravity}`;
  document.getElementById(
    "climate-info"
  ).textContent = `Climat : ${planet.climate}`;
  document.getElementById(
    "terrain-info"
  ).textContent = `Terrain : ${planet.terrain}`;
}

// Ajoute un point lumineux sur la demi-sphère pour la planète sélectionnée
function highlightPlanet() {
  const halfSphereElement = document.getElementById("half-sphere");
  // Supprime le point précédent s'il existe
  while (halfSphereElement.firstChild) {
    halfSphereElement.removeChild(halfSphereElement.firstChild);
  }
  // Crée un nouveau point pour la planète sélectionnée
  const point = document.createElement("div");
  point.className = "highlight-point";

  // Positionne le point de manière aléatoire sur l'arc de la demi-sphère
  const angle = Math.random() * Math.PI;
  const radius = halfSphereElement.offsetWidth / 2;
  const x = radius + radius * Math.cos(angle) - 5;
  const y = radius - radius * Math.sin(angle) - 5;

  point.style.left = `${x}px`;
  point.style.top = `${y}px`;
  halfSphereElement.appendChild(point);
}
