class WeatherService {
    async getCurrentWeather(city) {
        const response = await fetch(
            `${CONFIG.BASE_URL}/weather?q=${city}&units=${CONFIG.UNITS}&appid=${CONFIG.API_KEY}`
        );

        if(!response.ok) {
            throw new Error("City Not Found!");
        }
        return await response.json();
    }

    async getForecast(city) {
        const response = await fetch(
            `${CONFIG.BASE_URL}/forecast?q=${city}&units=${CONFIG.UNITS}&appid=${CONFIG.API_KEY}`
        );

        if(!response.ok) {
            throw new console.error("Forecast error!");
        }
        return await response.json();
    }

    async getWeatherByCoords(lat, lon, unit) {
        const response = await fetch(
            `${CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${CONFIG.API_KEY}`
        );

        if(!response.ok) {
            throw new Error("Location weather error");
        }
        return await response.json();
    }
    
    async getForecastByCoords(lat, lon, unit) {
    const response = await fetch(
        `${CONFIG.BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${CONFIG.API_KEY}`
    );

    if (!response.ok) {
        throw new Error("Location forecast error");
    }

    return await response.json();
}
}