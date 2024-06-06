function getWeather(){
    const apiKey = '54c09a92867409549db4205127e557d2';
    const city = document.getElementById('city').value;

    if(!city){
        alert('Va rog introduceti un oras.');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
           .then(response => response.json())
           .then(data => {
                displayWeather(data);
           }) 
           .catch(error => {
                console.error('error fetching current weather data',error);
                alert('error fetching current weather data, incercati din nou');
           });

    fetch(forecastUrl)
           .then(response => response.json())
           .then(data => {
                displayHourlyForecast(data.list);
           }) 
           .catch(error => {
                console.error('error fetching hourly forecast data',error);
                alert('error fetching hourly forecast data, incercati din nou');
           });
}

function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    //curatam casutele
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if(data.cod === '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); //convertim temperatura la celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // urmatoarele 24 de ore cu interval de 3 ore

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // convertim in milisecunde
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // convertim temperatura la celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // face imaginea vizibila
}

