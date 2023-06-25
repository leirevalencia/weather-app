let now = new Date(); //Change date and time
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  //esta condición hace que si la hora o los minutos debajo sean menores de 10, tengan un 0 delante para que sean dos números
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let currentDate = document.getElementById("date-time");
currentDate.innerHTML = `${day} ${date} ${month} / ${hour}:${minute}`;

//Change city, temperature and weather description

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function showParameters(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector ("#temperature");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  windElement.innerHTML = response.data.wind.speed + "Km/h";
  humidityElement.innerHTML = response.data.main.humidity + "%";

  getForecast(response.data.coord); //nueva función para obtener las coordenadas

}

function search(city) {
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  //Actualizamos nombre
  let cityInput = document.querySelector("#control");
  document.querySelector("#city").innerHTML = city; 
  axios.get(apiUrl).then(showParameters);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#control");
  document.querySelector("#city").innerHTML = cityInput.value; 
  search(cityInput.value);
}

let cityName = document.querySelector ("#searchform");
cityName.addEventListener ("submit", changeCity);

//fahrenheit and celsius
function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsisus.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  celsisus.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsisus = document.querySelector("#celsius");
celsisus.addEventListener("click", displayCelsius);

//display forecast (days of the week)

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="col">`;  //, crea una columna con una línea con varias columnas;hacemos un loop para mostrar lo que queramos varias veces.
  //en la siguiente línea si añado la cadena anterior parecerá lo de la cadena anterior y el bloque siguiente
  
  //let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"]; //crea un loop para cada día, y pone cada día dentro de la variable day
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML = forecastHTML + `  
  <div class="weather-forecast" id="forecast">
  <div class="monday">
      <div class="container">
          <div class="row">
              <div class="col-4" id="weather-forecast-date">
                  ${formatDay(forecastDay.dt)}
              </div>
              <div class="col-4"> 
                  <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" id="icon"/>
              </div>
              <div class="col-4" id="weather-forecast-temperature">
                  ${Math.round(forecastDay.temp.day)}º
              </div>
          </div>
      </div>
  </div>
</div>
`;
    }
  });
  
 //con esto hacemos que forecastElement muestre en nuestra página (en HTML) una copia del forecast



forecastHTML = forecastHTML + `</div>`; //lo repetimos dos veces, y cerramos div

  forecastElement.innerHTML = forecastHTML; 
} //para que muestre lo mismo todas las veces que queramos, hacemos un loop

//Ciudad actual inicializada a null
let currentCity = null;
//Metodo que busca la ciudad actual y actualiza el valor de currentCity
function searchCurrentLocation(response) {
  //llamada a la api
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  //actualizar currentCity
  
}

search("Madrid");
