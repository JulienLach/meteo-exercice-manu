// Variables
const searchButton = document.getElementById("searchButton");
const locationInput = document.getElementById("locationInput");

// Déclarer la fonction fetch de recherche des coordonées GPS de la ville en input
function fetchCoordoneesGps(city) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            console.log(`Coordonnées GPS de ${city}: Latitude ${latitude}, Longitude ${longitude}`);
            fetchInformationsMeteo(latitude, longitude) // voir portée des varaibles
        })
        .catch(error => {
            console.error("Erreur dans la récupération des données", error);
        });
}

// appeler la deuxième fonction du deuxième fetch dans le .then du premier pour la portée des variables latitude et longitude
// rentrer paramètres latitude et longitude dans la fonction fetchInformationsMeteo()

// Fonction d'affichage des infos de open
function fetchInformationsMeteo(latitude, longitude) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m,`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const temperature = data.hourly.temperature_2m;
            const vitesseVent = data.hourly.wind_speed_10m;
            const date = data.hourly.time;
            console.log(temperature, vitesseVent, date)
        })
        .catch(error => {
            console.error("Erreur dans la récupération des données", error);
        });
};



// Fonction de recherche de la ville avec l'input
function rechercheVille() {
    const city = locationInput.value;
    fetchCoordoneesGps(city);
    fetchInformationsMeteo();
};

// EventListener de recherche click ou touche Entrée
searchButton.addEventListener("click", rechercheVille); // rechercher au click du boutton
locationInput.addEventListener("keyup", function (event) { // rechercher avec la touche entrée
    if (event.key === "Enter") {
        rechercheVille();
    }
});
