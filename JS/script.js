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

// Fonction d'affichage des infos de open-meteo
function fetchInformationsMeteo(latitude, longitude) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m,`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const temperature = data.hourly.temperature_2m;
            const vitesseVent = data.hourly.wind_speed_10m;
            const date = data.hourly.time;
            console.log(temperature, vitesseVent, date)
            // Récupération des données terminée

            // Création du tableau
            const tableau = document.createElement("table");
            // En-tete du tableau
            const enTeteTableauLigne = tableau.insertRow(0);
            const enTeteTitres = ["Date", "Temperature", "Vitesse du vent"]

            // boucle forEach pour chaque titre du tableau
            enTeteTitres.forEach((titre) => {
                const caseEntete = document.createElement("th"); // créer une case entete pour chaque titre
                caseEntete.textContent = titre;
                enTeteTableauLigne.appendChild(caseEntete); // attacher chaque case entete à la première ligne en tete du tableau
            });

            // Ajouter les données au tableau avec une boucle for pour parcourir chaque element à partir de sa date
            for (let i = 0; i < date.length; i++) {
                const ligne = tableau.insertRow(i + 1)

                const celluleDate = ligne.insertCell(0)
                celluleDate.textContent = new Date(date[i]).toLocaleDateString(); // Convertir la date en date locale

                const celluleTemperature = ligne.insertCell(1);
                celluleTemperature.textContent = temperature[i] + "°C";

                const celluleVitesseVent = ligne.insertCell(2);
                celluleVitesseVent.textContent = vitesseVent[i] + " km/h";
            }

            // Attacher le tableau à la div container
            const container = document.querySelector(".container")
            container.innerHTML = ""; // vider la div par défaut
            container.appendChild(tableau)
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
