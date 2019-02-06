/**
 * Created by asmitty on 3/9/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
    title: String,
    userId: String,
    year: String,
    favorite: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    imdbid: String
});

export const showModel = mongoose.model("Show", showSchema, "Shows");