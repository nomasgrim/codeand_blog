var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var Airtable = require('airtable');
var app = express();
var port = process.env.PORT || 8080;
var env = process.env.NODE_ENV || 'dev';
var airTableApiKey = null;
var airTableDatabase = null;

/**
 * Express middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(express.static('./htdocs/'));

/**
 * Endpoint to return people from Airtable
 * base().select lets you target the DB you want to access from AirTable
 * Loops through each page in DB then returns data with res.json(records)
 */
app.get('/getPeople', function(req, res) {
  base('People').select({
    maxRecords: 10,
    view: "All Contacts"
  }).eachPage(function page(records, fetchNextPage) {
    fetchNextPage();
    res.json(records);
  }, function done(error) {
    if (error) {
      console.log(error);
    }
  });
});

/**
 * Main page for express web server to render
 */
app.get('/', function(req, res) {
  res.sendfile('htdocs/index.html')
});

/**
 * Default port for express to be listening on
 */
app.listen(port, function(err) {
  console.log('running server on port ' + port);
});

/**
 * If env is dev then set APIkey from environmentVars
 * otherwise set APIkey from Heorku config vars
 */
if (env === 'dev') {
  var environmentVars = require('./environmentVars');
  airTableApiKey = environmentVars.apiKey;
  airTableDatabase = environmentVars.database;
} else {
  airTableApiKey = process.env.AIRTABLE_API_KEY;
  airTableDatabase = process.env.AIRTABLE_DATABASE;
}

/**
 * Base Airtable configuration
 */
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: airTableApiKey
});
var base = Airtable.base(airTableDatabase);
