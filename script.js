//grab api key and url
const api = {
  key: "e0d4c5164d0ec02bd65f2d15b53aac0d",
  
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}

const inputSearch = document.querySelector('.input-box');
inputSearch.addEventListener('keypress', setWeather);

function setWeather(event) {
  //the keycode for enter key is 13
  if (event.keyCode == 13) {
    findWeather(inputSearch.value);
  }
}


function findWeather (input) {
  //we make a fetch request to get the weather and convert it into celsius 
  fetch(`${api.baseUrl}weather?q=${input}&units=metric&APPID=${api.key}`)
    .then(weather => {
      //convert this weather into json
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {

  //check this out in the console, its our weather object
  console.log(weather);
  //firstly lets display the city and its country 
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  
  //then lets get the date
  let currentDate = new Date();
  let dateSpace = document.querySelector('.location .date');
  dateSpace.innerText = dateGet(currentDate);
  
  //lets display our temperature
  let temperature = document.querySelector('.current .temp');
  temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
  //lets display weather element e.g clear,sunny
  let weatherElement = document.querySelector('.current .weather_element');
  weatherElement.innerText = weather.weather[0].main;
 
  //lets display the minimum and maximum temperature
  let minMax = document.querySelector('.min-max');
  minMax.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}
//this is to convert our date into a better english format e.gg instead of thursday 30-06-2020 we will have thursday 10 january 2020
function dateGet (currentDate) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[currentDate.getDay()];
  let date = currentDate.getDate();
  let month = months[currentDate.getMonth()];
  let year = currentDate.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}