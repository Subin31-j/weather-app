let currentCity = "";
let currentUnit = "metric";
const weatherService = new WeatherService();
const ui = new WeatherUI();
const themeToggle = document.getElementById("themeToggle")
const locationBtn = document.getElementById("locationBtn")
const searchBtn = document.getElementById("searchBtn")
const searchInput = document.getElementById("searchInput");

storage.saveCity(currentCity);
const savedCity = storage.getCity();
searchBtn.addEventListener("click", async() => {
    const city = searchInput.value.trim();
    if (!city) return;

    currentCity = city;

    ui.hideError();
    ui.showLoading();

    try {
        const currentData = await weatherService.getCurrentWeather(city);
        const forecastData = await weatherService.getForecast(city);
        ui.displayCurrentWeather(currentData);
        ui.displayForecast(forecastData)

        localStorage.setItem("lastCity", city);
    } catch (error) {
        ui.showError(error.message);
    } finally {
        ui.hideLoading();
    }
})

unitToggle.addEventListener("click", async () => {
    currentUnit = currentUnit === "metric" ? "imperial" : "metric";

    unitToggle.textContent = 
       currentUnit === "metric" ? "Switch to °F" : "Switch to °C";

    if (!currentCity) return;
    ui.showLoading();

    try {
        const currentData = await weatherService.getCurrentWeather(currentCity, currentUnit);
        const forecastData = await weatherService.getForecast(currentCity, currentUnit)
    ui.displayCurrentWeather(currentData);
        ui.displayForecast(forecastData);

    } catch (error) {
        ui.showError(error.message);
    } finally {
        ui.hideLoading();
    }
});

window.addEventListener("DOMContentLoaded", async () => {
    const savedCity = localStorage.getItem("lastCity");

    if(!savedCity) return;

    currentCity = savedCity;
    searchInput.value = savedCity;

    ui.showLoading();

    try {
        const currentData = await weatherService.getCurrentWeather(savedCity, currentUnit);
        const forecastData = await weatherService.getForecast(savedCity, currentUnit);

        ui.displayCurrentWeather(currentData);
        ui.displayForecast(forecastData);

    } catch (error) {
        ui.showError(error.message);
    } finally {
        ui.hideLoading();
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme")
    if(savedTheme === "dark") {
        document.body.classList.add("dark-mode")
        themeToggle.textContent = "Light Mode"
    }
})

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";

    localStorage.setItem("theme", isDark ? "dark" : 'light');
});

locationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
        alert("Geolocation not supported by your browser!")
        return;
    }
    ui.showLoading();

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude} = position.coords;

        try {
            const currentData = await weatherService.getWeatherByCoords(latitude, longitude, currentUnit);
            const forecastData = await weatherService.getForecastByCoords(latitude, longitude, currentUnit);

            currentCity = currentData.name;
            searchInput.value = currentCity;

            ui.displayCurrentWeather(currentData);
            ui.displayForecast(forecastData);

        } catch (error) {
            ui.showError("Unable to fetch location weather.");
        } finally {
            ui.hideLoading();
        }
    }, () => {
        ui.showError("Location permission denied.");
        ui.hideLoading();
    })
})