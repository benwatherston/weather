const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/20584b2d98836de3f6c8e2072599fe63/' +
    latitude +
    ',' +
    longitude +
    '?units=uk2';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const { temperature } = body.currently;
      const { precipProbability } = body.hourly.data[0];
      const { summary, temperatureHigh, temperatureLow } = body.daily.data[0];

      callback(
        undefined,
        summary +
          ' It is currently ' +
          temperature +
          '°C. There is a ' +
          precipProbability +
          '% chance of rain. The temperature high is ' +
          temperatureHigh +
          '°C and a temperature low of ' +
          temperatureLow +
          '°C'
      );
    }
  });
};

module.exports = forecast;
