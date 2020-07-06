const request = require('request');

const forecast = (latitude, longitude, callback) => {
    console.log(latitude);
    console.log(longitude);
    const url = 'http://api.weatherstack.com/current?access_key=76b552ea4356fe268b1acb86b64aee92&query=' + longitude + ',' + latitude + '&units=m';
    //console.log("http://api.weatherstack.com/current?access_key=76b552ea4356fe268b1acb86b64aee92&query=40.7831,-73.9712");
    //console.log(url);
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback("unable to get you request!!!", undefined);
        } else if (body.error) {
            callback("Plese enter valid address!!!", undefined);
        } else {
            const data = body.current;

            callback(undefined, `current temperature is ${data.temperature} and it feels like ${data.feelslike} and it's ${data.weather_descriptions} and wind speed is ${data.wind_speed}`)
        }
    })
}

// const url = 'http://api.weatherstack.com/current?access_key=2ee4f85a0516f6dac6fbd06edf3a907e&query=0-&units=f';

// request({
//     url: url,
//     json: true
// }, (error, response) => {
//     if (error) {
//         console.log("unable to get you request!!!");
//     } else if (response.body.error) {
//         console.log("Plese enter valid address!!!");
//     } else {
//         const data = response.body.current;

//         console.log(`current temperature is ${data.temperature} and it feels like ${data.feelslike} and it's ${data.weather_descriptions}`)
//     }
// })

module.exports = forecast;