module.exports = function (app) {
    //Rota para funções de login, envia os dados para serem autenticados

    app.get('/data', function (req, res) {
        app.controllers.twitter.twitters(app, req, res);
    });
}