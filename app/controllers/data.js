module.exports.datas = function (application, req, res) {
    var lineReader = require('line-reader');
    var Twitter = require('twitter');
    var Tweet = application.models.tweet;

    Tweet.find({}).sort('-points').exec(function(err, docs) { return res.send(docs) });
    
}