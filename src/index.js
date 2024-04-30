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

    cityElement.innerHTML = response.data.city;


timeElement.innerHTML= formatDate(now);
    temperatureElement.innerHTML = Math.round(temperature);
    weatherElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windElement.innerHTML = `${response.data.wind.speed} km/h`;
 
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
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiURL).then(refreshWeather);
}

function handleSearchSubmit (event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input")
    
    
    searchCity(searchInput.value)
}

let searchFormElement = document.querySelector("#search-form")
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris")



