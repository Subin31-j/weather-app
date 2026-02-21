class StorageService {
    saveCity(city) {
        localStorage.setItem("lastCity", city);
    }

    getCity() {
        return localStorage.getItem("lastCity");
    }

    saveUnit(unit) {
        localStorage.setItem("unit", unit);
    }

    getUnit() {
        return localStorage.getItem("unit");
    }

    saveTheme(theme) {
        localStorage.setItem("theme", theme);
    }

    getTheme() {
        return localStorage.getItem("theme");
    }
}

const storage = new StorageService();