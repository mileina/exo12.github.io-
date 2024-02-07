// l'URL de l'API
const apiBase = "https://swapi.dev/api/";
// Initialisation de l'index actuel pour naviguer entre les catégories
let currentIndex = 0;
// Déf des catégories disponibles pour les requêtes API
const categories = ["people", "vehicles", "planets"];

// Fonction pour récupérer les données de l'API
function fetchData(category) {
     // Effectue une requête à l'API pour une catégorie spécifique
  fetch(`${apiBase}${category}`)
    .then((response) => response.json())
    .then((data) => {
        // Initialisation de la variable pour le texte à afficher
      let displayText = "";
      // Sélection du texte approprié en fonction de la catégorie
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
       // Met à jour le contenu textuel d'un élément avec l'ID 'data-display' sur la page
      document.getElementById("data-display").textContent = displayText;
    })
    // Gère les erreurs éventuelles lors de la requête API
    .catch((error) =>
      console.error("Erreur lors de la récupération des données: ", error)
    );
}

// Fonction pour changer le contenu affiché en naviguant entre les catégories
function changeContent(direction) {
    // Calcule le nouvel index en tenant compte de la direction de navigation
  currentIndex =
    (currentIndex + direction + categories.length) % categories.length;
    // Appelle fetchData pour la nouvelle catégorie sélectionnée
  fetchData(categories[currentIndex]);
}

// Appel initial à fetchData pour afficher les données de la première catégorie
fetchData(categories[currentIndex]);
