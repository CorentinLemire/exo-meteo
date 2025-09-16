function getWeather() {
    let city = document.getElementById("cityInput").value.trim();
    let apikey = "f7ccc76d3ce387871e76716d6bd8819c"
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&lang=fr&units=metric`

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ville non trouvée")
            }
            return response.json()
        })
        .then(data => {
            const cityName = data.city.name

            document.getElementById("city").textContent = cityName

            const favBtn = document.getElementById('favoriteBtn')
            favBtn.classList.remove('d-none')
            FavoriteStar(cityName)

            const weather = data.list[0]
            document.getElementById("temperature").innerHTML = `${Math.round(weather.main.temp)}°C`
            document.getElementById("tempmax").innerHTML = `${weather.main.temp_max}°C`
            document.getElementById("tempmin").innerHTML = `${weather.main.temp_min}°C`
            document.getElementById("description").innerHTML = weather.weather[0].description

            const iconCode = weather.weather[0].icon;
            document.getElementById("icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="icon">`
            document.getElementById("wind").innerHTML = `<i class="bi bi-wind"></i> ${weather.wind.speed} km/h`
            document.getElementById("pluie").innerHTML = `<i class="bi bi-cloud-hail-fill"></i> ${Math.round(weather.pop * 100)}%`
        })
        .catch(error => {
            alert("Erreur : " + error.message);
            document.getElementById('favoriteBtn').classList.add('d-none')
        });

}

function FavoriteStar(cityName) {
    const favoriteBtn = document.getElementById('favoriteBtn')
    const favoris = JSON.parse(localStorage.getItem('favoris')) || []

    const isFavori = favoris.includes(cityName)

    favoriteBtn.innerHTML = isFavori
        ? '<i class="bi bi-star-fill"></i>'
        : '<i class="bi bi-star"></i>'

    favoriteBtn.onclick = () => {
        const updatedFavoris = [...favoris]
        const index = updatedFavoris.indexOf(cityName)

        if (index == -1) {
            updatedFavoris.push(cityName)
        } else {
            updatedFavoris.splice(index, 1)
        }

        localStorage.setItem('favoris', JSON.stringify(updatedFavoris))
        FavoriteStar(cityName)

    };
}
function displayFavorites() {
    const favoris = JSON.parse(localStorage.getItem('favoris')) || [];
    const listContainer = document.querySelector('.offcanvas-body');

    listContainer.innerHTML = `
        <div class="dropdown mt-3">
            <ul class="list-group">
                ${favoris.map(ville => `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span style="cursor:pointer;" onclick="loadCity('${ville}')">${ville}</span>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFavorite(event, '${ville}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}


function loadCity(ville) {
    document.getElementById('cityInput').value = ville;
    getWeather();
}

function removeFavorite(event, cityName) {
    event.stopPropagation(); // Évite de déclencher loadCity()

    const favoris = JSON.parse(localStorage.getItem('favoris')) || []
    const updatedFavoris = favoris.filter(ville => ville !== cityName)
    localStorage.setItem('favoris', JSON.stringify(updatedFavoris))

    displayFavorites() // Met à jour la liste


}


































//     // Si la ville affichée est celle qu'on vient de supprimer, on met à jour le bouton étoile
//     const currentCity = document.getElementById('city')?.textContent;
//     if (currentCity === cityName) {
//         FavoriteStar(cityName); // Actualise l’état de l’étoile
//     }
// }