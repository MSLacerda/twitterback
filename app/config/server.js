var dataCtrl = require("mongoose");
/*importa arquivos de configuração */
var config = require('./config');
/* importar o módulo do framework express */
var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http)
/* importar o módulo do body-parser */
var bodyParser = require('body-parser');
/* importar o módulo do express-validator */
var expressValidator = require('express-validator');
var config = require('./config');

var load = require('express-load');

var Twitter = require('node-tweet-stream')
    , t = new Twitter({
        consumer_key: 'gYhyKvzqZHQR5Inf8cZsNyPNL',
        consumer_secret: 'cnCbz70y410JlBMMQ3OSdF4cTgQmE3b3TLDHu8uJZYbpJtbfqb',
        token: '2499257348-WgYNyAd7sYO0nTp8h0sTOHYODMAMNa15F9Ug29N',
        token_secret: 'vnzY4xBSzrtXyG7yYDxttJyWZpSTBY2WDCnoszUD0sY7N'
    })

/* iniciar o objeto do express */

io.on('connection', function (client) {
    setInterval(function () {
        client.emit("update");
    }, 60000);
    setInterval(function () {
        client.emit("get");
    }, 10000);

    t.track('Crato');

    t.on('tweet', function (tweet) {
        client.emit("tweet", tweet);
    })

})

require('./dbConnection.js')(config.database);

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, x-access-token');
    next();
});

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */


load('models', { cwd: 'app' })
    .then('controllers')
    .then('routes')
    .into(app);

/* exportar o objeto app */
module.exports = http;