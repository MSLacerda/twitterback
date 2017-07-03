module.exports.clear = function (application, req, res) {
    var Twitter = require('twitter');
    var Tweet = application.models.tweet;
    
    Tweet.remove({}, function (err) {
            if (err) throw err;
            return res.send("Ok, all clear");
        });
}