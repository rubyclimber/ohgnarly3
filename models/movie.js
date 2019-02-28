/**
 * Created by asmitty on 2/20/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    description: String,
    userId: String,
    director: String,
    favorite: {type: Boolean, default: false},
    wishlist: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    imdbid: String,
    format: String,
    rating: {type: Number, default: 0},
    poster: String
});

module.exports = mongoose.model("Movie", movieSchema, "Movies");