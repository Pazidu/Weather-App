const form = document.querySelector('form');
const time = document.getElementById('time');
const icon = document.getElementById('icon');
const weatherInfo = document.querySelector('.weatherInfo');
const appBody = document.querySelector(".appBody");

const getInfo = async(city) => {
    const cityData = await getCity(city);
    const weatherData = await getWeather(cityData.Key);
    console.log(cityData, weatherData);
    return{cityData, weatherData};
};


const updateUI = (data) => {
    const cityData = data.cityData;
    const weatherData = data.weatherData;   

    let timeSrc = weatherData.IsDayTime ? './images/time/day.svg': './images/time/night.svg';
    time.setAttribute('src', timeSrc);
    
    let iconSrc = `./images/icons/${weatherData.WeatherIcon}.svg`
    icon.setAttribute('src',iconSrc);

    const cityName = String(cityData.LocalizedName).toUpperCase();
    const weatherDetails = `<p id="city">${cityName}</p>
                            <p id="status">${weatherData.WeatherText}</p>
                            <p id="temp">${weatherData.Temperature.Metric.Value} &#8451;</p>`;

    weatherInfo.innerHTML = weatherDetails;

    appBody.style.display = 'block';

};


form.addEventListener('submit', e=>{
    e.preventDefault();
    const city = form.input.value.trim();
    form.reset();
    
    getInfo(city)
        .then(data => {
            updateUI(data);
        })
        .catch(err => console.log(err));

});