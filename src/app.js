const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine / view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Use static assets
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ben Watherston'
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Ben Watherston',
    image: '/img/robot.png'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Ben Watherston',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas at architecto eligendi quaerat. Iusto consequuntur dicta cumque magnam soluta, sint molestiae doloremque, porro ipsam repellat illo qui non, minima aut?'
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  res.send({
    products: []
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forcast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404-help', {
    title: 'Help article not found',
    name: 'Ben Watherston',
    message: 'Help Article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ben Watherston',
    message: 'Nout there'
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
