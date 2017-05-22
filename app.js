var express = require('express')
var cors = require('cors')
var app = express()

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger);
app.use(cors);

app.get('/', function (req, res) {
  res.send('Welcome to Web Summit api.');
});

console.log('[SERVER] Initializing routes');
require('./app/routes/index')(app);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});