var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');

var app = express();
app.use(cors());

var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.get('/', function(req, res) {
  res.send('hello main route');
});

app.get('/testDataCall', function(req, res) {
  res.send('hello test route');
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
