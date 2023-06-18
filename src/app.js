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

//Change city and current temperature
function showParameters(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector ("#temperature");
  let descriptionElement = document.querySelector("#description");
  
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
 
}

function search(city) {
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
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