//heres the api key from openweather and search button
const apiKey = "8ff46ddd3733a4ed1ab3616b52157148";
const searchButton = document.getElementById("searchButton");

//search button lessner
searchButton.addEventListener("click", () => {
    const city = document.getElementById("city").value.trim();
    if (city) {
        getWeather(city);
    } else {
        displayError("Please enter a city name.");
    }
});


//async await function for weather fetching
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("City not found. Please try again.");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}


//displaying data got from the api
function displayWeather(data) {
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
    `;
}

//handling error if any occur 
function displayError(message) {
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `<p style="color: #f44336; font-weight: bold;">${message}</p>`;
}
