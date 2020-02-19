const apiURI ='https://api.openweathermap.org/data/2.5/weather?q=Yongin,kr&units=metric&appid=';
const apiKey ='9a27ff40da7fd1937a24392ed49263a5';

module.exports = {
    getWeather: function(callback) {
        var request = require('request');
        var weatherURI = apiURI + apiKey;
        request(weatherURI, function(error, response, data)
        {
            if(error)
            {
                throw error;
            }
            var result = JSON.parse(data);
            let weatherInfo =`도시명: ${result.name}, 기온: ${result.main.temp.toFixed(1)}&deg; 체감:${result.main.feels_like.toFixed(1)}&deg;`;
            weatherInfo +=`<img src="http://openweathermap.org/img/w/${result.weather[0].icon}.png" height="30" width="30">`;
            callback(weatherInfo);
        });
    }
}

