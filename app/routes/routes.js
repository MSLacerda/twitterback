module.exports = function (app) {
    app.get('/tweets', function (req, res) {
        app.controllers.twitter.twitters(app, req, res);
    });

    app.get('/data', function (req, res) {
        app.controllers.data.datas(app, req, res);
    });

    app.get('/clear', function (req, res) {
         app.controllers.func.clear(app, req, res);
    })
}