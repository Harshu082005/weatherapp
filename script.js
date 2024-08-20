
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '95ca949ba0e6d6835e65a39ab1abe017'; // Your OpenWeatherMap API key
    const fetchWeatherButton = document.getElementById('fetchWeather');
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');

    async function fetchWeather(lat, lon) {
        try {
            // Construct API URL with latitude, longitude, and API key
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

            // Check if response is ok (status code 200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse JSON data from the response
            const data = await response.json();
            
            // Debugging: Log the response data
            console.log('Weather data:', data);

            // Check if the API returned an error
            if (data.cod !== 200) {
                throw new Error(data.message || 'Weather data not found');
            }
            
            // Display the weather data
            displayWeather(data);
        } catch (error) {
            // Display the error message
            weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }

    function displayWeather(data) {
        const { name, weather, main, wind } = data;
        weatherInfo.innerHTML = `
            <h2>${name}</h2>
            <p><strong>Weather:</strong> ${weather[0].description}</p>
            <p><strong>Temperature:</strong> ${main.temp} °C</p>
            <p><strong>Humidity:</strong> ${main.humidity} %</p>
            <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
        `;
    }

    fetchWeatherButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            // Example lat/lon for demonstration. Replace with actual coordinates from a geocoding service.
            const lat = 44.34; // Example latitude
            const lon = 10.99; // Example longitude
            fetchWeather(lat, lon);
        } else {
            weatherInfo.innerHTML = '<p>Please enter a location.</p>';
        }
    });

    // Optional: Fetch weather for the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
        }, error => {
            weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    }
});
