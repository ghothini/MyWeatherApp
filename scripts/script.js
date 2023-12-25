const weatherElement = document.getElementById('weather');

var latitude, longitude;
// Set API KEY
const APIKey = 'fab7d6b47407d50fc3717d24c6006b4a';

// Get latitude and longitude position
navigator.geolocation.getCurrentPosition(position => {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
})

const APIcall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;

fetch(APIcall)
    .then(response => response.json())
    .then(jsonData => {
        weatherElement.innerHTML = `<div class="flex gap-7px a-center">
                                        <img src="../icons/star_FILL0_wght400_GRAD0_opsz24.svg" alt="Icon for showing city location">
                                        <h4>SYDNEY, NSW</h4>
                                    </div>
                                    <div class="bottom flex">
                                        <div class="width-55">
                                            <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="Icon image to show current weather description">
                                            <p class="margin-0">Shower or two.</p>
                                        </div>
                                        <div class="width-45">
                                            <h1 class="degree margin-0 font-xxxlarge">21.2°</h1>
                                            <div class="flex column">
                                                <p class="margin-0">Feels like 17.6°</p>
                                                <div class="flex">
                                                    <p class="margin-0">1.50 pm</p>
                                                    <p class="margin-0">, 27 NOV</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
    })
    .catch(error => console.log(error));