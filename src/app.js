// Change city
function searchCity(event) { //la funcion crea una serie de instrucciones, con una variable que selecciona el buscador control
  event.preventDefault();
  let cityInput = document.querySelector("#control"); //variable que contiene la seleccion del buscador
  document.querySelector("#city").innerHTML = cityInput.value; //el contenido de la variable selecciona la ciudad de dentro del HTML y lo cambia por el contenido que introducimos en la variable
}
let cityForm = document.querySelector("form"); //creo una variable que contiene la selección de form
cityForm.addEventListener("submit", searchCity); //a esta variable que contiene form le hago una llamada a una función para que submit

// Change date and time
let now = new Date();
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

//Change city and current temperature
function showParameters(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector (".temperature");
  temperatureElement.innerHTML = temperature;
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#control");
  document.querySelector("#city").innerHTML = cityInput.value; 

  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showParameters);
}

let cityName = document.querySelector ("#searchform");
cityName.addEventListener ("click", changeCity);

//bonus




/*
// bonus
function showInformation(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".wind-speed").innerHTML = response.data.wind.speed;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
}

function showPosition(position) {
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`
  axios.get(apiUrl).then(showInformation);
  let resAxios = axios.get(apiUrl);//victor
  console.log("RESPUESTA DE AXIOS: \n" + resAxios);//victor
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.getElementById("location-button");
button.addEventListener("click", getCurrentPosition); */

