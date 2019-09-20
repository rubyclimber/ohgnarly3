/**
 * Created by asmitty on 9/18/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    name: String,
    age: Number,
    dob: Date,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Person", personSchema, "People");