/**
 * Created by asmitty on 9/7/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatUserSchema = new Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    createdAt: {type: Date, default: Date.now}
});

export const chatUserModel = mongoose.model("ChatUser", chatUserSchema, "ChatUsers");