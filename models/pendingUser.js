var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pendingUserSchema = new Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    createdAt: {type: Date, default: Date.now}
});

export const pendingUserModel = mongoose.model("PendingUser", pendingUserSchema, "PendingUsers");