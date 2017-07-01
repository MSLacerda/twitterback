module.exports.twitters = function (application, req, res) {

    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: 'bKJDam5xiGyCgCtsxp9Y2PktW',
        consumer_secret: '3HSHiLySRSFfGym9RweMp2mdCIx7gHmziH9HYfDnS1N9epM7cY',
        access_token_key: '2499257348-V1DtxVBacvUGkCiWpDuJh7GSuOY56hafzDtsVig',
        access_token_secret: '7fkHr4NxPg7puHd9HeFr2vVkMocqAzo6dTSVcX0mA5TXV'
    });

    client.get('search/tweets', { q: 'Crato' }, function (error, tweets, response) {
        console.log(tweets);
    });
}