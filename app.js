var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var Airtable = require('airtable');
var app = express();
var port = process.env.PORT || 8080;

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
AWS.config.airTableKey = process.env.AIRTABLE_API_KEY;
var s3 = new AWS.S3();

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

// Base Airtable configuration
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AWS.config.airTableKey
});
var base = Airtable.base('appbLOgSXFJxYYuzo');
