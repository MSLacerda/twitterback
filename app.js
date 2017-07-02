var app = require('./app/config/server');

app.listen(3000, function() {
    console.log('Servidor Online '+process.env.PORT);
});