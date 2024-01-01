const weatherElement = document.getElementById('weather');
const maxTempElement = document.getElementById('maxTemp');
const minTempElement = document.getElementById('minTemp');
const todayMinElement = document.getElementById('todayMin');
const todayMaxElement = document.getElementById('todayMax');
const humidityElement = document.getElementById('humidity');
const todayHumidityElement = document.getElementById('todayHumidity');
const humidityIconElement = document.getElementById('humidityIcon');
const todayHumidityIconElement = document.getElementById('todayHumidityIcon');
const weatherImageElement = document.getElementById('weatherImage');
const hrsElement = document.getElementById('hrs');
const dayElement = document.getElementById('day');
const windDirectionElement = document.getElementById('windDirection');
let currentDate, currentHrs, currentMonth;
const searchElement = document.getElementById('search');
const searchValueElement = document.getElementById('searchValue');
const searchHistoryElement = document.getElementById('searchHistory');
const historyIconElement = document.getElementById('historyIcon');
let searchHistoryPressed = false;

// Function for determining current date day and hours
const fetchDate = () => {
    let hrs, min, date, monthCode, monthDescription, overAllDate;

    min = new Date().getMinutes();
    hrs = new Date().getHours();
    // Fix showing of time
    if (min < 10) {
        min = '0' + min;
    }
    if (hrs < 10) {
        hrs = '0' + hrs;
    }
    date = new Date().getDate();
    monthCode = new Date().getMonth();

    // Selecting correct month code description
    switch (monthCode) {
        case 0:
            monthDescription = 'JAN';
            break;
        case 1:
            monthDescription = 'FEB';
            break;
        case 2:
            monthDescription = 'MAR';
            break;
        case 3:
            monthDescription = 'APR';
            break;
        case 4:
            monthDescription = 'MAY';
            break;
        case 5:
            monthDescription = 'JUN';
            break;
        case 6:
            monthDescription = 'JUL';
            break;
        case 7:
            monthDescription = 'AUG';
            break;
        case 8:
            monthDescription = 'SEPT';
            break;
        case 9:
            monthDescription = 'OCT';
            break;
        case 10:
            monthDescription = 'NOV';
            break;
        default:
            monthDescription = 'DEC'
            break;
    }

    // Concat correct date format
    overAllDate = `${hrs}:${min},${monthDescription} ${date}`;
    return overAllDate;
}

// Function for determining wind direction base on degrees
const windDirection = (deg) => {
    let windDirection;
    switch (deg) {
        case (deg > 348.75 && deg <= 11.25):
            windDirection = 'N';
            break;
        case (deg > 11.25 && deg <= 33.75):
            windDirection = 'NNE';
            break;
        case (deg > 33.75 && deg <= 56.25):
            windDirection = 'NE';
            break;
        case (deg > 56.25 && deg <= 78.75):
            windDirection = 'ENE';
            break;
        case (deg > 78.75 && deg <= 101.25):
            windDirection = 'E';
            break;
        case (deg > 101.25 && deg <= 123.75):
            windDirection = 'ESE';
            break;
        case (deg > 123.75 && deg <= 146.25):
            windDirection = 'SE';
            break;
        case (deg > 146.25 && deg <= 168.75):
            windDirection = 'SSE';
            break;
        case (deg > 168.75 && deg <= 191.25):
            windDirection = 'S';
            break;
        case (deg > 191.25 && deg <= 213.75):
            windDirection = 'SSW';
            break;
        case (deg > 213.75 && deg <= 236.25):
            windDirection = 'SW';
            break;
        case (deg > 236.25 && deg <= 258.75):
            windDirection = 'WSW';
            break;
        case (deg > 258.75 && deg <= 281.25):
            windDirection = 'W';
            break;
        case (deg > 281.25 && deg <= 303.75):
            windDirection = 'WNW';
            break;
        case (deg > 303.75 && deg <= 326.25):
            windDirection = 'NW';
            break;
        default:
            windDirection = 'NNW';
            break;
    }
    console.log(windDirection);
}

windDirection(30);

// Get date and show it accordinly for the first time
currentDate = fetchDate().split(',');
currentHrs = currentDate[0];
currentMonth = currentDate[1];
hrsElement.innerHTML = currentHrs;
dayElement.innerHTML = currentMonth;

