var mongoose = require("mongoose");

var TweetSchema = new mongoose.Schema({

    text: {
        type: String
    },
    points: {
        type: Number
    }
});

module.exports = function(app) {

    return mongoose.model('Tweet', TweetSchema);

}