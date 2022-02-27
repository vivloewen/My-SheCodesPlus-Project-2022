// time and date

function currentTime() {
  let today = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wedneday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  let hour = today.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (hour === 0) {
    hour = `00`;
  }
  let minute = today.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (minute === 0) {
    minute = `00`;
  }

  let time = hour + ":" + minute;
  let currentDate = document.querySelector(".date");
  currentDate.innerHTML = `${day}, ${time}`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input-text").value;
  let apiKey = "3f37b12f50b9244320e785a2fb791f14";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlCity).then(showWeather);
  currentTime();
}

currentTime();
let form = document.querySelector(".search");
form.addEventListener("submit", searchCity);

function weatherDataCurrent(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3f37b12f50b9244320e785a2fb791f14";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlCurrent).then(showWeather);
}

function searchCurrent(event) {
  event.preventDefault();
  currentTime();
  navigator.geolocation.getCurrentPosition(weatherDataCurrent);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", searchCurrent);
// Fetch live data

function showWeather(response) {
  let cityName = response.data.name;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = cityName;

  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".curtemp");
  currentTemperature.innerHTML = temperature;

  let weatherDescription = response.data.weather[0].main;
  let currentDescription = document.querySelector(".weatherDescription");
  currentDescription.innerHTML = weatherDescription;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;

  let windSpeed = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = windSpeed;
}

// Change Celsius to Fahrenheit and backwards

function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".curtemp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(temperature * 1.8 + 32);
}

let changeCelsius = document.querySelector("#celsius");
changeCelsius.addEventListener("click", convertCelsius);

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".curtemp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let changeFahrenheit = document.querySelector("#fahrenheit");
changeFahrenheit.addEventListener("click", convertFahrenheit);
