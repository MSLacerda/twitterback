module.exports.twitters = function (application, req, res) {
    var lineReader = require('line-reader');
    var Twitter = require('twitter');
    var Tweet = application.models.tweet;

 

    var client = new Twitter({
        consumer_key: 'bKJDam5xiGyCgCtsxp9Y2PktW',
        consumer_secret: '3HSHiLySRSFfGym9RweMp2mdCIx7gHmziH9HYfDnS1N9epM7cY',
        access_token_key: '2499257348-V1DtxVBacvUGkCiWpDuJh7GSuOY56hafzDtsVig',
        access_token_secret: '7fkHr4NxPg7puHd9HeFr2vVkMocqAzo6dTSVcX0mA5TXV'
    });

    function getAdjectives(cb) {
        var adjectives = new Array();
        lineReader.eachLine('adjetivos.txt', function (line, last) {
            adjectives.push({
                text: line,
                points: 0
            })
            if (last) {
                cb(adjectives);
                return adjectives; // stop reading
            }
        });
    }

    function betters(adjectives) {
        var betterAdjectives = new Array();
        Tweet.remove({}, function (err) {
            if (err) throw err;
        });
        for (var i = 0; i < adjectives.length; i++) {
            if (adjectives[i].points > 0) {

                var tweet = new Tweet({
                    points: adjectives[i].points,
                    text: adjectives[i].text
                });

                tweet.save(function (err) {
                    if (err) throw err;
                })

                betterAdjectives.push(adjectives[i]);
            }
        }

        return res.send(betterAdjectives);
    }

    function filter(tweets, cb) {
        var adjectives = getAdjectives(function (adjectives) {
            for (var i = 0; i < tweets.length; i++) {
                frase = tweets[i].text;
                arrayFrase = frase.split(" ");
                for (var a = 0; a < arrayFrase.length; a++) {
                    arrayFrase[a] = arrayFrase[a].replace(" ", ""); //tira espaço em branco
                    arrayFrase[a] = arrayFrase[a].replace(".", ""); //tira ponto
                    arrayFrase[a] = arrayFrase[a].replace("/", ""); //tira barra
                    arrayFrase[a] = arrayFrase[a].replace(",", ""); //tira virgula
                    for (var j = 0; j < adjectives.length; j++) {
                        if (arrayFrase[a] == adjectives[j].text) {
                            adjectives[j].points++;
                        }
                    }
                }
            }
            return cb(adjectives);
        });
    }

    client.get('search/tweets', { q: 'Crato' }, function (error, tweets, response) {
        console.log(tweets);
        filter(tweets.statuses, betters);
    });
}