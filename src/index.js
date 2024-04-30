function refreshWeather(response){
    let temperature = response.data.temperature.current
    let temperatureElement = document.querySelector("#temperature-value");
    temperatureElement.innerHTML = Math.round(temperature);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;
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