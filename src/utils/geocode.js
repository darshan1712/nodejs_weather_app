const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGtsZWFybmluZyIsImEiOiJja2I2OHczbmUweDdhMnRuc3Q3bG9ubmRsIn0.HFx0Lv5OZgTVgddrYYDOxA"
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('unable to connect to location service!', undefined)
        } else if (response.body.features.length === 0) {
            callback("unable to find location. Try another one.", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[3].geometry.coordinates[0],
                longitude: response.body.features[3].geometry.coordinates[1],
                location: response.body.features[0].place_name
            })
        }
    })
}



module.exports = geocode;