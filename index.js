function beginSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let citySearch = document.querySelector("#identified-city");
  citySearch.innerHTML = searchInput.value;
}



city = 
apiKey = "7841011o26476aa4cefbe36669ffb9tf";
apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", beginSearch);
