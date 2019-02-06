/**
 * Created by asmitty on 2/20/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var formats = require('../infrastructure/formats');

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

export const movieModel = mongoose.model("Movie", movieSchema, "Movies");