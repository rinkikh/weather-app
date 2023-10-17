
const apiKey = "59b97ae93df407fbda284d7516206c5c"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button i")
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"

    } else {
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        let weatherIconElement = document.createElement("i");

        if (data.weather[0].main === "Clouds") {
            weatherIconElement.className = "fa-solid fa-cloud";
        } else if (data.weather[0].main === "Clear") {
            weatherIconElement.className = "fa-solid fa-sun";
        } else if (data.weather[0].main === "Rain") {
            weatherIconElement.className = "fa-solid fa-cloud-showers-water";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIconElement.className = "fa-solid fa-cloud-rain";
        } else if (data.weather[0].main === "Haze") {
            weatherIconElement.className = "fa-solid fa-cloud-meatball";
        }
        else {
            weatherIconElement.className = "fa-solid fa-smog";
        }


        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none"



        // Replace the existing weather icon with the newly created one
        let currentWeatherIcon = document.querySelector(".weather i");
        currentWeatherIcon.parentNode.replaceChild(weatherIconElement, currentWeatherIcon);
    }
}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

