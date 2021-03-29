/**
 * Created by asmitty on 9/7/18.
 */
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const chatUserSchema = new Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    createdAt: {type: Date, default: Date.now}
});

export const chatUserModel = mongoose.model("ChatUser", chatUserSchema, "ChatUsers");