// Always show updating current system time
setInterval(() => {
    // Get date and show it accordinly every second
    currentDate = fetchDate().split(',');
    currentHrs = currentDate[0];
    currentMonth = currentDate[1];
    hrsElement.innerHTML = currentHrs;
    dayElement.innerHTML = currentMonth;
}, 30000);

const showWeatherData = (weatherData) => {
    weatherElement.innerHTML = `<div class="flex gap-7px a-center">
                                        <img src="../icons/star_FILL0_wght400_GRAD0_opsz24.svg" alt="Icon for showing city location">
                                        <h3>${weatherData.name}, <sub title="Weather condition">${weatherData.weather[0].main}</sub></h3>
                                    </div>
                                    <div class="bottom flex">
                                        <div class="width-55">
                                            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="Icon image to show current weather description">
                                            <p class="margin-0" title="Weather description">${weatherData.weather[0].description}</p>
                                        </div>
                                        <div class="width-45">
                                            <h1 class="degree margin-0 font-xxxlarge">${weatherData.main.temp}°</h1>
                                            <div class="flex column">
                                                <p class="margin-0" title="Human perception of weather">Feels like ${weatherData.main.feels_like}°</p>
                                                <div class="flex gap-5px">
                                                    <p id="hrs" class="margin-0">${currentHrs}</p>
                                                    <p class="margin-0">-</p>
                                                    <p id="day" class="margin-0">${currentMonth}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
    minTempElement.innerHTML = weatherData.main.temp_min + '°';
    maxTempElement.innerHTML = weatherData.main.temp_max + '°';
    todayMinElement.innerHTML = weatherData.main.temp_min + '°';
    todayMaxElement.innerHTML = weatherData.main.temp_max + '°';
    humidityElement.innerHTML = weatherData.main.humidity + '%'
    weatherImageElement.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

    // Set humidity and change correct icon, 0 - 25% (low) 26% - 75% (mid) 76% - 100% (high)
    todayHumidityElement.innerHTML = weatherData.main.humidity + '%';
    if (weatherData.main.humidity < 26) {
        humidityIconElement.src = "../icons/bluehumidity_low_FILL0_wght400_GRAD0_opsz24.svg";
        todayHumidityIconElement.src = "../icons/todayhumidity_low_FILL0_wght400_GRAD0_opsz24.svg";
    }
    if (weatherData.main.humidity < 76) {
        humidityIconElement.src = "../icons/bluehumidity_mid_FILL0_wght400_GRAD0_opsz24.svg";
        todayHumidityIconElement.src = "../icons/todayhumidity_mid_FILL0_wght400_GRAD0_opsz24.svg";
    } else {
        humidityIconElement.src = "../icons/bluehumidity_high_FILL0_wght400_GRAD0_opsz24.svg";
        todayHumidityIconElement.src = "../icons/todayhumidity_high_FILL0_wght400_GRAD0_opsz24.svg";
    }

}

// Get latitude and longitude coordinates and run program asynchonized
navigator.geolocation.getCurrentPosition(position => {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    const API_KEY = 'fab7d6b47407d50fc3717d24c6006b4a';

    const API_CALL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    fetch(API_CALL)
        .then(response => response.json())
        .then(weatherData => showWeatherData(weatherData))
        .catch(error => console.log(error));
})


// EVENT LISTENERS
searchElement.addEventListener('click', () => {
    if (!searchValueElement.value) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValueElement.value}&appid=fab7d6b47407d50fc3717d24c6006b4a&units=metric`)
        .then(promise => promise.json())
        .then(weatherData => {
            showWeatherData(weatherData);
            searchValueElement.value = '';
        })
        .catch(error => {
            console.log('CITY DOES NOT EXIST');
            alert('CITY DOES NOT EXIST');
            searchValueElement.value = '';
        });
})

historyIconElement.addEventListener('click', () => {
    // Hide and show history based on icon click first and second time
    searchHistoryPressed = !searchHistoryPressed;
    if(searchHistoryPressed) {
        searchHistoryElement.classList.remove('hidden');
    } else {
        searchHistoryElement.classList.add('hidden');
    }
})