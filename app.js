var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var Airtable = require('airtable');
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(express.static('./htdocs/'));

/**
 * Endpoint to return people from Airtable
 */
app.get('/getPeople', function(req, res) {
  var resultsToSend = [];
  base('People').select({
    maxRecords: 10,
    view: "All Contacts"
  }).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      resultsToSend.push(record.get('Name'));
    });
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

    res.json(resultsToSend);
  }, function done(error) {
    if (error) {
      console.log(error);
    }
  });
});

app.get('/', function(req, res) {
  res.sendfile('htdocs/index.html')
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});

// Base Airtable configuration
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyDrK9mmPrxhVaUW'
});
var base = Airtable.base('appbLOgSXFJxYYuzo');
