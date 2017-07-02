var app = require('./app/config/server');

app.listen(3000 || process.env.PORT, function() {
    console.log('Servidor Online ');
});