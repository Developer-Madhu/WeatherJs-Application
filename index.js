document.addEventListener('DOMContentLoaded', ()=>{
    var inputVal = document.getElementById('task-input');
    var btn = document.getElementById('addbtn');
    var city = document.getElementById('cityname')
    var temp = document.getElementById('temp')
    var desc = document.getElementById('desc')
    var msg = document.getElementById('ermsg')
    var winds = document.getElementById('wind')

    const APIKEY = '111b652a504586cd0c97d6bc0f93a1ad';

    btn.addEventListener('click', async ()=>{
        var cityName = inputVal.value.trim();
        if(!cityName) displayError();
        const data = await fetchWeatherData(cityName);
        displayWeatherData(data);
    })

    async function fetchWeatherData(cityName){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIKEY}`
        const response = await fetch(url)
        if(!response.ok){
            displayError()
        }else{
            const data = await response.json()
            return data
        }

    }

    function displayWeatherData(wdata){
        var weather0 = wdata.weather[0].main
        var descs = "Info : " + wdata.weather[0].description
        var temps = "Temperature : " + wdata.main.temp
        var winddata = "Wind Speed : " + wdata.wind.speed
        city.innerHTML = wdata.name
        desc.innerHTML = descs
        temp.innerHTML = temps
        winds.innerHTML = winddata
        console.log(wdata)
    }

    const displayError = () => {
        document.getElementById('ermsg').style.display = 'block';
    }

})