const btn=document.querySelector("#btn");

function getWeather(){
    const apiKey="4a7c72057f31dd3a0c63b768d1108be6";
    const city=document.getElementById("city").value;

    if(!city){
        alert("Please enter a city");
        return;
    }

    const currentWeatherURL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastURL=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    

    fetch(currentWeatherURL)
    .then((res) =>{
        return res.json();
    })
    .then((data)=>{
        displayWeather(data);
    })
    .catch((err)=>{
        console.error("Error fetching current weather data",err);
        alert("Error fetching current weather data! Please Try Again");
    });


    fetch(forecastURL)
    .then((res) =>{
        return res.json();
    })
    .then((hourlyData)=>{
        displayhourlyforecast(hourlyData.list);
    })
    .catch((err)=>{
        console.error("Error fetching hourly forecast data",err);
        alert("City not found!");
    });
}

function displayWeather(data){
    const weatherIcon = document.querySelector("#weather-icon");
    const tempDiv = document.querySelector("#temp-div");
    const weatherInfo = document.querySelector("#weather-info");
    const hourlyForecast = document.querySelector("#hourly-forecast");   

    tempDiv.innerHTML="";
    weatherInfo.innerHTML="";
    hourlyForecast.innerHTML="";
    weatherIcon.style.display = 'none';

    if(data.cod==='404'){
        weatherInfo.innerHTML=`<p>${data.message}!</p>`;
    }
    else{
        const temperature = Math.round(data.main.temp - 273.15);
        const cityName = data.name;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const tempHTML=`<p>${temperature}°C</p>`;
        const weatherInfoHTML= `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDiv.innerHTML=tempHTML;
        weatherInfo.innerHTML=weatherInfoHTML;
        weatherIcon.src=iconURL;
        weatherIcon.alt=description;
        weatherIcon.style.display = 'block';
    }
}

function displayhourlyforecast(hourlyData){
    const hourlyForecast=document.querySelector("#hourly-forecast");
    const next24hours=hourlyData.slice(0,8);
    next24hours.forEach((item)=>{
        const dateTime=new Date(item.dt * 1000);
        const hour=dateTime.getHours();
        const temperature=Math.round(item.main.temp-273.15);
        const iconCode = item.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML=`
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconURL}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecast.innerHTML+=hourlyItemHTML;
        
    });
}


btn.addEventListener("click",getWeather);
