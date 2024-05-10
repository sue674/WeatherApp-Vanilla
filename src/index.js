function refreshWeather(response){
    let temperature = response.data.temperature.current
    let temperatureElement = document.querySelector("#temperature-value");
    let cityElement = document.querySelector("#city");
    let weatherElement = document.querySelector("#addedInfo");
    let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind-speed");
let timeElement = document.querySelector("#time");
let timestamp = response.data.time;
let now = new Date(timestamp * 1000);
let iconElement = document.querySelector("#icon");
iconElement.innerHTML =`<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`
              
cityElement.innerHTML = response.data.city;
timeElement.innerHTML= formatDate(now);
    temperatureElement.innerHTML = Math.round(temperature);
    weatherElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windElement.innerHTML = `${response.data.wind.speed} km/h`;
 

getForecast(response.data.city)
}

function formatDate (now){
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] 
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes <10){
minutes = `0${minutes}`;
}

return `${day}, ${hours}:${minutes}`
}

function searchCity (city){
    //make an API call and update user interface
    let apiKey = "feaeta6473b4b23fd60370ob33dc4c40";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiURL).then(refreshWeather);
}

function handleSearchSubmit (event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input")
    
    
    searchCity(searchInput.value)
}

function formatDay(timestamp){
let date = new Date(timestamp*1000);
let days =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

return days[date.getDay()];
}
function getForecast (city){
let apiKey = "feaeta6473b4b23fd60370ob33dc4c40";
let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
axios.get(apiURL).then(displayForecast);
}


function displayForecast(response){

  console.log(response.data);

let forecastHtml = "";

response.data.daily.forEach(function (day, index){
  if (index > 0 && index < 6){
 forecastHtml = forecastHtml + ` 
 <div class = "col2">
              <div class="weather-forecast-date">
              ${formatDay(day.time)}
              </div>

              <div >
                <img class="weather-forecast-icon"
                  src="${day.condition.icon_url}"
                  
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temp-max">${Math.round(day.temperature.maximum)}°C</span>
                  <span class="weather-forecast-temp-min">${Math.round(day.temperature.minimum)}°C</span>
                </div>
             </div>
          </div>
          `;
          };
    let forecastElement = document.querySelector("#forecast");
          forecastElement.innerHTML = forecastHtml;

});
}
let searchFormElement = document.querySelector("#search-form")
searchFormElement.addEventListener("submit", handleSearchSubmit);




searchCity("Paris")

