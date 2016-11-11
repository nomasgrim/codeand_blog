var express = require('express');
var Airtable = require('airtable');

var app = express();
var port = process.env.PORT || 5000;

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'YOUR_API_KEY'
});
var base = Airtable.base('appbLOgSXFJxYYuzo');

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});

