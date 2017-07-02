var app = require('./app/config/server');

app.listen(process.env.PORT || 5000, function() {
    console.log('Servidor Online ');
});