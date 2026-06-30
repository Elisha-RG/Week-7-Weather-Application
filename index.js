function updateWeather(response) {
  let temperatureValue = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let citySearch = document.querySelector("#identified-city");
  let conditionDescription = document.querySelector("#condition");
  let humidityLevel = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let currentDate = document.querySelector("#date-and-time");
  let date = new Date(response.data.time * 1000);
  let updateIcon = document.querySelector("#icon");

  citySearch.innerHTML = response.data.city;
  currentDate.innerHTML = formatDate(date);
  conditionDescription.innerHTML = response.data.condition.description;
  humidityLevel.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureValue.innerHTML = Math.round(temperature);
  updateIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class = "temperature-icon" />`;

  showForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function beginSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  findCity(searchInput.value);
}

function findCity(city) {
  let apiKey = "7841011o26476aa4cefbe36669ffb9tf";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(updateWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}

function showForecast(city) {
  let apiKey = "7841011o26476aa4cefbe36669ffb9tf";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="daily-forecast">
            <div class="forecast-date">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" class="forecast-icon" />
            
            <div class="forecast-temperatures">
                <div class="high-low-temp">
                <strong>${Math.round(day.temperature.maximum)}°C</strong>
                </div>
                <div class="high-low-temp">${Math.round(day.temperature.minimum)}°C</div>
            </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", beginSearch);

findCity("Munich");
