const weatherElement = document.getElementById('weather');

// Get latitude and longitude coordinates and run program asynchonized
navigator.geolocation.getCurrentPosition(position => {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    const API_KEY = 'fab7d6b47407d50fc3717d24c6006b4a';
    const celsiusUnits = 'metric';

    const API_CALL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${celsiusUnits}`;
    // Get date and show it accordinly
    let currentDate = fetchDate().split(',');
    let currentHrs = currentDate[0];
    let currentMonth = currentDate[1];

    fetch(API_CALL)
        .then(response => response.json())
        .then(weatherData => {
            console.log(weatherData);
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
                                                    <p class="margin-0">${currentHrs} </p>
                                                    <p class="margin-0">-</p>
                                                    <p class="margin-0">${currentMonth}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
        })
        .catch(error => console.log(error));
})

// Function for determining current date day and hours
const fetchDate = () => {
    let hrs, min, date, monthCode, monthDescription, overAllDate;

    min = new Date().getMinutes();
    hrs = new Date().getHours();
    date = new Date().getDate();
    monthCode = new Date().getMonth();

    // Selecting correct month code description
    switch (monthCode) {
        case 1:
            monthDescription = 'JAN';
            break;
        case 2:
            monthDescription = 'FEB';
            break;
        case 1:
            monthDescription = 'MAR';
            break;
        case 1:
            monthDescription = 'APR';
            break;
        case 1:
            monthDescription = 'MAY';
            break;
        case 1:
            monthDescription = 'JUN';
            break;
        case 1:
            monthDescription = 'JUL';
            break;
        case 1:
            monthDescription = 'AUG';
            break;
        case 1:
            monthDescription = 'SEPT';
            break;
        case 1:
            monthDescription = 'OCT';
            break;
        case 1:
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