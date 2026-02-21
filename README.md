# 🌦 Weather Dashboard

A modern, responsive Weather Dashboard built using **HTML, CSS, and Vanilla JavaScript** that provides real-time weather information and a 5-day forecast using the OpenWeather API.

---

## 🚀 Features

- 🔍 Search weather by city name  
- 🌡 View current temperature, humidity, wind speed, and weather condition  
- 📅 5-day weather forecast (daily intervals)  
- 🌙 Dark mode toggle  
- 🌡 Switch between Celsius (°C) and Fahrenheit (°F)  
- 📍 Get weather using current location (Geolocation API)  
- 🎨 Dynamic background based on weather condition  
- 💾 Saves last searched city, unit, and theme using LocalStorage  
- 📱 Fully responsive design  

---

## 🛠 Technologies Used

- HTML5  
- CSS3 (Flexbox & Grid)  
- JavaScript (ES6+)  
- OpenWeather API  
- Browser Geolocation API  
- LocalStorage  


---

## 🧠 Architecture Overview

### app.js
- Main controller file  
- Handles event listeners  
- Manages unit toggle, dark mode, and geolocation  
- Connects UI and API services  

### ui.js
- Renders current weather  
- Displays 5-day forecast  
- Updates dynamic background  
- Shows loading and error messages  

### weatherService.js
- Handles API calls  
- Fetches current weather and forecast data  
- Manages API error handling  

### storage.js
- Handles LocalStorage operations  
- Saves and retrieves:
  - Last searched city  
  - Temperature unit  
  - Theme preference  

---

## 🔑 API Setup

1. Go to https://openweathermap.org/
2. Create a free account
3. Generate an API key
4. Add your key inside `weatherService.js`:

```javascript
const CONFIG = {
    API_KEY: "c9dad678193b30ab16d8258954a36f40",
    BASE_URL: "https://api.openweathermap.org/data/2.5"
};
