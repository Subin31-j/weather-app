class WeatherUI {
    displayCurrentWeather(data) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        const html = `
        <div class="weather-card">
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>🌡 Temp: ${Math.round(data.main.temp)}°C</p>
                <p>☁ ${data.weather[0].description}</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>💨 Wind: ${data.wind.speed} m/s</p>
        </div>
        `;

        document.getElementById("currentWeather").innerHTML= html;
        const condition = data.weather[0].main.toLowerCase();
        this.setBackground(condition);
    }
    showError(message) {
        const errorDiv = document.getElementById("error");
        errorDiv.textContent = message;
        errorDiv.classList.remove("hidden");
    }
    hideError() {
        document.getElementById("error").classList.add("hidden");
    }
    showLoading() {
        document.getElementById("loading").classList.remove("hidden");
    }
    hideLoading() {
        document.getElementById("loading").classList.add("hidden")
    }

    displayForecast(data) {
    const forecastContainer = document.getElementById("forecast");

    if (!data || !data.list) {
        forecastContainer.innerHTML = "<p>Forecast unavailable.</p>";
        return;
    }

    let html = `
        <div class="weather-card">
            <h3>5-Day Forecast</h3>
            <div class="forecast-grid">
    `;

    // Pick every 8th item (24 hours apart since API gives 3-hour intervals)
    for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];

        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", {
            weekday: "short"
        });

        html += `
            <div class="forecast-card">
                <h4>${dayName}</h4>
                <p>🌡 ${Math.round(day.main.temp)}°</p>
                <p>${day.weather[0].description}</p>
                <p>💧 ${day.main.humidity}%</p>
            </div>
        `;
    }

    html += `
            </div>
        </div>
    `;

    forecastContainer.innerHTML = html;
}
setBackground(condition) {
    const body = document.body;

    body.classList.remove("clear", "clouds", "rain", "snow");

    if (condition.includes("clear")) {
        body.classList.add("clear");
    } else if (condition.includes("cloud")) {
        body.classList.add("clouds");
    } else if (condition.includes("rain")) {
        body.classList.add("rain");
    } else if (condition.includes("snow")) {
        body.classList.add("snow");
    }
}
}