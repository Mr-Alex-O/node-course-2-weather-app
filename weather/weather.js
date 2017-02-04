const request = require('request');

let getWeather = (lat, lng, callback) => {
request ({
  url: `https://api.darksky.net/forecast/6efa107f23657d691e0536537b9e7c2f/${lat},${lng}`,
  json: true
    }, (error, response, body) => {
      if(error){
        callback('Unable to connect to Forecast.io server.');
      } else if(response.statusCode === 404){
        callback('Unable to fetch weather.');
      }else if (response.statusCode === 200){
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    })
};

module.exports.getWeather = getWeather;
