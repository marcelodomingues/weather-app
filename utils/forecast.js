const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_TOKEN}/${lat},${long}`;

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the weather service');
        } else if(body.error) {
            callback('Unable to find location');
        } else {
            const { temperature, precipProbability } = body.currently;
            callback(undefined, {
                temperature: temperature,
                rain: precipProbability
            })
        }
    });
}

module.exports = forecast;