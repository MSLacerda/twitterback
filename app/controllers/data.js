module.exports.datas = function (application, req, res) {
    var lineReader = require('line-reader');
    var Twitter = require('twitter');
    var Tweet = application.models.tweet;
    
    Tweet.aggregate(
        [{ "$group": {
            "_id": "$text",
            "recommendCount": {"$sum": 1}
        }},
        {"$sort": {"recommendCount": -1}},
        {"$limit": 10}
        ],
        function (err, docs) {
            if (err) throw err;
            return res.send(docs);
        }
    );
}