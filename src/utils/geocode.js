const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiYmVud2F0aGVyc3RvbiIsImEiOiJjanh4ZWMxZjgwNTlpM21tdnluNWIxd2E1In0.Er8P4k4HxH7poztYk2Pqbg&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Please try another search', undefined);
    } else {
      const { center, place_name } = body.features[0];

      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name
      });
    }
  });
};

module.exports = geocode;
