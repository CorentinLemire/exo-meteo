let city = "rouelle"
let apikey = "f7ccc76d3ce387871e76716d6bd8819c"
let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&lang=fr&units=metric`
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data.city.name)
        document.getElementById("city").innerHTML = `${data.city.name} `
        document.getElementById("temperature").innerHTML = `${data.list[0].main.temp}`
        document.getElementById("tempmax").innerHTML = `${data.list[0].main.temp_max}°C`
        document.getElementById("tempmin").innerHTML = `${data.list[0].main.temp_min}°C`
        document.getElementById("description").innerHTML = `${data.list[0].weather[0].description}`
        document.getElementById("icon").innerHTML = `   <div id="icon"> <img src="https://openweathermap.org/img/wn/01d.png" alt=""></div>`
        document.getElementById("wind").innerHTML = `<i class="bi bi-wind"></i>${data.list[0].wind.speed} km/h`






        document.getElementById("%pluie").innerHTML = `<i class="bi bi-cloud-hail-fill"></i>${data.list[0].pop}%`
    })