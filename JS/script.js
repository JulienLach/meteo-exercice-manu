const searchButton = document.getElementById("searchButton");
const locationInput = document.getElementById("locationInput");

// Déclarer la fonction fetch de recherce des coordonées GPS de la ville en input
function fetchCoordoneesGps(city) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            console.log(`Coordonnées GPS de ${city}: Latitude ${latitude}, Longitude ${longitude}`);
        })
        .catch(error => {
            console.error("Erreur dans la récupération des données", error);
        });
}

// Fonction de recherche de la ville avec l'input
function rechercheVille() {
    const city = locationInput.value;
    fetchCoordoneesGps(city)
};

// EventListener de recherche click ou touche Entrée
searchButton.addEventListener("click", rechercheVille); // rechercher au click du boutton
locationInput.addEventListener("keyup", function (event) { // rechercher avec la touche entrée
    if (event.key === "Enter") {
        rechercheVille();
    }
});
