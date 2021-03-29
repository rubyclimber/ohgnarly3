/**
 * Created by asmitty on 3/16/17.
 */
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const userContactSchema = new Schema({
    userId: String,
    contactId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const userContactModel = mongoose.model("UserContact", userContactSchema, "UserContacts");