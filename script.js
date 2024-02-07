const apiBase = "https://swapi.dev/api/";
let currentIndex = 0;
const categories = ["people", "vehicles", "planets"];

function fetchData(category) {
  fetch(`${apiBase}${category}`)
    .then((response) => response.json())
    .then((data) => {
      let displayText = "";
      switch (category) {
        case "people":
          displayText = `Nombre d'être vivants recensés: ${data.count}`;
          break;
        case "vehicles":
          displayText = `Nombre de véhicules recensés: ${data.count}`;
          break;
        case "planets":
          displayText = `Nombre de planètes recensées: ${data.count}`;
          break;
      }
      document.getElementById("data-display").textContent = displayText;
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des données: ", error)
    );
}

function changeContent(direction) {
  currentIndex =
    (currentIndex + direction + categories.length) % categories.length;
  fetchData(categories[currentIndex]);
}

fetchData(categories[currentIndex]);
