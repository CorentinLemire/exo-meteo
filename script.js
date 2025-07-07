
function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apikey = "f7ccc76d3ce387871e76716d6bd8819c";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&lang=fr&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ville non trouvée");
            }
            return response.json();
        })
        .then(data => {
            const forecastContainer = document.getElementById("forecast");
            forecastContainer.innerHTML = "";

            document.getElementById("city").innerHTML = data.city.name;
            document.getElementById("temperature").innerHTML = `${Math.round(data.list[0].main.temp)}°C`;
            document.getElementById("tempmax").innerHTML = `${data.list[0].main.temp_max}°C`;
            document.getElementById("tempmin").innerHTML = `${data.list[0].main.temp_min}°C`;
            document.getElementById("description").innerHTML = data.list[0].weather[0].description;
            const iconCode = data.list[0].weather[0].icon;
            document.getElementById("icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="icon">`;
            document.getElementById("wind").innerHTML = `<i class="bi bi-wind"></i> ${data.list[0].wind.speed} km/h`;
            const pluie = Math.round(data.list[0].pop * 100);
            document.getElementById("pluie").innerHTML = `<i class="bi bi-cloud-hail-fill"></i> ${pluie}%`;
        })
        .catch(error => {
            alert("Erreur : " + error.message);
        });
}
